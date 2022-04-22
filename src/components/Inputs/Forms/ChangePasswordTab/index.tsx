import React, { useState, useEffect, useCallback } from "react";
// Helper
import LOCALSTORAGE from "../../../../helpers/constants/localStorage";
import { useFormik } from "formik";
import * as yup from "yup";
// Redux e Sagas
import { useDispatch } from "react-redux";
import {
  UserState,
  UserRecoveryPassword,
} from "../../../../store/ducks/users/types";
import { loadRecoveryPasswordiftoken } from "../../../../store/ducks/users/actions";

// MUI
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

// Styles
import { BoxCustom, FeedbackTitle, FeedbackDescription } from "./styles";

//components
interface IPageParams {
  id?: string;
  email?: string;
  token?: string;
  state: UserState;
}

const SIZE_INPUT_PASSWORD = 6;

const validationSchema = yup.object({
  oldPassword: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .min(
      SIZE_INPUT_PASSWORD,
      `A senha deve ter no mínimo ${SIZE_INPUT_PASSWORD} caracteres`
    )
    .max(20, "Senha deve ter no maximo 20 caracteres")
    .required("Campo obrigatório")
    .notOneOf(
      [yup.ref("oldPassword"), null],
      "Senha antiga e nova senha iguais"
    ),
  confirmPassword: yup
    .string()
    .min(
      SIZE_INPUT_PASSWORD,
      `A senha deve ter no mínimo ${SIZE_INPUT_PASSWORD} caracteres`
    )
    .required("Campo obrigatório")
    .oneOf(
      [yup.ref("password"), null],
      "Nova senha e confirmar senha diferentes"
    ),
});

export default function ChangePasswordConfiguration(props: IPageParams) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userecovery, setUserecovery] = useState<UserRecoveryPassword>({
    _id: "",
    password: "",
    oldPassword: "",
  });
  const currentUser = window.localStorage.getItem(LOCALSTORAGE.USER_ID);

  useEffect(() => {
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
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        loadRecoveryPasswordiftoken({
          ...userecovery,
          oldPassword: values.oldPassword,
          password: values.password,
        })
      );
    },
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <BoxCustom>
      <Grid container direction="column">
        <Grid item>
          <FeedbackTitle>Alteração de senha</FeedbackTitle>
          <FeedbackDescription>
            Para criar uma nova senha, preencha os campos abaixo:
          </FeedbackDescription>
        </Grid>
        <Grid item sx={{ width: 400 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              sx={{ margin: "8px 0" }}
              id="oldPassword"
              name="oldPassword"
              label="Senha antiga"
              type={showPassword ? "text" : "password"}
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              helperText={
                formik.touched.oldPassword && formik.errors.oldPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
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
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
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
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                textTransform: "capitalize",
                width: 130,
                height: 36,
                marginTop: 1,
                background: "var(--success)",
                "&:hover": {
                  background: "var(--success-hover)",
                },
              }}
            >
              Salvar senha
            </Button>
          </form>
        </Grid>
      </Grid>
    </BoxCustom>
  );
}
