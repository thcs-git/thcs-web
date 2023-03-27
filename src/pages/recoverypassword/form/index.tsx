import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box, Grid,
  IconButton,
  InputAdornment, TextField,
  Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Button from "../../../components/Button";
import THCStype4Icon from "../../../components/Icons/THCS_Type4";
import StrengthPasswordMeter from "../../../components/StrengthPasswordMeter";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import { ApplicationState } from "../../../store";
import {
  cleanAction, loadCheckEmail, loadRecoveryPassword
} from "../../../store/ducks/users/actions";
import { UserInterface, UserRecoveryPassword } from "../../../store/ducks/users/types";
import theme from "../../../theme/theme";
import {
  FeedbackButtonsContent, FeedbackContent,
  FormGroupSection, TokenIconErro,
  TokenIconSuccess
} from "./style";

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
  const [loading, setLoading] = useState(false);
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
  const storageEmail = localStorage.getItem(LOCALSTORAGE.USERNAME);
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
  useEffect(() => {
    dispatch(cleanAction());
    setUserecovery((prev) => ({
      ...prev,
      email: storageEmail ? storageEmail : "",
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
      setOk(true);
      setLoading(false);
    }, 2000);
  };
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(
        SIZE_INPUT_PASSWORD,
        `A senha deve ter no mínimo ${SIZE_INPUT_PASSWORD} caracteres`
      )
      .matches(
        /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "A senha deve conter uma letra maiúscula, uma minúscula, um caractere especial e um número!"
      )
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
          token: values.token,
        })
      );
      changeScreen();
      setLoading(true);
    },
  });

  return (
    <>
      {ok ? (
        userState.error ? (
          <FeedbackContent>
            <Box
              display="flex"
              width={120}
              height={120}
              justifyContent="space-between"
              alignItems="center"
            >
              <THCStype4Icon
                fill={theme.palette.primary.main}
                width={"140px"}
              />
            </Box>
            <Box>
              <TokenIconErro></TokenIconErro>
            </Box>
            <FormGroupSection
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography style={{ textAlign: "center", fontSize: 24, fontWeight: 600, color: theme.palette.primary.main }}>
                Não foi possível alterar sua senha
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 400
                }}
              >
                Isso pode acontecer quando você insere um usuário inválido ou
                utiliza um link já expirado. <br />
                Que tal recomeçar as etapas de recuperação de senha?
              </Typography>
            </FormGroupSection>
            <FeedbackButtonsContent>
              <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{
                    alignSelf: "center",
                    height: 36,
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
              <THCStype4Icon
                fill={theme.palette.primary.main}
                width={"140px"}
              />
            </Box>
            <Box>
              <TokenIconSuccess></TokenIconSuccess>
            </Box>
            <FormGroupSection
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  marginBottom: 1,
                  fontSize: 22,
                  fontWeight: 600,
                  color: theme.palette.primary.main
                }}>
                Sua Senha foi alterada com sucesso!
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 400
                }}
              >
                Agora é só voltar para o login e tentar entrar com sua nova senha
              </Typography>
            </FormGroupSection>
            <FeedbackButtonsContent>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  navigate("/login");
                }}
                sx={{
                  alignSelf: "center",
                  height: 36,
                }}
              >
                Login
              </Button>
            </FeedbackButtonsContent>
          </FeedbackContent>
        )
      ) : (
        <>
          <FeedbackContent>
            <Box
              display="flex"
              width={120}
              height={120}
              justifyContent="space-between"
              alignItems="center"
            >
              <THCStype4Icon
                fill={theme.palette.primary.main}
                width={"140px"}
              />
            </Box>
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
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
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
                  <StrengthPasswordMeter
                    password={formik.values.password}
                    styles={{ color: "#000", borderColor: "#0004", border: 1 }}
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
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
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
                  <Typography fontSize={14} color={"#000"}>
                    A senha deve conter no mínimo:
                  </Typography>
                  <Typography fontSize={12} color={"#000"}>
                    - Seis caracteres
                  </Typography>
                  <Typography fontSize={12} color={"#000"}>
                    - Uma letra maiúscula
                  </Typography>
                  <Typography fontSize={12} color={"#000"}>
                    - Uma letra minúscula
                  </Typography>
                  <Typography fontSize={12} color={"#000"}>
                    - Um número
                  </Typography>
                  <Typography fontSize={12} color={"#000"}>
                    - Um caracter especial (@!#$%&*)
                  </Typography>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 80,
                      }}
                    >
                      <CircularProgress />
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      sx={{
                        alignSelf: "center",
                        height: 36,
                        marginTop: 2,
                      }}
                    >
                      <Typography variant="body1" sx={{ cursor: "pointer" }}>
                        Salvar senha
                      </Typography>
                    </Button>
                  )}
                </form>
              </Grid>
            </Grid>
          </FeedbackContent>
        </>
      )}
    </>
  );
}
