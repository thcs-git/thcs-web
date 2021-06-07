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
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Switch,
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
//import validateCpf from '../../../utils/validateCpf';
import validatePhone from '../../../utils/validatePhone';
import validateEmpty from '../../../utils/validateEmpty';
import LOCALSTORAGE from '../../../helpers/constants/localStorage';
import { toast } from 'react-toastify';
import { ProfessionUserInterface, UserInterface } from '../../../store/ducks/users/types';
import { loadRequest as getCouncilsAction } from "../../../store/ducks/councils/actions";
import { loadRequest as getSpecialtiesAction } from "../../../store/ducks/specialties/actions";
import { createUnconfirmedUserRequest, registerUnconfirmedUserRequest } from '../../../store/ducks/unconfirmeduser/actions';
import InputBase from "@material-ui/core/InputBase";
import { UnconfirmedUserInterface } from '../../../store/ducks/unconfirmeduser/types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { validateCPF  } from '../../../helpers/validateCNPJ';
import { validate } from '@material-ui/pickers';
import id from 'date-fns/esm/locale/id/index.js';
import { createUserRequest,cleanAction } from '../../../store/ducks/users/actions';
import FeedbackComponent from '../../../components/Feedback';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

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
  const [userSelectType, setUserSelectType] = useState({value:'Outros'});


////////// form verify variables //////////////

  const [state, setState] = useState<UserInterface>({
    companies: [],
    name: "",
    birthdate: "",
    gender: "",
    national_id: "",
    issuing_organ: "",
    fiscal_number: "",
    mother_name: "",
    nationality: "",
    address: {
      postal_code: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      complement: "",
    },
    email: "",
    phone: "",
    cellphone: "",
    user_type_id: "",
    specialties: [],
    council_state: "",
    council_number: "",
    verified:"false",
    customer_id:'',
    password:"",
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
    console.log("rodei");
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
      setState(prev=>({
        ...prev,
        name:inputName.value
      }))

    }
  },[inputName,state]);

  const handleCpfValidator = useCallback(()=>{
    console.log("rodei");
    if(validateCPF(inputCpf.value)){
      setInputCpf(prev=>({
        ...prev,
        error:false
      }))
      setState(prev=>({
        ...prev,
        fiscal_number:inputCpf.value
      }))
    }else{
      setInputCpf(prev=>({
        ...prev,
        error:true
      }))
    }
  },[inputCpf]);

  const handlePhoneValidator = useCallback(()=>{
    console.log("rodei");
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
      setState(prev=>({
        ...prev,
        phone:inputPhone.value
      }))
    }
  },[inputPhone]);

  const handleProfessionValidator = useCallback(() => {
      if(validateEmpty(inputProfession.value)){
         setInputProf(prev =>({
        ...prev,
        error:true
      }))
      }else{
           setInputProf(prev=>({
        ...prev,
        error:false
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
      setState(prev=>({
        ...prev,
        email:inputEmail.value
      }))
    }
  }, [inputEmail]);

  const handleSpecialtyValidator = useCallback(() => {
    if (validateEmpty(inputSpecialty.value)) {
      setInputSpecialty(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputSpecialty(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputSpecialty]);

  const handleConcilValidator = useCallback(() => {
    console.log(validateEmpty(inputConcil.value))
    if (!validateEmpty(inputConcil.value)) {
      setInputConcil(prev => ({
        ...prev,
        error: false
      }))
    } else {
      setInputConcil(prev => ({
        ...prev,
        error: true
      }))
    }
  }, [inputConcil]);

  const handleNumberConcilValidator = useCallback(() => {
    if (validateEmpty(inputNumberConcil.value)) {
      setInputNumberConcil(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputNumberConcil(prev => ({
        ...prev,
        error: false
      }))
      setState(prev=>({
        ...prev,
        council_number:inputNumberConcil.value
      }))
    }
  }, [inputNumberConcil]);

  const handleStateValidator = useCallback(() => {
    if (validateEmpty(inputUf.value)) {
      setInputUf(prev => ({
        ...prev,
        error: true
      }))
    } else {
      setInputUf(prev => ({
        ...prev,
        error: false
      }))
    }
  }, [inputUf]);

  function handleSelectProfession(value: ProfessionUserInterface){
    if(value){
       setState((prevState)=>({
      ...prevState,
      profession_id: value._id
    }));
    setInputProf(prev=>({
      ...prev,
      value:value.name
    }))
    }else{
        setInputProf(prev=>({
      ...prev,
      value:''
    }))
    }
  }

  function handleSelectSpecialty(value:any){
    if(value){
      setState((prevState)=>({
        ...prevState,
        specialties:[...state.specialties,value._id]
      }));
      setInputSpecialty(prev=>({
        ...prev,
        value:value.name
      }));
    }
  }

  function handleSelectConcil(value:any){
    if(value){
      setState((prevState)=>({
        ...prevState,
        council_id:value._id
      }));
      setInputConcil(prev=>({
        ...prev,
        value:value.name
      }))
    }else{
      setInputConcil(prev=>({
        ...prev,
        value:''
      }))
    }
  }

  function handleSelectUf(value:any){
    console.log(value)
    if(value){
      setState((prevState)=>({
        ...prevState,
        council_state:value.sigla
      }));
      setInputUf(prev=>({
        ...prev,
        value:value.sigla
      }))
    }else{
      setInputUf(prev=>({
        ...prev,
        value:''
      }))
    }
  }


  const handlePasswordConfirm = useCallback(()=>{
    if(inputPasswordConfirm.value && inputPassword.value == inputPasswordConfirm.value){
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
  },[inputPasswordConfirm, inputPassword]);

  const handlePasswordValitor = useCallback(() => {
    setInputPassword(prev => ({ ...prev,
      error: !((inputPassword.value.length >= SIZE_INPUT_PASSWORD) && (inputPasswordConfirm.value && inputPassword.value === inputPasswordConfirm.value))}));


  }, [inputPassword,inputPasswordConfirm]);

////////// form verify functions /////////////////
const  handleFormUser = useCallback(()=>{

  handleNameValidator();
  handleEmailValidator();
  handlePhoneValidator();
  handleProfessionValidator();
  handlePasswordValitor();
  handleConcilValidator();
  handleCpfValidator();
  handleSpecialtyValidator();
  handleStateValidator();
  handleNumberConcilValidator();

  switch(userSelectType.value){

  case "Administrativo":

    if(inputName.error || inputEmail.error || inputCpf.error || inputPhone.error || inputProfession.error){
      return;
    }else{
         console.log(state);
         dispatch(createUserRequest(state));
        // history.push(`/${state.email}/confirmEmail`);

      }

    break;

  case "Saúde":
    if(inputEmail.error || inputPassword.error || inputCpf.error || inputName.error || inputPhone.error || inputProfession.error
      || inputConcil.error || inputNumberConcil.error || inputSpecialty.error || inputUf.error){
        console.log(state);
        return;
    }else{
      console.log(state);
     // dispatch(createUserRequest(state));
    }

    break;
  case "Outros":
      if(inputEmail.error || inputPassword.error || inputCpf.error || inputName.error || inputPhone.error){
          console.log(state);
          return;
      }else{
        console.log(state);
        dispatch(createUserRequest(state));
      }

      break;
}
},[state]);


  return (

    <>

      {userState.loading && <Loading />}
      <Container className={classes.container} maxWidth="xs">
         {userState.success ? (
           history.push(`/${userState.data.email}/confirmEmail`)

      ) : (    <FormGroupSection>
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
                  onChange={(element)=>setUserSelectType({value:`${element.target.value}`})}
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
                autoFocus
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
                    element=>setInputCpf(prev=>({
                      ...prev,
                      value:element.target.value
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
                    element=>setInputPhone(prev=>({
                      ...prev,
                      value:element.target.value
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
                  element=>setInputEmail(prev=>({
                    ...prev,
                    value:element.target.value
                  }))
                }
                onBlur={handleEmailValidator}
                />
            </Grid >
                <Collapse in={(userSelectType.value == "Administrativo" || userSelectType.value == "Saúde")}>
                  <Grid container item md={12} xs={12} className={classes.form}>
                    <Autocomplete
                      id="combo-box-profession"
                      options={professions.list.data || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} error={inputProfession.error} label="Função" variant="outlined"
                      onBlur={handleProfessionValidator}
                    />}
                   // getOptionSelected={(option, value) => option._id === state?.profession_id}
                      //value={selectProfession()}
                      onChange={(event, value) => {
                        if(value){
                          handleSelectProfession(value)
                        }else{
                          setInputProf(prev=>({
                            ...prev,
                            value:''
                          }))
                        }
                        handleProfessionValidator();
                      }}
                      size="small"
                      fullWidth
                          />

                  </Grid>
                </Collapse>
                <Collapse in={userSelectType.value == 'Saúde'}>
                  <Grid item md={12} xs={12} className={classes.form}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <Autocomplete
                        id="combo-box-council"
                        options={specialtyState.list.data}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) =>
                        <TextField {...params} label="Especialidade" variant="outlined"
                        error={inputSpecialty.error}
                        onBlur={handleSpecialtyValidator}/>}
                        getOptionSelected={(option, value) =>
                        option._id === state?.council_id?._id
                        }
                        onChange={(event, value:any) => {
                          if(value){
                            handleSelectSpecialty(value);
                          }else{
                            setInputSpecialty(prev=>({
                              ...prev,
                              value:''
                            }));

                          }
                          handleSpecialtyValidator();
                        }}
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
                      renderInput={(params) => <TextField {...params} label="Conselho" variant="outlined"
                      error={inputConcil.error}
                      onBlur={handleConcilValidator} />}
                      getOptionSelected={(option, value) =>
                        option._id === state?.council_id?._id
                      }
                      onChange={(event: any, value:any) => {
                        if(value){
                          handleSelectConcil(value);
                        }else{
                          setInputConcil(prev=>({
                            ...prev,
                            value:''
                          }));

                        }
                        handleConcilValidator();
                       }}
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
                        value={inputNumberConcil.value}
                        error={inputNumberConcil.error}
                        onChange={element=>
                           setInputNumberConcil(prev =>({
                             ...prev,
                             value:element.target.value
                           }))
                        }
                        onBlur={handleNumberConcilValidator}
                        fullWidth />
                    </FormControl>
                  </Grid>
                  <Grid item md={4} xs={12} className={classes.formFlexEnd}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <Autocomplete
                        id="combo-box-neigthborhoods-states"
                        options={States || []}
                        getOptionLabel={(option) => option.sigla}
                        renderInput={(params) => <TextField   {...params} error={inputUf.error} autoFocus  label="UF" variant="outlined"
                        onBlur={handleStateValidator}
                      //helperText={inputState.error && "Selecione um estado válido"}
                        />}
                        onChange={(event,value:any) => {
                          if(value){
                            handleSelectUf(value);

                          }else{
                             setInputUf(prev=>({
                               ...prev,
                               value:''
                             }));

                              }
                            handleStateValidator();
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
                type={showPassword ? 'text' : 'password'}
                id="input-password"
                label="Senha"
                variant="outlined"
                size="small"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={
                  element=>setInputPassword(prev=>({
                    ...prev,
                    value:element.target.value
                  }))
                }
                onBlur={handlePasswordValitor}
                fullWidth
                />
            </Grid>
            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                type={showPassword ? 'text' : 'password'}
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
                fullWidth
                onBlur={handlePasswordValitor}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
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
)}


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
