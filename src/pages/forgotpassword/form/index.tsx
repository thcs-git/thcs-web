import React, { useState, useEffect, useCallback } from "react";
//Router
import { RouteComponentProps, useHistory } from "react-router-dom";

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
const validationSchema = yup.object({
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("Formato de e-mail incorreto"),
});
export default function ForgotPasswordPage(
  props: RouteComponentProps<IPageParams>
) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = props.match;
  const [inputEmail, setInputEmail] = useState({ value: "" });
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
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loadUserByEmail(values.email));
      setSendEmail(true);
      setInputEmail({ value: values.email });
    },
    // dispatch(
    //   updateUserPasswordRequest({
    //     email: inputEmail.value,
    //     password: values.password,
    //   })
    // );
    // dispatch(
    //   loadRequest({ email: inputEmail.value, password: values.password })
    // );
  });
  const handleUserbyEmail = useCallback(() => {
    console.log(inputEmail.value);
    dispatch(loadUserByEmail(inputEmail.value));
    setSendEmail(true);
  }, [inputEmail]);

  const recovery = () => (
    <Grid item sx={{ width: "25rem !important" }}>
      <Typography
        variant="h5"
        fontWeight={500}
        color="primary.main"
        mb={1}
        align={mdQuery ? "center" : "left"}
      >
        Redefina sua senha
      </Typography>

      <Typography
        variant="body1"
        mb={2}
        color="text.primary"
        align={mdQuery ? "center" : "left"}
      >
        Insira seu e-mail
      </Typography>
      <FormControl fullWidth onSubmit={() => formik.handleSubmit()}>
        <TextField
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          color="secondary"
          fullWidth
          label="E-mail"
          variant="outlined"
          type={"email"}
          size="small"
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
            color="primary"
            onClick={() => formik.handleSubmit()}
          >
            Enviar
          </Button>

          <Button
            onClick={() => history.push("/login")}
            variant="outlined"
            color="primary"
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
        color="primary.main"
        mb={1}
        align={mdQuery ? "center" : "left"}
      >
        Verifique seu e-mail
      </Typography>
      <Typography
        color="text.primary"
        variant="h6"
        align={mdQuery ? "center" : "left"}
      >
        {`Enviamos um link de recuperação para o e-mail ${inputEmail.value}. Confira sua caixa de
        entrada e clique no link de confirmação para criar uma nova senha.`}
      </Typography>
      <Typography
        mt={1}
        color="text.primary"
        align={mdQuery ? "center" : "left"}
      >
        Se não receber o e-mail em 5 minutos:
      </Typography>
      <Typography
        ml={1}
        mt={1}
        color="text.primary"
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
          sx={{ height: "2rem" }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleUserbyEmail}
        >
          Reenviar Email
        </Button>
        <Button
          sx={{ height: "2rem" }}
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() => history.push("/login")}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
  return (
    <Container
      sx={{
        height: "calc(100vh - 20px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        gap={2}
        container
        display="flex"
        // flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
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
            <THCStype1 fill={theme.palette.primary.main} width={"100%"} />
          </Box>
        </Grid>

        {sendEmail ? recoverySend() : recovery()}
      </Grid>

      <Grid
        item
        sx={{
          // backgroundColor: theme.palette.grey[200],
          alignContent: "center",
          // fontSize: "20px",
          textDecoration: "bold",
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",
          padding: "0.1rem",
          position: "fixed",
          left: "0",
          bottom: "0",
          // height: "40px",
          width: "100%",
        }}
      >
        <Typography variant="body2" align="center">
          <Link
            href="https://www.tascominformatica.com.br/"
            sx={{
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
    </Container>
  );
}
