import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { SelectComponent as Select } from '../../../styles/components/Form';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { loadRequest, searchRequest } from '../../../store/ducks/councils/actions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { loadRequest as getProfessions } from '../../../store/ducks/professions/actions';
import { ContainerLogin, WelcomeTextWrapper, HomeIconLogo, LogoText, TextGray, TextBlue } from './styles';
import {FormGroupSection} from './styles';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Loading from '../../../components/Loading';
import validateEmail from '../../../utils/validateEmail';
import validateName from '../../../utils/validateName';
import validateCpf from '../../../utils/validateCpf';
import validatePhone from '../../../utils/validatePhone';
import LOCALSTORAGE from '../../../helpers/constants/localStorage';
import { toast } from 'react-toastify';
import { UserInterface } from '../../../store/ducks/users/types';
import { loadRequest as getCouncilsAction } from "../../../store/ducks/councils/actions";
import { CouncilInterface } from "../../../store/ducks/councils/types";
import { loadRequest as getSpecialtiesAction } from "../../../store/ducks/specialties/actions";
import { SpecialtyInterface } from "../../../store/ducks/specialties/types";
import { createUnconfirmedUserRequest, registerUnconfirmedUserRequest } from '../../../store/ducks/unconfirmeduser/actions';
import InputBase from "@material-ui/core/InputBase";
import { UnconfirmedUserInterface } from '../../../store/ducks/unconfirmeduser/types';
import Autocomplete from '@material-ui/lab/Autocomplete';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Sollar
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}



///////// Page Style ///////////////
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  marginTop:{
    marginTop:theme.spacing(1),
  },
  containerFlex:{
      display:'flex',
      flexDirection:'row',
      justifyContent:"space-between",
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(2,1,0,1)
  },
  formFlex: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(2,1,0,1),
    margin: theme.spacing(0,0,0,0)
  },
  formFlexStart:{
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(2,0,0,1),
    margin: theme.spacing(0,0,0,0)
  },
  formFlexEnd:{
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(2,0,0,1),
    margin: theme.spacing(0,1,0,0)
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    padding: '10px',
    textTransform: 'capitalize',
    fontSize: '18px',
    backgroundColor: 'var(--success)',
    '&:hover': {
      backgroundColor: 'var(--success-hover)'
    }
  },
  register:{
    margin: theme.spacing(1, 0, 2),
    padding: '10px',
    textTransform: 'capitalize',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: 'var(--success-hover)'
    },
    borderColor:'var(--success)'
  }
}));
///////// Page Style ///////////////

///////// Auxiliary Variables //////
const userTypes= ['Saúde', 'Administrativo', 'Outros'];
const SIZE_INPUT_PASSWORD = 3;
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
///////// Auxiliary Variables //////

export default function RegisterForm() {
  const dispatch = useDispatch();
  const classes = useStyles();

////////// initial states //////////////
  const userState = useSelector((state: ApplicationState) => state.users);
  const professions = useSelector((state:ApplicationState)=> state.profession);
  const specialtyState = useSelector((state: ApplicationState) => state.specialties);
  const councilState = useSelector((state: ApplicationState) => state.councils);
////////// initial states //////////////

////////// form verify variables //////////////
  const [inputEmail, setInputEmail] = useState({ value: '', error: false });
  const [inputName, setInputName] = useState({value:'',error: false});
  const [inputCpf, setInputCpf] = useState({value:'',error: false});
  const [inputPhone, setInputPhone] = useState({value:'',error: false})
  const [inputConcil, setInputConcil] = useState({value:'',error:false});
  const [inputSpecialty, setInputSpecialty] = useState({value:'',error:false});
  const [inputUf, setInputUf] = useState({value:'',error:false});
  const [inputNumberConcil, setInputNumberConcil] = useState({value:'',error:false});
  const [inputProfession, setInputProf] = useState({value:'',error:false});
  const [inputPassword, setInputPassword] = useState({ value: '', error: false });
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState({value:'', error:false});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
////////// form verify variables //////////////

  let [state, setState] = useState<UnconfirmedUserInterface>({
    name: '',
    email: '',
    phone: '',
    user_type: '',
    specialties: [],
    council_number: '',
    unit_federative:'',
    active: true,
  });


///////// initial requests ////////////
  useEffect(() => {
    dispatch(getCouncilsAction());
    dispatch(loadRequest());
    dispatch(getSpecialtiesAction());
    dispatch(getProfessions());
  }, []);

///////// initial requests ////////////

  function  handleFormUser(){
    state.name = inputName.value;
    state.email = inputEmail.value;
    state.phone = inputPhone.value;
    state.password = inputPassword.value;
    dispatch(createUnconfirmedUserRequest(state));
  }
  // const handleFormUser = useCallback(()=>{

   // event.preventDefault();

    // if (inputEmail.error || inputPassword.error || inputCpf.error || inputName.error || inputPhone.error ) return;
        // state.name = inputName.value;
        // state.email = inputEmail.value;
        // state.phone = inputPhone.value;
        // state.password = inputPassword.value;
        // dispatch(createUnconfirmedUserRequest(state));
  // },[state]);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    if (inputEmail.error || inputPassword.error) return;
   // dispatch(loadRequest({ email: inputEmail.value, password: inputPassword.value }));
  }, [inputPassword, inputEmail]);

  ////////// form verify functions /////////////////

  const handleNameValidator = useCallback(()=>{
    if(!validateName(inputName.value)){
      setInputName(prev=>({
        ...prev,
        error:true
      }));
    }else{
      setInputName(prev=>({
        ...prev,
        error:false
      }))
    }
  },[inputName,state]);
  const handleCpfValidator = useCallback(()=>{
    if(!validateCpf(inputCpf.value)){
      setInputCpf(prev=>({
        ...prev,
        error:true
      }))

    }else{
      setInputCpf(prev=>({
        ...prev,
        error:false
      }))
    }
  },[inputCpf]);

  const handlePhoneValidator = useCallback(()=>{
    if(!validatePhone(inputPhone.value)){
      setInputPhone(prev=>({
        ...prev,
        error:true
      }))
    }else{
      setInputPhone(prev=>({
        ...prev,
        error:false
      }))
    }
  },[inputPhone]);

  const handleProfessionValidator = useCallback(() => {
    if (!inputProfession.value)) {
      setInputProf(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputProf(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputProfession]);

  const handleEmailValidator = useCallback(() => {
    if (!validateEmail(inputEmail.value)) {
      setInputEmail(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputEmail(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputEmail]);
  const handleEmailValidator = useCallback(() => {
    if (!validateEmail(inputEmail.value)) {
      setInputEmail(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputEmail(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputEmail]);
  const handleEmailValidator = useCallback(() => {
    if (!validateEmail(inputEmail.value)) {
      setInputEmail(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputEmail(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputEmail]);
  const handleEmailValidator = useCallback(() => {
    if (!validateEmail(inputEmail.value)) {
      setInputEmail(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputEmail(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputEmail]);
  const handleEmailValidator = useCallback(() => {
    if (!validateEmail(inputEmail.value)) {
      setInputEmail(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputEmail(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputEmail]);

  const handlePasswordConfirm = useCallback(()=>{
    if(inputPasswordConfirm.value){
      setInputPasswordConfirm(prev=>({
        ...prev,
        error:true
      }))
    }else{
      setInputPasswordConfirm(prev=>({
        ...prev,
        error:false
      }))
    }
  },[inputPasswordConfirm]);

  const handlePasswordValitor = useCallback(() => {
    setInputPassword(prev => ({ ...prev, error: !((inputPassword.value.length >= SIZE_INPUT_PASSWORD) && (inputPasswordConfirm.value && inputPassword.value === inputPasswordConfirm.value))}));
  }, [inputPassword,inputPasswordConfirm]);

////////// form verify functions /////////////////


  return (
    <>
      {userState.loading && <Loading />}
      <Container className={classes.container} maxWidth="xs">
        <FormGroupSection>
          <div className={classes.paper}>
          <Box display="flex" width={150} height={165} justifyContent="center" alignItems="center">
            <HomeIconLogo />
          </Box>


          <form className={classes.form} noValidate>
            <WelcomeTextWrapper className={classes.formFlexEnd}>
            <TextGray>
              Cadastre seus dados no portal:
            </TextGray>
          </WelcomeTextWrapper>
          <Grid  md={6} xs={12} className={classes.formFlexEnd}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="select-patient-gender">Eu sou</InputLabel>
                <Select
                  labelId="select-user-type"
                  onChange={(element)=>setState({...state,user_type:`${element.target.value}`})}
                  labelWidth={60}
                    >

                {userTypes.map(usertype => <MenuItem key={`usertype_${usertype}`} value={usertype}>{usertype}</MenuItem>)}
                </Select>
            </FormControl>
          </Grid>
          <Grid container item md={12} xs={12} className={classes.form}>
            <FormControl variant="outlined" size="small" fullWidth>
              <TextField
              error={inputName.error}
                id="input-social-name"
                label="Nome do usuário"
                variant="outlined"
                size="small"
                value={inputName.value}
                required
                fullWidth
                onChange={
                  (inputName)=>setInputName(prev=>({
                    ...prev,
                    value:inputName.target.value
                  }))

                }

                onBlur={handleNameValidator}
                />
            </FormControl>
          </Grid>
          <Grid className={classes.containerFlex}>
              <Grid item md={6} xs={12} className={classes.form}>
                <FormControl variant="outlined" fullWidth>
                <TextField
                error={inputCpf.error}
                  id="input-fiscal-number"
                  label="CPF"
                  variant="outlined"
                  size="small"
                  required
                  placeholder="000.000.000-00"
                  fullWidth
                  onChange={
                    inputCpf=>setInputCpf(prev=>({
                      ...prev,
                      value:inputCpf.target.value
                    }))
                  }
                  onBlur={handleCpfValidator}

                />
                </FormControl>
            </Grid>
              <Grid item md={6} xs={12}  className={classes.form}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                error={inputPhone.error}
                  id="input-phone-number"
                  label="Telefone"
                  variant="outlined"
                  size="small"
                  required
                  placeholder="(00) 0000-0000"
                  fullWidth
                  onChange={
                    inputPhone=>setInputPhone(prev=>({
                      ...prev,
                      value:inputPhone.target.value
                    }))
                  }
                  onBlur={handlePhoneValidator}
                />
                </FormControl>
              </Grid>
          </Grid>

            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
              error={inputEmail.error}
                id="input-email"
                label="Email"
                variant="outlined"
                size="small"
                required
                fullWidth
                onChange={
                  inputEmail=>setInputEmail(prev=>({
                    ...prev,
                    value:inputEmail.target.value
                  }))
                }
                onBlur={handleEmailValidator}
                />
            </Grid >
                <Collapse in={(state.user_type == "Administrativo" || state.user_type == "Saúde")}>
                  <Grid container item md={12} xs={12} className={classes.form}>
                    <Autocomplete
                      id="combo-box-profession"
                      options={professions.list.data || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params}  label="Função" variant="outlined" />}
                   // getOptionSelected={(option, value) => option._id === state?.profession_id}
                   // value={selectProfession()}
                      onChange={(event, value) => {
                        if (value) {
                      //    handleSelectProfession(value);
                          }
                      }}
                      size="small"
                      fullWidth
                          />

                  </Grid>
                </Collapse>
                <Collapse in={state.user_type == 'Saúde'}>
                  <Grid item md={12} xs={12} className={classes.form}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <Autocomplete
                        id="combo-box-council"
                        options={specialtyState.list.data}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) =>
                        <TextField {...params} label="Especialidade" variant="outlined" />}
                     // value={selectCouncil()}
                        getOptionSelected={(option, value) =>
                        option._id === state?.council_id?._id
                        }
                      // onChange={(event: any, newValue) => {
                      //   handleCouncil(event, newValue);
                      //   setFieldValidations((prevState: any) => ({
                      //     ...prevState,
                      //     council_id: newValue !== null,
                      //   }));
                      // }}
                      size="small"
                      autoComplete={false}
                      autoHighlight={false}
                      fullWidth
                      />
                  </FormControl>
                </Grid>
                <Grid container item md={12} xs={12} className={classes.form}>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <Autocomplete
                      id="combo-box-council"
                      options={councilState.list.data}
                      getOptionLabel={(option) => `${option.initials} - ${option.name}`}
                      renderInput={(params) => <TextField {...params} label="Conselho" variant="outlined" />}
                     // value={selectCouncil()}
                      getOptionSelected={(option, value) =>
                        option._id === state?.council_id?._id
                      }
                      // onChange={(event: any, newValue) => {
                      //   handleCouncil(event, newValue);
                      //   setFieldValidations((prevState: any) => ({
                      //     ...prevState,
                      //     council_id: newValue !== null,
                      //   }));
                      // }}
                      size="small"
                      autoComplete={false}
                      autoHighlight={false}
                      fullWidth
                      />
                  </FormControl>
                </Grid>
                <Grid className={classes.containerFlex}>
                  <Grid item md={8} xs={12} className={classes.formFlex}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <TextField
                        id="input-social-name"
                        label="Nº do Conselho"
                        variant="outlined"
                        size="small"
                        fullWidth />
                    </FormControl>
                  </Grid>
                  <Grid item md={4} xs={12} className={classes.formFlexEnd}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <Autocomplete
                        id="combo-box-neigthborhoods-states"
                        options={States || []}
                        getOptionLabel={(option) => option.sigla}
                        renderInput={(params) => <TextField   {...params}  autoFocus  label="UF" variant="outlined"
                      //onBlur={handleStateValidator}
                      //helperText={inputState.error && "Selecione um estado válido"}
                        />}
                        onChange={(event,value:any) => {
                          if(value){
                            //handleStates(value);
                            // load = true;
                          }else{
                            // setInputState(prev=>({
                            //   ...prev,
                            //   value:''
                            // }));
                          // handleStateValidator
                              }
                            }}
                        size="small"
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                </Grid>
            </Collapse>



            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                error={inputPassword.error}
                id="input-password"
                label="Senha"
                variant="outlined"
                size="small"
                required
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
                onChange={
                  inputPassword=>setInputPassword(prev=>({
                    ...prev,
                    value:inputPassword.target.value
                  }))
                }
                onBlur={handlePasswordValitor}
                />
            </Grid>
            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-password-confirm"
                label="Confirmar Senha"
                variant="outlined"
                size="small"
                required
                onChange={
                  inputPasswordConfirm=>setInputPasswordConfirm(prev=>({
                    ...prev,
                    value:inputPasswordConfirm.target.value
                  }))
                }
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
                onBlur={handlePasswordValitor}
                />
            </Grid>

          <Grid container className={classes.form}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleFormUser()}
            >
              Cadastrar
          </Button>
              <Box textAlign="center" width="100%" className={classes.form}>
                <TextGray >
                  Já tem um cadastro? {' '}
                  <Link href="/login">
                    <TextBlue>
                      Clique aqui{' '}
                    </TextBlue>
                  </Link>
            </TextGray>
              </Box>
            </Grid>
            {/* <Grid container>
              <Box textAlign="center" width="100%">
                <TextGray >
                  Esqueceu a senha? {' '}
                  <Link href="#">
                    Clique aqui{' '}
                  </Link>
                parar recuperar
            </TextGray>
              </Box>
            </Grid> */}
          </form>
        </div>
        </FormGroupSection>

        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      {/* <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={loginState.error}
        key={'login_error'}
      >
        <Alert severity="error">
          E-mail e/ou senha inválida
        </Alert>
      </Snackbar> */}
    </>
  );
}
