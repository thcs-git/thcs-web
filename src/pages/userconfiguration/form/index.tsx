import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

//helps
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

// Components
import Sidebar from "../../../components/Sidebar";
import Loading from "../../../components/Loading";
import TabForm from "../../../components/Tabs";
import TabTittle from "../../../components/Text/TabTittle";
import NotFound from "../../../components/Erros/NotFound";
import ButtonTabs, { IButtons } from "../../../components/Button/ButtonTabs";

// redux e Sagas
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { cleanAction, loadUserById } from "../../../store/ducks/users/actions";
import { UserInterface } from "../../../store/ducks/users/types";
import { getAddress as getAddressAction } from "../../../store/ducks/customers/actions";

// MUI
import Container from "@mui/material/Container";

export default function UserCongiguration(props: RouteComponentProps<any>) {
  const params = { mode: "view" };
  const userState = useSelector((state: ApplicationState) => state.users);
  const currentUser = window.localStorage.getItem(LOCALSTORAGE.USER_ID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const NavItems = [
    {
      name: "Dados Pessoais",
      components: ["UserForm", "CepForm", "UserContactForm"],
    },
    {
      name: "Dados Profissionais",
      components: ["UserProfessionForm"],
    },
    { name: "Dados da Empresa", components: ["UserCompanyForm"] },
    { name: "Senha", components: ["ChangePassword"] },
  ];
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
    phones: [
      {
        cellnumber: "",
        number: "",
        telegram: false,
        whatsapp: false,
      },
    ],
  });
  const [fieldsValidation, setFieldValidations] = useState<any>({
    companies: false,
    name: false,
    birthdate: false,
    gender: false,
    national_id: false,
    issuing_organ: false,
    fiscal_number: false,
    mother_name: false,
    nationality: false,
    address: {
      postal_code: false,
      street: false,
      number: false,
      district: false,
      city: false,
      state: false,
      complement: true,
    },
    email: false,
    phone: false,
    cellphone: false,
    user_type_id: false,
    specialties: true,
    council_state: false,
    council_number: false,
    active: true,
  });
  const buttons: IButtons[] = [
    {
      name: "Voltar",
      onClick: () => {
        navigate("/");
      },
      variant: "contained",
      background: "primary",
      show: true,
    },
  ];
  const [canEdit, setCanEdit] = useState(false);
  const getAddress = useCallback(() => {
    dispatch(getAddressAction(userState.data.address.postal_code));
  }, [state.address.postal_code]);

  // useEfects
  useEffect(() => {
    if (currentUser) {
      dispatch(loadUserById(currentUser, "userconfiguration"));
    } else {
      dispatch(cleanAction());
    }
  }, [currentUser]);

  useEffect(() => {
    if (userState.data._id) {
      setState((prevState) => ({
        ...userState.data,
      }));
    }
  }, [userState]);

  return (
    <Sidebar>
      <Container>
        {/* {userState?.loading && <Loading />} */}
        <TabTittle tittle={"Meus dados"} />
        <TabForm
          navItems={NavItems}
          initialTab={0}
          state={state}
          setState={setState}
          setValidations={setFieldValidations}
          canEdit={canEdit}
          cepStatus={userState.errorCep}
          getAddress={getAddress}
          params={params}
        />
        <ButtonTabs canEdit={canEdit} buttons={buttons} />
      </Container>
    </Sidebar>
  );
}
