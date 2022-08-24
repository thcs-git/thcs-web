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
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ButtonComponent from "../../../styles/components/Button";

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
    _id: "",
    password: "",
  });
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
  }, []);
  useEffect(() => {
    dispatch(loadCheckEmail(params.token));
  }, [params]);

  useEffect(() => {
    setUserecovery((prev) => ({
      ...prev,
      _id: params.token ? params.token : "",
    }));
  }, [params]);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleValidatePassword = useCallback(() => {
    // console.log("validação");
    setNewPassword((prev) => ({
      ...prev,
      error: !(
        userecovery.password.length >= SIZE_INPUT_PASSWORD &&
        userecovery.password == newConfirmPassword.value
      ),
    }));
  }, [newPassword]);

  const recoveryPassword = useCallback(() => {
    // console.log(userecovery);
    if (!newPassword.error) {
      dispatch(loadRecoveryPassword(userecovery));
      setOk(true);
    }
  }, [newPassword]);

  return (
    <>
      {userState.error && (
        <FeedbackContent>
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
      )}

      {!ok && !userState.error && (
        <>
          <FeedbackContent>
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
          </FeedbackContent>
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

      {ok && (
        <FeedbackContent>
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
      )}
    </>
  );
}
