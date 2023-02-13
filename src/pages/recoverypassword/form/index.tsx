import Button from "../../../components/Button";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import {
  FeedbackContent,
  FormGroupSection,
  FeedbackImage,
  FeedbackTitle,
  FeedbackButtonsContent,
  FeedbackDescription,
  HomeIconLogo,
  TokenIconErro,
  TokenIconSuccess,
} from "./style";
import {
  loadCheckEmail,
  cleanAction,
  loadRecoveryPassword,
  loadUserByEmail,
  loadRequest,
  loadUserTypesRequest,
} from "../../../store/ducks/users/actions";
import { UserInterface } from "../../../store/ducks/users/types";
import { ApplicationState } from "../../../store";
import { UserRecoveryPassword } from "../../../store/ducks/users/types";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ButtonComponent from "../../../styles/components/Button";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import * as yup from "yup";
import { useFormik } from "formik";
import theme from "../../../theme/theme";
import CircularProgress from "@mui/material/CircularProgress";

const SIZE_INPUT_PASSWORD = 6;
interface IPageParams {
  id?: string;
  email?: string;
  token?: string;
}

export default function RecoveryPasswordPage(props: IPageParams) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputEmail, setInputEmail] = useState({ value: "", error: false });
  const [newPassword, setNewPassword] = useState({ value: "", error: false });
  const [newConfirmPassword, setNewConfirmPassword] = useState({ value: "" });
  const userState = useSelector((state: ApplicationState) => state.users);
  const [showPassword, setShowPassword] = useState(false);
  const [ok, setOk] = useState(false);
  const [userecovery, setUserecovery] = useState<UserRecoveryPassword>({
    email: "",
    password: "",
    token: "",
  });
  const storageEmail = localStorage.getItem(LOCALSTORAGE.USERNAME)
  const [state, setState] = useState<UserInterface>({
    companies: [],
    companies_links: [],
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
    phones: [
      {
        cellnumber: "",
        number: "",
        telegram: false,
        whatsapp: false,
      },
    ],
    email: "",
    phone: "",
    cellphone: "",
    user_type_id: "",
    specialties: [],
    council_state: "",
    council_number: "",
    verified: "",
    active: true,
    professions: [],
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    dispatch(cleanAction());
    setUserecovery((prev) => ({
      ...prev,
      email: storageEmail ? storageEmail : ""
    }));
  }, []);
  useEffect(() => {
    dispatch(loadCheckEmail(params.token));
  }, [params]);

  useEffect(() => {
    setUserecovery((prev) => ({
      ...prev,
      token: params.token ? params.token : "",
    }));
  }, [params]);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  const changeScreen = () => {
    setTimeout(() => {
      setOk(true)
      setloading(false)
    }, 2000)
  }
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(
        SIZE_INPUT_PASSWORD,
        `A senha deve ter no mínimo ${SIZE_INPUT_PASSWORD} caracteres`
      )
      .matches(/^.*(?=.*[A-Z]).*$/, "Mínimo de uma letra maiúscula")
      .matches(/^.*(?=.*[!@#$%&*)?(+-]).*$/, "Mínimo de um caractere especial")
      .matches(/^.*(?:\d{2}).*$/, "Mínimo de dois números")
      .required("Campo obrigatório"),
    confirmPassword: yup
      .string()
      .required("Campo obrigatório")
      .oneOf(
        [yup.ref("password"), null],
        "Nova senha e confirmar senha diferentes"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem(LOCALSTORAGE.USERNAME),
      password: userecovery.password,
      token: params.token,
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        loadRecoveryPassword({
          ...userecovery,
          email: values.email,
          password: values.password,
          token: values.token
        }),
      )
      changeScreen()
      setloading(true)
    },
  });

  /*const handleValidatePassword = useCallback(() => {
      // console.log("validação");
      setNewPassword((prev) => ({
        ...prev,
        error:
          (userecovery.password.length >= SIZE_INPUT_PASSWORD &&
            userecovery.password == newConfirmPassword.value
          ) ? false : true
      }));
    }, [newPassword, newConfirmPassword]); */

  /*const recoveryPassword = useCallback(() => {
      // console.log(userecovery)
      if (!newPassword.error && userecovery.password.length >= 6) {
        dispatch(loadRecoveryPassword(userecovery));
        (() => {
          setTimeout(() => {
            setOk(true)
          }, 2000)
        })()
      } else if (
        userecovery.password.length === 0 ||
        newConfirmPassword.value.length === 0) {
        alert('Erro: Não é permitido o registro de campos em branco.')
      }
    }, [newPassword]); */
  return (
    <>
      {ok ? (userState.error ? (
        <FeedbackContent>
          <Box
            display="flex"
            width={120}
            height={120}
            justifyContent="space-between"
            alignItems="center"
          >
            <HomeIconLogo />
          </Box>
          <Box>
            <TokenIconErro></TokenIconErro>
          </Box>
          <FormGroupSection
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FeedbackTitle style={{ textAlign: "center" }}>
              Não foi possível alterar sua senha
            </FeedbackTitle>
            <FeedbackDescription
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              Isso pode acontecer quando você insere um usuário inválido ou
              utiliza um link já expirado. <br />
              Que tal recomeçar as etapas de recuperação de senha?
            </FeedbackDescription>
          </FormGroupSection>
          <FeedbackButtonsContent>
            <Button
              variant="contained"
              style={{ background: "#4FC66A99", color: "white" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </FeedbackButtonsContent>
        </FeedbackContent>
      ) : (
        <FeedbackContent>
          <Box
            display="flex"
            width={120}
            height={120}
            justifyContent="center"
            alignItems="center"
            style={{ margin: "2rem" }}
          >
            <HomeIconLogo />
          </Box>
          <Box>
            <TokenIconSuccess></TokenIconSuccess>
          </Box>
          <FormGroupSection
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FeedbackTitle style={{ textAlign: "center" }}>
              Sua Senha foi alterada com sucesso
            </FeedbackTitle>
          </FormGroupSection>
          <FeedbackButtonsContent>
            <Button
              variant="contained"
              style={{ background: "#4FC66A99", color: "white" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </FeedbackButtonsContent>
        </FeedbackContent>
      )) : (
        <>
          <FeedbackContent>
            <Grid
              container
              direction="column"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="h5"
                  fontWeight={500}
                  color={theme.palette.primary.main}
                  textAlign={"center"}
                >
                  Alteração de senha
                </Typography>
                <Typography variant="body1" marginY={"0.625rem"}>
                  Para criar uma nova senha, preencha os campos abaixo:
                </Typography>
              </Grid>
              <Grid item sx={{ width: 400 }}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    color="secondary"
                    fullWidth
                    sx={{ margin: "8px 0" }}
                    id="password"
                    name="password"
                    label="Nova senha"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ "& svg, path": { cursor: "pointer" } }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    color="secondary"
                    fullWidth
                    sx={{ margin: "8px 0" }}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar senha"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ "& svg, path": { cursor: "pointer" } }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {loading
                    ? (<div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 80
                      }}>
                      <CircularProgress />
                    </div>)
                    : (<Button
                      variant="contained"
                      color="success"
                      type="submit"
                      sx={{
                        alignSelf: "center",
                        height: 36,
                        marginTop: 10,
                      }}
                    >
                      <Typography variant="body1" sx={{ cursor: "pointer" }}>
                        Salvar senha
                      </Typography>
                    </Button>)}
                </form>
              </Grid>
            </Grid>
          </FeedbackContent>
          {/* <FeedbackContent>
            <Box
              display="flex"
              width={200}
              height={165}
              justifyContent="center"
              alignItems="center"
              style={{ margin: "2rem" }}
            >
              <HomeIconLogo />
            </Box>
            <FormGroupSection
              style={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
              }}
            >
              <FeedbackTitle>
                <h6>Redefinir Senha</h6>
              </FeedbackTitle>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {" "}
                  Nova Senha{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  error={newPassword.error}
                  onChange={(element) => {
                    setUserecovery((prev) => ({
                      ...prev,
                      password: element.target.value,
                    }));
                  }}
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
                  onBlur={handleValidatePassword}
                // labelWidth={100}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {" "}
                  Confirmar Nova senha{" "}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  error={newPassword.error}
                  onChange={(element) => {
                    setNewConfirmPassword((prev) => ({
                      ...prev,
                      value: element.target.value,
                    }));
                  }}
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
                  onBlur={handleValidatePassword}
                // labelWidth={100}
                />
              </FormControl>
              <FeedbackButtonsContent>
                <Button
                  variant="contained"
                  style={{ background: "#4FC66A99", color: "white" }}
                  onClick={recoveryPassword}
                >
                  Alterar Senha
                </Button>
              </FeedbackButtonsContent>
            </FormGroupSection>
          </FeedbackContent> */}
          {/* <FeedbackContent>
        <FormGroupSection>
          <FeedbackTitle>
            Cadastrar nova senha
          </FeedbackTitle>
          <FeedbackDescription>
            <TextField
                type="password"
                label="Confirmar Nova Senha"
                variant="outlined"
                size="small"
                onChange={element=>{
                  setNewConfirmPassword(prev=>({
                    ...prev,
                    value:element.target.value
                  }))
                }}
                onBlur={handleValidatePassword}
            >
            </TextField>
            </FeedbackDescription>
          </FormGroupSection>
          <FeedbackButtonsContent style={{width:"400px"}}>
            <Button fullWidth  variant="outlined" onClick={recoveryPassword}>Alterar Senha</Button>
          </FeedbackButtonsContent>

        </FeedbackContent> */}
        </>
      )}
    </>
  );
}
