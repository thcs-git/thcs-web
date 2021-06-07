
import Button from '../../../components/Button';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import { FeedbackContent,FormGroupSection, FeedbackImage, FeedbackTitle,FeedbackButtonsContent, FeedbackDescription } from "./style";
import { loadCheckEmail, cleanAction,loadRecoveryPassword, loadUserByEmail, loadRequest,loadUserTypesRequest} from "../../../store/ducks/users/actions";
import { UserInterface } from "../../../store/ducks/users/types";
import { TextField } from '@material-ui/core';
import { ApplicationState } from '../../../store';
import { UserRecoveryPassword } from "../../../store/ducks/users/types";

const SIZE_INPUT_PASSWORD = 3;
interface IPageParams {
  id?: string;
  email?:string;
  token?:string;
}

export default function RecoveryPasswordPage(props: RouteComponentProps<IPageParams>) {

  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = props.match;
  const [inputEmail, setInputEmail]=useState({value:"",error:false});
  const [newPassword,setNewPassword] = useState({value:"",error:false});
  const [newConfirmPassword,setNewConfirmPassword] = useState({value:""});
  const userState = useSelector((state: ApplicationState) => state.users);
  const [ok,setOk] = useState(false);
  const [userecovery, setUserecovery] = useState<UserRecoveryPassword>({
    _id:"",
    password:""

  })
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

  useEffect( ()=>{
      dispatch(cleanAction());
  },[]);
  useEffect(() =>{
    dispatch(loadCheckEmail(params.token));
  },[params])

  useEffect(()=>{
    setUserecovery(prev=>({
      ...prev,
      _id:params.token?params.token:""
    }))
  },[params])

  const  handleValidatePassword = useCallback(()=>{
    setNewPassword(prev => ({ ...prev, error: !(newPassword.value.length >= SIZE_INPUT_PASSWORD
      && newPassword.value == newConfirmPassword.value) }));
      setUserecovery(prev=>({
        ...prev,
        password:newPassword.value
      }))
      }
  ,[newPassword])

  const  recoveryPassword= useCallback(()=>{
    if(!newPassword.error){

        console.log(userecovery);
    dispatch(loadRecoveryPassword(userecovery));
    setOk(true);
    }
  },[newPassword])

  return (
    <>
    { userState.error && (
      <FeedbackContent>
      <FormGroupSection>
        <FeedbackTitle>
          Infelizmente não foi possível alterar a sua senha
        </FeedbackTitle>
        <FeedbackDescription>
        O usuário é inválido ou o link expirou.
        Por favor refaça os procedimento para alteração de senha.
        </FeedbackDescription>

      </FormGroupSection>
    </FeedbackContent>
    )}

      { !ok && (
        <FeedbackContent>
        <FormGroupSection>
          <FeedbackTitle>
            Cadastrar nova senha
          </FeedbackTitle>

          <FeedbackDescription>
            <TextField
                type="password"
                label="Nova senha"
                variant="outlined"
                size="small"
                error={newPassword.error}
                onChange={element=>{
                  setNewPassword(prev=>({
                    ...prev,
                    value:element.target.value
                  }))
                }
              }
              onBlur={handleValidatePassword}
            >
            </TextField>
          </FeedbackDescription>
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
          <FeedbackButtonsContent>
            <Button  variant="outlined" onClick={recoveryPassword}>Alterar Senha</Button>
          </FeedbackButtonsContent>

        </FeedbackContent>
      )}

    { ok &&  (
      <FeedbackContent>
        <FormGroupSection>
          <FeedbackTitle>
            Sua Senha foi alterada com sucesso
          </FeedbackTitle>
          <FeedbackDescription>
            Por favor click no botão abaixo e faça login novamente com sua nova senha.
          </FeedbackDescription>
          <FeedbackButtonsContent>
          <Button  variant="outlined" onClick={()=>{ history.push("/login")}}>Login</Button>
        </FeedbackButtonsContent>
        </FormGroupSection>
        </FeedbackContent>
    ) }

    </>
  )
}
