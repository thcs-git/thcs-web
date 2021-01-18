import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from '../../../store/ducks/login/actions';
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

import { makeStyles } from '@material-ui/core/styles';

import { ContainerLogin, WelcomeTextWrapper, HomeIconLogo, LogoText, TextGray } from './styles';
import {FormGroupSection} from './styles';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Loading from '../../../components/Loading';

import validateEmail from '../../../utils/validateEmail';
import LOCALSTORAGE from '../../../helpers/constants/localStorage';
import { toast } from 'react-toastify';

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
    height: '100%'
  },
  marginTop:{
    marginTop:theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(2,2,0,0),
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

export default function SignIn() {
  const dispatch = useDispatch();
  const loginState = useSelector((state: ApplicationState) => state.login);

  const [inputEmail, setInputEmail] = useState({ value: '', error: false });
  const [inputPassword, setInputPassword] = useState({ value: '', error: false });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const expired = localStorage.getItem(LOCALSTORAGE.EXPIRED_SESSION);

    if (expired) {
      localStorage.removeItem(LOCALSTORAGE.EXPIRED_SESSION);
      toast.error('Sessão expirada');
    }
  }, []);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();

    if (inputEmail.error || inputPassword.error) return;

    dispatch(loadRequest({ email: inputEmail.value, password: inputPassword.value }));
  }, [inputPassword, inputEmail]);

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

  const handlePasswordValitor = useCallback(() => {
    setInputPassword(prev => ({ ...prev, error: !(inputPassword.value.length >= SIZE_INPUT_PASSWORD) }));
  }, [inputPassword]);

  return (
    <>
      {loginState.loading && <Loading />}
      <Container className={classes.container} maxWidth="sm">
        <CssBaseline />
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
          <Grid item md={5} xs={12}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="select-patient-gender">Eu sou</InputLabel>
                <Select
                  labelId="select-patient-gender"
                  id="demo-simple-select-filled"
                  //value={state.gender}
                  //  onChange={(element) => setState({ ...state, gender: `${element.target.value}` || '' })}
                  labelWidth={40}
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
                id="input-social-name"
                label="Nome do usuário"
                variant="outlined"
                size="small"
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
                />
            </FormControl>
            </Grid>
            <Grid container >

              <Grid item md={6} xs={12} className={classes.form}>
                <FormControl variant="outlined" size="small" fullWidth>
                <TextField
                  id="input-fiscal-number"
                  label="CPF"
                  variant="outlined"
                  size="small"
                  //value={state.fiscal_number}
                  // onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                  placeholder="000.000.000-00"
                  fullWidth

                />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} className={classes.form}>
              <FormControl variant="outlined" size="small" fullWidth>
                <TextField
                  id="input-phone"
                  label="Telefone"
                  variant="outlined"
                  size="small"
                  //value={state.phone}
                  //onChange={(element) => setState({ ...state, phone: element.target.value })}
                  placeholder="0000-0000"
                  fullWidth
                />
                </FormControl>
              </Grid>

          </Grid>

            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-social-name"
                label="Email"
                variant="outlined"
                size="small"
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
                />
            </Grid>
            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-social-name"
                label="Função"
                variant="outlined"
                size="small"
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
                />
            </Grid>
            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-social-name"
                label="Especialidade"
                variant="outlined"
                size="small"
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
                />
            </Grid>
            <Grid container>
            <Grid item md={5} xs={12} className={classes.form}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="select-patient-gender">Conselho</InputLabel>
                <Select
                  labelId="select-patient-gender"
                  id="demo-simple-select-filled"
                  //value={state.gender}
                  //  onChange={(element) => setState({ ...state, gender: `${element.target.value}` || '' })}

                    >
                <MenuItem value="">
                <em>&nbsp;</em>
                </MenuItem>
                {userTypes.map(usertype => <MenuItem key={`usertype_${usertype}`} value={usertype}>{usertype}</MenuItem>)}
                </Select>
          </FormControl>
          </Grid >
          <Grid item md={5} xs={12} className={classes.form}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="select-patient-gender">Nº do Conselho</InputLabel>
                <Select
                  labelId="select-patient-gender"
                  id="demo-simple-select-filled"
                  //value={state.gender}
                  //  onChange={(element) => setState({ ...state, gender: `${element.target.value}` || '' })}

                    >
                <MenuItem value="">
                <em>&nbsp;</em>
                </MenuItem>
                {userTypes.map(usertype => <MenuItem key={`usertype_${usertype}`} value={usertype}>{usertype}</MenuItem>)}
                </Select>
          </FormControl>
          </Grid >
          <Grid item md={2} xs={12} className={classes.form}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="select-patient-gender">UF</InputLabel>
                <Select
                  labelId="select-patient-gender"
                  id="demo-simple-select-filled"
                  //value={state.gender}
                  //  onChange={(element) => setState({ ...state, gender: `${element.target.value}` || '' })}

                    >
                <MenuItem value="">
                <em>&nbsp;</em>
                </MenuItem>
                {userTypes.map(usertype => <MenuItem key={`usertype_${usertype}`} value={usertype}>{usertype}</MenuItem>)}
                </Select>
          </FormControl>
          </Grid >
        </Grid>
        <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-social-name"
                label="Senha"
                variant="outlined"
                size="small"
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
                />
            </Grid>
            <Grid container item md={12} xs={12} className={classes.form}>
              <TextField
                id="input-social-name"
                label="Confirmar Senha"
                variant="outlined"
                size="small"
                 // value={state.name}
                //  onChange={(element) => setState({ ...state, name: element.target.value })}
                fullWidth
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
<Button value="remember"   color="primary"fullWidth >clique aqui</Button>
</Grid>

              </Grid>


            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
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
