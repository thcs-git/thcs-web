import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputMask, { Props } from 'react-input-mask';
import { ApplicationState } from '../../../store';
import { loadCustomerById, getAddress as getAddressAction, updateCustomerRequest, createCustomerRequest, cleanAction } from '../../../store/ducks/customers/actions';
import { CustomerInterface } from '../../../store/ducks/customers/types';
import { createUserRequest as createUserAction } from '../../../store/ducks/users/actions';
import { UserInterface } from '../../../store/ducks/users/types';

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
  Switch
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

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

interface IFormFields extends CustomerInterface {
  form?: {
    uf: { id: number, name: string, sigla:string } | null,
  }
}

interface IPageParams {
  id?: string;
}

export default function CustomerForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();

  const customerState = useSelector((state: ApplicationState) => state.customers);
  const userState = useSelector((state: ApplicationState) => state.users);
  const [inputUf, setInputUf] = useState({index:0});
  const [inputPhone,setInputPhone] = useState({value:"",error:false});
  const [inputCellPhone, setInputCellPhone] = useState({value:"",error:false});
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const { params } = props.match;

  const [fieldsValidation, setFieldValidations] = useState<any>({
    name:true,
    social_name:true,
    fiscal_number: true,
    responsible_user:true,
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

  // const [userData, setUserData] = useState<UserInterface>({
  //   companies: [], //empresa que vai vir do login
  //   name: '',
  //   birthdate: '',
  //   gender: '',
  //   national_id: '',
  //   issuing_organ: '',
  //   fiscal_number: '',
  //   mother_name: '',
  //   nationality: '',
  //   address: {
  //     postal_code: '',
  //     street: '',
  //     number: '',
  //     district: '',
  //     city: '',
  //     state: '',
  //     complement: '',
  //   },
  //   email: '',
  //   phone: '',
  //   cellphone: '',
  //   user_type_id: '',
  //   specialties: [],
  //   council_state: '',
  //   council_number: '',
  //   active: true,
  // });

  useEffect(() => {
    dispatch(cleanAction());
  }, []);

  useEffect(() => {
    if (params.id) {
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

      return;
    }
    setState(prevState => {
      return {
        ...prevState,
        address: {
          ...customerState.data.address
        }
      }
    });
  }, [customerState.data.address]);

  // useEffect(()=>{
  //   setInputPhone(prevState=>({

  //   }))
  // });

  useEffect(() => {
    if (params.id) {
      dispatch(loadCustomerById(params.id))

    }
  }, [dispatch, params]);

  // useEffect(() => {
  //   if (!params.id && customerState.success && !customerState.error && !customerState.loading) {

  //     if (customerState.data._id) {
  //       dispatch(createUserAction({
  //         ...userData,
  //         customer_id: customerState.data._id,
  //         name: state.name || ``,
  //         fiscal_number: state.fiscal_number || ``,
  //         birthdate: '',
  //         gender: '',
  //         national_id: '',
  //         issuing_organ: '',
  //         mother_name: '',
  //         nationality: '',
  //         address: state.address,
  //         email: state.email || ``,
  //         phone: state.cellphone || ``,
  //         cellphone: state.cellphone || ``,
  //         user_type_id: '6025b77d83576e461426786a',
  //         council_state: '',
  //         council_number: '',
  //       }));
  //     }
  //   }
  // }, [customerState.success]);

  // useEffect(() => {
  //   if (!params.id && userState.success && !userState.error && !userState.loading) {
  //     history.push("/customer");
  //   }
  // }, [userState.success]);

  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';
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

  useEffect(() => {

    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';
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

  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';

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

  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;
    let valida = Object.values(fieldsValidation);
    let teste = valida.find(valor=>valor === false);
    console.log(teste);
    for (let key of Object.keys(fieldsValidation)) {
      if (!fieldsValidation[key]) {
        isValid = false;
      }
    }

  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';

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

  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';

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

  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';

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
    console.log(!handleValidateFields());
    if (!fieldsValidation.name) {
      toast.error('Existem campos que precisam ser preenchidos para continuar');
      return;
    }
    else if (params.id && ModifiCondition() ) {
      //dispatch(updateCustomerRequest(state));
      history.push("/customer");
    }else if(!params.id && ModifiCondition()){
      // dispatch(createCustomerRequest(state));
    }else{
      history.push("/customer");
    }
  }, [state, params]);

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
  const validateCNPJField = useCallback((element) => {

  const isValidField = validateCNPJHelper(element.target.value) || false;
    setFieldValidations((prevState: any) => ({
      ...prevState,
      fiscal_number: isValidField
    }));
  }, []);

  const validationNameField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    console.log(isValidField);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      name:isValidField
    }));
  },[]);

  const validationSocialNameField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      social_name:isValidField
    }));
  },[]);

  const validationPostalCodeField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);

    setFieldValidations((prevState: any) =>({
      ...prevState,
      postal_code:isValidField
    }));
  },[]);

  const validationStreetField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);

    setFieldValidations((prevState: any) =>({
      ...prevState,
      street:isValidField
    }));
  },[]);

  const validationNumberField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      number:isValidField
    }));
  },[]);

  const validationDistrictField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      district:isValidField
    }));
  },[]);

  const validationCityField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      city:isValidField
    }));
  },[]);

  const validationStateField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      state:isValidField
    }));
  },[]);

  const validationResponsableField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      responsible_user:isValidField
    }));
  },[]);

  const validationPhoneField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    setInputPhone(prevState =>({
      ...prevState,
      error:validator.isEmpty(element.target.value)
    }));
    if(!isValidField){
       setState(prevState=>({
      ...prevState,
      phone:element.target.value
    }));
    }
  },[]);

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

  const validationEmailField = useCallback((element) =>{
    const isValidField = validator.isEmpty(element.target.value);
    console.log(isValidField);
    setFieldValidations((prevState: any) =>({
      ...prevState,
      email:isValidField
    }));
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
    if(ModifiCondition()){
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


  return (
    <Sidebar>
      {customerState.loading && <Loading />}
      <Container>
      {customerState.success? (
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
          <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Cliente</FormTitle>
            <FormGroupSection>
              <Grid container>
                <Grid item md={12} xs={12}>
                    <TextField
                      id="input-social-client"
                      label="Nome"
                      variant="outlined"
                      size="small"
                      autoFocus
                      onBlur={(element)=>{
                        setFieldValidations((prevState: any) => ({ ...prevState, name: !validator.isEmpty(element.target.value) }))
                      }
                      }
                      value={state.name}
                      onChange={(element) =>{
                         setFieldValidations((prevState: any) => ({ ...prevState, name: !validator.isEmpty(element.target.value) }));
                        setState({ ...state, name: element.target.value })}}
                      error={!fieldsValidation.name}
                      helperText={!fieldsValidation.name? 'Por Favor, insira um nome válido':null}
                      fullWidth
                    />
                  </Grid>
<<<<<<< HEAD
=======
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-social-name"
                    label="Nome Social"
                    variant="outlined"
                    size="small"
                    value={state.social_name}
                    onChange={(element) => setState({ ...state, social_name: element.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    id="input-fantasy-name"
                    label="Nome Fantasia"
                    variant="outlined"
                    size="small"
                    value={state.fantasy_name}
                    onChange={(element) => setState({ ...state, fantasy_name: element.target.value })}
                    fullWidth
                  />
                </Grid>
>>>>>>> [SOLL-4] Added fields to form

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
                      onBlur={(element)=>{
                        setFieldValidations((prevState: any) => ({ ...prevState, social_name: !validator.isEmpty(element.target.value) }));
                     }}
                      error={!fieldsValidation.social_name}
                      helperText={!fieldsValidation.social_name? 'Por favor insira um nome válido':null}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={5} xs={12}>
                    <InputMask
                      mask="99.999.999/9999-99"
                      value={state.fiscal_number}
                      onChange={(element) =>{
                        setState({ ...state, fiscal_number: element.target.value })

                      }}
                      onBlur={validateCNPJField}
                    >
                      {(inputProps: any) => (
                        <TextField
                          {...inputProps}
                          id="input-fiscal-number"
                          label="CNPJ"
                          variant="outlined"
                          size="small"
                          error={!fieldsValidation.fiscal_number}
                          helperText={!fieldsValidation.fiscal_number ? `CNPJ inválido ou inexistente` : null}
                          // value={state.fiscal_number}
                          // onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                          placeholder="00.000.000/0000-00"
                          fullWidth
                        />)}
                    </InputMask>
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
                      onChange={element => {
                        setState(prev => {
                          return {
                            ...prev,
                            address: {
                              ...prev.address,
                              postal_code: element.target.value
                            }
                          }
                        })
                        setFieldValidations((prevState: any) => ({ ...prevState, postal_code: !validator.isEmpty(element.target.value) }));
                      }}
                      onBlur={getAddress}
                    >
                      {(inputProps: Props) => (
                        <OutlinedInputFiled
                          id="input-postal-code"
                          label="CEP"
                          placeholder="00000-000"
                          error={customerState.errorCep}
                          // helperText={customerState.errorCep ? `CEP inválido` : null}
                          // value={state.address.postal_code}
                          // onChange={element => {
                          //   setState(prev => {
                          //     return {
                          //       ...prev,
                          //       address: {
                          //         ...prev.address,
                          //         postal_code: element.target.value
                          //       }
                          //     }
                          //   })
                          // }}
                          // onBlur={getAddress}
                          endAdornment={
                            <InputAdornment position="end">
                              <SearchOutlined style={{ color: 'var(--primary)' }} />
                            </InputAdornment>
                          }
                        />
                        )}
                    </InputMask>
                    {/* {customerState.errorCep && (
                      <p style={{ color: '#f44336', margin: '4px 4px' }}>
                        CEP inválido
                      </p>
                    )} */}
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
                    }
                  }
                   // onBlur={validationStreetField}

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
                    // error={!fieldsValidation.number}
                    // helperText={!fieldsValidation.number?'Por favor insira uma número válido':null}
                    onChange={(element) =>{
                      setState({ ...state, address: { ...state.address, number: element.target.value } })
                      }}
                    fullWidth
                  />
                </Grid>

                <Grid item md={10} xs={12}>
                  <TextField
                    id="input-address-complement"
                    label="Complemento"
                    variant="outlined"
                    size="small"
                    value={state.address.complement}
                    onChange={(element) => setState({ ...state, address: { ...state.address, complement: element.target.value } })}
                    fullWidth
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    id="input-neighborhood"
                    label="Bairro"
                    variant="outlined"
                    size="small"
                    value={state.address.district}
                   // onBlur={validationDistrictField}
                   // error={!fieldsValidation.district}
                   // helperText={!fieldsValidation.district?'Por favor inserir um bairro válido':null}
                    onChange={(element) =>{ setState({ ...state, address: { ...state.address, district: element.target.value } })
                    //setFieldValidations((prevState: any) => ({ ...prevState, district: !validator.isEmpty(element.target.value) }));
                  }}
                    fullWidth
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
                   // error={fieldsValidation.city}
                   // helperText={fieldsValidation.city?'Por favor insira uma cidade válida':null}
                    onChange={(element) => setState({ ...state, address: { ...state.address, city: element.target.value } })}
                    fullWidth
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
                    }}
                    renderInput={(params) =>
                      <TextField {...params}  label="UF" variant="outlined" size="small"/>
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
<<<<<<< HEAD
              // onBlur={validationResponsableField}
                  error={!fieldsValidation.responsible_user}
                  helperText={!fieldsValidation.responsible_user?'Por Favor insira um resposável':null}
                  onChange={(element) =>{
                  setState({ ...state, responsible_user: element.target.value })
                  setFieldValidations((prevState: any) => ({ ...prevState, responsible_user: !validator.isEmpty(element.target.value) }));} }

=======
                  onChange={(element) => setState({ ...state, responsible_user: element.target.value })}
>>>>>>> [SOLL-4] Added fields to form
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <InputMask
                  mask="(99) 9999-9999"
                  value={inputPhone.value}
                  onChange={(element) =>{
                    setFieldValidations((prevState: any) => ({ ...prevState, phone: !validator.isEmpty(element.target.value) }));
                    setInputPhone({ ...inputPhone, value: element.target.value })}}
                    onBlur={(element)=>{
                      setFieldValidations((prevState: any) => ({ ...prevState, phone: !validator.isEmpty(element.target.value) }));}}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      id="input-cellphone"
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      placeholder="(00) 0000-0000"
                      error={!fieldsValidation.phone}
                      helperText={!fieldsValidation.phone?'Por favor insira um telefone':null}
                      fullWidth
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  id="input-email"
                  label="E-mail"
                  variant="outlined"
                  size="small"
                  value={state.email}
                  onBlur={(element)=>{setFieldValidations((prevState: any) => ({ ...prevState, email: !validator.isEmpty(element.target.value) }));}}
                  error={!fieldsValidation.email}
                  helperText={!fieldsValidation.email?"Por Favor insira um email válido":null}
                  onChange={(element) =>{ setState({ ...state, email: element.target.value })
                  setFieldValidations((prevState: any) => ({ ...prevState, email: !validator.isEmpty(element.target.value) }));}}
                  fullWidth
                />
              </Grid>
                <Grid item md={4} xs={12}>
                  <InputMask
                    mask="(99) 9 9999-9999"
                    value={inputCellPhone.value}
                    onBlur={validationCellPhoneField}
                    onChange={(element) => setInputCellPhone({ ...inputCellPhone, value: element.target.value })}
                  >
                    {(inputProps: any) => (
                      <TextField
                        {...inputProps}
                        id="input-phone"
                        label="Celular"
                        variant="outlined"
                        size="small"
                        placeholder="(00) 0 0000-0000"
                        fullWidth
                      />
                    )}
                  </InputMask>

                </Grid>
                  <Grid style={{ paddingRight:15,paddingTop:10}}>
                    <FormControlLabel  control={ <Switch checked={state.active} color="primary" onChange={(event) => {
                      setState(prevState => ({
                        ...prevState,
                        active: event.target.checked
                      }))}}></Switch>} label="Ativo?"
                     ></FormControlLabel>
                  </Grid>
              </Grid>
            </FormGroupSection>
              <ButtonsContent style={{ paddingRight:15}}>
            <ButtonComponent variant="outlined" background="success_rounded" onClick={() => handleOpenModalCancel()}>
              Voltar
            </ButtonComponent>
            <ButtonComponent variant="contained" background="success" onClick={() => handleSaveFormCustomer()}>
              Salvar
            </ButtonComponent>
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
