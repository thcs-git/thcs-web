import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps, Link } from "react-router-dom";
import { cpf } from "cpf-cnpj-validator";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  FormControlLabel,
  makeStyles,
  Collapse,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { AccountCircle, Edit } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputMask from "react-input-mask";
import validator from "validator";
import { toast } from "react-toastify";
import { loadCustomerById } from "../../../store/ducks/customers/actions";
import { CustomerInterface } from "../../../store/ducks/customers/types";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserRequest,
  updateUserRequest,
  getAddress as getAddressAction,
  loadUserById,
  loadProfessionsRequest as getProfessionsAction,
  loadUserTypesRequest as getUserTypesAction,
  cleanAction,
} from "../../../store/ducks/users/actions";
import {
  UserInterface,
  ProfessionUserInterface,
  CompanyUserInterface,
  CompanyUserLinkInterface,
} from "../../../store/ducks/users/types";

import { loadRequest as getSpecialtiesAction } from "../../../store/ducks/specialties/actions";
import { SpecialtyInterface } from "../../../store/ducks/specialties/types";

import { loadRequest as getCouncilsAction } from "../../../store/ducks/councils/actions";
import { CouncilInterface } from "../../../store/ducks/councils/types";

import {
  loadCompanyById,
  loadRequest as getCompaniesAction,
} from "../../../store/ducks/companies/actions";
import { CompanyInterface } from "../../../store/ducks/companies/types";

import { ApplicationState } from "../../../store";

import { ufs } from "../../../helpers/constants/address";
import Loading from "../../../components/Loading";

import Sidebar from "../../../components/Sidebar";
import { FormTitle } from "../../../styles/components/Form";
import { SwitchComponent as Switch } from "../../../styles/components/Switch";
import { ChipComponent as Chip } from "../../../styles/components/Chip";

import DatePicker from "../../../styles/components/DatePicker";
import {
  TabContent,
  TabNav,
  TabNavItem,
  TabBody,
  TabBodyItem,
} from "../../../styles/components/Tabs";
import ButtonComponent from "../../../styles/components/Button";
// @ts-ignore
import FeedbackUserComponent from "../../../components/FeedbackUser";

import { formatDate, age } from "../../../helpers/date";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  FormGroupSection,
  ChipList,
  DivideTitle,
} from "./styles";
import { UserContent } from "../../../components/Sidebar/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { BoxCustom } from "../../customer/form/styles";
import _ from "lodash";
// @ts-ignore
import Sidebar_menu from "../../../components/Sidebar_menu";
import moment from "moment";

interface IFormFields {
  userType: { id: string; description: string } | null;
  council: CouncilInterface | null;
}

interface IPageParams {
  id?: string;
  mode?: string;
}

export default function UserForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();

  const userState = useSelector((state: ApplicationState) => state.users);
  const specialtyState = useSelector(
    (state: ApplicationState) => state.specialties
  );
  const councilState = useSelector((state: ApplicationState) => state.councils);
  const companyState = useSelector(
    (state: ApplicationState) => state.companies
  );
  const customerState = useSelector(
    (state: ApplicationState) => state.customers
  );
  const [canEdit, setCanEdit] = useState(true);
  const [linkChecked, setLinkChecked] = useState(false);
  const { params } = props.match;

  const currentCompany =
    localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "";
  const currentCustomer = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";

  const [currentTab, setCurrentTab] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [companyLink, setcompanyLink] = useState("");
  const [add, setAdd] = useState(false);
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

  const [specialties, setSpecialties] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [company, setCompany] = useState<CompanyInterface>({
    _id: params.id || "",
    customer_id: localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "",
    name: "",
    fantasy_name: "",
    fiscal_number: "",
    address: {
      postal_code: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      complement: "",
    },
    responsable_name: "",
    email: "",
    phone: "",
    cellphone: "",
    active: true,
    created_by: { _id: localStorage.getItem(LOCALSTORAGE.USER_ID) || "" },
    phones: [
      {
        cellnumber: "",
        number: "",
        telegram: false,
        whatsapp: false,
      },
    ],
    tipo: "",
  });

  const [customer, setCustomer] = useState<CustomerInterface>();
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
    phones: [
      {
        number: false,
        cellnumber: false,
      },
    ],
    email: false,
    phone: false,
    cellphone: false,
    user_type_id: false,
    specialties: true,
    council_state: false,
    council_number: false,
    active: true,
  });

  const [form, setForm] = useState<IFormFields>({
    userType: null,
    council: null,
  });

  const genders = ["Masculino", "Feminino", "Indefinido"];
  const [checkCompany, setCheckCompany] = useState(false);
  const [openModalCancel, setOpenModalCancel] = useState(false);

  const [firstCall, setFirstcall] = useState(false);

  //////////////// validacao do campos ///////////////////////
  var isValidPhoneNumber: any;
  var isValidCellPhoneNumber: any;
  var formValid: any;

  var cepError = false;
  if (userState.error && state.address.postal_code != "") {
    cepError = true;
  }

  const validatePhone = () => {
    if (state.phones[0]?.number) {
      const landline = state.phones[0]?.number
        .replace("(", "")
        .replace(")", "9")
        .replace(" ", "")
        .replace(" ", "")
        .replace("-", "");

      isValidPhoneNumber = validator.isMobilePhone(landline, "pt-BR");

      return isValidPhoneNumber;
    }
  };

  const validateCellPhone = () => {
    if (state.phones[0]?.cellnumber) {
      const landline = state.phones[0]?.cellnumber
        .replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace(" ", "")
        .replace("-", "");

      isValidCellPhoneNumber = validator.isMobilePhone(landline, "pt-BR");

      return isValidCellPhoneNumber;
    }
  };
  const checkIsCpfValid = useCallback(() => {
    return !!cpf.isValid(state.fiscal_number);
  }, [state.fiscal_number]);

  // const validateCellPhone = () => {
  //   try {
  //     var cellphone = state.phones[0]?.cellnumber.replace('(', '').replace(')', '').replace(' ', '').replace(' ', '').replace('-', '');
  //     isValidCellPhoneNumber = validator.isMobilePhone(cellphone, 'pt-BR');
  //     return (isValidCellPhoneNumber)
  //   } catch {

  //   }
  // }

  if (validatePhone() == true && validateCellPhone() == true) {
    formValid = true;
  }

  const useStyles = makeStyles((theme) => ({
    cancel: {
      textTransform: "capitalize",
      fontSize: "18px",
      "&:hover": {
        backgroundColor: "#f1d4d4",
        color: "var(--danger)",
        borderColor: "var(--danger-hover)",
      },
      maxHeight: "38px",

      borderColor: "var(--danger-hover)",
      color: "var(--danger-hover)",
      contrastText: "#fff",
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    dispatch(cleanAction());
    dispatch(getSpecialtiesAction());
    dispatch(getCouncilsAction());
    dispatch(getProfessionsAction());
    dispatch(getUserTypesAction());
    if (currentC != "SEM") {
      dispatch(getCompaniesAction());
      dispatch(loadCompanyById(currentCompany));
      dispatch(loadCustomerById(currentCustomer));
    }
  }, [currentCustomer]);
  const currentC = window.localStorage.getItem(LOCALSTORAGE.CUSTOMER_NAME);
  useEffect(() => {
    if (params.id) {
      dispatch(loadUserById(params.id, "user"));
    } else {
      dispatch(cleanAction());
    }
  }, [params]);

  useEffect(() => {
    setSpecialties(specialtyState.list.data);
  }, [specialtyState.list.data]);
  useEffect(() => {
    setCompany(companyState.data);
  }, [companyState]);

  useEffect(() => {
    setCompanies(companyState.list.data);
  }, [companyState.list.data]);

  useEffect(() => {
    checkUserPerfilCompany(company);
  }, [state, companyState]);

  useEffect(() => {
    setCustomer(customerState.data);
  }, [customerState]);
  useEffect(() => {
    if (userState.data._id) {
      let joinState = [state, userState.data];

      if (!firstCall && params.mode === "linking") {
        setCurrentTab(2);
      }

      setState((prevState) => ({
        ...joinState[firstCall ? 0 : 1],
        // user_type_id:
        //   typeof userState.data.user_type_id === "object"
        //     ? userState.data.user_type_id._id
        //     : userState.data.user_type_id,
      }));
      setFirstcall(true);
    }
    // Força o validador em 'true' quando entrar na tela para editar
    if (params?.id) {
      if (
        params.mode === "view" ||
        params.mode === "link" ||
        params.mode === "linking"
      ) {
        setCanEdit(false);
      }
      setFieldValidations({
        companies: true,
        name: true,
        birthdate: true,
        gender: true,
        national_id: true,
        issuing_organ: true,
        fiscal_number: true,
        mother_name: true,
        nationality: true,
        address: {
          postal_code: true,
          street: true,
          number: true,
          district: true,
          city: true,
          state: true,
          complement: true,
        },
        email: true,
        phone: true,
        cellphone: true,
        user_type_id: true,
        specialties: true,
        council_state: true,
        council_number: true,
        active: true,
      });
    }
  }, [userState]);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        address: {
          ...userState.data.address,
        },
      };
    });

    if (userState.data.address.postal_code) {
      setFieldValidations((prevState: any) => ({
        ...prevState,
        address: {
          postal_code: true,
          street: true,
          number: !!userState.data.address.number,
          district: true,
          city: true,
          state: true,
          complement: true,
        },
        national_id: false,
      }));
    }

    if (userState.error) {
      cepError = true;

      setState((prevState) => {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            street: "",
            number: "",
            district: "",
            city: "",
            state: "",
            complement: "",
          },
        };
      });

      setFieldValidations((prevState: any) => ({
        ...prevState,
        address: {
          street: false,
          number: false,
          district: false,
          city: false,
          state: false,
          complement: false,
        },
      }));

      return;
    } else {
    }
  }, [userState.data.address]);

  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;

    delete fieldsValidation.national_id;

    for (let key of Object.keys(fieldsValidation)) {
      if (!fieldsValidation[key]) {
        isValid = false;
      }
    }

    return isValid;
  }, [fieldsValidation, state]);

  const selectTab = useCallback(
    (index: number) => {
      setCurrentTab(index);
    },
    [currentTab]
  );

  const handleUserType = useCallback(
    (event: any, newValue: any) => {
      setState((prevState) => ({
        ...prevState,
        user_type_id: newValue._id,
      }));
    },
    [state.user_type_id]
  );

  const handleCouncil = useCallback(
    (event: any, newValue: any) => {
      setState((prevState) => ({
        ...prevState,
        council_id: newValue,
      }));
    },
    [state.council_id]
  );

  const handleCouncilState = useCallback(
    (event: any, newValue: any) => {
      setState((prevState) => ({
        ...prevState,
        council_state: newValue.initials,
      }));
    },
    [state.council_state]
  );

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function checkUserPerfilCompany(company: CompanyInterface) {
    let companiesSelected = [...state.companies];
    const companyFounded = companiesSelected.findIndex((item: any) => {
      return company._id === item._id;
    });
    if (companyFounded > -1) {
      setCheckCompany(true);
    }
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    if (params?.mode == "config") {
      history.push(`/userconfiguration`);
    } else if (params?.mode == "link") {
      history.push(`/user`);
    } else {
      history.push(`/user`);
    }
  }

  function engagedUser() {
    const companyLinkSelected: CompanyUserLinkInterface[] = [];

    if (customer && customer._id) {
      var com: CompanyUserInterface = {
        _id: company._id ? company._id : "",
        name: company.name,
        customer_id: {
          _id: customer._id,
          name: customer.name,
        },
      };

      var companiesLinkSelected = [...state.companies_links];
      const companyLinkFounded = companiesLinkSelected.findIndex(
        (item: any) => {
          return company._id === item.companie_id._id;
        }
      );

      if (companyLinkFounded > -1) {
        let selected = companiesLinkSelected.splice(companyLinkFounded, 1)[0];
        selected.function = viewProfession();
        selected.active = true;
        selected.linked_at = new Date();

        if (linkChecked) {
          selected.exp = String(moment(companyLink).unix() + 86399);
        } else {
          selected.exp = "0";
        }

        companyLinkSelected.push(...companiesLinkSelected);
        companyLinkSelected.push(selected);
      } else {
        let selected = linkChecked
          ? {
              companie_id: company._id,
              customer_id: customer._id,
              function: viewProfession(),
              active: true,
              linked_at: new Date(),
              exp: String(moment(companyLink).unix() + 86399),
            }
          : {
              companie_id: company._id,
              customer_id: customer._id,
              function: viewProfession(),
              active: true,
              linked_at: new Date(),
              exp: "0",
            };
        companyLinkSelected.push(...companiesLinkSelected);
        companyLinkSelected.push(selected);
      }
    }

    if (company) {
      setState((prevState) => ({
        ...prevState,
        companies: [...prevState.companies, com],
        customer_id: company.customer_id,
        companies_links: companyLinkSelected,
      }));
    }
    setEngaged(true);
  }

  const dengagedUser = useCallback(
    (company: CompanyInterface) => {
      let companiesSelected = [...state.companies];
      let companiesLinkSelected = [...state.companies_links];
      const companyFounded = companiesSelected.findIndex((item: any) => {
        return company._id === item._id;
      });
      const companyLinkFounded = companiesLinkSelected.findIndex(
        (item: any) => {
          return company._id === item.companie_id._id;
        }
      );

      if (companyFounded > -1) {
        const companyData = companiesSelected.find((item: any) => {
          return company._id === item._id;
        });
        companiesSelected.splice(companyFounded, 1);

        setState((prevState) => ({
          ...prevState,
          companies: companiesSelected,
        }));
      }

      if (companyLinkFounded > -1) {
        let companyLink = companiesLinkSelected.splice(
          companyLinkFounded,
          1
        )[0];
        companyLink.active = false;

        companiesLinkSelected.push(companyLink);

        setState((prevState) => ({
          ...prevState,
          companies_links: companiesLinkSelected,
        }));
      }
      setEngaged(true);
    },
    [state.companies]
  );

  function handlerReturn() {
    if (params.mode == "link" || params.mode === "linking") {
      history.push("/userdesengaged");
    } else {
      history.push("/user");
    }
  }

  const handleBackStep = useCallback(() => {
    setCurrentTab((prevState) => prevState - 1);
    window.scrollTo(0, 200);
  }, [currentTab]);

  function handleSelectProfession(value: ProfessionUserInterface) {
    setState((prevState) => ({
      ...prevState,
      profession_id: value,
    }));
  }

  function getprofessionId() {
    if (typeof state.profession_id === "object") {
      return state?.profession_id?._id;
    } else {
      return state?.profession_id;
    }
  }

  const selectProfession = useCallback(() => {
    if (typeof userState.data.profession_id === "object") {
      const selected = userState.data.professions.filter((item) => {
        if (typeof state.profession_id === "object") {
          return item._id === state.profession_id._id;
        }
      });

      return selected[0] ? selected[0] : { _id: "", name: "" };
    }
  }, [
    userState.data.profession_id,
    userState.data.professions,
    state.profession_id,
  ]);

  function viewProfession() {
    if (!userState.data.professions) {
      // return null;
    } else {
      const selected = userState.data.professions.filter((item) => {
        if (typeof state.profession_id === "object") {
          return item._id === state?.profession_id?._id;
        }
      });

      return selected[0] ? selected[0].name : null;
    }
  }

  function viewMainSpecialty() {
    if (!userState.data.main_specialty_id) {
      // return null;
    } else {
      return userState.data.main_specialty_id
        ? userState.data.main_specialty_id.name
        : null;
    }
  }

  function viewSpecialtes() {
    let especialidades = "";
    if (_.isEmpty(state.specialties)) {
    } else {
      state.specialties.map((specialty, index) => {
        especialidades = especialidades + ",";
      });
      return especialidades;
    }
  }

  // Especialides
  function handleSelectMainSpecialty(value: SpecialtyInterface) {
    setState((prevState) => ({
      ...prevState,
      main_specialty_id: {
        _id: value._id,
        name: value.name,
      },
    }));
  }

  function handleSelectEspecialty(value: SpecialtyInterface) {
    setState((prevState) => ({
      ...prevState,
      specialties: [...prevState.specialties, value],
    }));

    let specialtiesCopy: SpecialtyInterface[] = [...specialties];

    const specialtyIndex = specialtiesCopy.findIndex(
      (item) => item._id === value._id
    );

    if (specialtyIndex > -1) {
      specialtiesCopy.splice(specialtyIndex, 1);
      setSpecialties(specialtiesCopy);
    }
  }

  function handleDeleteEspecialty(especialty: SpecialtyInterface) {
    if (canEdit) {
      let specialtiesSelected = [...state.specialties];

      const especialtyFounded = specialtiesSelected.findIndex((item: any) => {
        return especialty._id === item._id;
      });

      if (especialtyFounded > -1) {
        const specialtyData = specialtiesSelected.find((item: any) => {
          return especialty._id === item._id;
        });

        let specialtiesCopy = [...specialties];

        specialtiesCopy.push(specialtyData);
        setSpecialties(specialtiesCopy);

        setState((prevState) => ({
          ...prevState,
          specialties: specialtiesSelected,
        }));
      }
    }
  }

  const selectMainSpecialty = useCallback(() => {
    const selected = specialtyState.list.data.filter((item) => {
      if (typeof state.main_specialty_id === "object") {
        return item._id === state?.main_specialty_id?._id;
      }
    });

    return selected[0] ? selected[0] : null;
  }, [state.main_specialty_id]);

  const selectCouncil = useCallback(() => {
    const selected = councilState.list.data.filter(
      (item) => item._id === state.council_id?._id
    );

    return selected[0] ? selected[0] : null;
  }, [state.council_id]);

  const selectCouncilState = useCallback(() => {
    const selected = ufs.filter(
      (item) => item.initials === state.council_state
    );

    return selected[0] ? selected[0] : null;
  }, [state.council_state]);

  const selectUserType = useCallback(() => {
    if (!customerState.data.usertypes) {
      return null;
    }

    const selected = customerState.data.usertypes.filter(
      (item) => item._id === state.user_type_id
    );

    return selected[0] ? selected[0] : null;
  }, [state.user_type_id, state.user_types]);

  const handleSelectUserType = useCallback((value: any) => {
    setState((prevState) => ({
      ...prevState,
      user_type_id: value._id,
    }));
  }, []);

  //Empresas
  function handleSelectCompany(value: CompanyUserInterface) {
    setState((prevState) => ({
      ...prevState,
      companies: [...prevState.companies, value],
    }));

    let companiesCopy: CompanyInterface[] = [...companies];

    const companiesIndex = companiesCopy.findIndex(
      (item) => item._id === value._id
    );

    if (companiesIndex > -1) {
      companiesCopy.splice(companiesIndex, 1);

      setFieldValidations((prevState: any) => ({
        ...prevState,
        companies: companiesCopy.length > 0,
      }));

      setCompanies(companiesCopy);
    }
  }

  async function handleDeleteCompany(company: CompanyInterface) {
    if (canEdit) {
      let companiesSelected = [...state.companies];
      const companyFounded = companiesSelected.findIndex((item: any) => {
        return company._id === item._id;
      });

      if (companyFounded > -1) {
        const companyData = companiesSelected.find((item: any) => {
          return company._id === item._id;
        });
        companiesSelected.splice(companyFounded, 1);

        let companiesCopy = [...companies];

        companiesCopy.push(companyData);
        setCompanies(companiesCopy);

        setState((prevState) => ({
          ...prevState,
          companies: companiesSelected,
        }));
      }
    }
  }

  function mycompanys() {
    const customer = localStorage.getItem(LOCALSTORAGE.CUSTOMER);

    let mycompanies: CompanyUserInterface[] = [];
    state?.companies?.map((value, index) => {
      if (value?.customer_id?._id === customer) {
        mycompanies.push(value);
      }
    });

    return mycompanies;
  }

  const handleSaveFormUser = useCallback(() => {
    if (!handleValidateFields()) {
      toast.error("Existem campos que precisam ser preenchidos para continuar");
      return;
    }
    if (state?._id) {
      dispatch(updateUserRequest(state));
      if (params.mode == "link" || params.mode === "linking") {
        history.push("/userdesengaged");
      } else if (params.mode == "view") {
        history.push("/userdesengaged");
      }
    } else {
      dispatch(createUserRequest(state));
    }
  }, [state]);

  const handleBackFormUser = useCallback(() => {
    if (state?._id) {
      if (params.mode == "link" || params.mode === "linking") {
        history.push("/user");
      } else if (params.mode == "view") {
        history.push("/user");
      } else if (params.mode == "config") {
        history.push("/userconfiguration");
      } else {
        history.push("/user");
      }
    }
  }, [state]);

  return (
    <>
      {currentC != "SEM" ? (
        <Sidebar>
          {/* {userState.loading && <Loading/>} */}
          <Container>
            {userState.success ? (
              <FeedbackUserComponent
                type="success"
                title="Cadastro concluído!"
                description="Os dados foram salvos no sistema!"
                buttons
                successAction={() => {
                  dispatch(cleanAction());
                  if (currentC != "SEM") {
                    history.push("/dashboard_user");
                  } else {
                    history.push("/dashboard_user");
                  }
                }}
                defaultAction={() => {
                  dispatch(cleanAction());
                  history.push("/dashboard_user");
                }}
              />
            ) : (
              <FormSection>
                <FormContent>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <FormTitle>Dados de usuário</FormTitle>

                    {/*{(params.id && params.mode == 'view' && !canEdit) && (*/}
                    {/*  <Button style={{marginTop: -20, marginLeft: 15, color: '#0899BA'}}*/}
                    {/*          onClick={() => setCanEdit(!canEdit)}>*/}
                    {/*    <Edit style={{marginRight: 5, width: 18}}/>*/}
                    {/*    Editar {canEdit}*/}
                    {/*  </Button>*/}
                    {/*)}*/}
                  </div>

                  <TabContent>
                    <TabNav>
                      <TabNavItem
                        className={currentTab === 0 ? "active" : ""}
                        onClick={() => selectTab(0)}
                      >
                        Dados Pessoais
                      </TabNavItem>
                      <TabNavItem
                        className={currentTab === 1 ? "active" : ""}
                        onClick={() => selectTab(1)}
                      >
                        Dados Profissionais
                      </TabNavItem>
                      {state.professions && !(params.mode === "config") && (
                        <TabNavItem
                          className={currentTab === 2 ? "active" : ""}
                          onClick={() => selectTab(2)}
                        >
                          Selecione Empresa
                        </TabNavItem>
                      )}
                    </TabNav>
                    <TabBody>
                      <TabBodyItem className={currentTab === 0 ? "show" : ""}>
                        <Grid container>
                          <Grid item md={12} xs={12}>
                            <TextField
                              disabled={!canEdit}
                              id="input-social-name"
                              label="Nome do usuário"
                              variant="outlined"
                              size="small"
                              value={state.name}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  name: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  name: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={7} xs={12}>
                            <TextField
                              disabled={!canEdit}
                              id="input-mother-name"
                              label="Nome da mãe"
                              variant="outlined"
                              size="small"
                              value={state.mother_name}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  mother_name: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  mother_name: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={3} xs={12}>
                            <DatePicker
                              id="input-birthdate"
                              label="Data de Nascimento"
                              disabled={!canEdit}
                              value={
                                state?.birthdate?.length > 10
                                  ? formatDate(state.birthdate, "YYYY-MM-DD")
                                  : state.birthdate
                              }
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  birthdate: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  birthdate: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              InputLabelProps={{
                                shrink: true,
                                style: { paddingBottom: 12 },
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={2} xs={12}>
                            <TextField
                              id="input-age"
                              label="Idade"
                              variant="outlined"
                              size="small"
                              value={age(state.birthdate)}
                              fullWidth
                              disabled
                            />
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item md={4} xs={12}>
                            <InputMask
                              mask="999.999.999-99"
                              disabled={!canEdit}
                              value={state.fiscal_number}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  fiscal_number: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  fiscal_number: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-fiscal-number"
                                  label="CPF"
                                  variant="outlined"
                                  size="small"
                                  placeholder="000.000.000-00"
                                  error={
                                    !checkIsCpfValid() &&
                                    state.fiscal_number != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                            {!checkIsCpfValid() && state.fiscal_number != "" && (
                              <p
                                style={{
                                  color: "#f44336",
                                  margin: "1px 5px 20px",
                                }}
                              >
                                Por favor insira um cpf válido
                              </p>
                            )}
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <InputMask
                              mask="9.999-999"
                              disabled={!canEdit}
                              value={state.national_id}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  national_id: element.target.value,
                                });
                              }}
                              onBlur={(element) =>
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  national_id: false,
                                }))
                              }
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-nation-id"
                                  label="RG"
                                  variant="outlined"
                                  size="small"
                                  placeholder="0.000-000"
                                  error={
                                    fieldsValidation.national_id &&
                                    state.national_id != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                          </Grid>

                          <Grid item md={5} xs={12}>
                            <TextField
                              id="input-emitting-organ"
                              label="Órgão Emissor"
                              variant="outlined"
                              size="small"
                              value={state.issuing_organ}
                              disabled={!canEdit}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  issuing_organ: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  issuing_organ: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={4} xs={12}>
                            <TextField
                              id="input-nationality"
                              label="Nacionalidade"
                              variant="outlined"
                              size="small"
                              value={state.nationality}
                              disabled={!canEdit}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  nationality: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  nationality: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={3} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-gender"
                                size="small"
                                disabled={!canEdit}
                                options={genders}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    disabled={!canEdit}
                                    label="Sexo"
                                    variant="outlined"
                                  />
                                )}
                                value={state.gender}
                                onChange={(element, value) => {
                                  setState({
                                    ...state,
                                    gender: value ? value : "",
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    gender: !validator.isEmpty(
                                      value ? value : ""
                                    ),
                                  }));
                                }}
                                noOptionsText="Nenhum resultado encontrado"
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                        </Grid>

                        <Divider style={{ marginBottom: 30 }} />

                        {/*  */}
                        <FormGroupSection>
                          <Grid container>
                            <Grid item md={2} xs={12}>
                              <InputMask
                                mask="99999-999"
                                disabled={!canEdit}
                                value={state.address?.postal_code}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      postal_code: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      postal_code: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                onBlur={getAddress}
                              >
                                {(inputProps: any) => (
                                  <TextField
                                    {...inputProps}
                                    disabled={!canEdit}
                                    id="input-postal-code"
                                    label="CEP"
                                    placeholder="00000-000"
                                    size="small"
                                    variant="outlined"
                                    error={
                                      userState.error &&
                                      !fieldsValidation.postal_code
                                    }
                                    fullWidth
                                  />
                                )}
                              </InputMask>
                              {userState.error &&
                                !fieldsValidation.address.postal_code && (
                                  <p
                                    style={{
                                      color: "#f44336",
                                      margin: "-2px 5px 10px",
                                    }}
                                  >
                                    CEP inválido
                                  </p>
                                )}
                            </Grid>

                            <Grid item md={10} xs={12}>
                              <TextField
                                id="input-address"
                                label="Endereço"
                                variant="outlined"
                                size="small"
                                value={state.address?.street}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      street: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      street: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>
                            <Grid item md={2} xs={12}>
                              <TextField
                                id="input-address-number"
                                label="Número"
                                variant="outlined"
                                size="small"
                                value={state.address?.number}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      number: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      number: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={10} xs={12}>
                              <TextField
                                id="input-address-complement"
                                label="Complemento"
                                variant="outlined"
                                size="small"
                                value={state.address?.complement}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      complement: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      complement: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                id="input-neighborhood"
                                label="Bairro"
                                variant="outlined"
                                size="small"
                                value={state.address?.district}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      district: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      district: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={5} xs={12}>
                              <TextField
                                id="input-city"
                                label="Cidade"
                                variant="outlined"
                                size="small"
                                value={state.address?.city}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      city: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      city: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={1} xs={12}>
                              <TextField
                                id="input-address-uf"
                                label="UF"
                                variant="outlined"
                                size="small"
                                value={state.address?.state}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      state: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      state: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>
                          </Grid>
                        </FormGroupSection>
                        <Grid container>
                          <Grid item md={6} xs={12}>
                            <TextField
                              id="input-email"
                              type="email"
                              label="E-mail"
                              variant="outlined"
                              size="small"
                              value={state.email}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  email: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  email: validator.isEmail(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                              disabled={!canEdit}
                            />
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <InputMask
                              mask="(99) 9999-9999"
                              disabled={!canEdit}
                              value={state.phones[0]?.number}
                              onChange={(element) => {
                                {
                                  setState((prevState) => ({
                                    ...prevState,
                                    phone: element.target.value,
                                    phones: [
                                      {
                                        ...prevState.phones[0],
                                        number: element.target.value,
                                      },
                                    ],
                                  }));
                                }
                              }}
                              onBlur={validatePhone}
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-phone"
                                  label="Telefone"
                                  variant="outlined"
                                  size="small"
                                  placeholder="0000-0000"
                                  error={
                                    !validatePhone() &&
                                    state.phones[0]?.number != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                            {!validatePhone() && state.phones[0]?.number && (
                              <p
                                style={{
                                  color: "#f44336",
                                  margin: "-10px 5px 10px",
                                }}
                              >
                                Por favor insira um número válido
                              </p>
                            )}
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <InputMask
                              mask="(99) 99999-9999"
                              disabled={!canEdit}
                              value={state.phones[0]?.cellnumber}
                              onChange={(element) => {
                                {
                                  setState((prevState) => ({
                                    ...prevState,
                                    // cellphone: element.target.value,
                                    phones: [
                                      {
                                        ...prevState.phones[0],
                                        cellnumber: element.target.value,
                                      },
                                    ],
                                  }));
                                }
                              }}
                              onBlur={validateCellPhone}
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-cellphone"
                                  label="Celular"
                                  variant="outlined"
                                  size="small"
                                  placeholder="(00) 0 0000-0000"
                                  error={
                                    !validateCellPhone() &&
                                    state.phones[0]?.cellnumber != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                            {!validateCellPhone() &&
                              state.phones[0]?.cellnumber && (
                                <p
                                  style={{
                                    color: "#f44336",
                                    margin: "-10px 5px 10px",
                                  }}
                                >
                                  Por favor insira um número válido
                                </p>
                              )}
                          </Grid>
                        </Grid>
                        <Grid container>
                          {/*  <Grid item md={4} xs={12}>*/}
                          {/*    <FormGroupSection fullWidth error>*/}
                          {/*      <Autocomplete*/}
                          {/*        id="combo-box-user-type"*/}
                          {/*        options={userState.data.user_types || []}*/}
                          {/*        getOptionLabel={(option) => option.name}*/}
                          {/*        disabled={!canEdit}*/}
                          {/*        renderInput={(params) => (*/}
                          {/*          <TextField {...params}*/}
                          {/*                     disabled={!canEdit}*/}
                          {/*                     label="Tipo do Usuário"*/}
                          {/*                     variant="outlined"*/}
                          {/*          />*/}
                          {/*        )}*/}
                          {/*        value={selectUserType()}*/}
                          {/*        getOptionSelected={(option, value) =>*/}
                          {/*          option._id === state.user_type_id*/}
                          {/*        }*/}
                          {/*        onChange={(event: any, newValue) => {*/}
                          {/*          handleUserType(event, newValue);*/}
                          {/*          setFieldValidations((prevState: any) => ({*/}
                          {/*            ...prevState,*/}
                          {/*            user_type_id: newValue !== null,*/}
                          {/*          }));*/}
                          {/*        }}*/}
                          {/*        size="small"*/}
                          {/*        fullWidth*/}
                          {/*      />*/}
                          {/*    </FormGroupSection>*/}
                          {/*  </Grid>*/}

                          {/*{state?._id && !(params.mode === 'config') &&(*/}
                          {/*  <Grid item xs={12} md={12}>*/}
                          {/*    <FormControlLabel*/}
                          {/*      control={*/}
                          {/*        <Switch*/}
                          {/*          checked={state.active}*/}
                          {/*          onChange={(event) => {*/}
                          {/*            setState((prevState) => ({*/}
                          {/*              ...prevState,*/}
                          {/*              active: event.target.checked,*/}
                          {/*            }));*/}
                          {/*          }}*/}
                          {/*        />*/}
                          {/*      }*/}
                          {/*      label="Ativo?"*/}
                          {/*    />*/}
                          {/*  </Grid>*/}
                          {/*)}*/}
                        </Grid>
                      </TabBodyItem>
                      <TabBodyItem className={currentTab === 1 ? "show" : ""}>
                        <Grid container>
                          <Grid item md={5} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-profession"
                                disabled={!canEdit}
                                options={userState.data.professions}
                                getOptionLabel={(option) => {
                                  if (typeof option === "object") {
                                    return option.name;
                                  } else {
                                    return option;
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Função"
                                    variant="outlined"
                                  />
                                )}
                                getOptionSelected={(option, value) =>
                                  option._id === getprofessionId()
                                }
                                // defaultValue={selectProfession()}
                                value={selectProfession()}
                                onChange={(event, value) => {
                                  if (value) {
                                    handleSelectProfession(value);
                                  } else {
                                    setState((prevState) => ({
                                      ...prevState,
                                      profession_id: { _id: "", name: "" },
                                    }));
                                  }
                                }}
                                size="small"
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-council"
                                disabled={!canEdit}
                                options={councilState.list.data}
                                getOptionLabel={(option) =>
                                  `${option.initials} - ${option.name}`
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    disabled={!canEdit}
                                    label="Conselho"
                                    variant="outlined"
                                  />
                                )}
                                value={selectCouncil()}
                                getOptionSelected={(option, value) =>
                                  option._id === state?.council_id?._id
                                }
                                onChange={(event: any, newValue) => {
                                  handleCouncil(event, newValue);
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    council_id: newValue !== null,
                                  }));
                                }}
                                size="small"
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={1} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-council-state"
                                options={ufs}
                                disabled={!canEdit}
                                getOptionLabel={(option) => option.initials}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    disabled={!canEdit}
                                    label="UF"
                                    variant="outlined"
                                  />
                                )}
                                value={selectCouncilState()}
                                getOptionSelected={(option, value) =>
                                  option.initials === state.council_state
                                }
                                onChange={(event: any, newValue) => {
                                  handleCouncilState(event, newValue);
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    council_state: newValue !== null,
                                  }));
                                }}
                                size="small"
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <FormGroupSection fullWidth error>
                              <TextField
                                id="input-council"
                                label="Número do Conselho"
                                variant="outlined"
                                size="small"
                                value={state.council_number}
                                disabled={!canEdit}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    council_number: element.target.value,
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    council_number: !validator.isEmpty(
                                      element.target.value
                                    ),
                                  }));
                                }}
                                placeholder="00000-0000"
                                autoComplete="off"
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          {/*<Grid item md={12} xs={12}>*/}
                          {/*  {!(params.mode === 'config') && (*/}
                          {/*    <ChipList>*/}
                          {/*      <Chip*/}
                          {/*        label={viewProfession()}*/}
                          {/*      />*/}
                          {/*    </ChipList>*/}
                          {/*  )}*/}
                          {/*</Grid>*/}
                          <Grid item md={5} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-main-especialty"
                                disabled={!canEdit}
                                options={specialtyState.list.data}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Especialidade Principal"
                                    variant="outlined"
                                  />
                                )}
                                getOptionSelected={(option, value) =>
                                  option._id === state?.main_specialty_id.name
                                }
                                value={selectMainSpecialty()}
                                onChange={(event, value) => {
                                  if (value) {
                                    handleSelectMainSpecialty(value);
                                  }
                                }}
                                size="small"
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          {/*<Grid item md={12} xs={12}>*/}
                          {/*  {!(params.mode === 'config') && (*/}
                          {/*    <ChipList>*/}
                          {/*      <Chip*/}
                          {/*        label={viewMainSpecialty()}*/}
                          {/*      />*/}
                          {/*    </ChipList>*/}
                          {/*  )}*/}
                          {/*</Grid>*/}
                          <Grid item md={6} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-especialty"
                                options={specialties}
                                disabled={!canEdit}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params: any) => {
                                  params.inputProps.value = "";
                                  return (
                                    <TextField
                                      {...params}
                                      label="Especialidade"
                                      variant="outlined"
                                    />
                                  );
                                }}
                                size="small"
                                onChange={(event, value) => {
                                  if (value) {
                                    handleSelectEspecialty(value);
                                  }
                                }}
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <ChipList>
                              {state.specialties?.map((item: any, index) => (
                                <Chip
                                  key={`especialty_selected_${index}`}
                                  label={item.name}
                                  onDelete={(event) =>
                                    handleDeleteEspecialty(item)
                                  }
                                />
                              ))}
                            </ChipList>
                          </Grid>
                          {/* {(!params.id && canEdit ) && (
                        <DivideTitle> Incluir</DivideTitle>
                         <Grid item md={6} xs={12}>
                        <FormGroupSection fullWidth error>
                          <Autocomplete
                            id="combo-box-company"
                            options={companies}
                            disabled={!canEdit}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Empresa"
                                variant="outlined"
                                autoComplete="off"
                              />
                            )}
                            size="small"
                            onChange={(event, value) => {
                              if (value) {
                                handleSelectCompany(value);
                              }
                            }}
                            autoComplete={false}
                            autoHighlight={false}
                            fullWidth
                          />
                        </FormGroupSection>
                          </Grid>
                      ) } */}

                          {state.companies.length > 0 &&
                            !(params.mode === "config") && (
                              <div>
                                <DivideTitle>
                                  Empresas onde o prestador trabalha:
                                </DivideTitle>

                                <Grid item md={12} xs={12}>
                                  <ChipList>
                                    {state.companies?.map(
                                      (item: any, index) => (
                                        <Chip
                                          key={`company_selected_${index}`}
                                          label={item.name}
                                          // onDelete={(event) => handleDeleteCompany(item)}
                                        />
                                      )
                                    )}
                                  </ChipList>
                                </Grid>
                              </div>
                            )}
                        </Grid>
                      </TabBodyItem>
                      <TabBodyItem className={currentTab === 2 ? "show" : ""}>
                        <BoxCustom>
                          <Grid
                            container
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{ paddingLeft: "10px" }}
                          >
                            <Grid item>
                              <UserContent>
                                <AccountCircle />
                              </UserContent>
                            </Grid>
                            <Grid item style={{ paddingTop: "40px" }}>
                              <h3>{state.name}</h3>
                              {state.fiscal_number}
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item md={12} xs={12}>
                              <Divider></Divider>
                            </Grid>
                            <Grid item md={2} style={{ paddingTop: "20px" }}>
                              <ButtonComponent
                                style={{ maxWidth: "10px" }}
                                onClick={() => setAdd(!add)}
                              >
                                {add ? (
                                  <CheckCircleRoundedIcon
                                    fontSize={"large"}
                                    style={{ color: "#4FC66A" }}
                                  ></CheckCircleRoundedIcon>
                                ) : (
                                  <>
                                    {params.mode === "view" ? (
                                      <RemoveIcon
                                        fontSize={"large"}
                                        color={"primary"}
                                      ></RemoveIcon>
                                    ) : (
                                      <AddIcon
                                        fontSize={"large"}
                                        color={"primary"}
                                      ></AddIcon>
                                    )}
                                  </>
                                )}
                              </ButtonComponent>
                            </Grid>
                            <Grid item md={7}>
                              <Grid
                                container
                                style={{
                                  flexDirection: "column",
                                  paddingLeft: "10px",
                                  paddingTop: "20px",
                                }}
                              >
                                <Grid item>
                                  <h3>{viewProfession()}</h3>
                                </Grid>
                                <Grid item style={{ paddingTop: "10px" }}>
                                  Função:{viewProfession()}
                                </Grid>
                                <Grid item>
                                  Conselho: {state.council_state}
                                </Grid>
                                <Grid item>
                                  Especialidade Principal: {viewProfession()}
                                </Grid>
                                <Grid item>
                                  Outras especialidades: {viewSpecialtes()}
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                  style={{ paddingTop: "10px" }}
                                >
                                  <ChipList>
                                    {mycompanys()?.map((item: any, index) => (
                                      <Chip
                                        key={`company_selected_${index}`}
                                        label={item.name}
                                        onDelete={(event) =>
                                          handleDeleteCompany(item)
                                        }
                                      />
                                    ))}
                                  </ChipList>
                                </Grid>

                                <Collapse in={add}>
                                  <Grid
                                    item
                                    style={{ paddingTop: "20px" }}
                                    md={12}
                                    xs={12}
                                  >
                                    <Grid item md={12} xs={12}>
                                      {/* <FormGroupSection fullWidth error>
                                <Autocomplete
                                  id="combo-box-company"
                                  options={companies}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                  <TextField
                                  {...params}
                                  label="Empresa"
                                  variant="outlined"
                                  autoComplete="off"
                                />
                                )}
                                size="small"
                                onChange={(event, value) => {
                                if (value) {
                                handleSelectCompany(value);
                                }
                                }}
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection> */}
                                    </Grid>
                                    {/* <Grid item md={12} xs={12}>
                            <ChipList>
                              {mycompanys()?.map((item: any, index) => (
                                <Chip
                                  key={`company_selected_${index}`}
                                  label={item.name}
                                  onDelete={(event) => handleDeleteCompany(item)}
                                />
                              ))}
                            </ChipList>
                          </Grid> */}
                                    {params.mode === "link" && !checkCompany && (
                                      <>
                                        {/*<Grid item md={12} xs={12} style={{padding: '0 12px 12px 0'}}>*/}
                                        {/*  <Autocomplete*/}
                                        {/*    id="combo-box-user-type"*/}
                                        {/*    options={customerState.data.usertypes || []}*/}
                                        {/*    getOptionLabel={(option) => option.name}*/}
                                        {/*    // disabled={!canEdit}*/}
                                        {/*    renderInput={(params) => (*/}
                                        {/*      <TextField {...params}*/}
                                        {/*                 label="Tipo do Usuário"*/}
                                        {/*                 variant="outlined"*/}
                                        {/*      />*/}
                                        {/*    )}*/}
                                        {/*    value={selectUserType()}*/}
                                        {/*    onChange={(event, value) => {*/}
                                        {/*      if (value) {*/}
                                        {/*        handleSelectUserType(value);*/}
                                        {/*      } else {*/}
                                        {/*        setState((prevState) => ({*/}
                                        {/*          ...prevState,*/}
                                        {/*          user_type_id: "",*/}
                                        {/*        }));*/}
                                        {/*      }*/}
                                        {/*    }}*/}
                                        {/*    getOptionSelected={(option, value) =>*/}
                                        {/*      option._id === state.user_type_id*/}
                                        {/*    }*/}
                                        {/*    size="small"*/}
                                        {/*    fullWidth*/}
                                        {/*  />*/}
                                        {/*</Grid>*/}

                                        <Grid
                                          item
                                          md={12}
                                          xs={12}
                                          style={{
                                            display: "flex",
                                            padding: "0 12px 12px 0",
                                          }}
                                        >
                                          <Grid item md={3} xs={12}>
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  color="primary"
                                                  checked={linkChecked}
                                                  onChange={() =>
                                                    setLinkChecked(!linkChecked)
                                                  }
                                                  name="link"
                                                />
                                              }
                                              label="Temporário"
                                            />
                                          </Grid>
                                          {linkChecked && (
                                            <Grid item md={9} xs={12}>
                                              <TextField
                                                id="link-end"
                                                type="date"
                                                size="small"
                                                label="Vínculo até"
                                                variant="outlined"
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                                onChange={(e) =>
                                                  setcompanyLink(e.target.value)
                                                }
                                                value={companyLink}
                                                fullWidth
                                              />
                                            </Grid>
                                          )}
                                        </Grid>
                                        {/*{((state.user_type_id && companyLink != '') || (state.user_type_id && !linkChecked)) && (*/}
                                        {((linkChecked && companyLink != "") ||
                                          !linkChecked) && (
                                          <Grid
                                            item
                                            md={12}
                                            xs={12}
                                            style={{ padding: "0 12px 12px 0" }}
                                          >
                                            <ButtonComponent
                                              background="success_rounded"
                                              onClick={() => engagedUser()}
                                            >
                                              Vincular este prestador a minha
                                              empresa
                                            </ButtonComponent>
                                          </Grid>
                                        )}
                                      </>
                                    )}
                                    {params.mode === "link" &&
                                      checkCompany &&
                                      !engaged && (
                                        <Grid item md={12} xs={12}>
                                          Este prestador já está vinculado a sua
                                          empresa com este perfil profissional,
                                          caso queira desvinculá-lo{" "}
                                          <Link to="/user"> clique aqui</Link>.
                                        </Grid>
                                      )}
                                    {params.mode === "link" &&
                                      checkCompany &&
                                      engaged && (
                                        <Grid item md={12} xs={12}>
                                          Agora este prestador foi vinculado a
                                          sua empresa, para confirmar esta
                                          operação click em salva.
                                        </Grid>
                                      )}

                                    {params.mode === "linking" &&
                                      !checkCompany && (
                                        <>
                                          <Grid
                                            item
                                            md={12}
                                            xs={12}
                                            style={{
                                              display: "flex",
                                              padding: "0 12px 12px 0",
                                            }}
                                          >
                                            <Grid item md={3} xs={12}>
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    color="primary"
                                                    checked={linkChecked}
                                                    onChange={() =>
                                                      setLinkChecked(
                                                        !linkChecked
                                                      )
                                                    }
                                                    name="link"
                                                  />
                                                }
                                                label="Temporário"
                                              />
                                            </Grid>
                                            {linkChecked && (
                                              <Grid item md={9} xs={12}>
                                                <TextField
                                                  id="link-end"
                                                  type="date"
                                                  size="small"
                                                  label="Vínculo até"
                                                  variant="outlined"
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                  onChange={(e) =>
                                                    setcompanyLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  value={companyLink}
                                                  fullWidth
                                                />
                                              </Grid>
                                            )}

                                            {((linkChecked &&
                                              companyLink != "") ||
                                              !linkChecked) && (
                                              <Grid
                                                item
                                                md={12}
                                                xs={12}
                                                style={{
                                                  padding: "0 12px 12px 0",
                                                }}
                                              >
                                                <ButtonComponent
                                                  background="success_rounded"
                                                  onClick={() => engagedUser()}
                                                >
                                                  Vincular este prestador a
                                                  minha empresa
                                                </ButtonComponent>
                                              </Grid>
                                            )}
                                          </Grid>
                                        </>
                                      )}
                                    {params.mode === "linking" &&
                                      checkCompany &&
                                      !engaged && (
                                        <Grid item md={12} xs={12}>
                                          Este prestador já está vinculado a sua
                                          empresa com este perfil profissional,
                                          caso queira desvinculá-lo{" "}
                                          <Link to="/user"> clique aqui</Link>.
                                        </Grid>
                                      )}
                                    {params.mode === "linking" &&
                                      checkCompany &&
                                      engaged && (
                                        <Grid item md={12} xs={12}>
                                          Agora este prestador foi vinculado a
                                          sua empresa, para confirmar esta
                                          operação click em salva.
                                        </Grid>
                                      )}

                                    {params.mode === "view" && !engaged && (
                                      <Grid item md={12} xs={12}>
                                        <ButtonComponent
                                          className={classes.cancel}
                                          onClick={() => dengagedUser(company)}
                                        >
                                          Desvincular este prestador da minha
                                          empresa
                                        </ButtonComponent>
                                      </Grid>
                                    )}
                                    {params.mode === "view" && engaged && (
                                      <Grid>
                                        Prestador disvinculado de sua empresa,
                                        para confirmar esta operação click em
                                        salva.
                                      </Grid>
                                    )}
                                  </Grid>
                                </Collapse>
                              </Grid>
                            </Grid>
                          </Grid>
                        </BoxCustom>
                      </TabBodyItem>
                    </TabBody>
                  </TabContent>
                </FormContent>
                <ButtonsContent>
                  <ButtonComponent
                    background="default"
                    onClick={() => handleBackFormUser()}
                  >
                    Voltar
                  </ButtonComponent>

                  <ButtonComponent
                    disabled={currentTab === 0}
                    background="default"
                    onClick={() => handleBackStep()}
                  >
                    Anterior
                  </ButtonComponent>

                  {currentTab === 0 && (
                    <ButtonComponent
                      background="success"
                      onClick={() => selectTab(1)}
                      // disabled={!formValid}
                    >
                      Próximo
                    </ButtonComponent>
                  )}

                  {currentTab === 1 && params.mode != "config" && (
                    <ButtonComponent
                      background="success"
                      onClick={() => selectTab(2)}
                      // disabled={!formValid}
                    >
                      Próximo
                    </ButtonComponent>
                  )}

                  {/*{currentTab === 1 && params.mode === 'config' && (*/}
                  {/*  <ButtonComponent*/}
                  {/*    background="success"*/}
                  {/*    // onClick={() => selectTab(2)}*/}
                  {/*    disabled={true}*/}
                  {/*  >*/}
                  {/*    Próximo*/}
                  {/*  </ButtonComponent>*/}
                  {/*)}*/}

                  {/*{currentTab === 2 && (*/}
                  {/*  <ButtonComponent*/}
                  {/*    background="success"*/}
                  {/*    onClick={() => selectTab(2)}*/}
                  {/*    disabled={currentTab === 2}*/}
                  {/*  >*/}
                  {/*    Próximo*/}
                  {/*  </ButtonComponent>*/}
                  {/*)}*/}

                  {(canEdit || engaged) && (
                    <ButtonComponent
                      background="success"
                      onClick={handleSaveFormUser}
                    >
                      Salvar
                    </ButtonComponent>
                  )}
                </ButtonsContent>
              </FormSection>
            )}
          </Container>

          <Dialog
            open={openModalCancel}
            onClose={handleCloseModalCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Cancelar</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja cancelar este cadastro?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModalCancel} color="primary">
                Não
              </Button>
              <Button onClick={handleCancelForm} color="primary" autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        </Sidebar>
      ) : (
        <Sidebar>
          {/* {userState.loading && <Loading />} */}
          <Container>
            {userState.success ? (
              <FeedbackUserComponent
                type="success"
                title="Cadastro concluído!"
                description="Os dados foram salvos no sistema!"
                buttons
                successAction={() => {
                  dispatch(cleanAction());
                  if (currentC != "SEM") {
                    history.push("/dashboard_user");
                  } else {
                    history.push("/dashboard_user");
                  }
                }}
                defaultAction={() => {
                  dispatch(cleanAction());
                  history.push("/dashboard_user");
                }}
              />
            ) : (
              <FormSection>
                <FormContent>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <FormTitle>Dados de usuário</FormTitle>

                    {params.id && params.mode == "view" && !canEdit && (
                      <Button
                        style={{
                          marginTop: -20,
                          marginLeft: 15,
                          color: "#0899BA",
                        }}
                        onClick={() => setCanEdit(!canEdit)}
                      >
                        <Edit style={{ marginRight: 5, width: 18 }} />
                        Editar {canEdit}
                      </Button>
                    )}
                  </div>

                  <TabContent>
                    <TabNav>
                      <TabNavItem
                        className={currentTab === 0 ? "active" : ""}
                        onClick={() => selectTab(0)}
                      >
                        Dados Pessoais
                      </TabNavItem>
                      <TabNavItem
                        className={currentTab === 1 ? "active" : ""}
                        onClick={() => selectTab(1)}
                      >
                        Dados Profissionais
                      </TabNavItem>
                      {state.professions && !(params.mode === "config") && (
                        <TabNavItem
                          className={currentTab === 2 ? "active" : ""}
                          onClick={() => selectTab(2)}
                        >
                          Selecione Empresa
                        </TabNavItem>
                      )}
                    </TabNav>
                    <TabBody>
                      <TabBodyItem className={currentTab === 0 ? "show" : ""}>
                        <Grid container>
                          <Grid item md={12} xs={12}>
                            <TextField
                              disabled={!canEdit}
                              id="input-social-name"
                              label="Nome do usuário"
                              variant="outlined"
                              size="small"
                              value={state.name}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  name: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  name: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={7} xs={12}>
                            <TextField
                              disabled={!canEdit}
                              id="input-mother-name"
                              label="Nome da mãe"
                              variant="outlined"
                              size="small"
                              value={state.mother_name}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  mother_name: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  mother_name: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={3} xs={12}>
                            <DatePicker
                              id="input-birthdate"
                              label="Data de Nascimento"
                              disabled={!canEdit}
                              value={
                                state?.birthdate?.length > 10
                                  ? formatDate(state.birthdate, "YYYY-MM-DD")
                                  : state.birthdate
                              }
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  birthdate: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  birthdate: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              InputLabelProps={{
                                shrink: true,
                                style: { paddingBottom: 12 },
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={2} xs={12}>
                            <TextField
                              id="input-age"
                              label="Idade"
                              variant="outlined"
                              size="small"
                              value={age(state.birthdate)}
                              fullWidth
                              disabled
                            />
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item md={4} xs={12}>
                            <InputMask
                              mask="999.999.999-99"
                              disabled={!canEdit}
                              value={state.fiscal_number}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  fiscal_number: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  fiscal_number: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-fiscal-number"
                                  label="CPF"
                                  variant="outlined"
                                  size="small"
                                  placeholder="000.000.000-00"
                                  error={
                                    !checkIsCpfValid() &&
                                    state.fiscal_number != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                            {!checkIsCpfValid() && state.fiscal_number != "" && (
                              <p
                                style={{
                                  color: "#f44336",
                                  margin: "1px 5px 20px",
                                }}
                              >
                                Por favor insira um cpf válido
                              </p>
                            )}
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <InputMask
                              mask="9.999-999"
                              disabled={!canEdit}
                              value={state.national_id}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  national_id: element.target.value,
                                });
                              }}
                              onBlur={(element) =>
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  national_id: false,
                                }))
                              }
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-nation-id"
                                  label="RG"
                                  variant="outlined"
                                  size="small"
                                  placeholder="0.000-000"
                                  error={
                                    fieldsValidation.national_id &&
                                    state.national_id != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                          </Grid>

                          <Grid item md={5} xs={12}>
                            <TextField
                              id="input-emitting-organ"
                              label="Órgão Emissor"
                              variant="outlined"
                              size="small"
                              value={state.issuing_organ}
                              disabled={!canEdit}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  issuing_organ: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  issuing_organ: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={4} xs={12}>
                            <TextField
                              id="input-nationality"
                              label="Nacionalidade"
                              variant="outlined"
                              size="small"
                              value={state.nationality}
                              disabled={!canEdit}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  nationality: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  nationality: !validator.isEmpty(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                            />
                          </Grid>

                          <Grid item md={3} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-gender"
                                size="small"
                                disabled={!canEdit}
                                options={genders}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    disabled={!canEdit}
                                    label="Sexo"
                                    variant="outlined"
                                  />
                                )}
                                value={state.gender}
                                onChange={(element, value) => {
                                  setState({
                                    ...state,
                                    gender: value ? value : "",
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    gender: !validator.isEmpty(
                                      value ? value : ""
                                    ),
                                  }));
                                }}
                                noOptionsText="Nenhum resultado encontrado"
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                        </Grid>

                        <Divider style={{ marginBottom: 30 }} />

                        {/*  */}
                        <FormGroupSection>
                          <Grid container>
                            <Grid item md={2} xs={12}>
                              <InputMask
                                mask="99999-999"
                                disabled={!canEdit}
                                value={state.address?.postal_code}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      postal_code: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      postal_code: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                onBlur={getAddress}
                              >
                                {(inputProps: any) => (
                                  <TextField
                                    {...inputProps}
                                    disabled={!canEdit}
                                    id="input-postal-code"
                                    label="CEP"
                                    placeholder="00000-000"
                                    size="small"
                                    variant="outlined"
                                    error={
                                      userState.error &&
                                      !fieldsValidation.postal_code
                                    }
                                    fullWidth
                                  />
                                )}
                              </InputMask>
                              {userState.error &&
                                !fieldsValidation.address.postal_code && (
                                  <p
                                    style={{
                                      color: "#f44336",
                                      margin: "-2px 5px 10px",
                                    }}
                                  >
                                    CEP inválido
                                  </p>
                                )}
                            </Grid>

                            <Grid item md={10} xs={12}>
                              <TextField
                                id="input-address"
                                label="Endereço"
                                variant="outlined"
                                size="small"
                                value={state.address?.street}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      street: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      street: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>
                            <Grid item md={2} xs={12}>
                              <TextField
                                id="input-address-number"
                                label="Número"
                                variant="outlined"
                                size="small"
                                value={state.address?.number}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      number: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      number: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={10} xs={12}>
                              <TextField
                                id="input-address-complement"
                                label="Complemento"
                                variant="outlined"
                                size="small"
                                value={state.address?.complement}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      complement: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      complement: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                id="input-neighborhood"
                                label="Bairro"
                                variant="outlined"
                                size="small"
                                value={state.address?.district}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      district: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      district: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={5} xs={12}>
                              <TextField
                                id="input-city"
                                label="Cidade"
                                variant="outlined"
                                size="small"
                                value={state.address?.city}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      city: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      city: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>

                            <Grid item md={1} xs={12}>
                              <TextField
                                id="input-address-uf"
                                label="UF"
                                variant="outlined"
                                size="small"
                                value={state.address?.state}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    address: {
                                      ...state.address,
                                      state: element.target.value,
                                    },
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    address: {
                                      ...prevState.address,
                                      state: !validator.isEmpty(
                                        element.target.value
                                      ),
                                    },
                                  }));
                                }}
                                fullWidth
                                disabled={!canEdit}
                              />
                            </Grid>
                          </Grid>
                        </FormGroupSection>
                        <Grid container>
                          <Grid item md={6} xs={12}>
                            <TextField
                              id="input-email"
                              type="email"
                              label="E-mail"
                              variant="outlined"
                              size="small"
                              value={state.email}
                              onChange={(element) => {
                                setState({
                                  ...state,
                                  email: element.target.value,
                                });
                                setFieldValidations((prevState: any) => ({
                                  ...prevState,
                                  email: validator.isEmail(
                                    element.target.value
                                  ),
                                }));
                              }}
                              fullWidth
                              disabled={!canEdit}
                            />
                          </Grid>
                          {/* Phone */}
                          <Grid item md={3} xs={12}>
                            <InputMask
                              mask="(99) 9999-9999"
                              disabled={!canEdit}
                              value={state.phones[0]?.number}
                              onChange={(element) => {
                                {
                                  setState((prevState) => ({
                                    ...prevState,
                                    phone: element.target.value,
                                    phones: [
                                      {
                                        ...prevState.phones[0],
                                        number: element.target.value,
                                      },
                                    ],
                                  }));
                                }
                              }}
                              onBlur={validatePhone}
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-phone"
                                  label="Telefone"
                                  variant="outlined"
                                  size="small"
                                  placeholder="0000-0000"
                                  error={
                                    !validatePhone() &&
                                    state.phones[0]?.number != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                            {!validatePhone() && state.phones[0]?.number && (
                              <p
                                style={{
                                  color: "#f44336",
                                  margin: "-10px 5px 10px",
                                }}
                              >
                                Por favor insira um número válido
                              </p>
                            )}
                          </Grid>

                          {/* Cellphone */}
                          <Grid item md={3} xs={12}>
                            <InputMask
                              mask="(99) 99999-9999"
                              disabled={!canEdit}
                              value={state.phones[0]?.cellnumber}
                              onChange={(element) => {
                                {
                                  setState((prevState) => ({
                                    ...prevState,
                                    phone: element.target.value,
                                    phones: [
                                      {
                                        ...prevState.phones[0],
                                        cellnumber: element.target.value,
                                      },
                                    ],
                                  }));
                                }
                              }}
                              onBlur={validateCellPhone}
                            >
                              {(inputProps: any) => (
                                <TextField
                                  {...inputProps}
                                  disabled={!canEdit}
                                  id="input-cellphone"
                                  label="Celular"
                                  variant="outlined"
                                  size="small"
                                  placeholder="(00) 0 0000-0000"
                                  error={
                                    !validateCellPhone() &&
                                    state.phones[0]?.cellnumber != ""
                                  }
                                  fullWidth
                                />
                              )}
                            </InputMask>
                            {!validateCellPhone() &&
                              state.phones[0]?.cellnumber && (
                                <p
                                  style={{
                                    color: "#f44336",
                                    margin: "-10px 5px 10px",
                                  }}
                                >
                                  Por favor insira um número válido
                                </p>
                              )}
                          </Grid>
                        </Grid>
                        <Grid container>
                          {/*  <Grid item md={4} xs={12}>*/}
                          {/*    <FormGroupSection fullWidth error>*/}
                          {/*      <Autocomplete*/}
                          {/*        id="combo-box-user-type"*/}
                          {/*        options={userState.data.user_types || []}*/}
                          {/*        getOptionLabel={(option) => option.name}*/}
                          {/*        disabled={!canEdit}*/}
                          {/*        renderInput={(params) => (*/}
                          {/*          <TextField {...params}*/}
                          {/*                     disabled={!canEdit}*/}
                          {/*                     label="Tipo do Usuário"*/}
                          {/*                     variant="outlined"*/}
                          {/*          />*/}
                          {/*        )}*/}
                          {/*        value={selectUserType()}*/}
                          {/*        getOptionSelected={(option, value) =>*/}
                          {/*          option._id === state.user_type_id*/}
                          {/*        }*/}
                          {/*        onChange={(event: any, newValue) => {*/}
                          {/*          handleUserType(event, newValue);*/}
                          {/*          setFieldValidations((prevState: any) => ({*/}
                          {/*            ...prevState,*/}
                          {/*            user_type_id: newValue !== null,*/}
                          {/*          }));*/}
                          {/*        }}*/}
                          {/*        size="small"*/}
                          {/*        fullWidth*/}
                          {/*      />*/}
                          {/*    </FormGroupSection>*/}
                          {/*  </Grid>*/}

                          {/*{state?._id && !(params.mode === 'config') &&(*/}
                          {/*  <Grid item xs={12} md={12}>*/}
                          {/*    <FormControlLabel*/}
                          {/*      control={*/}
                          {/*        <Switch*/}
                          {/*          checked={state.active}*/}
                          {/*          onChange={(event) => {*/}
                          {/*            setState((prevState) => ({*/}
                          {/*              ...prevState,*/}
                          {/*              active: event.target.checked,*/}
                          {/*            }));*/}
                          {/*          }}*/}
                          {/*        />*/}
                          {/*      }*/}
                          {/*      label="Ativo?"*/}
                          {/*    />*/}
                          {/*  </Grid>*/}
                          {/*)}*/}
                        </Grid>
                      </TabBodyItem>
                      <TabBodyItem className={currentTab === 1 ? "show" : ""}>
                        <Grid container>
                          <Grid item md={5} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-profession"
                                disabled={!canEdit}
                                options={userState.data.professions}
                                getOptionLabel={(option) => {
                                  if (typeof option === "object") {
                                    return option.name;
                                  } else {
                                    return option;
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Função"
                                    variant="outlined"
                                  />
                                )}
                                getOptionSelected={(option, value) =>
                                  option._id === getprofessionId()
                                }
                                // defaultValue={selectProfession()}
                                value={selectProfession()}
                                onChange={(event, value) => {
                                  if (value) {
                                    handleSelectProfession(value);
                                  } else {
                                    setState((prevState) => ({
                                      ...prevState,
                                      profession_id: { _id: "", name: "" },
                                    }));
                                  }
                                }}
                                size="small"
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-council"
                                disabled={!canEdit}
                                options={councilState.list.data}
                                getOptionLabel={(option) =>
                                  `${option.initials} - ${option.name}`
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    disabled={!canEdit}
                                    label="Conselho"
                                    variant="outlined"
                                  />
                                )}
                                value={selectCouncil()}
                                getOptionSelected={(option, value) =>
                                  option._id === state?.council_id?._id
                                }
                                onChange={(event: any, newValue) => {
                                  handleCouncil(event, newValue);
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    council_id: newValue !== null,
                                  }));
                                }}
                                size="small"
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={1} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-council-state"
                                options={ufs}
                                disabled={!canEdit}
                                getOptionLabel={(option) => option.initials}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    disabled={!canEdit}
                                    label="UF"
                                    variant="outlined"
                                  />
                                )}
                                value={selectCouncilState()}
                                getOptionSelected={(option, value) =>
                                  option.initials === state.council_state
                                }
                                onChange={(event: any, newValue) => {
                                  handleCouncilState(event, newValue);
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    council_state: newValue !== null,
                                  }));
                                }}
                                size="small"
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <FormGroupSection fullWidth error>
                              <TextField
                                id="input-council"
                                label="Número do Conselho"
                                variant="outlined"
                                size="small"
                                value={state.council_number}
                                disabled={!canEdit}
                                onChange={(element) => {
                                  setState({
                                    ...state,
                                    council_number: element.target.value,
                                  });
                                  setFieldValidations((prevState: any) => ({
                                    ...prevState,
                                    council_number: !validator.isEmpty(
                                      element.target.value
                                    ),
                                  }));
                                }}
                                placeholder="00000-0000"
                                autoComplete="off"
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={5} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-main-especialty"
                                disabled={!canEdit}
                                options={specialtyState.list.data}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Especialidade Principal"
                                    variant="outlined"
                                  />
                                )}
                                getOptionSelected={(option, value) =>
                                  option._id === state?.main_specialty_id
                                }
                                value={selectMainSpecialty()}
                                onChange={(event, value) => {
                                  if (value) {
                                    handleSelectMainSpecialty(value);
                                  }
                                }}
                                size="small"
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={6} xs={12}></Grid>
                          <Grid item md={6} xs={12}>
                            <FormGroupSection fullWidth error>
                              <Autocomplete
                                id="combo-box-especialty"
                                options={specialties}
                                disabled={!canEdit}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params: any) => {
                                  params.inputProps.value = "";
                                  return (
                                    <TextField
                                      {...params}
                                      label="Especialidade"
                                      variant="outlined"
                                    />
                                  );
                                }}
                                size="small"
                                onChange={(event, value) => {
                                  if (value) {
                                    handleSelectEspecialty(value);
                                  }
                                }}
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection>
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <ChipList>
                              {state.specialties?.map((item: any, index) => (
                                <Chip
                                  key={`especialty_selected_${index}`}
                                  label={item.name}
                                  onDelete={(event) =>
                                    handleDeleteEspecialty(item)
                                  }
                                />
                              ))}
                            </ChipList>
                          </Grid>
                          {/* {(!params.id && canEdit ) && (
                        <DivideTitle> Incluir</DivideTitle>
                         <Grid item md={6} xs={12}>
                        <FormGroupSection fullWidth error>
                          <Autocomplete
                            id="combo-box-company"
                            options={companies}
                            disabled={!canEdit}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Empresa"
                                variant="outlined"
                                autoComplete="off"
                              />
                            )}
                            size="small"
                            onChange={(event, value) => {
                              if (value) {
                                handleSelectCompany(value);
                              }
                            }}
                            autoComplete={false}
                            autoHighlight={false}
                            fullWidth
                          />
                        </FormGroupSection>
                          </Grid>
                      ) } */}

                          {state.companies.length > 0 &&
                            !(params.mode === "config") && (
                              <div>
                                <DivideTitle>
                                  Empresas onde o prestador trabalha:
                                </DivideTitle>

                                <Grid item md={12} xs={12}>
                                  <ChipList>
                                    {state.companies?.map(
                                      (item: any, index) => (
                                        <Chip
                                          key={`company_selected_${index}`}
                                          label={item.name}
                                          onDelete={(event) =>
                                            handleDeleteCompany(item)
                                          }
                                        />
                                      )
                                    )}
                                  </ChipList>
                                </Grid>
                              </div>
                            )}
                        </Grid>
                      </TabBodyItem>
                      <TabBodyItem className={currentTab === 2 ? "show" : ""}>
                        <BoxCustom>
                          <Grid
                            container
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{ paddingLeft: "10px" }}
                          >
                            <Grid item>
                              <UserContent>
                                <AccountCircle />
                              </UserContent>
                            </Grid>
                            <Grid item style={{ paddingTop: "40px" }}>
                              <h3>{state.name}</h3>
                              {state.fiscal_number}
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item md={12} xs={12}>
                              <Divider></Divider>
                            </Grid>
                            <Grid item style={{ paddingTop: "20px" }}>
                              <ButtonComponent
                                style={{ maxWidth: "10px" }}
                                onClick={() => setAdd(!add)}
                              >
                                {add ? (
                                  <CheckCircleRoundedIcon
                                    fontSize={"large"}
                                    style={{ color: "#4FC66A" }}
                                  ></CheckCircleRoundedIcon>
                                ) : (
                                  <>
                                    {params.mode === "view" ? (
                                      <RemoveIcon
                                        fontSize={"large"}
                                        color={"primary"}
                                      ></RemoveIcon>
                                    ) : (
                                      <AddIcon
                                        fontSize={"large"}
                                        color={"primary"}
                                      ></AddIcon>
                                    )}
                                  </>
                                )}
                              </ButtonComponent>
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                style={{
                                  flexDirection: "column",
                                  paddingLeft: "10px",
                                  paddingTop: "20px",
                                }}
                              >
                                <Grid item>
                                  <h3>{viewProfession()}</h3>
                                </Grid>
                                <Grid item style={{ paddingTop: "10px" }}>
                                  Função:{viewProfession()}
                                </Grid>
                                <Grid item>
                                  Conselho: {state.council_state}
                                </Grid>
                                <Grid item>
                                  Especialidade Principal: {viewProfession()}
                                </Grid>
                                <Grid item>
                                  Outras especialidades: {viewSpecialtes()}
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                  style={{ paddingTop: "10px" }}
                                >
                                  <ChipList>
                                    {mycompanys()?.map((item: any, index) => (
                                      <Chip
                                        key={`company_selected_${index}`}
                                        label={item.name}
                                        onDelete={(event) =>
                                          handleDeleteCompany(item)
                                        }
                                      />
                                    ))}
                                  </ChipList>
                                </Grid>

                                <Collapse in={add}>
                                  <Grid
                                    item
                                    style={{ paddingTop: "20px" }}
                                    md={12}
                                    xs={12}
                                  >
                                    <Grid item md={12} xs={12}>
                                      {/* <FormGroupSection fullWidth error>
                                <Autocomplete
                                  id="combo-box-company"
                                  options={companies}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                  <TextField
                                  {...params}
                                  label="Empresa"
                                  variant="outlined"
                                  autoComplete="off"
                                />
                                )}
                                size="small"
                                onChange={(event, value) => {
                                if (value) {
                                handleSelectCompany(value);
                                }
                                }}
                                autoComplete={false}
                                autoHighlight={false}
                                fullWidth
                              />
                            </FormGroupSection> */}
                                    </Grid>
                                    {/* <Grid item md={12} xs={12}>
                            <ChipList>
                              {mycompanys()?.map((item: any, index) => (
                                <Chip
                                  key={`company_selected_${index}`}
                                  label={item.name}
                                  onDelete={(event) => handleDeleteCompany(item)}
                                />
                              ))}
                            </ChipList>
                          </Grid> */}
                                    {params.mode === "link" && !checkCompany && (
                                      <Grid item md={12} xs={12}>
                                        <ButtonComponent
                                          background="success_rounded"
                                          onClick={() => engagedUser()}
                                        >
                                          Vincular este prestador a minha
                                          empresa
                                        </ButtonComponent>
                                      </Grid>
                                    )}
                                    {params.mode === "link" &&
                                      checkCompany &&
                                      !engaged && (
                                        <Grid item md={12} xs={12}>
                                          Este prestador já está vinculado a sua
                                          empresa com este perfil profissional,
                                          caso queira desvinculá-lo{" "}
                                          <Link to="/user"> clique aqui</Link>.
                                        </Grid>
                                      )}
                                    {params.mode === "link" &&
                                      checkCompany &&
                                      engaged && (
                                        <Grid item md={12} xs={12}>
                                          Agora este prestador foi vinculado a
                                          sua empresa, para confirmar esta
                                          operação click em salva.
                                        </Grid>
                                      )}
                                    {params.mode === "view" && !engaged && (
                                      <Grid item md={12} xs={12}>
                                        <ButtonComponent
                                          className={classes.cancel}
                                          onClick={() => dengagedUser(company)}
                                        >
                                          Desvincular este prestador da minha
                                          empresa
                                        </ButtonComponent>
                                      </Grid>
                                    )}
                                    {params.mode === "view" && engaged && (
                                      <Grid>
                                        Prestador disvinculado de sua empresa,
                                        para confirmar esta operação click em
                                        salva.
                                      </Grid>
                                    )}
                                  </Grid>
                                </Collapse>
                              </Grid>
                            </Grid>
                          </Grid>
                        </BoxCustom>
                      </TabBodyItem>
                    </TabBody>
                  </TabContent>
                </FormContent>
                <ButtonsContent>
                  <ButtonComponent
                    background="default"
                    onClick={() => handleBackFormUser()}
                  >
                    Voltar
                  </ButtonComponent>

                  <ButtonComponent
                    disabled={currentTab === 0}
                    background="default"
                    onClick={() => handleBackStep()}
                  >
                    Anterior
                  </ButtonComponent>

                  {currentTab === 0 && (
                    <ButtonComponent
                      background="success"
                      onClick={() => selectTab(1)}
                      // disabled={!formValid}
                    >
                      Próximo
                    </ButtonComponent>
                  )}

                  {currentTab === 1 && params.mode != "config" && (
                    <ButtonComponent
                      background="success"
                      onClick={() => selectTab(2)}
                      // disabled={!formValid}
                    >
                      Próximo
                    </ButtonComponent>
                  )}

                  {/*{currentTab === 1 && params.mode === 'config' && (*/}
                  {/*  <ButtonComponent*/}
                  {/*    background="success"*/}
                  {/*    // onClick={() => selectTab(2)}*/}
                  {/*    disabled={true}*/}
                  {/*  >*/}
                  {/*    Próximo*/}
                  {/*  </ButtonComponent>*/}
                  {/*)}*/}

                  {/*{currentTab === 2 && (*/}
                  {/*  <ButtonComponent*/}
                  {/*    background="success"*/}
                  {/*    onClick={() => selectTab(2)}*/}
                  {/*    disabled={currentTab === 2}*/}
                  {/*  >*/}
                  {/*    Próximo*/}
                  {/*  </ButtonComponent>*/}
                  {/*)}*/}

                  {(canEdit || engaged) && (
                    <ButtonComponent
                      background="success"
                      onClick={handleSaveFormUser}
                      disabled={!formValid}
                    >
                      Salvar
                    </ButtonComponent>
                  )}
                </ButtonsContent>
              </FormSection>
            )}
          </Container>

          <Dialog
            open={openModalCancel}
            onClose={handleCloseModalCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Cancelar</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja cancelar este cadastro?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModalCancel} color="primary">
                Não
              </Button>
              <Button onClick={handleCancelForm} color="primary" autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        </Sidebar>
      )}
    </>
  );
}
