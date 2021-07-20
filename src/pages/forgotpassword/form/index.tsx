import Button from '../../../components/Button';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import { ReactComponent as VerifyImage } from "../../../assets/img/illustracao-verificar-email.svg";
import { FeedbackContent,FormGroupSection, FeedbackImage,HomeIconLogo,TextBlue, FeedbackTitle,FeedbackButtonsContent,TextGray, FeedbackDescription } from "./style";
import { loadCheckEmail, cleanAction, loadUserByEmail,loadUserTypesRequest } from "../../../store/ducks/users/actions";
import { UserInterface } from "../../../store/ducks/users/types";
import { TextField, Grid, Typography, Divider } from '@material-ui/core';
import { ApplicationState } from '../../../store';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {

    margin: theme.spacing(3, 0, 2),
    padding: '10px',
    textTransform: 'capitalize',
    fontSize: '18px',
    backgroundColor: 'var(--success)',
    boxShadow:"0 0 1em #dadada",
    '&:hover': {
      backgroundColor: '#4fc66ae3',
      fontWeight: 'bold',
      transition: '300ms',
    }
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(1,1,0,1)
  },
  footerStyle : {
    backgroundColor: "#dadada",
    alignContent:"center",
    fontSize: "20px",
    color: "#0899BA",
    textDecoration:"bold",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "40px",
    width: "100%"
  }
}))
interface IPageParams {
  id?: string;
  email?:string;
  token?:string;
}

export default function ForgotPasswordPage(props: RouteComponentProps<IPageParams>) {

  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = props.match;
  const [inputEmail, setInputEmail]=useState({value:""});
  const [sendEmail,setSendEmail] = useState(true);
  const userState = useSelector((state: ApplicationState) => state.users);
  const [state, setState] = useState<UserInterface>({
    companies: [],
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
    email: "",
    phone: "",
    cellphone: "",
    user_type_id: "",
    specialties: [],
    council_state: "",
    council_number: "",
    verified: "",
    active: true,
    professions:[]
  });
  // function handleUserbyEmail(value:any){
  //   dispatch(loadUserByEmail(value));

  // }
  const handleUserbyEmail = useCallback(()=>{
    dispatch(loadUserByEmail(inputEmail.value))
    setSendEmail(true);
  },[inputEmail])
  const classes = useStyles();

  return (
    <>
      <FeedbackContent >
        <Box display="flex" width={150} height={165} justifyContent="center" alignItems="center" style={{margin:"2rem"}}>
            <HomeIconLogo />
          </Box>
     <FormGroupSection>

       {userState.success?(
         <Grid container direction="column">
           <Grid item style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
           <VerifyImage />
           </Grid>
           <Grid item style={{display:"flex", justifyContent:"center", alignContent:"center",marginTop:"1rem"}}>
           <FeedbackTitle>
              Verifique seu email
            </FeedbackTitle>
           </Grid>
           <Grid item >
           <FeedbackDescription style={{textAlign:"center"}}>
              Enviamos um link de recuperação para seu e-mail. Por favor confira sua caixa <br />
              de entrada e clique no link de confirmação para criar uma nova senha.
            </FeedbackDescription>
           </Grid>

           <Grid item md={4} style={{alignSelf:'center',justifySelf:'center'}}>
           <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUserbyEmail}
            >
              Reenviar Email
          </Button>
           </Grid>
           <Grid item style={{paddingTop:"2rem"}}>
           <Divider></Divider>
           <Box textAlign="center" width="100%" className={classes.form}>
                <TextGray >
                  Já tem um cadastro? {' '}
                  <Link to={"/login"}>
                    <TextBlue>
                      Clique aqui{' '}
                    </TextBlue>
                  </Link>
            </TextGray>
              </Box>
           </Grid>
         </Grid>
        ):(
        <Grid container direction="column">
          {userState.error?(
          <FeedbackDescription>
          Infelizmente não foi encontrado um usuário com este email, <br />cpor favor confirme o email ou enter em contato com o suporte.
        </FeedbackDescription>
        ):(
          <>
          <Grid item>
            <FeedbackTitle>
              Redefina sua senha
            </FeedbackTitle>
         </Grid>
         <Grid item>
            <FeedbackDescription>
            Insira seu e-mail para enviarmos um link de recuperação:
            </FeedbackDescription>
         </Grid>
         <Grid item>
         <FeedbackDescription>
          <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              onChange={element=> setInputEmail(prev=>({
                ...prev,
                value:element.target.value
              }))}

          >
          </TextField>
        </FeedbackDescription>
         </Grid>

         <Grid item>
         <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUserbyEmail}
            >
              Enviar
          </Button>
          <Box textAlign="center" width="100%" className={classes.form}>
                <TextGray >
                  Já tem um cadastro? {' '}
                  <Link to={"/login"}>
                    <TextBlue>
                      Clique aqui{' '}
                    </TextBlue>
                  </Link>
            </TextGray>
              </Box>
         </Grid>
          </>
        )}
       </Grid>)}
        </FormGroupSection>
          <Typography  color="inherit" className={classes.footerStyle}>
            <strong>Portal Sollar © 2021</strong>
          </Typography>
      </FeedbackContent>
    </>
  )
}
