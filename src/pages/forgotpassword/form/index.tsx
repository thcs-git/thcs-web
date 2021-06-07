import Button from '../../../components/Button';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import { FeedbackContent,FormGroupSection, FeedbackImage, FeedbackTitle,FeedbackButtonsContent, FeedbackDescription } from "./style";
import { loadCheckEmail, cleanAction, loadUserByEmail,loadUserTypesRequest } from "../../../store/ducks/users/actions";
import { UserInterface } from "../../../store/ducks/users/types";
import { TextField } from '@material-ui/core';
import { ApplicationState } from '../../../store';



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
  });
  // function handleUserbyEmail(value:any){
  //   dispatch(loadUserByEmail(value));

  // }
  const handleUserbyEmail = useCallback(()=>{
    dispatch(loadUserByEmail(inputEmail.value))
  },[inputEmail])



  return (
    <>

      <FeedbackContent>
      <FormGroupSection>
        <FeedbackTitle>
          Esqueci senha
        </FeedbackTitle>
        <FeedbackDescription>
          Por favor informe o email para a recuperação de senha:
        </FeedbackDescription>
        <FeedbackDescription>
          <TextField
              label="Email"
              variant="outlined"
              size="small"
              onChange={element=> setInputEmail(prev=>({
                ...prev,
                value:element.target.value
              }))}
              onBlur={handleUserbyEmail}

          >
          </TextField>
        </FeedbackDescription>
        { userState.success && (
          <FeedbackDescription>
          Foi enviado um link para o seu email por favor confirme antes de trocar de senha
        </FeedbackDescription>
        ) }
           { userState.error && (
          <FeedbackDescription>
          Infelizmente não foi encontrado um usuário com este email, por favor confirme o email ou enter em contato com o suporte.
        </FeedbackDescription>
        ) }

        </FormGroupSection>
        {/* <FeedbackButtonsContent>
          <Button  variant="outlined" onClick={() => history.push('/login')}>Resetar Senha</Button>
        </FeedbackButtonsContent> */}

      </FeedbackContent>
    </>
  )
}
