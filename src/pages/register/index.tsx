import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';


import { loadRequest as getCouncilsAction } from '../../store/ducks/councils/actions';
import { loadRequest } from '../../store/ducks/login/actions';
import { ApplicationState } from '../../store';

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

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { makeStyles } from '@material-ui/core/styles';

import { ContainerLogin, WelcomeTextWrapper, HomeIconLogo, LogoText, TextGray } from '../login/styles';

import Button from '../../styles/components/Button';
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';

import validateEmail from '../../utils/validateEmail';
import LOCALSTORAGE from '../../helpers/constants/localStorage';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import { SpecialtyInterface } from '../../store/ducks/specialties/types';

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
    marginTop: theme.spacing(1),
  },
  create_account: {
    marginBottom: '14px',
    '&:hover': {
      background: '#f7f7f7',
      fontWeight: 'bold',
      transition: '300ms',
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '10px',
    textTransform: 'capitalize',
    fontSize: '18px',
    backgroundColor: 'var(--success)',
    '&:hover': {
      backgroundColor: '#4fc66ae3',
      fontWeight: 'bold',
      transition: '300ms',
    }
  },
}));

const SIZE_INPUT_PASSWORD = 3;

export default function Register(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginState = useSelector((state: ApplicationState) => state.login);
  const councilState = useSelector((state: ApplicationState) => state.councils);

  const [inputEmail, setInputEmail] = useState({ value: '', error: false });
  const [inputPassword, setInputPassword] = useState({ value: '', error: false });
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const [state, setState] = useState<SpecialtyInterface>({
    _id: props.match.params.id || '',
    name: '',
    describe: '',
    council_id: { _id: '', name: '' },
    active: true
  });

  useEffect(() => {
    dispatch(getCouncilsAction());

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

  const selectCouncil = useCallback(() => {
    const selected = councilState.list.data.filter(item => item._id === state.council_id._id);
    return (selected[0]) ? selected[0] : null;
  }, [state.council_id]);

  const handleCouncil = useCallback((event: any, newValue: any) => {
    setState(prevState => ({
      ...prevState,
      council_id: newValue,
    }));

  }, [state.council_id]);

  return (
    <>
      {loginState.loading && <Loading />}
      <Container className={classes.container} maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Box display="flex" width={150} height={165} justifyContent="center" alignItems="center">
            <HomeIconLogo />
          </Box>

          <WelcomeTextWrapper>
            <TextGray>
              Cadastre seus dados no Portal:
            </TextGray>
          </WelcomeTextWrapper>
          <form className={classes.form} noValidate>
            <TextField
              error={inputEmail.error}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              label="Nome completo"
              name="name"
              onChange={inputValue => setInputEmail(prev => ({
                ...prev,
                value: inputValue.target.value
              }))}
              onBlur={handleEmailValidator}
            />
            <Grid container justify="space-between" style={{ marginTop: '4px' }}>
              <Grid item md={6} xs={12} style={{ paddingRight: '5px' }}>
                <InputMask
                  mask="999.999.999-99"
                  // value={state.fiscal_number}
                  // onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      id="input-fiscal-number"
                      label="CPF"
                      variant="outlined"
                      size="small"
                      required
                      // value={state.fiscal_number}
                      // onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                      placeholder="000.000.000-00"
                      fullWidth
                    />)}
                </InputMask>
              </Grid>
              <Grid item md={6} xs={12} style={{ paddingLeft: '5px' }}>
                <InputMask
                  mask="(99) 9999-9999"
                  // value={state.phones[0]?.number}
                  // onChange={(element) => {
                  //   setState(prevState => ({
                  //     ...prevState,
                  //     phones: [{
                  //       ...prevState.phones[0],
                  //       number: element.target.value
                  //     }]
                  //   }));
                  // }}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      id="input-phone"
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      required
                      // value={state.phones?.number}
                      // onChange={(element) => setState({ ...state, phones: { ...state.phones, number: element.target.value } })}
                      placeholder="(00) 0000-0000"
                      fullWidth
                    />
                  )}
                </InputMask>
              </Grid>
            </Grid>
            <TextField
              error={inputEmail.error}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              label="E-mail"
              name="email"
              autoComplete="email"
              onChange={inputValue => setInputEmail(prev => ({
                ...prev,
                value: inputValue.target.value
              }))}
              onBlur={handleEmailValidator}
            />
            <TextField
              style={{ marginTop: 3 }}
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              label="Função"
              name="function"
              // onChange={inputValue => setInputEmail(prev => ({
              //   ...prev,
              //   value: inputValue.target.value
              // }))}
              // onBlur={handleEmailValidator}
            />
            <TextField
              style={{ marginTop: 3 }}
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              label="Especialidade"
              name="speciality"
              // onChange={inputValue => setInputEmail(prev => ({
              //   ...prev,
              //   value: inputValue.target.value
              // }))}
              // onBlur={handleEmailValidator}
            />
            <Grid container justify="space-between" style={{ marginTop: '4px' }}>
              <Grid item md={5} xs={12} style={{ paddingRight: '5px' }}>
                <Autocomplete
                    id="combo-box-council"
                    options={councilState.list.data}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Conselho" variant="outlined" />}
                    value={selectCouncil()}
                    getOptionSelected={(option, value) => option._id === state.council_id._id}
                    onChange={(event: any, newValue) => {
                      handleCouncil(event, newValue);
                    }}
                    size="small"
                    fullWidth
                  />
                {/* <TextField
                    id="input-phone"
                    label="Conselho"
                    variant="outlined"
                    size="small"
                    required
                    // value={state.phones?.number}
                    // onChange={(element) => setState({ ...state, phones: { ...state.phones, number: element.target.value } })}                    fullWidth
                  /> */}
              </Grid>
              <Grid item md={5} xs={12} style={{ paddingLeft: '5px' }}>
                <TextField
                  id="input-phone"
                  label="N.º do Conselho"
                  variant="outlined"
                  size="small"
                  required
                  // value={state.phones?.number}
                  // onChange={(element) => setState({ ...state, phones: { ...state.phones, number: element.target.value } })}
                  fullWidth
                />
              </Grid>
              <Grid item md={2} xs={12} style={{ paddingLeft: '5px' }}>
                <TextField
                  id="input-phone"
                  label="Uf"
                  variant="outlined"
                  size="small"
                  required
                  // value={state.phones?.number}
                  // onChange={(element) => setState({ ...state, phones: { ...state.phones, number: element.target.value } })}
                  fullWidth
                />
              </Grid>
            </Grid>
            <FormControl size="small" fullWidth margin='normal' variant="outlined">
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
                labelWidth={60}
              />
            </FormControl>
            <FormControl size="small" fullWidth margin='normal' variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirme sua senha</InputLabel>
              <OutlinedInput
                id="outlined-confirm-password"
                type="password"
                value={inputPassword.value}
                onChange={inputValue => setInputPassword(prev => ({
                  ...prev,
                  value: inputValue.target.value
                }))}
                error={inputPassword.error}
                labelWidth={160}
              />
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
          <Grid container>
            <Box textAlign="center" width="100%">
              <TextGray >
                Já tem um cadastro? {' '}

                <Link onClick={() => history.push('login')}>
                  Clique aqui{' '}
                </Link>
          </TextGray>
            </Box>
          </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
