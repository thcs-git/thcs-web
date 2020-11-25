import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from '../../store/ducks/login/actions';
import { ApplicationState } from '../../store';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
import Snackbar from '@material-ui/core/Snackbar';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { makeStyles } from '@material-ui/core/styles';

import { WelcomeTextWrapper, HomeIconLogo, LogoText, TextGray } from './styles';

// import Button from '../../styles/components/Button';
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';

import validateEmail from '../../utils/validateEmail'

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

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  paper: {
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
    marginTop: theme.spacing(1),
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
}));

const SIZE_INPUT_PASSWORD = 3;

export default function SignIn() {
  const dispatch = useDispatch();
  const loginState = useSelector((state: ApplicationState) => state.login);

  const [inputEmail, setInputEmail] = useState({ value: '', error: false });
  const [inputPassword, setInputPassword] = useState({ value: '', error: false });
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

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
    setInputPassword(prev => ({ ...prev, error:  !(inputPassword.value.length >= SIZE_INPUT_PASSWORD) }));
  }, [inputPassword]);

  return (
    <>
      {loginState.loading && <Loading />}
      <Container className={classes.container} maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <HomeIconLogo />

            <LogoText />
          </Box>

          <WelcomeTextWrapper>
            <TextGray>
              Bem-vindo(a)! Realize seu login para continuar:
            </TextGray>
          </WelcomeTextWrapper>
          <form className={classes.form} noValidate>
            <TextField
              error={inputEmail.error}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="E-mail"
              name="email"
              autoComplete="number"
              autoFocus
              onChange={inputValue => setInputEmail(prev => ({
                ...prev,
                value: inputValue.target.value
              }))}
              onBlur={handleEmailValidator}
            />
            <FormControl fullWidth margin='normal' variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar de mim neste computador"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Entrar
          </Button>
            <Grid container>
              <Box textAlign="center" width="100%">
                <TextGray >
                  Esqueceu a senha? {' '}
                  <Link href="#">
                    Clique aqui{' '}
                  </Link>
                parar recuperar
            </TextGray>
              </Box>
            </Grid>
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
