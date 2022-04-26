import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@material-ui/core";

import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";
import TabForm from "../../../components/Tabs";
import TabTittle from "../../../components/Text/TabTittle";
import NotFound from "../../../components/Erros/NotFound";

import { RouteComponentProps, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { UserInterface } from "../../../store/ducks/users/types";
import { getAddress as getAddressAction } from "../../../store/ducks/customers/actions";
import {
  cleanAction,
  createUserRequest,
  loadRequestByClient,
  loadUserById,
  updateUserRequest,
} from "../../../store/ducks/users/actions";
import ButtonTabs from "../../../components/Button/ButtonTabs";
import { toast } from "react-toastify";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import { checkViewPermission } from "../../../utils/permissions";
import NoPermission from "../../../components/Erros/NoPermission";
interface IPageParams {
  id?: string;
  mode?: string;
  callback?: string;
}

export default function UserClientForm(
  props: RouteComponentProps<IPageParams>
) {
  const { params } = props.match;

  const dispatch = useDispatch();
  const history = useHistory();

  const userState = useSelector((state: ApplicationState) => state.users);
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
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

  const [canEdit, setCanEdit] = useState(false);

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

  useEffect(() => {
    if (params.id) {
      dispatch(loadUserById(params.id, "userclient"));
    } else {
      dispatch(cleanAction());
    }
  }, [params]);

  useEffect(() => {
    if (userState.data._id) {
      setState((prevState) => ({
        ...userState.data,
      }));
    }
    if (params?.id) {
      if (
        params.mode === "view" ||
        params.mode === "link" ||
        params.mode === "linking"
      ) {
        setCanEdit(false);
      }
    }
  }, [userState]);

  const NavItems = [
    {
      name: "Dados Pessoais",
      components: ["UserForm", "CepForm", "UserContactForm"],
    },
    {
      name: "Dados Profissionais",
      components: ["UserProfessionForm"],
    },
  ];

  if (params.callback != "userconfiguration") {
    NavItems.push({
      name: "Dados da Empresa",
      components: ["UserCompanyForm"],
    });
  }

  const handleSaveFormUser = useCallback(() => {
    dispatch(updateUserRequest(state));
    history.push("/userclient");
  }, [state]);

  const handleCancelFormUser = useCallback(() => {
    history.push("/userclient");
  }, []);

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

  const buttons = [
    {
      name: "Voltar",
      onClick: handleCancelFormUser,
      variant: "contained",
      background: "secondary",
      show: true,
    },
  ];

  if (!integration) {
    buttons.push({
      name: "Salvar",
      onClick: handleSaveFormUser,
      variant: "contained",
      background: "success",
      show: true,
    });
  }

  return (
    <>
      <Sidebar>
        {checkViewPermission(
          "userclient",
          JSON.stringify(rightsOfLayoutState)
        ) ||
        checkViewPermission("user", JSON.stringify(rightsOfLayoutState)) ? (
          <Container>
            {params.mode === "view" ? (
              <>
                {/* {userState.loading && <Loading />} */}
                <TabTittle tittle={"Detalhamento do profissional"} />
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
              </>
            ) : (
              <NotFound backOnclick={() => history.push("/")} />
            )}
          </Container>
        ) : (
          <NoPermission />
        )}
      </Sidebar>
    </>
  );
}
