import React, { useState, useEffect, useCallback } from "react";
// React Router
import { useHistory, RouteComponentProps } from "react-router-dom";
// Helper
import LOCALSTORAGE from "../../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../../helpers/constants/sessionStorage";
import { toast } from "react-toastify";
// Redux e Sagas
import { useDispatch, useSelector } from "react-redux";
import {
  UserState,
  UserRecoveryPassword,
} from "../../../../store/ducks/users/types";
import { ApplicationState } from "../../../../store";
import { loadRecoveryPasswordiftoken } from "../../../../store/ducks/users/actions";

// MUI
import Grid from "@material-ui/core/Grid";

// Styles
import {
  BoxCustom,
  FeedbackTitle,
  FeedbackDescription,
  ButtonsContent,
  ButtonDefault,
} from "./styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@mui/material/Button";

interface IPageParams {
  id?: string;
  email?: string;
  token?: string;
  state: UserState;
}

const SIZE_INPUT_PASSWORD = 3;

export default function ChangePasswordConfiguration(props: IPageParams) {
  const { state } = props;
  const dispatch = useDispatch();
  const SIZE_INPUT_PASSWORD = 3;
  const [newPassword, setNewPassword] = useState({ value: "", error: false });
  const [newConfirmPassword, setNewConfirmPassword] = useState({ value: "" });
  const [ok, setOk] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userecovery, setUserecovery] = useState<UserRecoveryPassword>({
    _id: "",
    password: "",
    oldPassword: "",
  });
  const currentUser = window.localStorage.getItem(LOCALSTORAGE.USER_ID);
  console.log(state, "USER STATE");
  // useEffect
  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      setUserecovery((prev) => ({
        ...prev,
        _id: currentUser,
      }));
    }
  }, [currentUser]);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleValidatePassword = useCallback(() => {
    console.log(userecovery);
    setNewPassword((prev) => ({
      ...prev,
      error: !(
        newPassword.value.length >= SIZE_INPUT_PASSWORD &&
        newPassword.value &&
        newPassword.value === newConfirmPassword.value &&
        newPassword.value !== userecovery.oldPassword
      ),
    }));

    setUserecovery((prev) => ({
      ...prev,
      password: newPassword.value,
    }));
  }, [newPassword, newConfirmPassword.value, userecovery.oldPassword]);

  const recoveryPassword = useCallback(() => {
    if (newPassword.value === userecovery.oldPassword) {
      toast.error("Sua nova senha não pode ser igual a antiga.");
    } else if (userecovery.password.length < SIZE_INPUT_PASSWORD) {
      toast.error(
        `A nova senha deve conter mais que ${SIZE_INPUT_PASSWORD} caracteres.`
      );
    } else if (newPassword.value !== newConfirmPassword.value) {
      toast.error(
        "Os campos Nova senha e Confirmar nova senha devem ser iguais."
      );
    } else if (!newPassword.error && userecovery.oldPassword) {
      console.log(userecovery);
      dispatch(loadRecoveryPasswordiftoken(userecovery));
      setOk(true);
    }
  }, [newPassword]);

  return (
    <BoxCustom>
      <Grid container direction="column">
        <Grid item md={12}>
          <FeedbackTitle>Alteração de senha</FeedbackTitle>
          <FeedbackDescription>
            Para criar uma nova senha, preencha os campos abaixo:
          </FeedbackDescription>
        </Grid>
        <Grid item md={5}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Senha Antiga
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              error={
                newPassword.value === userecovery.oldPassword ||
                newConfirmPassword.value === userecovery.oldPassword ||
                !userecovery.oldPassword
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(element) => {
                setUserecovery((prev) => ({
                  ...prev,
                  oldPassword: element.target.value,
                }));
              }}
            />
          </FormControl>
        </Grid>
        <Grid item md={5}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Nova Senha
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              error={newPassword.error}
              onChange={(element) => {
                setNewPassword((prev) => ({
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onBlur={handleValidatePassword}
            />
          </FormControl>
        </Grid>
        <Grid item md={5}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirmar Nova Senha
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onBlur={handleValidatePassword}
            />
          </FormControl>
        </Grid>
        <Grid md={12} style={{ marginTop: "16px" }}>
          <ButtonsContent>
            <ButtonDefault
              variant="contained"
              onClick={recoveryPassword}
              sx={{
                background: "var(--success)",
                "&:hover": {
                  background: "var(--success-hover)",
                },
              }}
            >
              Salvar Senha
            </ButtonDefault>
          </ButtonsContent>
        </Grid>
      </Grid>
    </BoxCustom>
  );
}
