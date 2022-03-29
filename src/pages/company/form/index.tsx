import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import validator from "validator";
import { toast } from "react-toastify";

import { ApplicationState } from "../../../store";

import { loadRequest as getCustomersAction } from "../../../store/ducks/customers/actions";
import { CustomerDataItems } from "../../../store/ducks/customers/types";

import {
  getAddress as getAddressAction,
  createCompanyRequest,
  updateCompanyRequest,
  loadCompanyById,
  cleanAction,
} from "../../../store/ducks/companies/actions";
import { CompanyInterface } from "../../../store/ducks/companies/types";

import { useHistory, RouteComponentProps } from "react-router-dom";
import {
  Button,
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
  FormControlLabel,
} from "@material-ui/core";
import { Edit, SearchOutlined } from "@material-ui/icons";
import { validateCNPJ as validateCNPJHelper } from "../../../helpers/validateCNPJ";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";

import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";

import ButtonComponent from "../../../styles/components/Button";
import { FormTitle } from "../../../styles/components/Form";
import { SwitchComponent as Switch } from "../../../styles/components/Switch";

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection,
} from "./styles";
import _ from "lodash";
import TabTittle from "../../../components/Text/TabTittle";
import ButtonTabs from "../../../components/Button/ButtonTabs";
import TabForm from "../../../components/Tabs";
import ButtonEdit from "../../../components/Button/ButtonEdit";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import {
  checkViewPermission,
  checkEditPermission,
} from "../../../utils/permissions";
import NoPermission from "../../../components/Erros/NoPermission";

interface IPageParams {
  id?: string;
  mode?: string;
}

export default function CompanyForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerState = useSelector(
    (state: ApplicationState) => state.customers
  );
  const companyState = useSelector(
    (state: ApplicationState) => state.companies
  );

  const { params } = props.match;

  const [canEdit, setCanEdit] = useState(true);

  const [state, setState] = useState<CompanyInterface>({
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
  const [customers, setCustomers] = useState<CustomerDataItems[]>([]);

  const [fieldsValidation, setFieldValidations] = useState<any>({
    name: false,
    fantasy_name: false,
    fiscal_number: false,
    postal_code: false,
    street: false,
    number: false,
    district: false,
    city: false,
    state: false,
    complement: false,
    responsable_name: false,
    email: false,
  });

  const [openModalCancel, setOpenModalCancel] = useState(false);

  //////////////// validacao do campos ///////////////////////
  var isValidPhoneNumber: any;
  var isValidCellPhoneNumber: any;
  var formValid: any;

  useEffect(() => {
    const field = companyState.errorCep
      ? "input-postal-code"
      : "input-address-number";

    companyState.errorCep &&
      setState((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          city: "",
          complement: "",
          district: "",
          number: "",
          state: "",
          street: "",
        },
      }));

    document.getElementById(field)?.focus();
  }, [companyState.errorCep]);

  useEffect(() => {
    if (companyState.error) {
      setState((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          street: "",
          number: "",
          district: "",
          city: "",
          state: "",
          complement: "",
        },
      }));
    }
    // console.log(companyState);
    companyState.data &&
      setState((prevState) => {
        return {
          ...prevState,
          address: {
            ...companyState.data.address,
          },
        };
      });
    companyState.data &&
      companyState.data.address &&
      setFieldValidations((prevState: any) => ({
        ...prevState,
        postal_code: !validator.isEmpty(companyState.data.address.postal_code),
        street: !validator.isEmpty(companyState.data.address.street),
        number: !validator.isEmpty(companyState.data.address.number),
        district: !validator.isEmpty(companyState.data.address.district),
        city: !validator.isEmpty(companyState.data.address.city),
        state: !validator.isEmpty(companyState.data.address.state),
        complement: !validator.isEmpty(companyState.data.address.complement),
      }));
  }, [companyState.data?.address]);

  const validatePhone = () => {
    if (state.phone) {
      const landline = state.phone
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

  if (validatePhone() == true && validateCellPhone() == true) {
    // formValid = true;
  }
  ///////////////////////////////

  useEffect(() => {
    dispatch(cleanAction());
  }, []);

  useEffect(() => {
    dispatch(getCustomersAction());

    if (params.id) {
      dispatch(loadCompanyById(params.id));
    }
  }, [dispatch]);

  useEffect(() => {
    // if (params.id) {

    // if(params.mode === "view"){
    //   setCanEdit(false)
    // }

    setState((prevState) => {
      return {
        ...prevState,
        ...companyState.data,
      };
    });

    // Força o validador em 'true' quando entrar na tela para editar
    setFieldValidations({
      name: true,
      fantasy_name: true,
      fiscal_number: true,
      postal_code: true,
      street: true,
      number: true,
      district: true,
      city: true,
      state: true,
      complement: true,
      responsable_name: true,
      email: true,
      phone: true,
      cellphone: true,
    });
    // }
  }, [companyState.data]);

  useEffect(() => {
    if (params.mode === "view") {
      setCanEdit(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (companyState.success && companyState.data?._id)
      history.push("/company");
  }, [companyState.success]);

  useEffect(() => {
    setCustomers(customerState.list.data);
  }, [customerState]);

  const setCustomer = useCallback(
    ({ _id: customer_id }: any) => {
      setState((prevState) => ({
        ...prevState,
        customer_id,
      }));
    },
    [customers]
  );

  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;

    for (let key of Object.keys(fieldsValidation)) {
      if (!fieldsValidation[key]) {
        isValid = false;
      }
    }

    return isValid;
  }, [fieldsValidation, state]);

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

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    dispatch(cleanAction());
    setOpenModalCancel(false);
    history.push(`/company`);
  }

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

  const selectCustomer = useCallback(() => {
    const selected = customerState.list.data.filter(
      (item) => item._id === state.customer_id
    );
    return selected[0] ? selected[0] : null;
  }, [state.customer_id]);

  const handleSaveFormCustomer = useCallback(() => {
    // if (!handleValidateFields()) {
    //   toast.error('Existem campos que precisam ser preenchidos para continuar');
    //   return;
    // }
    if (checkEditPermission("company")) {
      if (params.id) {
        dispatch(updateCompanyRequest(state));
      } else {
        dispatch(createCompanyRequest(state));
      }
    } else {
      toast.error("Você não tem permissão.");
    }
  }, [state]);

  const validateCNPJField = useCallback((element) => {
    const isValidField = validateCNPJHelper(element.target.value) || false;
    setFieldValidations((prevState: any) => ({
      ...prevState,
      fiscal_number: isValidField,
    }));
  }, []);

  const buttons = [
    {
      name: "Voltar",
      onClick: handleCancelForm,
      variant: "contained",
      background: "primary",
      show: true,
    },
  ];

  const NavItems = [
    {
      name: state.fantasy_name,
      components: ["CompanyForm"],
    },
  ];

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

  return (
    <Sidebar>
      {checkViewPermission("company") ? (
        <Container>
          {companyState.loading && <Loading />}
          {params.mode === "view" ? (
            <>
              {integration ? (
                <>
                  <TabTittle tittle={"Detalhamento da Empresa"} />
                </>
              ) : (
                <>
                  <TabTittle
                    tittle={"Detalhamento da empresa"}
                    icon={
                      !canEdit && (
                        <ButtonEdit
                          setCanEdit={() => {
                            !checkEditPermission("company")
                              ? toast.error(
                                  "Você não tem permissão para Editar esta empresa."
                                )
                              : setCanEdit(true);
                            history.push(`/company/${params.id}/edit/edit`);
                          }}
                          canEdit={canEdit}
                        >
                          Editar
                        </ButtonEdit>
                      )
                    }
                  />
                </>
              )}
              <TabForm
                navItems={NavItems}
                initialTab={0}
                state={state}
                setState={setState}
                setValidations={setFieldValidations}
                canEdit={canEdit}
                cepStatus={companyState.errorCep}
                getAddress={getAddress}
                params={params}
              />
              <ButtonTabs canEdit={canEdit} buttons={buttons} />
            </>
          ) : (
            <>
              <FormSection>
                <FormContent>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <FormTitle>Cadastro de Empresas</FormTitle>

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
                        Editar
                      </Button>
                    )}
                  </div>

                  <FormGroupSection>
                    <Grid container>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="input-customer"
                          label="Cliente"
                          variant="outlined"
                          size="small"
                          value={localStorage.getItem(
                            LOCALSTORAGE.CUSTOMER_NAME
                          )}
                          fullWidth
                          disabled={!canEdit}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="input-social-name"
                          label="Razão Social"
                          variant="outlined"
                          size="small"
                          value={state.name}
                          onChange={(element) => {
                            setState({ ...state, name: element.target.value });
                            setFieldValidations((prevState: any) => ({
                              ...prevState,
                              name: !validator.isEmpty(element.target.value),
                            }));
                          }}
                          fullWidth
                          disabled={!canEdit}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="input-fantasy-name"
                          label="Nome Fantasia"
                          variant="outlined"
                          size="small"
                          value={state.fantasy_name}
                          onChange={(element) => {
                            setState({
                              ...state,
                              fantasy_name: element.target.value,
                            });
                            setFieldValidations((prevState: any) => ({
                              ...prevState,
                              fantasy_name: !validator.isEmpty(
                                element.target.value
                              ),
                            }));
                          }}
                          fullWidth
                          disabled={!canEdit}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <InputMask
                          disabled={!canEdit}
                          mask="99.999.999/9999-99"
                          value={state.fiscal_number}
                          onBlur={validateCNPJField}
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
                              disabled={!canEdit}
                              {...inputProps}
                              id="input-fiscal-number"
                              label="CNPJ"
                              variant="outlined"
                              size="small"
                              placeholder="00.000.000/0000-00"
                              fullWidth
                              error={
                                !fieldsValidation.fiscal_number &&
                                state.fiscal_number != ""
                              }
                            />
                          )}
                        </InputMask>
                        {!fieldsValidation.fiscal_number &&
                          state.fiscal_number && (
                            <p
                              style={{
                                color: "#f44336",
                                margin: "-2px 5px 10px",
                              }}
                            >
                              CNPJ Inválido ou inexistente
                            </p>
                          )}
                      </Grid>

                      <Grid item md={10} />
                    </Grid>
                  </FormGroupSection>

                  <hr />

                  {/*  */}
                  <FormGroupSection>
                    <Grid container>
                      <Grid item md={3} xs={12}>
                        <FormControl variant="outlined" size="small" fullWidth>
                          <InputLabel htmlFor="search-input">CEP</InputLabel>
                          <InputMask
                            disabled={!canEdit}
                            mask="99999-999"
                            value={state.address.postal_code}
                            onChange={(element) =>
                              setState({
                                ...state,
                                address: {
                                  ...state.address,
                                  postal_code: element.target.value,
                                },
                              })
                            }
                            onBlur={getAddress}
                          >
                            {(inputProps: any) => (
                              <OutlinedInputFiled
                                disabled={!canEdit}
                                error={companyState.errorCep}
                                id="input-postal-code"
                                label="CEP"
                                placeholder="00000-000"
                                labelWidth={155}
                                style={{ marginRight: 12 }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <SearchOutlined
                                      style={{ color: "var(--primary)" }}
                                    />
                                  </InputAdornment>
                                }
                              />
                            )}
                          </InputMask>
                        </FormControl>
                        {companyState.error && state.address.postal_code != "" && (
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

                      <Grid item md={9} xs={12}>
                        <TextField
                          id="input-address"
                          label="Endereço"
                          variant="outlined"
                          size="small"
                          value={state.address.street}
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
                              street: !validator.isEmpty(element.target.value),
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
                          value={state.address.number}
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
                              number: !validator.isEmpty(element.target.value),
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
                          value={state.address.complement}
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
                              complement: !validator.isEmpty(
                                element.target.value
                              ),
                            }));
                          }}
                          fullWidth
                          disabled={!canEdit}
                        />
                      </Grid>

                      <Grid item md={4} xs={12}>
                        <TextField
                          id="input-neighborhood"
                          label="Bairro"
                          variant="outlined"
                          size="small"
                          value={state.address.district}
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
                              district: !validator.isEmpty(
                                element.target.value
                              ),
                            }));
                          }}
                          fullWidth
                          disabled={!canEdit}
                        />
                      </Grid>

                      <Grid item md={7} xs={12}>
                        <TextField
                          id="input-city"
                          label="Cidade"
                          variant="outlined"
                          size="small"
                          value={state.address.city}
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
                              city: !validator.isEmpty(element.target.value),
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
                          value={state.address.state}
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
                              state: !validator.isEmpty(element.target.value),
                            }));
                          }}
                          fullWidth
                          disabled={!canEdit}
                        />
                      </Grid>
                    </Grid>
                  </FormGroupSection>

                  <Grid container>
                    <Grid item md={9} xs={12}>
                      <TextField
                        id="input-responsable-name"
                        label="Nome do responsável"
                        variant="outlined"
                        size="small"
                        value={state.responsable_name}
                        onChange={(element) => {
                          setState({
                            ...state,
                            responsable_name: element.target.value,
                          });
                          setFieldValidations((prevState: any) => ({
                            ...prevState,
                            responsable_name: !validator.isEmpty(
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
                        disabled={!canEdit}
                        mask="(99) 9999-9999"
                        value={state.phone}
                        onChange={(element) => {
                          setState({ ...state, phone: element.target.value });
                          setFieldValidations((prevState: any) => ({
                            ...prevState,
                            phone: !validator.isEmpty(element.target.value),
                          }));
                        }}
                        onBlur={validatePhone}
                      >
                        {(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            error={!validatePhone() && state.phone != ""}
                            id="input-phone"
                            label="Telefone"
                            variant="outlined"
                            size="small"
                            placeholder="(00) 0000-0000"
                            fullWidth
                            disabled={!canEdit}
                          />
                        )}
                      </InputMask>
                      {!validatePhone() && state.phone && (
                        <p
                          style={{ color: "#f44336", margin: "-10px 5px 10px" }}
                        >
                          Por favor insira um número válido
                        </p>
                      )}
                    </Grid>
                    <Grid item md={9} xs={12}>
                      <TextField
                        id="input-email"
                        label="E-mail"
                        variant="outlined"
                        size="small"
                        value={state.email}
                        onChange={(element) => {
                          setState({ ...state, email: element.target.value });
                          setFieldValidations((prevState: any) => ({
                            ...prevState,
                            email: validator.isEmail(element.target.value),
                          }));
                        }}
                        fullWidth
                        disabled={!canEdit}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <InputMask
                        disabled={!canEdit}
                        mask="(99) 9 9999-9999"
                        value={state.cellphone}
                        onChange={(element) => {
                          setState({
                            ...state,
                            cellphone: element.target.value,
                          });
                          setFieldValidations((prevState: any) => ({
                            ...prevState,
                            cellphone: !validator.isMobilePhone(
                              element.target.value,
                              "pt-BR"
                            ),
                          }));
                        }}
                        onBlur={validateCellPhone}
                      >
                        {(inputProps: any) => (
                          <TextField
                            id="input-cellphone"
                            label="Celular"
                            variant="outlined"
                            size="small"
                            // value={state.cellphone}
                            // onChange={(element) => setState({ ...state, cellphone: element.target.value })}
                            placeholder="00000-0000"
                            error={
                              !validateCellPhone() && state.cellphone != ""
                            }
                            fullWidth
                            disabled={!canEdit}
                          />
                        )}
                      </InputMask>
                      {!validateCellPhone() && state.cellphone && (
                        <p
                          style={{ color: "#f44336", margin: "-10px 5px 10px" }}
                        >
                          Por favor insira um número válido
                        </p>
                      )}
                    </Grid>

                    {params.id && (
                      <Grid item md={3} xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              disabled={!canEdit}
                              checked={state.active}
                              onChange={(event) => {
                                setState((prevState) => ({
                                  ...prevState,
                                  active: event.target.checked,
                                }));
                              }}
                            />
                          }
                          label="Ativo?"
                          labelPlacement="start"
                        />
                      </Grid>
                    )}
                  </Grid>
                </FormContent>
                <ButtonsContent>
                  <ButtonComponent
                    background="default"
                    onClick={handleOpenModalCancel}
                  >
                    Voltar
                  </ButtonComponent>
                  <ButtonComponent
                    disabled={formValid}
                    background="success"
                    onClick={handleSaveFormCustomer}
                  >
                    Salvar
                  </ButtonComponent>
                </ButtonsContent>
              </FormSection>
            </>
          )}
        </Container>
      ) : (
        <NoPermission />
      )}

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
  );
}
