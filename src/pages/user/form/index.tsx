import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
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
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputMask, { Props } from "react-input-mask";
import validator from "validator";
import { toast } from "react-toastify";

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
} from "../../../store/ducks/users/types";

import { loadRequest as getSpecialtiesAction } from "../../../store/ducks/specialties/actions";
import { SpecialtyInterface } from "../../../store/ducks/specialties/types";

import { loadRequest as getCouncilsAction } from "../../../store/ducks/councils/actions";
import { CouncilInterface } from "../../../store/ducks/councils/types";

import { loadRequest as getCompaniesAction } from "../../../store/ducks/companies/actions";
import { CompanyInterface } from "../../../store/ducks/companies/types";

import { ApplicationState } from "../../../store";

import { ufs } from "../../../helpers/constants/address";
import Loading from "../../../components/Loading";

import Sidebar from "../../../components/Sidebar";
import {
  FormTitle,
  SelectComponent as Select,
} from "../../../styles/components/Form";
import { SwitchComponent as Switch } from "../../../styles/components/Switch";
import { ChipComponent as Chip } from "../../../styles/components/Chip";

import { formatDate, age } from "../../../helpers/date";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

import DatePicker from "../../../styles/components/DatePicker";
import {
  TabContent,
  TabNav,
  TabNavItem,
  TabBody,
  TabBodyItem,
} from "../../../styles/components/Tabs";
import ButtonComponent from "../../../styles/components/Button";

import {
  ButtonsContent,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection,
  ChipList,
} from "./styles";
import FeedbackComponent from "../../../components/Feedback";

interface IFormFields {
  userType: { id: string; description: string } | null;
  council: CouncilInterface | null;
}

interface IPageParams {
  id?: string;
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

  const { params } = props.match;

  const currentCompany = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
  const [currentTab, setCurrentTab] = useState(0);

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
    active: true,
  });
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

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

  const [form, setForm] = useState<IFormFields>({
    userType: null,
    council: null,
  });

  const genders = ["Masculino", "Feminino", "Indefinido"];

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(cleanAction());
    dispatch(getSpecialtiesAction());
    dispatch(getCouncilsAction());
    dispatch(getProfessionsAction());
    dispatch(getCompaniesAction());
    dispatch(getUserTypesAction());
    console.log(userState);
    console.log(specialtyState);
  }, []);

  useEffect(() => {
    if (params.id) {
      dispatch(loadUserById(params.id));
    } else {
      dispatch(cleanAction());
    }
  }, [params]);

  useEffect(() => {
    setSpecialties(specialtyState.list.data);
  }, [specialtyState.list.data]);

  useEffect(() => {
    setCompanies(companyState.list.data);
  }, [companyState.list.data]);

  useEffect(() => {
    if (userState.data._id) {
      setState((prevState) => ({
        ...prevState,
        ...userState.data,
        user_type_id:
          typeof userState.data.user_type_id === "object"
            ? userState.data.user_type_id._id
            : userState.data.user_type_id,
      }));
    }

    // Força o validador em 'true' quando entrar na tela para editar
    if (params?.id) {
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
      }));
    }

    if (userState.error) {
      document.getElementById("input-postal-code")?.focus();
      setState((prevState) => {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            postal_code: "",
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
          postal_code: false,
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
      document.getElementById("input-address-number")?.focus();
    }
  }, [userState.data.address]);

  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;

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
    if (state.address.postal_code.includes(' ')) {
      setFieldValidations((prevState: any) => ({
        ...prevState,
        address: {
          postal_code: false,
          street: false,
          number: false,
          district: false,
          city: false,
          state: false,
          complement: false,
        },
      }));
      return;
    }

    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address?.postal_code]);

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push(`/user`);
  }

  function handleSelectProfession(value: ProfessionUserInterface) {
    setState((prevState) => ({
      ...prevState,
      profession_id: value._id,
    }));
  }

  const selectProfession = useCallback(() => {
    if (!userState.data.professions) {
      return null;
    }

    const selected = userState.data.professions.filter((item) => {
      if (typeof state.profession_id === "object") {
        return item._id === state?.profession_id?._id;
      }
    });

    return selected[0] ? selected[0] : null;
  }, [state.profession_id, state.professions]);

  // Especialides
  function handleSelectMainSpecialty(value: SpecialtyInterface) {
    setState((prevState) => ({
      ...prevState,
      main_specialty_id: value._id,
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

  const handleDeleteEspecialty = useCallback(
    (especialty: SpecialtyInterface) => {
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

        specialtiesSelected.splice(especialtyFounded, 1);

        setState((prevState) => ({
          ...prevState,
          specialties: specialtiesSelected,
        }));
      }
    },
    [state.specialties]
  );

  const selectMainSpecialty = useCallback(() => {
    const selected = specialtyState.list.data.filter(
      (item) => item._id === state.main_specialty_id
    );

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
    if (!userState.data.user_types) {
      return null;
    }

    const selected = userState.data.user_types.filter(
      (item) => item._id === state.user_type_id
    );

    return selected[0] ? selected[0] : null;
  }, [state.user_type_id, state.user_types]);

  //Empresas
  function handleSelectCompany(value: CompanyInterface) {
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

  const handleDeleteCompany = useCallback(
    (company: CompanyInterface) => {
      let companiesSelected = [...state.companies];
      const companyFounded = companiesSelected.findIndex((item: any) => {
        return company._id === item._id;
      });

      if (companyFounded > -1) {
        const companyData = companiesSelected.find((item: any) => {
          return company._id === item._id;
        });

        let companiesCopy = [...companies];

        companiesCopy.push(companyData);
        setCompanies(companiesCopy);

        companiesSelected.splice(companyFounded, 1);

        setState((prevState) => ({
          ...prevState,
          companies: companiesSelected,
        }));
      }
    },
    [state.companies]
  );

  const handleSaveFormUser = useCallback(() => {
    if (!handleValidateFields()) {
      toast.error("Existem campos que precisam ser preenchidos para continuar");
      return;
    }

    if (state?._id) {
      dispatch(updateUserRequest(state));
    } else {
      dispatch(createUserRequest(state));
    }
  }, [state]);

  return (
    <Sidebar>
      {userState.loading && <Loading />}
      <Container>
        {userState.success ? (
          <FeedbackComponent
            type="success"
            title="Cadastro concluído!"
            description="Os dados foram salvos no sistema. Deseja adicionar novo cadastro?"
            buttons
            successAction={() => {
              dispatch(cleanAction());
              history.push("/user/create");
            }}
            defaultAction={() => {
              dispatch(cleanAction());
              history.push("/user");
            }}
          />
        ) : (
          <FormSection>
            <FormContent>
              <FormTitle>Cadastro de Usuário</FormTitle>

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
                </TabNav>
                <TabBody>
                  <TabBodyItem className={currentTab === 0 ? "show" : ""}>
                    <Grid container>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="input-social-name"
                          label="Nome do usuário"
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
                          error={!fieldsValidation.name}
                          helperText={
                            !fieldsValidation.name
                              ? `Por favor, insira um nome para o usuário.`
                              : null
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={7} xs={12}>
                        <TextField
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
                          error={!fieldsValidation.mother_name}
                          helperText={
                            !fieldsValidation.mother_name
                              ? `Por favor, insira o nome da mãe do usuário.`
                              : null
                          }
                          fullWidth
                        />
                      </Grid>

                      <Grid item md={3} xs={12}>
                        <DatePicker
                          id="input-fiscal-birthdate"
                          label="Data de Nascimento"
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
                          }}
                          error={!fieldsValidation.birthdate}
                          helperText={
                            !fieldsValidation.birthdate
                              ? `Por favor, insira a data de nascimento.`
                              : null
                          }
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
                              id="input-fiscal-number"
                              label="CPF"
                              variant="outlined"
                              size="small"
                              placeholder="000.000.000-00"
                              error={!fieldsValidation.fiscal_number}
                              helperText={
                                !fieldsValidation.fiscal_number
                                  ? `Por favor, insira o CPF.`
                                  : null
                              }
                              fullWidth
                            />
                          )}
                        </InputMask>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <InputMask
                          mask="9.999-999"
                          value={state.national_id}
                          onChange={(element) => {
                            setState({
                              ...state,
                              national_id: element.target.value,
                            });
                            setFieldValidations((prevState: any) => ({
                              ...prevState,
                              national_id: !validator.isEmpty(
                                element.target.value
                              ),
                            }));
                          }}
                        >
                          {(inputProps: any) => (
                            <TextField
                              {...inputProps}
                              id="input-nation-id"
                              label="RG"
                              variant="outlined"
                              size="small"
                              placeholder="0.000-000"
                              error={!fieldsValidation.national_id}
                              helperText={
                                !fieldsValidation.national_id
                                  ? `Por favor, insira o RG.`
                                  : null
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
                          error={!fieldsValidation.issuing_organ}
                          helperText={
                            !fieldsValidation.issuing_organ
                              ? `Por favor, insira o orgão emissor.`
                              : null
                          }
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
                          error={!fieldsValidation.nationality}
                          helperText={
                            !fieldsValidation.nationality
                              ? `Por favor, insira a nacionalidade.`
                              : null
                          }
                          fullWidth
                        />
                      </Grid>

                      <Grid item md={3} xs={12}>
                        <FormGroupSection fullWidth error>
                          <Autocomplete
                            id="combo-box-gender"
                            size="small"
                            options={genders}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Sexo"
                                variant="outlined"
                                error={!fieldsValidation.gender}
                                helperText={
                                  !fieldsValidation.gender
                                    ? "Selecione o sexo"
                                    : null
                                }
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
                                gender: !validator.isEmpty(value ? value : ""),
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
                                id="input-postal-code"
                                label="CEP"
                                placeholder="00000-000"
                                size="small"
                                variant="outlined"
                                error={!fieldsValidation.address.postal_code}
                                helperText={
                                  !fieldsValidation.address.postal_code
                                    ? `Por favor, insira o CEP.`
                                    : null
                                }
                                fullWidth
                              />
                            )}
                          </InputMask>
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
                            error={!fieldsValidation.address.street}
                            helperText={
                              !fieldsValidation.address.street
                                ? `Por favor, insira o nome da rua.`
                                : null
                            }
                            fullWidth
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
                            error={!fieldsValidation.address.number}
                            helperText={
                              !fieldsValidation.address.number
                                ? `Por favor, insira o número da residência.`
                                : null
                            }
                            fullWidth
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
                            error={!fieldsValidation.address.district}
                            helperText={
                              !fieldsValidation.address.district
                                ? `Por favor, insira o bairro.`
                                : null
                            }
                            fullWidth
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
                            error={!fieldsValidation.address.city}
                            helperText={
                              !fieldsValidation.address.city
                                ? `Por favor, insira a cidade.`
                                : null
                            }
                            fullWidth
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
                            error={!fieldsValidation.address.state}
                            helperText={
                              !fieldsValidation.address.state
                                ? `Por favor, insira o estado.`
                                : null
                            }
                            fullWidth
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
                            setState({ ...state, email: element.target.value });
                            setFieldValidations((prevState: any) => ({
                              ...prevState,
                              email: validator.isEmail(element.target.value),
                            }));
                          }}
                          error={!fieldsValidation.email}
                          helperText={
                            !fieldsValidation.email
                              ? `Por favor, insira o email do usuário.`
                              : null
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <InputMask
                          mask="(99) 9999-9999"
                          value={state.phone}
                          onChange={(element) => {
                            setState({ ...state, phone: element.target.value });
                            setFieldValidations((prevState: any) => ({
                              ...prevState,
                              phone: !validator.isEmpty(element.target.value),
                            }));
                          }}
                        >
                          {(inputProps: any) => (
                            <TextField
                              {...inputProps}
                              id="input-phone"
                              label="Telefone"
                              variant="outlined"
                              size="small"
                              placeholder="0000-0000"
                              error={!fieldsValidation.phone}
                              helperText={
                                !fieldsValidation.phone
                                  ? `Por favor, insira o telefone.`
                                  : null
                              }
                              fullWidth
                            />
                          )}
                        </InputMask>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={state.cellphone}
                          onChange={(element) => {
                            setState({
                              ...state,
                              cellphone: element.target.value,
                            });
                            setFieldValidations((prevState: any) => ({
                              ...prevState,
                              cellphone: validator.isMobilePhone(
                                element.target.value,
                                "pt-BR"
                              ),
                            }));
                          }}
                        >
                          {(inputProps: any) => (
                            <TextField
                              {...inputProps}
                              id="input-cellphone"
                              label="Celular"
                              variant="outlined"
                              size="small"
                              placeholder="(00) 0 0000-0000"
                              error={!fieldsValidation.cellphone}
                              helperText={
                                !fieldsValidation.cellphone
                                  ? `Por favor, insira o celular.`
                                  : null
                              }
                              fullWidth
                            />
                          )}
                        </InputMask>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item md={4} xs={12}>
                        <FormGroupSection fullWidth error>
                          <Autocomplete
                            id="combo-box-user-type"
                            options={userState.data.user_types || []}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Tipo do Usuário"
                                variant="outlined"
                                error={!fieldsValidation.user_type_id}
                                helperText={
                                  !fieldsValidation.user_type_id
                                    ? `Selecione um tipo do usuário.`
                                    : null
                                }
                              />
                            )}
                            value={selectUserType()}
                            getOptionSelected={(option, value) =>
                              option._id === state.user_type_id
                            }
                            onChange={(event: any, newValue) => {
                              handleUserType(event, newValue);
                              setFieldValidations((prevState: any) => ({
                                ...prevState,
                                user_type_id: newValue !== null,
                              }));
                            }}
                            size="small"
                            fullWidth
                          />
                        </FormGroupSection>
                      </Grid>

                      {state?._id && (
                        <Grid item xs={12} md={12}>
                          <FormControlLabel
                            control={
                              <Switch
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
                          />
                        </Grid>
                      )}
                    </Grid>
                  </TabBodyItem>
                  <TabBodyItem className={currentTab === 1 ? "show" : ""}>
                    <Grid container>
                      <Grid item md={5} xs={12}>
                        <FormGroupSection fullWidth error>
                          <Autocomplete
                            id="combo-box-profession"
                            options={userState.data.professions || []}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Função"
                                variant="outlined"
                              />
                            )}
                            getOptionSelected={(option, value) =>
                              option._id === state?.profession_id
                            }
                            value={selectProfession()}
                            onChange={(event, value) => {
                              if (value) {
                                handleSelectProfession(value);
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
                            options={councilState.list.data}
                            getOptionLabel={(option) =>
                              `${option.initials} - ${option.name}`
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
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
                            getOptionLabel={(option) => option.initials}
                            renderInput={(params) => (
                              <TextField
                                {...params}
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
                              onDelete={(event) => handleDeleteEspecialty(item)}
                            />
                          ))}
                        </ChipList>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormGroupSection fullWidth error>
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
                        </FormGroupSection>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <ChipList>
                          {state.companies?.map((item: any, index) => (
                            <Chip
                              key={`company_selected_${index}`}
                              label={item.name}
                              onDelete={(event) => handleDeleteCompany(item)}
                            />
                          ))}
                        </ChipList>
                      </Grid>
                    </Grid>
                  </TabBodyItem>
                </TabBody>
              </TabContent>
            </FormContent>
            <ButtonsContent>
              <ButtonComponent
                background="default"
                onClick={() =>
                  userState.success
                    ? history.push("/user")
                    : handleOpenModalCancel()
                }
              >
                Cancelar
              </ButtonComponent>
              {currentTab === 0 ? (
                <ButtonComponent
                  background="primary"
                  onClick={() => selectTab(1)}
                >
                  Próximo
                </ButtonComponent>
              ) : (
                <>
                  <ButtonComponent
                    background="default"
                    onClick={() => selectTab(0)}
                  >
                    Voltar
                  </ButtonComponent>
                  <ButtonComponent
                    background="success"
                    onClick={handleSaveFormUser}
                  >
                    Salvar
                  </ButtonComponent>
                </>
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
  );
}
