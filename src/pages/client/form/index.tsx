import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import InputMask, { Props } from "react-input-mask";
// redux saga
import { ApplicationState } from "../../../store";
import {
  loadCustomerById,
  getAddress as getAddressAction,
  updateCustomerRequest,
  createCustomerRequest,
  createPermissionRequest,
  cleanAction,
  updatePermissionRequest,
  loadPermissionRequest,
  cleanPermission,
} from "../../../store/ducks/customers/actions";
import {
  CustomerInterface,
  CustomerState,
} from "../../../store/ducks/customers/types";
import { createUserRequest as createUserAction } from "../../../store/ducks/users/actions";
import { UserInterface, UserState } from "../../../store/ducks/users/types";

// MUI e style
import {
  SearchOutlined,
  Edit,
  CodeOutlined,
  TrackChangesTwoTone,
} from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Container,
  Divider,
  FormControlLabel,
  makeStyles,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IButtons } from "../../../components/Button/ButtonTabs";

import {
  ButtonsContent,
  ButtonDefeault,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection,
  BoxCustom,
  WrapperTitle,
  ButtonStyle,
} from "./styles";
import { Theme } from "@mui/material/styles";

import {
  createTheme,
  ThemeProvider,
  styled,
  // Theme,
} from "@mui/material/styles";
import theme from "../../../theme/theme";

// utils
import mask from "../../../utils/mask";
import { validateCNPJ as validateCNPJHelper } from "../../../helpers/validateCNPJ";
import _ from "lodash";
import validator from "validator";
import { toast } from "react-toastify";
import {
  checkViewPermission,
  checkEditPermission,
  checkCreatePermission,
} from "../../../utils/permissions";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";
//componentes
import Loading from "../../../components/Loading";
import { SwitchComponent as Switch } from "../../../styles/components/Switch";
import Sidebar from "../../../components/Sidebar";
import { FormTitle } from "../../../styles/components/Form";
import ButtonComponent from "../../../styles/components/Button";
import TabForm from "../../../components/Tabs";
import TabTittle from "../../../components/Text/TabTittle";
import ButtonEdit from "../../../components/Button/ButtonEdit";
import ButtonTabs from "../../../components/Button/ButtonTabs";
import PermissionForm from "../../../components/Inputs/Forms/PermisionForm";
import FeedbackComponent from "../../../components/Feedback";
import NoPermission from "../../../components/Erros/NoPermission";

interface IFormFields extends CustomerInterface {
  form?: {
    uf: { id: number; name: string; sigla: string } | null;
  };
}

interface IPageParams {
  id?: string;
  mode?: string;
}
interface IPropsPermissionFrom {
  state: {
    active: boolean;
    name: string;
    rights: never[];
    mode: string;
    _id: string;
    customer_id: string;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      active: boolean;
      name: string;
      rights: never[];
      mode: string;
      _id: string;
      customer_id: string;
    }>
  >;

  customerState: CustomerState;
  userState: UserState;
  params: IPageParams;
  canEditPermission: boolean;
  buttonsPermission: IButtons[];
  modePermission: string;
  setModePermission: React.Dispatch<React.SetStateAction<string>>;
  cleanSelectProfession: () => void;
}

export default function ClientForm(props: IPageParams) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerState = useSelector(
    (state: ApplicationState) => state.customers
  );
  const userState = useSelector((state: ApplicationState) => state.users);
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const [inputUf, setInputUf] = useState({ index: 0 });
  const [inputPhone, setInputPhone] = useState({ value: "", error: false });
  const [inputCellPhone, setInputCellPhone] = useState({
    value: "",
    error: false,
  });
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const params = useParams();

  const [canEdit, setCanEdit] = useState(true);
  const [canEditPermission, setCanEditPermission] = useState(true);
  const [initialTab, setInitialTab] = useState(0);

  const [fieldsValidation, setFieldValidations] = useState<any>({
    name: false,
    social_name: false,
    fiscal_number: false,
    responsible_user: false,
    postal_code: false,
    street: false,
    number: false,
    district: false,
    city: false,
    state: false,
    email: false,
  });
  const States = [
    { id: 1, name: "São Paulo", sigla: "SP" },
    { id: 2, name: "Paraná", sigla: "PR" },
    { id: 3, name: "Santa Catarina", sigla: "SC" },
    { id: 4, name: "Rio Garnde do Sul", sigla: "RS" },
    { id: 5, name: "Mato Grosso do Sul", sigla: "MS" },
    { id: 6, name: "Rondônia", sigla: "RO" },
    { id: 7, name: "Acre", sigla: "AC" },
    { id: 8, name: "Amazonas", sigla: "AM" },
    { id: 9, name: "Roraima", sigla: "RR" },
    { id: 10, name: "Pará", sigla: "PA" },
    { id: 11, name: "Amapá", sigla: "AP" },
    { id: 12, name: "Tocantins", sigla: "TO" },
    { id: 13, name: "Maranhão", sigla: "MA" },
    { id: 14, name: "Rio Grande do Norte", sigla: "RN" },
    { id: 15, name: "Paraíba", sigla: "PB" },
    { id: 16, name: "Pernambuco", sigla: "PE" },
    { id: 17, name: "Alagoas", sigla: "AL" },
    { id: 18, name: "Sergipe", sigla: "SE" },
    { id: 19, name: "Bahia", sigla: "BA" },
    { id: 20, name: "Minas Gerais", sigla: "MG" },
    { id: 21, name: "Rio de Janeiro", sigla: "RJ" },
    { id: 22, name: "Mato Grosso", sigla: "MT" },
    { id: 23, name: "Goiás", sigla: "GO" },
    { id: 24, name: "Distrito Federal", sigla: "DF" },
    { id: 25, name: "Piauí", sigla: "PI" },
    { id: 26, name: "Ceará", sigla: "CE" },
    { id: 27, name: "Espírito Santo", sigla: "ES" },
  ];
  const [state, setState] = useState<IFormFields>({
    name: "",
    social_name: "",
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
    email: "",
    phones: [
      {
        cellphone: "",
        phone: "",
        telegram: false,
        whatsapp: false,
      },
    ],
    // cellphone: '',
    // phone:'',
    responsible_user: "",
    active: true,
    integration: "",
  });

  const [permissionState, setPermissionState] = useState({
    active: false,
    name: "",
    rights: [],
    mode: "",
    _id: "",
    customer_id: "",
  });

  const [modePermission, setModePermission] = useState("start");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setPermissionState((prevState) => {
      return {
        ...prevState,
        mode: modePermission,
      };
    });
  }, [modePermission]);

  var isValidPhoneNumber: any;
  var isValidCellPhoneNumber: any;
  var formValid: any;
  useEffect(() => {
    dispatch(cleanAction());
    if (params.id === ":id") {
      const currentCustomer = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";
      navigate(`/client/${currentCustomer}/view`);
    }
    if (modePermission === "views") {
      setCanEditPermission(false);
    }
    if (modePermission === "edit") {
      setCanEditPermission(true);
    }

    // if (_.split(window.location.pathname, "/").slice(-2)[0] === "view") {
    //   setCanEditPermission(false);
    // }
  }, []);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        address: {
          ...prevState.address,
          ...customerState.data.address,
        },
      };
    });
  }, [customerState.data.address]);

  useEffect(() => {
    if (params.id) {
      if (params.mode === "view") {
        setCanEdit(false);
      }

      const uf =
        States.find((uf) => uf.sigla === customerState.data?.address?.state) ||
        null;

      setState((prevState) => ({
        ...prevState,
        form: { uf: uf },
      }));
      setState((prevState) => {
        return {
          ...prevState,
          ...customerState.data,
        };
      });
      setInputPhone((prev) => ({
        ...prev,
        value: customerState.data.phones[0]?.phone || "",
      }));
      setInputCellPhone((prev) => ({
        ...prev,
        value: customerState.data.phones[0]?.cellphone || "",
      }));
      // console.log(customerState)
      // setFieldValidations({
      //   name: true,
      //   social_name: true,
      //   fiscal_number: true,
      //   responsible_user: true,
      //   postal_code: true,
      //   street: true,
      //   district: true,
      //   city: true,
      //   state: true,
      //   email: true,
      //   // phone:true,
      //   // cellphone: true,
      // })
    }
  }, [customerState, params.id]);

  useEffect(() => {
    if (customerState.error) {
      setState((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          street: "",
          district: "",
          city: "",
          state: "",
          complement: "",
        },
      }));
    }

    setState((prevState) => {
      return {
        ...prevState,
        address: {
          ...customerState.data.address,
        },
      };
    });
    // setFieldValidations((prevState: any) => ({
    //   ...prevState,
    //   postal_code: !validator.isEmpty(customerState.data.address?.postal_code),
    //   street: !validator.isEmpty(customerState.data.address?.street),
    //   district: !validator.isEmpty(customerState.data.address?.district),
    //   city: !validator.isEmpty(customerState.data.address?.city),
    //   state: !validator.isEmpty(customerState.data.address?.state),
    //   complement: !validator.isEmpty(customerState.data.address?.complement),
    // }));
  }, [customerState.data?.address]);

  // useEffect(() => {
  //   if (customerState.success && customerState.data?._id && !customerState.isRegistrationCompleted) navigate('/customer');
  // }, [customerState.success])

  useEffect(() => {
    if (
      params.mode === "permission" &&
      _.split(window.location.pathname, "/").slice(-2)[0] != "create"
    ) {
      dispatch(
        loadPermissionRequest(
          _.split(window.location.pathname, "/").slice(-3)[0]
        )
      );
    } else if (
      params.id &&
      // !permissionState.mode &&
      params.id != ":id"
    ) {
      dispatch(loadCustomerById(params.id));
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (
      params.id &&
      params.mode != "permission" &&
      customerState.permissionSuccess
    ) {
      dispatch(loadCustomerById(params.id));
    }
  }, [customerState.permissionSuccess]);

  useEffect(() => {
    const field = customerState.errorCep
      ? "input-postal-code"
      : "input-address-number";

    customerState.errorCep &&
      setState((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          city: "",
          complement: "",
          district: "",
          state: "",
          street: "",
        },
      }));

    document.getElementById("input-social-client")?.focus();
  }, [customerState.errorCep]);
  // console.log(customerState.data._id, "customer id");
  // console.log(params.id, "params id");

  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;
    for (let key of Object.keys(fieldsValidation)) {
      if (fieldsValidation[key]) {
        isValid = false;
      }
    }
    return isValid;
  }, [fieldsValidation, state]);

  const handleSaveFormCustomer = useCallback(() => {
    // console.log(fieldsValidation);

    // if (!fieldsValidation.name || !fieldsValidation.social_name  || !fieldsValidation.fiscal_number || !fieldsValidation.responsible_user ||
    //   !fieldsValidation.phone || !fieldsValidation.email || !fieldsValidation.phone || !fieldsValidation.postal_code  || !fieldsValidation.street ) {
    //   toast.error('Existem campos que precisam ser preenchidos para continuar');
    //   return;
    // }
    // else if (params.id && ModifiCondition() ) {
    //
    //   dispatch(updateCustomerRequest(state));
    //
    // }else{
    //   dispatch(createCustomerRequest(state));
    //
    // }
    if (params.id && ModifiCondition()) {
      dispatch(updateCustomerRequest(state));
    } else {
      dispatch(createCustomerRequest(state));
    }
  }, [state]);

  /////////////// Handler ////////////

  const handlerState = useCallback(
    (event: any, newValue: any) => {
      if (newValue) {
        setState((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            uf: newValue,
          },
        }));
        setState((prevState) => ({
          ...prevState,
          address: { ...state.address, state: newValue.sigla },
        }));
      }
    },
    [state]
  );

  ///////// Validação ////////////////

  const validatePhone = () => {
    if (state.phones[0]?.phone) {
      const landline = state.phones[0]?.phone
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
    if (state.cellphone) {
      var cellphone = state.cellphone
        .replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace(" ", "")
        .replace("-", "");
      isValidCellPhoneNumber = validator.isMobilePhone(cellphone, "pt-BR");
      return isValidCellPhoneNumber;
    }
  };

  const validateCNPJField = useCallback((element: any) => {
    const isValidField = validateCNPJHelper(element.target.value) || false;
    setFieldValidations((prevState: any) => ({
      ...prevState,
      fiscal_number: isValidField,
    }));
  }, []);

  const validationCellPhoneField = useCallback((element: any) => {
    const isValidField = validator.isEmpty(element.target.value);
    setInputCellPhone((prevState) => ({
      ...prevState,
      error: isValidField,
    }));
    if (!isValidField) {
      setState((prevState) => ({
        ...prevState,
        cellphone: element.target.value,
      }));
    }
  }, []);

  /////////////// Validação /////////////////////

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

  function isEquals() {
    return _.isEqual(state, customerState.data);
  }

  function ModifiCondition() {
    if (!isEquals()) {
      return true;
    } else {
      return false;
    }
  }

  function handleOpenModalCancel() {
    if (ModifiCondition() && canEdit) {
      setOpenModalCancel(true);
    } else {
      handleCancelForm();
    }
  }

  function handleCancelForm() {
    dispatch(cleanAction());
    setOpenModalCancel(false);
    navigate("/");
  }

  function handlePermissionReturn() {
    const currentCustomer = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";

    setInitialTab(1);
    setModePermission("start");
    // if (canEdit) {
    //   navigate(`/client/${currentCustomer}/edit`);
    // } else {
    //   navigate(`/client/${currentCustomer}/view`);
    // }
  }

  const handleSavePermission = useCallback(() => {
    if (permissionState.mode === "create") {
      if (permissionState.name === "") {
        toast.error("Seleciona a função antes de salvar.");
        return;
      } else {
        dispatch(createPermissionRequest(permissionState));
      }
    } else if (permissionState.mode === "edit") {
      dispatch(updatePermissionRequest(permissionState));
    }

    if (!customerState.error) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 6000);
    }
    handlePermissionReturn();
  }, [permissionState]);

  if (validatePhone() == true && validateCellPhone() == true) {
    formValid = true;
  }

  const NavItems = [
    {
      name: "DADOS DO CLIENTE",
      components: ["ClientFormHeader", "CepForm", "ResponsibleForm"],
    },
    {
      name: "PERMISSÕES",
      components: ["PermissionList"],
    },
    {
      name: "INTEGRAÇÃO",
      components: ["IntegrationForm"],
    },
  ];

  const buttons: IButtons[] = [
    {
      name: "Voltar",
      onClick: handleCancelForm,
      variant: "contained",
      background: "primary",
      show: true,
    },
    {
      name: "Salvar",
      onClick: handleSaveFormCustomer,
      variant: "contained",
      background: "success",
      show: false,
    },
  ];

  const buttonsPermission: IButtons[] = [
    {
      name: modePermission === "view" ? "Voltar" : "Cancelar",
      onClick: handlePermissionReturn,
      variant: "outlined",
      background: "success",
      show: true,
    },
    {
      name: "Salvar",
      onClick: handleSavePermission,
      variant: "contained",
      background: "success",
      show: false,
    },
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const User = 'Tascom'
  const User = "Client";

  const tableCells = [
    { name: "Nome da Permissão", align: "left" },
    { name: "Estado", align: "left" },
    { name: "Adicionado em", align: "center" },
    { name: "Visualizar", align: "center" },
    { name: "Editar", align: "center" },
  ];

  const propsPermissionForm: IPropsPermissionFrom = {
    state: permissionState,
    setState: setPermissionState,
    customerState: customerState,
    userState: userState,
    params: params,
    canEditPermission: canEditPermission,
    buttonsPermission: buttonsPermission,
    modePermission: modePermission,
    setModePermission: setModePermission,
    cleanSelectProfession: cleanSelectProfession,
  };
  function cleanSelectProfession() {
    setPermissionState((prevState: any) => ({
      active: false,
      name: "",
      rights: [],
      mode: "",
      _id: "",
      customer_id: "",
    }));
  }

  return (
    <Sidebar>
      <ThemeProvider theme={theme}>
        {checkViewPermission("client", JSON.stringify(rightsOfLayoutState)) ? (
          <Container>
            {/* {customerState.loading && <Loading />} */}
            {params.mode === "permission//retirarTextoAposBarras" ? (
              <>
                <TabTittle
                  tittle={"Permissões Do Cliente"}
                  icon={
                    !canEditPermission && (
                      <ButtonEdit
                        setCanEdit={() =>
                          setCanEditPermission(!canEditPermission)
                        }
                        canEdit={canEditPermission}
                      >
                        Editar
                      </ButtonEdit>
                    )
                  }
                />
                <PermissionForm
                  state={permissionState}
                  setState={setPermissionState}
                  customerState={customerState}
                  userState={userState}
                  params={params}
                />
                <ButtonTabs
                  canEdit={canEditPermission}
                  buttons={buttonsPermission}
                />
              </>
            ) : (
              <>
                <TabTittle tittle={"Detalhamento do Cliente"} />
                <TabForm
                  navItems={NavItems}
                  state={state}
                  setState={setState}
                  setValidations={setFieldValidations}
                  fieldsValidation={fieldsValidation}
                  canEdit={canEdit}
                  cepStatus={customerState.errorCep}
                  getAddress={getAddress}
                  user={User}
                  customerState={customerState}
                  tableCells={tableCells}
                  mode={params.mode ? params?.mode : ""}
                  initialTab={initialTab}
                  setInitialTab={setInitialTab}
                  params={params}
                  propsPermissionForm={propsPermissionForm}
                />
                {modePermission === "start" && (
                  <ButtonTabs canEdit={canEdit} buttons={buttons} />
                )}
              </>
            )}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    // border: "2px solid #000",
                    borderRadius: "12px",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <FeedbackComponent
                    title="Função adicionada e/ou editada com sucesso!"
                    description="Os dados foram salvos no sistema."
                    type="success"
                  />
                </Box>
              </Fade>
            </Modal>

            {/* <Modal open={openModal}>
          <FeedbackComponent
            title="Função adicionada com sucesso!"
            description="Os dados foram salvos no sistema. Em segundos o modal desaparecerá."
            type="success"
          />
        </Modal> */}
          </Container>
        ) : (
          <NoPermission />
        )}
      </ThemeProvider>
    </Sidebar>
  );
}
