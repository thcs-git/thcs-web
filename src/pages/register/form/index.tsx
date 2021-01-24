import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '../../../store';
import { FormTitle, SelectComponent as Select } from '../../../styles/components/Form';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {

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

import { ContainerLogin, WelcomeTextWrapper, HomeIconLogo, LogoText, TextGray } from './styles';
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
import { name } from 'dayjs/locale/*';
import { createUserRequest, registerUserRequest } from '../../../store/ducks/users/actions';
import InputBase from "@material-ui/core/InputBase";
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
const userTypes= ['Usuario', 'Prestador', 'Administrador'];
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
  submit: {
    margin: theme.spacing(3, 0, 2),
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

const SIZE_INPUT_PASSWORD = 3;

export default function RegisterForm() {
  const dispatch = useDispatch();
  //const loginState = useSelector((state: ApplicationState) => state.login);

  const [inputEmail, setInputEmail] = useState({ value: '', error: false });
  const [inputName, setInputName] = useState({value:'',error: false});
  const [inputCpf, setInputCpf] = useState({value:'',error: false});
  const [inputPhone, setInputPhone] = useState({value:'',error: false})
  const [inputPassword, setInputPassword] = useState({ value: '', error: false });
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState({value:'', error:false});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const classes = useStyles();
  const councilState = useSelector((state: ApplicationState) => state.councils);
  const [search, setSearch] = useState('');
  const userState = useSelector((state: ApplicationState) => state.users);
  const specialtyState = useSelector((state: ApplicationState) => state.specialties);
  let [state, setState] = useState<UserInterface>({
    companies: ['5ee65a9b1a550217e4a8c0f4'], //empresa que vai vir do login
    name: '',
    birthdate: '',
    gender: '',
    national_id: '',
    issuing_organ: '',
    fiscal_number: '',
    mother_name: '',
    nationality: '',
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
    phone: '',
    cellphone: '',
    user_type_id: '',
    specialties: [],
    council_number: '',
    active: true,
  });



  useEffect(() => {

    // const expired = localStorage.getItem(LOCALSTORAGE.EXPIRED_SESSION);

    // if (expired) {
    //   localStorage.removeItem(LOCALSTORAGE.EXPIRED_SESSION);
    //   toast.error('Sessão expirada');
    // }
    dispatch(loadRequest());
  }, []);

  const handleFormUser = useCallback(async (event)=>{

 event.preventDefault();

    if (inputEmail.error || inputPassword.error || inputCpf.error || inputName.error || inputPhone.error ) return;
        state.name = inputName.value;
        state.fiscal_number = inputCpf.value;
        state.email = inputEmail.value;
        state.phone = inputPhone.value;
        state.password = inputPassword.value;
        dispatch(registerUserRequest(state));
  },[state]);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();

    if (inputEmail.error || inputPassword.error) return;

   // dispatch(loadRequest({ email: inputEmail.value, password: inputPassword.value }));
  }, [inputPassword, inputEmail]);
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

  return (
    <>
{/* {loginState.loading && <Loading />} */}
      <Container className={classes.container} maxWidth="xs">
        <FormGroupSection>
          <div className={classes.paper}>
          <Box display="flex" width={150} height={165} justifyContent="center" alignItems="center">
            <HomeIconLogo />
          </Box>
          <WelcomeTextWrapper>
            <TextGray>
              Cadastre seus dados no portal:
            </TextGray>
          </WelcomeTextWrapper>
          <form className={classes.form} noValidate>
          <Grid  md={5} xs={12} className={classes.form}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="select-patient-gender">Eu sou</InputLabel>
                <Select
                  labelId="select-user-type"
                  onChange={(element)=>setState({...state,user_type_id:`${element.target.value}`})}
                  labelWidth={60}
                    >
                <MenuItem value="">
                <em>&nbsp;</em>
                </MenuItem>
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
            <Grid className={classes.containerFlex}  >

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
            </Grid>
            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-function"
                label="Função"
                variant="outlined"
                size="small"
                fullWidth
                />
            </Grid>
            <Grid  item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-social-name"
                label="Especialidade"
                variant="outlined"
                size="small"
                fullWidth
                />
            </Grid>
            <Grid  className={classes.containerFlex}>
              <Grid item md={5} xs={12} className={classes.form} >

                <FormControl variant="outlined" size="small" fullWidth >
                  <InputLabel id="select-patient-gender">Conselho</InputLabel>
                    <Select
                      label="Conselho"
                      labelId="select-council-user"
                      id="select-council-user"
                      //value={state.gender}
                      //  onChange={(element) => setState({ ...state, gender: `${element.target.value}` || '' })}
                      >
                      <MenuItem value="">
                        <em>Conselho</em>
                      </MenuItem>
                      {councilState.list.data.map(council => <MenuItem key={`council_${council._id}`} value={council._id}>{council.initials}</MenuItem>)}
                    </Select>
                </FormControl>
              </Grid >
          <Grid item md={5} xs={12} className={classes.form} >
            <FormControl variant="outlined" size="small" fullWidth>
              <TextField
                id="input-social-name"
                label="Nº do Conselho"
                variant="outlined"
                size="small"
                fullWidth
                />
          </FormControl>
          </Grid >
          <Grid item md={4} xs={12} className={classes.formFlex} >
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="select-patient-gender">UF</InputLabel>
                <Select
                label="UF"
                  labelId="select-patient-gender"
                  id="demo-simple-select-filled"
                  //value={state.gender}
                  //  onChange={(element) => setState({ ...state, gender: `${element.target.value}` || '' })}

                    >
                <MenuItem value="">
                <em>UF</em>
                </MenuItem>
                {userTypes.map(usertype => <MenuItem key={`usertype_${usertype}`} value={usertype}>{usertype}</MenuItem>)}
                </Select>
          </FormControl>
          </Grid >
        </Grid>
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

            {/* <FormControl fullWidth margin='normal' variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={inputPassword.value}
                onChange={inputValue => setInputPassword(prev => ({
                  ...prev,
                  value: inputValue.target.value
                }))}
                onBlur={handlePasswordValitor}
                error={inputPassword.error}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl> */}
            {/* <FormControl fullWidth margin='normal' variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirme senha</InputLabel>
              <OutlinedInput

                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={inputPassword.value}
                onChange={inputValue => setInputPassword(prev => ({
                  ...prev,
                  value: inputValue.target.value
                }))}
                onBlur={handlePasswordValitor}
                error={inputPassword.error}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={40}
              />
            </FormControl> */}


            <FormControl>
              <Grid container>
                <Grid className={classes.marginTop}>
<TextGray>Já tem um cadastro? </TextGray>
                </Grid>
<Grid>
<Button value="remember"   color="primary" fullWidth href="/login">clique aqui</Button>
</Grid>

              </Grid>


            </FormControl>
            <Button

              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleFormUser}
            >
              Cadastrar
          </Button>
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
