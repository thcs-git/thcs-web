import { TextField } from "@material-ui/core";
import Button from '../../../components/Button';
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import { FeedbackContent, FeedbackImage, FeedbackTitle,FeedbackButtonsContent, FeedbackDescription } from "./style";

interface IPageParams {
  id?: string;
  email?:string
}

export default function VerifyEmailForm(props: RouteComponentProps<IPageParams>) {

  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = props.match;
  const [inputEmail, setInputEmail]=useState({value:""});

  return (
    <>
       <FeedbackContent>
      <FeedbackImage>
        <SuccessImage />
      </FeedbackImage>
      <FeedbackTitle>
        Seja bem-vindo ao Sollar!!
      </FeedbackTitle>

      <FeedbackDescription>
        Você logo será redirecionado para a página de login, ou pode clicar no botão aqui em baixo.
      </FeedbackDescription>

      <FeedbackButtonsContent>
        <Button  variant="outlined" onClick={() => history.push('/login')}>Login</Button>
      </FeedbackButtonsContent>

    </FeedbackContent>
    </>
  )
}
