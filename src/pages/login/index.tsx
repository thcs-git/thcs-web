import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRequest, emailRequest } from "../../store/ducks/login/actions";
import { ApplicationState } from "../../store";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { makeStyles } from "@material-ui/core/styles";

import {
  ContainerLogin,
  WelcomeTextWrapper,
  HomeIconLogo,
  LogoText,
  TextGray,
  TextBlue,
} from "./styles";

import Button from "../../styles/components/Button";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

import validateEmail from "../../utils/validateEmail";
import LOCALSTORAGE from "../../helpers/constants/localStorage";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormGroup,
} from "@material-ui/core";
import { updateUserPasswordRequest } from "../../store/ducks/users/actions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Sollar
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  create_account: {
    marginBottom: "14px",
    "&:hover": {
      background: "#f7f7f7",
      fontWeight: "bold",
      transition: "300ms",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "10px",
    textTransform: "capitalize",
    fontSize: "18px",
    backgroundColor: "var(--success)",
    "&:hover": {
      backgroundColor: "#4fc66ae3",
      fontWeight: "bold",
      transition: "300ms",
    },
  },
  register: {
    margin: theme.spacing(1, 0, 2),
    padding: "10px",
    textTransform: "capitalize",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "var(--success-hover)",
      borderColor: "var(--success-hover)",
      color: "white",
    },
    borderColor: "var(--success-hover)",
    contrastText: "#fff",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: "green[500]",
    "&:hover": {
      backgroundColor: "green[700]",
    },
  },
  fab: {
    width: "35px",
    height: "25px",
  },
  fabProgress: {
    color: "green[500]",
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: "green[500]",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SIZE_INPUT_PASSWORD = 3;

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginState = useSelector((state: ApplicationState) => state.login);

  const [inputEmail, setInputEmail] = useState({ value: "", error: false });
  const [inputPassword, setInputPassword] = useState({
    value: "",
    error: false,
  });
  const [inputConfirmPassword, setInputConfirmPassword] = useState({
    value: "",
    error: false,
  });
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [valid, setValid] = useState(false);
  const [openPolicyModal, setOpenPolicyModal] = useState(false);
  const classes = useStyles();

  // useEffect(() => {
  //   const expired = localStorage.getItem(LOCALSTORAGE.EXPIRED_SESSION);
  //   const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
  //
  //   if (expired) {
  //     localStorage.removeItem(LOCALSTORAGE.EXPIRED_SESSION);
  //     toast.error('Sessão expirada');
  //   }
  //
  //   // if (token) history.push('/dashboard');
  // }, []);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleVerifyEmail = useCallback(
    async (event) => {
      event.preventDefault();

      if (inputEmail.error) return;

      // if (loginState.email.user) return;

      dispatch(emailRequest({ email: inputEmail.value }));
    },
    [inputPassword, inputEmail]
  );

  const handlePassword = useCallback(
    async (event) => {
      event.preventDefault();

      if (inputEmail.error || inputPassword.error) return;
      dispatch(
        updateUserPasswordRequest({
          email: inputEmail.value,
          password: inputPassword.value,
        })
      );
    },
    [inputPassword, inputEmail]
  );

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();

      if (inputEmail.error || inputPassword.error) return;
      dispatch(
        loadRequest({ email: inputEmail.value, password: inputPassword.value })
      );
    },
    [inputPassword, inputEmail]
  );

  const handleEmailValidator = useCallback(() => {
    if (!validateEmail(inputEmail.value)) {
      setInputEmail((prev) => ({
        ...prev,
        error: true,
      }));
      setValid(true);
    } else {
      setInputEmail((prev) => ({
        ...prev,
        error: false,
      }));
      setValid(false);
    }
  }, [inputEmail]);

  const handlePasswordValitor = useCallback(() => {
    let passwordError = false;
    let passwordConfirmError = false;

    passwordError = !(inputPassword.value.length >= SIZE_INPUT_PASSWORD);
    passwordConfirmError = !(
      inputConfirmPassword.value.length >= SIZE_INPUT_PASSWORD
    );

    if (inputPassword.value != inputConfirmPassword.value) {
      passwordError = true;
      passwordConfirmError = true;
    }

    setInputPassword((prev) => ({
      ...prev,
      error: passwordError,
    }));
    setInputConfirmPassword((prev) => ({
      ...prev,
      error: passwordConfirmError,
    }));
    setValid(passwordError && passwordConfirmError);
  }, [inputPassword, inputConfirmPassword]);

  return (
    <>
      {loginState.loading && <Loading />}
      <Container className={classes.container} maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Box
            display="flex"
            width={150}
            height={165}
            justifyContent="center"
            alignItems="center"
          >
            <HomeIconLogo />
          </Box>

          <WelcomeTextWrapper>
            <TextGray>Bem-vindo(a)! Realize seu login para continuar:</TextGray>
          </WelcomeTextWrapper>
          <form className={classes.form} noValidate>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
              <OutlinedInput
                error={inputEmail.error}
                required
                fullWidth
                label="E-mail"
                name="email"
                autoComplete="number"
                autoFocus
                onChange={(inputValue) =>
                  setInputEmail((prev) => ({
                    ...prev,
                    value: inputValue.target.value,
                  }))
                }
                // onBlur={handleEmailValidator}
                id="outlined-adornment-email"
                value={inputEmail.value}
                endAdornment={
                  <InputAdornment position="end">
                    <div className={classes.wrapper}>
                      <Fab
                        className={classes.fab}
                        aria-label="save"
                        // color="secondary"
                        // className={buttonClassname}
                        onClick={handleVerifyEmail}
                        style={{ color: "primary" }}
                      >
                        <ArrowForwardIcon />
                      </Fab>
                      {/*<CircularProgress size={68} className={classes.fabProgress}/>*/}
                    </div>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            {loginState.email.user ? (
              <>
                {loginState.email.password ? (
                  <>
                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Senha
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={inputPassword.value}
                        onChange={(inputValue) =>
                          setInputPassword((prev) => ({
                            ...prev,
                            value: inputValue.target.value,
                          }))
                        }
                        // onBlur={handlePasswordValitor}
                        error={inputPassword.error}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
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
                  </>
                ) : (
                  <>
                    <FormControl
                      size="small"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Senha
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={inputPassword.value}
                        onChange={(inputValue) =>
                          setInputPassword((prev) => ({
                            ...prev,
                            value: inputValue.target.value,
                          }))
                        }
                        // onBlur={handlePasswordValitor}
                        error={inputPassword.error}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={60}
                      />
                    </FormControl>
                    <FormControl
                      size="small"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password-comfirm">
                        Senha
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-comfirm"
                        type={showPassword ? "text" : "password"}
                        value={inputConfirmPassword.value}
                        onChange={(inputValue) =>
                          setInputConfirmPassword((prev) => ({
                            ...prev,
                            value: inputValue.target.value,
                          }))
                        }
                        // onBlur={handlePasswordValitor}
                        error={inputConfirmPassword.error}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={60}
                      />
                    </FormControl>
                    <FormGroup row style={{ alignItems: "center" }}>
                      <Checkbox
                        checked={checkPolicy}
                        // onBlur={handleValidator}
                        onChange={() => setCheckPolicy(!checkPolicy)}
                        name="checkedB"
                        color="primary"
                      />
                      <TextGray>
                        Li e concordo com os{" "}
                        <TextBlue onClick={() => setOpenPolicyModal(true)}>
                          termos e politicas{" "}
                        </TextBlue>
                        de privacidade
                      </TextGray>
                    </FormGroup>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handlePassword}
                      disabled={valid}
                    >
                      Cadastrar
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                {/*<Button*/}
                {/*  type="submit"*/}
                {/*  fullWidth*/}
                {/*  variant="contained"*/}
                {/*  color="primary"*/}
                {/*  className={classes.submit}*/}
                {/*  onClick={handleVerifyEmail}*/}
                {/*>*/}
                {/*  Verificar*/}
                {/*</Button>*/}
              </>
            )}
            {/*<Button*/}
            {/*  background="success_rounded"*/}
            {/*  type="button"*/}
            {/*  fullWidth*/}
            {/*  variant="contained"*/}
            {/*  className={classes.create_account}*/}
            {/*  onClick={() => history.push('/register')}*/}
            {/*>*/}
            {/*  Criar conta*/}
            {/*</Button>*/}
            <Grid container>
              <Box textAlign="center" width="100%">
                <TextGray>
                  Esqueceu a senha?{" "}
                  <Link href="/forgotpassword">
                    <TextBlue>Clique aqui </TextBlue>
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
      <Dialog
        open={openPolicyModal}
        onClose={() => setOpenPolicyModal(false)}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {[...new Array(500)]
              .map(() => `Cras mattis. Asdasd asd.`)
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPolicyModal(false)} color="primary">
            Não Aceitar
          </Button>
          <Button
            onClick={() => {
              setOpenPolicyModal(false);
              setCheckPolicy(true);
            }}
            color="primary"
          >
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
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
