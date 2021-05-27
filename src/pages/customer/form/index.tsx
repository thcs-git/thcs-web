import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputMask, { Props } from 'react-input-mask';
import { ApplicationState } from '../../../store';
import { loadCustomerById, getAddress as getAddressAction, updateCustomerRequest, createCustomerRequest, cleanAction } from '../../../store/ducks/customers/actions';
import { CustomerInterface } from '../../../store/ducks/customers/types';
import { createUserRequest as createUserAction } from '../../../store/ducks/users/actions';
import { UserInterface } from '../../../store/ducks/users/types';
import { SearchOutlined, Edit, CodeOutlined } from '@material-ui/icons';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Container,
  Divider,
  FormControlLabel,
  makeStyles,

} from '@material-ui/core';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';
import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import ButtonComponent from '../../../styles/components/Button';

import {
  ButtonsContent,
  ButtonDefeault,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection,
  BoxCustom
} from './styles';
import mask from '../../../utils/mask';
import Loading from '../../../components/Loading';
import { validateCNPJ as validateCNPJHelper } from '../../../helpers/validateCNPJ';
import _ from 'lodash';
import FeedbackComponent from '../../../components/Feedback';
import validator from 'validator';
import { Autocomplete } from '@material-ui/lab';
import { toast } from 'react-toastify';
import validatePhone from '../../../utils/validatePhone';

interface IFormFields extends CustomerInterface {
  form?: {
    uf: { id: number, name: string, sigla:string } | null,
  }
}

interface IPageParams {
  id?: string,
  mode?:string;
}

export default function CustomerForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    cancel:{
      textTransform: 'capitalize',
      fontSize: '18px',
      '&:hover': {
        backgroundColor: 'var(--danger-hover)',
        color:'var(--danger)',
        borderColor:'var(--danger-hover)',

      },
      maxHeight:'38px',
      borderColor:'var(--danger-hover)',
      color:'var(--danger-hover)',
      contrastText: "#fff"
    },

  }))

  const classes = useStyles();
  const customerState = useSelector((state: ApplicationState) => state.customers);
  const userState = useSelector((state: ApplicationState) => state.users);
  const [inputUf, setInputUf] = useState({index:0});
  const [inputPhone,setInputPhone] = useState({value:"",error:false});
  const [inputCellPhone, setInputCellPhone] = useState({value:"",error:false});
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const { params } = props.match;

  const [canEdit, setCanEdit] = useState(true);
  const [fieldsValidation, setFieldValidations] = useState<any>({
    name:false,
    social_name:false,
    fiscal_number: false,
    responsible_user:false,
    postal_code: false,
    street: false,
    number: false,
    district: false,
    city:false,
    state: false,
    email:false,
    phone:false

  });
  const States = [
    {id:1,name:"São Paulo",sigla:'SP'},
    {id:2,name:'Paraná',sigla:'PR'},
    {id:3,name:'Santa Catarina',sigla:'SC'},
    {id:4,name:'Rio Garnde do Sul',sigla:'RS'},
    {id:5,name:'Mato Grosso do Sul',sigla:'MS'},
    {id:6,name:'Rondônia',sigla:'RO'},
    {id:7,name:'Acre',sigla:'AC'},
    {id:8,name:'Amazonas',sigla:'AM'},
    {id:9,name:'Roraima',sigla:'RR'},
    {id:10,name:'Pará',sigla:'PA'},
    {id:11,name:'Amapá',sigla:'AP'},
    {id:12,name:'Tocantins',sigla:'TO'},
    {id:13,name:'Maranhão',sigla:'MA'},
    {id:14,name:'Rio Grande do Norte',sigla:'RN'},
    {id:15,name:'Paraíba',sigla:'PB'},
    {id:16,name:'Pernambuco',sigla:'PE'},
    {id:17,name:'Alagoas',sigla:'AL'},
    {id:18,name:'Sergipe',sigla:'SE'},
    {id:19,name:'Bahia',sigla:'BA'},
    {id:20,name:'Minas Gerais',sigla:'MG'},
    {id:21,name:'Rio de Janeiro',sigla:'RJ'},
    {id:22,name:'Mato Grosso',sigla:'MT'},
    {id:23,name:'Goiás',sigla:'GO'},
    {id:24,name:'Distrito Federal',sigla:'DF'},
    {id:25,name:'Piauí',sigla:'PI'},
    {id:26,name:'Ceará',sigla:'CE'},
    {id:27,name:'Espírito Santo',sigla:'ES'}
  ];
  const [state, setState] = useState<IFormFields>({
    name: '',
    social_name:'',
    fiscal_number: '',
    address: {
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
    },
    email: '',
    phones: {
      number: '',
      telegram: false,
      whatsapp: false,
    },
    cellphone: '',
    phone:'',
    responsible_user:'',
    active: true,

  });

  var isValidPhoneNumber: any;
  var isValidCellPhoneNumber: any;
  var formValid : any;
  useEffect(() => {
    dispatch(cleanAction());
  }, []);

  useEffect(() => {
    if (params.id) {
      if(params.mode === "view"){
        setCanEdit(false)
      }

        const uf = States.find(uf => uf.sigla === customerState.data.address.state) || null;

      setState(prevState =>({
        ...prevState,
        form:{uf:uf}
      }));
      setState(prevState=>{
        return{
          ...prevState,
          ...customerState.data
        }
        });
        setInputPhone(prev =>({
          ...prev,
          value:customerState.data.phone || ''
        }));
        setInputCellPhone(prev =>({
          ...prev,
          value:customerState.data.cellphone || ''
        }));

      setFieldValidations({
        name:true,
        social_name:true,
        fiscal_number:true,
        responsible_user:true,
        postal_code: true,
        street: true,
        number: true,
        district:true,
        city:true,
        state:true,
        email:true,
        phone:true
       })

    }
  }, [customerState, params.id]);

  useEffect(() => {
    if (customerState.error) {
      setState(prev => ({
        ...prev,
        address: {
          ...prev.address,
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          complement: '',
        },
      }))
    }

    setState(prevState => {
      return {
        ...prevState,
        address: {
          ...customerState.data.address
        }
      }
    });
    setFieldValidations((prevState: any) => ({
      ...prevState,
      postal_code: !validator.isEmpty(customerState.data.address.postal_code),
      street: !validator.isEmpty(customerState.data.address.street),
      number: !validator.isEmpty(customerState.data.address.number),
      district: !validator.isEmpty(customerState.data.address.district),
      city: !validator.isEmpty(customerState.data.address.city),
      state: !validator.isEmpty(customerState.data.address.state),
      complement: !validator.isEmpty(customerState.data.address.complement),
    }));
  }, [customerState.data?.address]);

  useEffect(() => {
    if (customerState.success && customerState.data?._id && !customerState.isRegistrationCompleted) history.push('/customer');
  }, [customerState.success])


  useEffect(() => {
    if (params.id) {
      dispatch(loadCustomerById(params.id))

    }
  }, [dispatch, params]);



  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;
    for (let key of Object.keys(fieldsValidation)) {
      if (fieldsValidation[key]) {
        isValid = false;
      }
    }
    return isValid;

  }, [fieldsValidation, state]);

  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';
    console.log(customerState.errorCep);


    customerState.errorCep && setState(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        city: '',
        complement: '',
        district: '',
        number: '',
        state: '',
        street: '',
      }
    }));

    document.getElementById(field)?.focus();
  }, [customerState.errorCep]);

  const handleSaveFormCustomer = useCallback(() => {
    console.log(fieldsValidation);

    if (!fieldsValidation.name || !fieldsValidation.social_name  || !fieldsValidation.fiscal_number || !fieldsValidation.responsible_user ||
      !fieldsValidation.phone || !fieldsValidation.email || !fieldsValidation.phone || !fieldsValidation.postal_code  || !fieldsValidation.street ) {
      toast.error('Existem campos que precisam ser preenchidos para continuar');
      return;
    }
    else if (params.id && ModifiCondition() ) {
      dispatch(updateCustomerRequest(state));

    }else{
       dispatch(createCustomerRequest(state));
    }
  }, [state]);

   /////////////// Handler ////////////

   const handlerState = useCallback((event:any, newValue:any)=>{
        if(newValue){
          setState(prev=>({
            ...prev,
            form:{
              ...prev.form,
              uf:newValue
            }
          }));
          setState(prevState=>({
            ...prevState,
            address: { ...state.address, state: newValue.sigla }
          }))
            }
   }, [state])



  ///////// Validação ////////////////

  const validatePhone = () => {

    if ( state.phone){
      const landline =  state.phone.replace('(','').replace(')','9').replace(' ','').replace(' ','').replace('-','');

     isValidPhoneNumber = validator.isMobilePhone(landline, 'pt-BR');

      return (isValidPhoneNumber)}


   }



  const validateCellPhone = () => {
    if ( state.cellphone){
    var cellphone =  state.cellphone.replace('(','').replace(')','').replace(' ','').replace(' ','').replace('-','');
   isValidCellPhoneNumber = validator.isMobilePhone(cellphone, 'pt-BR');

    return (isValidCellPhoneNumber)
  }
   }

  const validateCNPJField = useCallback((element) => {

  const isValidField = validateCNPJHelper(element.target.value) || false;
    setFieldValidations((prevState: any) => ({
      ...prevState,
      fiscal_number: isValidField
    }));
  }, []);

  const validationCellPhoneField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setInputCellPhone(prevState =>({
      ...prevState,
      error:isValidField
    }));
    if(!isValidField){
      setState(prevState=>({
     ...prevState,
     cellphone:element.target.value
   }));
   }
  },[]);



/////////////// Validação /////////////////////

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

  function isEquals(){

    return _.isEqual(state,customerState.data);
  }


  function ModifiCondition(){
    if(!isEquals()){
      return true;
    }else{
      return false;
    }
  }

  function handleOpenModalCancel() {

    if(ModifiCondition() && canEdit){
      setOpenModalCancel(true);
     }else{
      handleCancelForm();
     }
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    dispatch(cleanAction());
    setOpenModalCancel(false);
    history.push('/customer');
  }

  if( validatePhone() == true && validateCellPhone()==true){

    formValid = true;

  }

  return (
    <Sidebar>
      {customerState.loading && <Loading />}
      <Container>

      {customerState.isRegistrationCompleted ? (
          <FeedbackComponent
            type="success"
            title="Cadastro concluído!"
            description="Os dados foram salvos no sistema. Deseja adicionar novo cadastro?"
            buttons
            successAction={() => {
              dispatch(cleanAction());
              history.push('/custumer/create');
            }}
            defaultAction={() => {
              dispatch(cleanAction());
              history.push('/customer');
            }}
          />):(
        <BoxCustom style={{  marginTop: 0 }} mt={5} paddingLeft={15} paddingRight={15} paddingTop={8}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <FormTitle>Cadastro de Cliente</FormTitle>

            {(params.id && params.mode == 'view' && !canEdit)&& (
              <Button style={{ marginTop: -20, marginLeft: 15, color: '#0899BA' }} onClick={() => setCanEdit(!canEdit)}>
                <Edit style={{ marginRight: 5, width: 18 }} />
              Editar
              </Button>
            )}
          </div>
          <FormSection>
          <FormContent>
            <FormGroupSection>
              <Grid container>
                <Grid item md={12} xs={12}>
                    <TextField
                      id="input-social-client"
                      label="Nome"
                      variant="outlined"
                      size="small"
                      autoFocus
                      value={state.name}
                      onChange={(element) =>{
                         setFieldValidations((prevState: any) => ({ ...prevState, name: !validator.isEmpty(element.target.value) }));
                        setState({ ...state, name: element.target.value })}}

                      fullWidth
                      disabled={!canEdit}
                    />
                  </Grid>

                  <Grid item md={7} xs={12}>
                    <TextField
                      id="input-social-name"
                      label="Nome Social"
                      variant="outlined"
                      size="small"

                      value={state.social_name}
                      onChange={(element) => {
                        setState({ ...state, social_name: element.target.value })
                        setFieldValidations((prevState: any) => ({ ...prevState, social_name: !validator.isEmpty(element.target.value) }));
                      }}

                      fullWidth
                      disabled={!canEdit}
                    />
                  </Grid>

                  <Grid item md={5} xs={12}>
                    <InputMask
                      mask="99.999.999/9999-99"
                      disabled={!canEdit}
                      value={state.fiscal_number}
                      onChange={(element) =>{
                        setState({ ...state, fiscal_number: element.target.value })

                      }}
                      onBlur={validateCNPJField}
                    >
                      {(inputProps: any) => (
                        <TextField
                        disabled={!canEdit}
                          {...inputProps}
                          id="input-fiscal-number"
                          label="CNPJ"
                          variant="outlined"
                          size="small"
                          error={!fieldsValidation.fiscal_number && state.fiscal_number != ''}

                          // value={state.fiscal_number}
                          // onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                          placeholder="00.000.000/0000-00"
                          fullWidth

                        />)}
                    </InputMask>
                    {!fieldsValidation.fiscal_number && state.fiscal_number && (
                      <p style={{ color: '#f44336', margin:'-2px 5px 10px' }}>
                        CNPJ Inválido ou inexistente
                      </p>
                    )}
                  </Grid>
              </Grid>
            </FormGroupSection>

            <Grid item md={12} xs={12}>
                <Divider style={{ marginBottom: 28, marginTop: 20 }} />
            </Grid>

            <FormGroupSection>
              <Grid container>
                <Grid item md={3} xs={12}>
                  <FormControl variant="outlined" size="small" style={{ paddingRight:10}} >
                    <InputLabel htmlFor="search-input">CEP</InputLabel>
                    <InputMask
                      mask="99999-999"
                      value={state.address.postal_code}
                      disabled={!canEdit}
                      onChange={element => {
                        setState({ ...state, address: { ...state.address, postal_code: element.target.value } })
                        setFieldValidations((prevState: any) => ({ ...prevState, postal_code: !validator.isEmpty(element.target.value) }));
                      }}
                     onBlur={getAddress}
                    >
                      {(inputProps: Props) => (
                        <OutlinedInputFiled
                        disabled={!canEdit}
                        error={customerState.errorCep}
                          id="input-postal-code"
                          label="CEP"
                          placeholder="00000-000"
                          endAdornment={
                            <InputAdornment position="end">
                              <SearchOutlined style={{ color: 'var(--primary)' }} />
                            </InputAdornment>
                          }
                        />
                        )}
                    </InputMask>
                    {customerState.errorCep && (
                      <p style={{ color: '#f44336', margin:'-2px 5px 10px' }}>
                        CEP inválido
                      </p>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={9} xs={12}>
                  <TextField
                    id="input-address"
                    label="Endereço"
                    variant="outlined"


                    size="small"
                    value={state.address.street}
                    onChange={(element) =>{
                      setState({ ...state, address: { ...state.address, street: element.target.value } })
                      setFieldValidations((prevState: any) => ({ ...prevState, street: !validator.isEmpty(element.target.value) }));
                    }
                  }

                   disabled={!canEdit}
                    fullWidth
                  />
                </Grid>

                <Grid item md={2} xs={12}>
                  <TextField
                    id="input-address-number"
                    label="Número"
                    variant="outlined"
                    size="small"

                    value={state.address.number}
                   // onBlur={validationNumberField}


                    onChange={(element) =>{
                      setState({ ...state, address: { ...state.address, number: element.target.value } })
                      setFieldValidations((prevState: any) => ({ ...prevState, number: !validator.isEmpty(element.target.value) }));
                      }}
                    fullWidth
                    disabled={!canEdit}
                  />
                </Grid>

                <Grid item md={10} xs={12}>
                  <TextField
                    id="input-address-complement"
                    label="Complemento"
                    variant="outlined"
                    size="small"

                    value={state.address.complement}
                    onChange={(element) => setState({ ...state, address: { ...state.address, complement: element.target.value } })
                   }
                    fullWidth
                    disabled={!canEdit}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    id="input-neighborhood"
                    label="Bairro"
                    variant="outlined"
                    size="small"
                    autoFocus
                    value={state.address.district}
                   // onBlur={validationDistrictField}


                    onChange={(element) =>{ setState({ ...state, address: { ...state.address, district: element.target.value } })
                    setFieldValidations((prevState: any) => ({ ...prevState, district: !validator.isEmpty(element.target.value) }));
                  }}
                    fullWidth
                    disabled={!canEdit}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="input-city"
                    label="Cidade"
                    variant="outlined"
                    size="small"

                    value={state.address.city}
                   // onBlur={validationCityField}

                    onChange={(element) => {
                      setState({ ...state, address: { ...state.address, city: element.target.value } });
                      setFieldValidations((prevState: any) => ({ ...prevState, city: !validator.isEmpty(element.target.value) }))}
                    }
                    fullWidth
                    disabled={!canEdit}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <Autocomplete
                    id="combo-box-neigthborhoods-states"
                    options={States || []}
                    getOptionLabel={(option) => option.sigla}
                    fullWidth

                    getOptionSelected={(option)=>option.sigla === state.address.state}
                    value={state.form?.uf ?? null}
                    onChange={(event:any, value) =>{
                      handlerState(event,value);
                      setFieldValidations((prevState: any) => ({ ...prevState, state: !validator.isEmpty(value?value.name:'') }))
                    }}
                    renderInput={(params) =>
                      <TextField {...params}  label="UF" variant="outlined" size="small"

                      disabled={!canEdit}
  />
                    }
                //  onBlur={handleStateValidator} helperText={inputState.error && "Selecione um estado válido"} />}
                  />
                </Grid>


            <Grid item md={12} xs={12}>
                <Divider style={{ marginBottom: 28, marginTop: 20 }} />
            </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  id="input-responsible-name"
                  label="Nome do responsável"
                  variant="outlined"
                  size="small"
                  value={state.responsible_user}

              // onBlur={validationResponsableField}


                  onChange={(element) =>{
                  setState({ ...state, responsible_user: element.target.value })
                  setFieldValidations((prevState: any) => ({ ...prevState, responsible_user: !validator.isEmpty(element.target.value) }));} }
                  disabled={!canEdit}

                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <InputMask
                  mask="(99) 9999-9999"
                  value={state.phone}
                  disabled={!canEdit}
                  onChange={(element) =>{
                    setState({...state,phone:element.target.value})
                    setFieldValidations((prevState: any) => ({ ...prevState, phone: !validator.isEmpty(element.target.value) }));
                  }
                  }
                  onBlur={validatePhone}
                    // onBlur={(element)=>{
                    //   setFieldValidations((prevState: any) => ({ ...prevState, phone: !validator.isEmpty(element.target.value) }));}}
                >
                  {(inputProps: any) => (
                    <TextField
                    disabled={!canEdit}
                      {...inputProps}
                      id="input-cellphone"
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      placeholder="(00) 0000-0000"
                      error ={!validatePhone() && state.phone != ''}

                      fullWidth

                    />
                  )}
                </InputMask>
                {!validatePhone() && state.phone &&(
                      <p style={{ color: '#f44336', margin:'-10px 5px 10px' }}>
                       Por favor insira um número válido
                      </p>
                    )}
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField

                  id="input-email"
                  label="E-mail"
                  variant="outlined"
                  size="small"
                  value={state.email}
                  onBlur={(element)=>{setFieldValidations((prevState: any) => ({ ...prevState, email: !validator.isEmpty(element.target.value) }));}}

                  onChange={(element) =>{ setState({ ...state, email: element.target.value })
                  setFieldValidations((prevState: any) => ({ ...prevState, email: !validator.isEmail(element.target.value) }));}}
                  fullWidth
                  disabled={!canEdit}
                />
              </Grid>
                <Grid item md={4} xs={12}>
                  <InputMask
                    mask="(99) 9 9999-9999"
                    disabled={!canEdit}
                    value={state.cellphone}
                    onBlur={validateCellPhone}
                    onChange={(element) =>{
                      setState({...state,cellphone:element.target.value})
                      setFieldValidations((prevState: any) => ({ ...prevState, cellphone: !validator.isEmpty(element.target.value) }));
                    }
                    }

                  >
                    {(inputProps: any) => (
                      <TextField
                      disabled={!canEdit}
                        {...inputProps}
                        id="input-phone"
                        label="Celular"
                        variant="outlined"
                        size="small"
                        placeholder="(00) 0 0000-0000"
                        error ={!validateCellPhone() && state.cellphone != ''}
                        fullWidth

                      />
                    )}
                  </InputMask>
                  {!validateCellPhone() && state.cellphone &&(
                      <p style={{ color: '#f44336', margin: '4px 4px' }}>
                       Por favor insira um número válido
                      </p>
                    )}
                </Grid>
                {params.id && (
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={(
                      <Switch
                      disabled={!canEdit}
                        checked={state.active}
                        onChange={(event) => {
                          setState(prevState => ({
                            ...prevState,
                            active: event.target.checked
                          }))
                        }} />
                    )}
                    label="Ativo?"
                    labelPlacement="start"
                  />
                </Grid>
              )}
              </Grid>
            </FormGroupSection>
              <ButtonsContent style={{ paddingRight:15}}>
                {!canEdit && (<ButtonComponent variant="outlined" background="success_rounded" onClick={() => handleCancelForm()}>
              Voltar
            </ButtonComponent>)}
            {canEdit && (<ButtonComponent variant="outlined"  className={classes.cancel} onClick={() => handleOpenModalCancel()}>
              Cancelar
            </ButtonComponent>)}
            {canEdit &&(<ButtonComponent disabled={!formValid}  variant="contained" background="success" onClick={() => handleSaveFormCustomer()}>
              Salvar
            </ButtonComponent>)}

          </ButtonsContent>
          </FormContent>

        </FormSection>

          <Dialog
            open={openModalCancel}
            onClose={handleCloseModalCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Cancelar</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja cancelar este cadastro?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModalCancel} color="primary">
                Não
              </Button>
              <Button onClick={handleCancelForm} color="primary" autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        </BoxCustom>
          )}

      </Container>
    </Sidebar>
  );
}
