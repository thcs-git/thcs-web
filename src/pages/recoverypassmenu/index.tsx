import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { FeedbackDescription } from "../recoverypassword/form/style";
import { BoxCustom, FeedbackTitle } from "../userconfiguration/form/style";
import React, { useState, useEffect, useCallback } from "react";
import { UserRecoveryPassword } from "../../store/ducks/users/types";
import { RouteComponentProps, useNavigate } from "react-router-dom";
import FeedbackComponent from "../../components/Feedback";
import { ButtonDefault, ButtonsContent } from "./style";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCheckEmail,
  cleanAction,
  loadRecoveryPasswordiftoken,
  loadUserByEmail,
  loadRequest,
  loadUserTypesRequest,
} from "../../store/ducks/users/actions";
import LOCALSTORAGE from "../../helpers/constants/localStorage";
export default function RecoveryPassMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SIZE_INPUT_PASSWORD = 6;
  const [newPassword, setNewPassword] = useState({ value: "", error: false });
  const [newConfirmPassword, setNewConfirmPassword] = useState({ value: "" });
  const [ok, setOk] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userecovery, setUserecovery] = useState<UserRecoveryPassword>({
    _id: "",
    password: "",
  });
  const currentUser = window.localStorage.getItem(LOCALSTORAGE.USER_ID);

  useEffect(() => {
    // console.log(currentUser);
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
        newPassword.value == newConfirmPassword.value
      ),
    }));

    setUserecovery((prev) => ({
      ...prev,
      password: newPassword.value,
    }));
  }, [newPassword]);

  const recoveryPassword = useCallback(() => {
    if (!newPassword.error) {
      // console.log(userecovery);
      dispatch(loadRecoveryPasswordiftoken(userecovery));
      setOk(true);
    }
  }, [newPassword]);

  return (
    <>
      <Sidebar>
        <BoxCustom>
          <Grid container direction="column">
            <Grid item md={12}>
              <FeedbackTitle>Alteração de senha</FeedbackTitle>
              <FeedbackDescription style={{ marginTop: "3rem" }}>
                Para criar uma nova senha, preencha os campos abaixo:
              </FeedbackDescription>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha Antiga
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  error={newPassword.error}
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
                  // labelWidth={70}
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onBlur={handleValidatePassword}
                  // labelWidth={70}
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirmar Nova Senha
                </InputLabel>
                <OutlinedInput
                  // labelWidth={200}
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
                />
              </FormControl>
            </Grid>
            <Grid md={12} style={{ marginTop: "2rem" }}>
              <ButtonsContent>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/userconfiguration");
                  }}
                >
                  Voltar
                </Button>
                <ButtonDefault onClick={recoveryPassword}>
                  Salvar Senha
                </ButtonDefault>
              </ButtonsContent>
            </Grid>
          </Grid>
        </BoxCustom>
      </Sidebar>
    </>
  );
}
