import { TextField } from "@mui/material";
import Button from "../../../components/Button";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import {
  FeedbackContent,
  FeedbackImage,
  FeedbackTitle,
  FeedbackButtonsContent,
  FeedbackDescription,
} from "./style";

interface IPageParams {
  id?: string;
  email?: string;
  token?: string;
}

export default function ConfirmEmailForm(props: IPageParams) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputEmail, setInputEmail] = useState({ value: "" });

  useEffect(() => {
    if (params.email) {
      setInputEmail({
        ...inputEmail,
        value: params.email,
      });
    }
  }, []);

  return (
    <FeedbackContent>
      <FeedbackImage>
        <SuccessImage />
      </FeedbackImage>
      <FeedbackTitle>Estamos quase lá !</FeedbackTitle>
      <FeedbackDescription>
        Foi enviado um email de ativação para sua o email informado{" "}
        {params.email || ""},<br />
      </FeedbackDescription>
      <FeedbackDescription>
        Por favor verifique seu email para ativar a sua conta.
      </FeedbackDescription>
      <FeedbackDescription>
        Caso você esse email não seja o certo por vafor preencha o campo abaixo
        e clique em reenviar email
      </FeedbackDescription>
      <TextField
        variant="outlined"
        size="small"
        autoFocus
        value={inputEmail.value}
        onChange={(element) => {
          setInputEmail({ ...inputEmail, value: element.target.value });
        }}
      ></TextField>
      <FeedbackButtonsContent>
        <Button variant="outlined">Reenviar email</Button>
      </FeedbackButtonsContent>
    </FeedbackContent>
  );
}
