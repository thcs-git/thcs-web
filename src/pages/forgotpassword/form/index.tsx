import React, { useState, useEffect, useCallback } from "react";
//Router
import { useNavigate, useParams } from "react-router-dom";

//Redux e sagas
import { useDispatch, useSelector } from "react-redux";
import {
  loadCheckEmail,
  cleanAction,
  loadUserByEmail,
  loadUserTypesRequest,
} from "../../../store/ducks/users/actions";
import { UserInterface } from "../../../store/ducks/users/types";
import { ApplicationState } from "../../../store";

//Mui
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Box,
  useMediaQuery,
  Link,
  FormControl,
} from "@mui/material";

import { makeStyles } from "@mui/material/styles";

//Icons
import THCStype1 from "../../../components/Icons/THCS_Type1";
// images
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import { ReactComponent as VerifyImage } from "../../../assets/img/illustracao-verificar-email.svg";
//Components
import Button from "../../../components/Button";
import BackgroundAnimated from "../../../components/Background/Animated";
import BackgroundHouses from "../../../components/Background/Houses";

//Styles
import {
  FeedbackContent,
  FormGroupSection,
  FeedbackImage,
  HomeIconLogo,
  TextBlue,
  FeedbackTitle,
  FeedbackButtonsContent,
  TextGray,
  FeedbackDescription,
} from "./style";
import theme from "../../../theme/theme";
// utils
import { useFormik } from "formik";
import * as yup from "yup";

// const useStyles = makeStyles((theme) => ({
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     padding: "10px",
//     textTransform: "capitalize",
//     fontSize: "18px",
//     backgroundColor: "var(--success)",
//     boxShadow: "0 0 1em #dadada",
//     "&:hover": {
//       backgroundColor: "#4fc66ae3",
//       fontWeight: "bold",
//       transition: "300ms",
//     },
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     padding: theme.spacing(1, 1, 0, 1),
//   },
//   footerStyle: {
//     backgroundColor: "#dadada",
//     alignContent: "center",
//     fontSize: "20px",
//     color: "#0899BA",
//     textDecoration: "bold",
//     borderTop: "1px solid #E7E7E7",
//     textAlign: "center",
//     padding: "10px",
//     position: "fixed",
//     left: "0",
//     bottom: "0",
//     height: "40px",
//     width: "100%",
//   },
// }));
interface IPageParams {
  id?: string;
  email?: string;
  token?: string;
}
const validationSchemaForgotPassword = yup.object({
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("Formato de e-mail incorreto"),
});
export default function ForgotPasswordPage(props: IPageParams) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputEmailForRecovery, setInputEmailForRecovery] = useState({
    value: "",
  });
  const [sendEmail, setSendEmail] = useState(false);
  const userState = useSelector((state: ApplicationState) => state.users);
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
  const xsQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.xs}px)`);
  const smQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);
  const mdQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`);
  const lgQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.lg}px)`);
  const xlQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.xl}px)`);
  // function handleUserbyEmail(value:any){
  //   dispatch(loadUserByEmail(value));

  // }
  const formikForgotPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchemaForgotPassword,
    onSubmit: (values) => {
      dispatch(loadUserByEmail(values.email));
      setSendEmail(true);
      setInputEmailForRecovery({ value: values.email });
    },
    // dispatch(
    //   updateUserPasswordRequest({
    //     email: inputEmailForRecovery.value,
    //     password: values.password,
    //   })
    // );
    // dispatch(
    //   loadRequest({ email: inputEmailForRecovery.value, password: values.password })
    // );
  });
  const handleUserbyEmail = useCallback(() => {
    // console.log(inputEmailForRecovery.value);
    dispatch(loadUserByEmail(inputEmailForRecovery.value));
    setSendEmail(true);
  }, [inputEmailForRecovery]);

  const recovery = () => (
    <Grid item sx={{ width: "25rem !important" }}>
      <Typography
        variant="h5"
        fontWeight={500}
        color="white"
        mb={1}
        align={mdQuery ? "center" : "left"}
      >
        Redefina sua senha
      </Typography>

      <Typography
        variant="body1"
        mb={2}
        color="white"
        align={mdQuery ? "center" : "left"}
      >
        Insira seu e-mail
      </Typography>
      <FormControl
        fullWidth
        onSubmit={() => formikForgotPassword.handleSubmit()}
      >
        <TextField
          id="email"
          name="email"
          value={formikForgotPassword.values.email}
          onChange={formikForgotPassword.handleChange}
          error={
            formikForgotPassword.touched.email &&
            Boolean(formikForgotPassword.errors.email)
          }
          helperText={
            formikForgotPassword.touched.email &&
            formikForgotPassword.errors.email
          }
          color="secondary"
          fullWidth
          // label="E-mail"
          placeholder="E-mail"
          variant="outlined"
          type={"email"}
          // size="small"
          sx={{
            "& .MuiOutlinedInput-root.MuiInputBase-root": {
              background: "white",
              "&.Mui-error": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: `4px solid ${theme.palette.error.main} !important`,
                },
              },
              "&.Mui-focused": {
                "& fieldset": {
                  border: `4px solid ${theme.palette.secondary.main} !important`,
                },
                // borderColor: `${theme.palette.secondary.main} !important`,
              },
              "&:hover": {
                "& fieldset": {
                  border: `4px solid ${theme.palette.terciaryDark.main}`,
                },
              },
            },
          }}
        />

        <Grid
          item
          sx={{
            margin: "1rem 0",
            display: "flex",
            gap: "0.5rem",
            flexWrap: smQuery ? "wrap" : "nowrap",
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            onClick={() => formikForgotPassword.handleSubmit()}
            sx={{
              backgroundColor: theme.palette.terciary.main,
              color: theme.palette.primary.main,
              "&:hover": { backgroundColor: theme.palette.terciaryDark.main },
            }}
          >
            Enviar
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="outlined"
            color="secondary"
            sx={{
              color: theme.palette.terciary.main,
              border: `1px solid ${theme.palette.terciary.main}`,
              "&:hover": {
                border: `1px solid ${theme.palette.terciaryDark.main}`,
              },
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </FormControl>
    </Grid>
  );
  const recoverySend = () => (
    <Grid item sx={{ width: "25rem" }}>
      <Typography
        variant="h5"
        fontWeight={500}
        color="white"
        mb={1}
        align={mdQuery ? "center" : "left"}
      >
        Verifique seu e-mail
      </Typography>
      <Typography
        color="white"
        variant="h6"
        align={mdQuery ? "center" : "left"}
      >
        {`Enviamos um link de recuperação para o e-mail ${inputEmailForRecovery.value}. Confira sua caixa de
        entrada e clique no link de confirmação para criar uma nova senha.`}
      </Typography>
      <Typography mt={1} color="white" align={mdQuery ? "center" : "left"}>
        Se não receber o e-mail em 5 minutos:
      </Typography>
      <Typography
        ml={1}
        mt={1}
        color="white"
        align={mdQuery ? "center" : "left"}
      >
        - Verifique se o e-mail para recuperação está correto
        <br />- Verifique sua caixa de span
      </Typography>

      <Grid
        item
        sx={{
          margin: "1rem 0",
          display: "flex",
          gap: "0.5rem",
          flexWrap: smQuery ? "wrap" : "nowrap",
        }}
      >
        <Button
          sx={{
            height: "2rem",
            backgroundColor: theme.palette.terciary.main,
            color: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.terciaryDark.main },
          }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleUserbyEmail}
        >
          Reenviar Email
        </Button>
        <Button
          sx={{
            height: "2rem",
            color: theme.palette.terciary.main,
            border: `1px solid ${theme.palette.terciary.main}`,
            "&:hover": {
              border: `1px solid ${theme.palette.terciaryDark.main}`,
            },
          }}
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );

  function Copyright() {
    return (
      <Grid
        item
        sx={{
          alignContent: "center",
          textDecoration: "bold",
          background: "#d9d9d9",
          borderTop: "1px solid #d9d9d9",
          textAlign: "center",
          position: "fixed",
          left: "0",
          bottom: "0",
          height: "24px",
          width: "100%",
        }}
      >
        <Typography variant="body2" align="center">
          <Link
            href="https://www.tascominformatica.com.br/"
            sx={{
              color: theme.palette.common.black,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
            target={"_blank"}
          >
            TASCOM
          </Link>
          {" © "}
          {new Date().getFullYear()}
        </Typography>
      </Grid>
    );
  }
  return (
    <Container
      sx={{
        maxWidth: "none !important",
        height: "calc(100% - 24px)",
        margin: 0,
        backgroundColor: theme.palette.primary.main,
        overflow: "hidden",
        padding: "0px !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ marginTop: "-20px" }}>
        <BackgroundAnimated />
      </Box>
      <Container
        sx={{
          width: "100%",
          padding: "16px",
          position: "absolute",
          top: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
          maxWidth: "none !important",
        }}
      >
        <Grid
          gap={2}
          container
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            maxWidth: "1200px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "25rem" }}>
              <THCStype1 fill={theme.palette.common.white} width={"100%"} />
            </Box>
          </Grid>

          {sendEmail ? recoverySend() : recovery()}
        </Grid>
      </Container>
      <BackgroundHouses amountOfHouses={6} />
      <Copyright />
    </Container>
  );
}
