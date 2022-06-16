import Button from "../../../components/Button";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useNavigate } from "react-router-dom";
import { ReactComponent as SuccessImage } from "../../../assets/img/ilustracao-avaliacao-concluida.svg";
import {
  FeedbackContent,
  FeedbackImage,
  FeedbackTitle,
  FeedbackButtonsContent,
  FeedbackDescription,
} from "./style";
import {
  loadCheckEmail,
  cleanAction,
} from "../../../store/ducks/users/actions";
import { UserInterface } from "../../../store/ducks/users/types";
import { ApplicationState } from "../../../store";

interface IPageParams {
  id?: string;
  email?: string;
  token?: string;
}

export default function VerifyEmailForm(props: IPageParams) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputEmail, setInputEmail] = useState({ value: "" });
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

  useEffect(() => {
    console.log(params);
    if (params.token) {
      dispatch(cleanAction());
      dispatch(loadCheckEmail(params.token));
    }
  }, [params]);

  return (
    <>
      {userState.error ? (
        navigate("/login")
      ) : (
        <FeedbackContent>
          <FeedbackImage>
            <SuccessImage />
          </FeedbackImage>
          <FeedbackTitle>Seja bem-vindo ao Sollar!!</FeedbackTitle>
          <FeedbackDescription>
            Você logo será redirecionado para a página de login, ou pode clicar
            no botão aqui em baixo.
          </FeedbackDescription>

          <FeedbackButtonsContent>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Login
            </Button>
          </FeedbackButtonsContent>
        </FeedbackContent>
      )}
    </>
  );
}
