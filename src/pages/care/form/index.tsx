import React, {useState, useEffect, useCallback, ReactNode} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import debounce from "lodash.debounce";
import {cpf} from 'cpf-cnpj-validator';
import InputMask, {Props} from 'react-input-mask';
import {bloodTypes, maritalStatus} from '../../../helpers/patient';
import {
  Create as CreateIcon,
  Check as CheckIcon,
  AccountCircle,
  Error,
  Event as EventIcon,
  Home as HomeIcon,
  RecentActorsSharp as RecentActorsSharpIcon,
  LocalHospitalSharp as LocalHospitalSharpIcon,
} from "@material-ui/icons";

import DatePicker from '../../../styles/components/DatePicker';
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {CareInterface} from "../../../store/ducks/cares/types";
import {
  loadCareById,
  updateCareRequest,
  searchCareRequest as getCares,
  healthInsuranceRequest,
  healthPlanRequest,
  healthSubPlanRequest,
  AccommodationTypeRequest,
  careTypeRequest,
  cidRequest,
  cleanAction as clear
} from "../../../store/ducks/cares/actions";
import {cleanAction, loadPatientById} from "../../../store/ducks/patients/actions";
import {loadRequest as getAreasAction} from "../../../store/ducks/areas/actions";
import {loadRequest as getUsersAction} from "../../../store/ducks/users/actions";

import {Table, Th, Td,} from "../../../styles/components/Table";
import {searchRequest as searchPatientAction} from "../../../store/ducks/patients/actions";

import {useHistory, RouteComponentProps} from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  StepLabel,
  Typography,
  Tooltip,
  Switch,
  makeStyles
} from "@material-ui/core";

import {Autocomplete} from "@material-ui/lab";

import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";
import {FormTitle} from "../../../styles/components/Form";
import Button from "../../../styles/components/Button";

import {age, formatDate} from "../../../helpers/date";

import {ReactComponent as IconProfile} from "../../../assets/img/icon-profile.svg";
import {ReactComponent as IconNoData} from "../../../assets/img/no-data.svg";
import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  PatientResume,
  PatientResumeContent,
  PatientData,
  StepperComponent,
  StepComponent,
  NoDataIcon,
  PatientNotFound,
  Profile,
  BoxCustom,
  FormGroupSection,
  OutlinedInputFiled
} from "./styles";

interface IFormFields extends CareInterface {
  form?: {
    bloodType: string | null;
  };
}

interface IPageParams {
  id?: string;
}

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

export default function CareForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const areaState = useSelector((state: ApplicationState) => state.areas);
  const userState = useSelector((state: ApplicationState) => state.users);
  const patientState = useSelector((state: ApplicationState) => state.patients);

  const [startStep, setStartStep] = useState(true);
  const {params} = props.match;

  const [state, setState] = useState<IFormFields>({
    health_insurance_id: "",
    health_plan_id: "",
    health_sub_plan_id: "",
    contract: "",
    health_plan_card_number: "",
    health_plan_card_validate: "",
    origin_id: "",
    accommodation_type_id: "",
    care_type_id: "",
    procedure_id: "5fd6198426831ddc2483173c",
    cid_id: "5ebf162559ba0b646c900240",
    user_id: "",
    area_id: "",
    status: "", // Pre-Atendimento, Em atendimento, Cancelado, Finalizado,
    created_at: "",
    updated_at: "",
  });

  const [selectCheckbox, setSelectCheckbox] = useState<Partial<CareInterface>>
  ();

  const useStyles = makeStyles((theme) => ({
    sucess_round: {
      backgroundColor: 'var(--white)',
      color: 'var(--success)',
      border: '1px solid var(--success)'
    },

    tittleChip: {
      paddingTop: '1rem'

    }
  }));

  const [patient, setPatient] = useState<any>();
  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [firstCall, setFirstcall] = useState(true);

  const classes = useStyles();

  const States = [
    {id: 1, name: "São Paulo", sigla: 'SP'},
    {id: 2, name: 'Paraná', sigla: 'PR'},
    {id: 3, name: 'Santa Catarina', sigla: 'SC'},
    {id: 4, name: 'Rio Garnde do Sul', sigla: 'RS'},
    {id: 5, name: 'Mato Grosso do Sul', sigla: 'MS'},
    {id: 6, name: 'Rondônia', sigla: 'RO'},
    {id: 7, name: 'Acre', sigla: 'AC'},
    {id: 8, name: 'Amazonas', sigla: 'AM'},
    {id: 9, name: 'Roraima', sigla: 'RR'},
    {id: 10, name: 'Pará', sigla: 'PA'},
    {id: 11, name: 'Amapá', sigla: 'AP'},
    {id: 12, name: 'Tocantins', sigla: 'TO'},
    {id: 13, name: 'Maranhão', sigla: 'MA'},
    {id: 14, name: 'Rio Grande do Norte', sigla: 'RN'},
    {id: 15, name: 'Paraíba', sigla: 'PB'},
    {id: 16, name: 'Pernambuco', sigla: 'PE'},
    {id: 17, name: 'Alagoas', sigla: 'AL'},
    {id: 18, name: 'Sergipe', sigla: 'SE'},
    {id: 19, name: 'Bahia', sigla: 'BA'},
    {id: 20, name: 'Minas Gerais', sigla: 'MG'},
    {id: 21, name: 'Rio de Janeiro', sigla: 'RJ'},
    {id: 22, name: 'Mato Grosso', sigla: 'MT'},
    {id: 23, name: 'Goiás', sigla: 'GO'},
    {id: 24, name: 'Distrito Federal', sigla: 'DF'},
    {id: 25, name: 'Piauí', sigla: 'PI'},
    {id: 26, name: 'Ceará', sigla: 'CE'},
    {id: 27, name: 'Espírito Santo', sigla: 'ES'}
  ];

  const [canEdit, setCanEdit] = useState(true);

  const steps = ["Paciente", "Atendimento", "Confirmação"];

  var isValidPhoneNumber: any;
  var isValidCellPhoneNumber: any;
  var isValidResponsableCellPhoneNumber: any;
  var formValid: any;
  useEffect(() => {
    dispatch(clear())
    dispatch(cleanAction());
    dispatch(clear());
    if (params.id) {
      dispatch(loadCareById(params.id));
    }
    dispatch(getAreasAction());
    dispatch(getUsersAction({"profession_id": "5ff6076715685a1414e65fc0"}));
    dispatch(healthInsuranceRequest());
    dispatch(AccommodationTypeRequest());
    dispatch(careTypeRequest());
    dispatch(getCares({status: "Pre-Atendimento", "capture.status": "Aprovado", 'patient_id.active': true}));
  }, [dispatch]);

  useEffect(() => {
    if (patientState.list.total === 1) {
      setPatient(patientState.list.data[0]);
    }
  }, [patientState.list]);

  useEffect(() => {
    if (!firstCall && careState.success && !careState.error && !careState.loading) {
      history.push("/care");
    }
  }, [careState.success]);

  const selectTab = useCallback(
    (index: number) => {
      setCurrentTab(index);
    },
    [currentTab]
  );
  const selectPatient = useCallback((care: CareInterface) => {
    careState.list.data.map((care) => {
      if (care.patient_id._id == care._id) {
        dispatch(loadPatientById(care.patient_id._id));
      }
    })
    dispatch(loadPatientById(care.patient_id._id))

    const healthPlan = care?.capture?.health_insurance_id
    const sheaSubPlan = care?.capture?.health_plan_id

    if (firstCall && healthPlan != undefined && sheaSubPlan != undefined) {
      dispatch(healthPlanRequest(healthPlan ? healthPlan : "6012b8ca863f4dd6560e756b"))
      dispatch(healthSubPlanRequest(sheaSubPlan ? sheaSubPlan : "5fd666cd48392d0621196551"))
      setFirstcall(false)
    }

    setState((prevState) => ({
      ...prevState,
      area_id: care?.patient_id?.area_id,
      origin_id: care?.capture?.hospital,
      health_insurance_id: care?.capture?.health_insurance_id,
      health_plan_id: care?.capture?.health_plan_id,
      health_sub_plan_id: care?.capture?.health_sub_plan_id,
    }))

    setStartStep(!startStep);
  }, [patientState, selectCheckbox])

  const selectPatientArea = useCallback(() => {

    const selected = areaState.list.data.filter(item => {
      if (typeof state?.area_id === 'object') {
        return item._id === state?.area_id._id
      } else {
        return item._id === state?.area_id
      }
    })

    return (selected[0]) ? selected[0] : patientState?.data?.area_id;

    // if(canEdit){

    // }else{
    //    const selected = areaState.list.data.filter(item => {
    //   if (typeof state?.area_id === 'object') {
    //     return item._id === state?.area_id._id
    //   }
    // })

    //return (selected[0]) ? selected[0]: areaState.list.data[0];
    //}

  }, [state.area_id, areaState]);


  const nextstep = useCallback(() => {
    setStartStep(!startStep);
  }, [patientState]);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prevState) => prevState + 1);
  }, [currentStep, state.health_insurance_id]);

  const handleBackStep = useCallback(() => {
    if (currentStep === 0) {
      setStartStep(true)
      setSelectCheckbox(undefined)
    } else {
      setCurrentStep((prevState) => prevState - 1);
    }
  }, [currentStep]);

  const searchCidData = useCallback(
    (event) => {
      dispatch(cidRequest(event.target.value));
    },
    [dispatch]
  );

  const debounceSearchCidData = debounce(searchCidData, 900);

  function handleSelectUser(value: any) {
    setState((prevState) => ({
      ...prevState,
      user_id: value._id,
    }));
  }

  function handleSelectCid(value: any) {
    setState((prevState) => ({
      ...prevState,
      cid_id: value._id,
    }));
  }

  function handleSelectArea(value: any) {

    setState((prevState) => ({
      ...prevState,
      area_id: value._id,
    }));
  }

  function handleSaveFormCare() {
    const assignSelectCheckbox = {
      ...selectCheckbox,
      ...state,
      status: "Atendimento",
      origin_id: '5fd667d948392d0621196553',
      created_at: selectCheckbox?.created_at,
      started_at: new Date().toISOString(),
      care_type_id: selectCareType()?._id
    };

    dispatch(updateCareRequest(assignSelectCheckbox));
  }

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push(`/care`);
  }

  const handleCheckDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(
      (doc) =>
        doc.document_group_id === documentId && !doc.canceled && doc.finished
    );

    const documentRoute = () => {
      switch (documentId) {
        case "5ffd79012f5d2b1d8ff6bea3":
          return "socioambiental";
        case "5ff65469b4d4ac07d186e99f":
          return "nead";
        case "5ffd7acd2f5d2b1d8ff6bea4":
          return "abemid";
        default:
          return "";
      }
    };

    if (found) {
      return found.status === "Não Elegível" ? (
        <Tooltip title="Não Elegível">
          <Error
            style={{color: "#FF6565", cursor: "pointer"}}
            onClick={() =>
              history.push(
                `/patient/capture/${found.care_id}/${documentRoute()}/${found._id
                }`
              )
            }
          />
        </Tooltip>
      ) : (
        <Tooltip title="Elegível">
          <CheckIcon
            style={{color: "#4FC66A", cursor: "pointer"}}
            onClick={() =>
              history.push(
                `/patient/capture/${found.care_id}/${documentRoute()}/${found._id
                }`
              )
            }
          />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Não Realizado">
          <CheckIcon style={{color: "#EBEBEB"}}/>
        </Tooltip>
      );
    }
  };

  const selectHealhInsurance = useCallback(() => {
    const selected = careState.healthInsurance.filter(
      (item) => item._id === selectCheckbox?.capture?.health_insurance_id
    );

    return selected[0] ? selected[0] : careState.healthInsurance[0];
  }, [selectCheckbox, state.health_insurance_id, careState.healthInsurance]);

  const selectHealhPlan = useCallback(() => {
    const selected = careState.healthPlan.filter(
      (item) => item._id === selectCheckbox?.capture?.health_plan_id
    );
    return selected[0] ? selected[0] : careState.healthPlan[0];
  }, [selectCheckbox, state.health_plan_id, careState.healthPlan]);

  const selectHealhSubPlan = useCallback(() => {
    const selected = careState.healthSubPlan.filter(
      (item) => item._id === selectCheckbox?.capture?.health_sub_plan_id
    );
    return selected[0] ? selected[0] : careState.healthSubPlan[0];
  }, [selectCheckbox, state.health_sub_plan_id, careState.healthSubPlan]);

  const selectAccommodationType = useCallback(() => {
    const selected = careState.accommondation_type.filter(
      (item) => item._id === state.accommodation_type_id
    );
    return selected[0] ? selected[0] : null;
  }, [state.accommodation_type_id]);

  const selectCareType = useCallback(() => {
    const selected = careState.care_type.filter(
      (item) => item._id === selectCheckbox?.care_type_id?._id
    );
    return selected[0] ? selected[0] : careState.care_type[0];
  }, [selectCheckbox, state.care_type_id, careState.care_type]);

  const selectUser = useCallback(() => {
    const selected = userState.list.data.filter(
      (item) => item._id === state.user_id
    );
    return selected[0] ? selected[0] : null;
  }, [state.user_id]);

  const selectArea = useCallback(() => {
    const selected = areaState.list.data.filter(
      (item) => item._id === state.area_id
    );
    return selected[0] ? selected[0] : null;
  }, [state.area_id]);

  const selectCid = useCallback(() => {
    const selected = careState.cid.filter((item) => item._id === state.cid_id);
    return selected[0] ? selected[0] : null;
  }, [state.cid_id]);

  return (
    <Sidebar>
      {careState.loading && <Loading/>}

      <Container>
        <FormTitle>Cadastro de Atendimento</FormTitle>

        <FormSection>
          <FormContent>
            {startStep && (
              <BoxCustom>
                <Grid container>


                  <Table>
                    <thead>
                    <tr>
                      <Th></Th>
                      <Th>Paciente</Th>
                      <Th>Pedido</Th>
                      <Th>Socioambiental</Th>
                      <Th>NEAD</Th>
                      <Th>ABEMID</Th>
                      <Th>Última captação</Th>
                    </tr>
                    </thead>
                    <tbody>
                    {careState.list.data.map((care, index) => (
                      <tr key={index}>
                        <Td center>
                          <Checkbox
                            checked={selectCheckbox?._id === care?._id}
                            onChange={(element) => {
                              //  selectPatient();
                              if (care._id && care._id === element.target.value) {

                                setSelectCheckbox(care);
                              } else {
                                setSelectCheckbox(care);
                                selectPatient(care);

                              }
                            }}
                            inputProps={{"aria-label": "primary checkbox"}}
                          />
                        </Td>
                        <Td>{care?.patient_id?.social_name || care?.patient_id?.name}</Td>
                        <Td>{care.patient_id?.fiscal_number}</Td>
                        <Td>
                          {handleCheckDocument(
                            "5ffd79012f5d2b1d8ff6bea3",
                            care?.documents_id || []
                          )}
                        </Td>
                        <Td>
                          {handleCheckDocument(
                            "5ff65469b4d4ac07d186e99f",
                            care?.documents_id || []
                          )}
                        </Td>
                        <Td>
                          {handleCheckDocument(
                            "5ffd7acd2f5d2b1d8ff6bea4",
                            care?.documents_id || []
                          )}
                        </Td>
                        <Td>
                          {formatDate(
                            care?.created_at ?? "",
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </Td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                  <Button variant="outlined" className={classes.sucess_round} onClick={() => {
                    history.push('/care')
                  }}>Voltar</Button>
                </Grid>
              </BoxCustom>

            )}


            {!startStep && (
              <>
                <StepperComponent activeStep={currentStep} alternativeLabel>
                  {steps.map((label) => (
                    <StepComponent key={label}>
                      <StepLabel>{label}</StepLabel>
                    </StepComponent>
                  ))}
                </StepperComponent>
                {/* Step 1 */}
                {currentStep === 0 && (
                  <>
                    <BoxCustom style={{background: '#fff', marginTop: 3}} mt={5} padding={4}>
                      <FormSection>
                        <FormContent>
                          <FormGroupSection>
                            <Grid container>
                              <Grid item md={12} xs={12} style={{marginTop: "1rem"}}>
                                <TextField
                                  id="input-name"
                                  label="Nome do paciente"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data.name}
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>


                              <Grid item md={9} xs={12}>
                                <TextField
                                  id="input-social-name"
                                  label="Nome social"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data?.social_name}
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>

                              <Grid item md={3} xs={12}>
                                <Autocomplete
                                  id="combo-box-gender"
                                  options={['Masculino', 'Feminino', 'Indefinido']}
                                  getOptionLabel={(option) => option}
                                  getOptionSelected={(option, value) => value === patientState.data?.gender}
                                  renderInput={(params) => <TextField {...params} label="Sexo" variant="outlined"/>}
                                  size="small"
                                  value={patientState?.data?.gender}
                                  noOptionsText="Nenhum resultado encontrado"
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>
                              <Grid item md={8} xs={12}>
                                <TextField
                                  id="input-mother-name"
                                  label="Nome da mãe"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data.mother_name}

                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>
                              <Grid item md={4} xs={12}>
                                <TextField
                                  id="input-nationality"
                                  label="Nacionalidade"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data.nationality}
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>

                            </Grid>
                            <Grid container>

                              <Grid item md={3} xs={12}>
                                <FormControl variant="outlined" size="small"
                                             disabled={!canEdit}
                                             fullWidth>
                                  <InputLabel htmlFor="search-input">CPF</InputLabel>
                                  <InputMask
                                    mask="999.999.999-99"
                                    value={patientState.data.fiscal_number}


                                  >
                                    {(inputProps: any) => (
                                      <OutlinedInputFiled
                                        id="input-fiscal-number"
                                        placeholder="000.000.000-00"
                                        labelWidth={80}
                                        style={{marginRight: 12}}
                                        // error={!!cpf.isValid(state.fiscal_number) == false && state.fiscal_number != "___.___.___-__" && !!state.fiscal_number}
                                      />
                                    )}
                                  </InputMask>
                                  {!!cpf.isValid(patientState.data.fiscal_number) == false && patientState.data.fiscal_number != "___.___.___-__" && !!patientState.data.fiscal_number && (
                                    <p style={{color: '#f44336', margin: '1px 5px 20px'}}>
                                      Por favor insira um cpf válido
                                    </p>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item md={4} xs={12}>
                                <FormControl variant="outlined" size="small" disabled={!canEdit} fullWidth>
                                  <InputLabel htmlFor="search-input">RG</InputLabel>
                                  <InputMask
                                    mask="9.999-999"
                                    value={patientState.data.national_id}
                                  >
                                    {(inputProps: any) => (
                                      <OutlinedInputFiled
                                        id="input-nation-id"
                                        placeholder="000.000.000-00"
                                        labelWidth={80}
                                        style={{marginRight: 12}}

                                      />
                                    )}
                                  </InputMask>
                                </FormControl>
                              </Grid>

                              <Grid item md={5} xs={12}>
                                <TextField
                                  id="input-emitting-organ"
                                  label="Órgão Emissor"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data.issuing_organ}

                                  fullWidth
                                  disabled={!canEdit}
                                  autoComplete="off"
                                />
                              </Grid>
                              <Grid item md={3} xs={12}>
                                <FormGroupSection>
                                  <Autocomplete
                                    id="combo-box-marital-status"
                                    options={maritalStatus}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="Estado Civil"
                                                                        variant="outlined" autoComplete="off"/>}
                                    value={patientState?.data?.marital_status}
                                    getOptionSelected={(option, value) => value === patientState.data?.marital_status}
                                    onChange={(event: any, newValue) => {
                                      setState(prevState => ({
                                        ...prevState,
                                        marital_status: newValue || '',
                                      }));
                                    }}
                                    size="small"
                                    noOptionsText="Nenhum resultado encontrado"
                                    fullWidth
                                    // disabled={!canEdit}
                                    autoComplete={false}
                                    autoHighlight={false}
                                  />
                                </FormGroupSection>
                              </Grid>

                              <Grid item md={3} xs={12}>
                                <FormGroupSection>
                                  <Autocomplete
                                    id="combo-box-blood-type"
                                    options={bloodTypes}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="Tipo sanguíneo"
                                                                        variant="outlined"/>}
                                    value={patientState.data?.blood_type}
                                    getOptionSelected={(option, value) => value === patientState.data?.blood_type}
                                    size="small"
                                    noOptionsText="Nenhum resultado encontrado"
                                    fullWidth
                                    disabled={!canEdit}
                                  />
                                </FormGroupSection>
                              </Grid>
                              <Grid item md={10}/>
                            </Grid>
                          </FormGroupSection>

                          {/*  */}
                          <FormGroupSection>
                            <Grid container>
                              <Grid item md={9} xs={12}>
                                <TextField
                                  id="input-address"
                                  label="Endereço"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data?.address_id.street}
                                  //  onChange={(element) => setState({ ...state, address_id: { ...state.address_id, street: element.target.value } })}
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
                                  value={patientState.data?.address_id.number}
                                  //  onChange={(element) => setState({ ...state, address_id: { ...state.address_id, number: element.target.value } })}
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>

                              <Grid item md={7} xs={12}>
                                <TextField
                                  id="input-address-complement"
                                  label="Complemento"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data?.address_id.complement}
                                  //  onChange={(element) => setState({ ...state, address_id: { ...state.address_id, complement: element.target.value } })}
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>

                              <Grid item md={3} xs={12}>
                                <TextField
                                  id="input-neighborhood"
                                  label="Bairro"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data?.address_id.district}
                                  // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, district: element.target.value } })}
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>

                              <Grid item md={4} xs={12}>
                                <TextField
                                  id="input-city"
                                  label="Cidade"
                                  variant="outlined"

                                  size="small"
                                  value={patientState.data?.address_id.city}
                                  // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, city: element.target.value } })}
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
                                  value={patientState.data?.address_id.state}
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>

                              <Grid item md={7} xs={12}>
                                <Autocomplete
                                  id="combo-box-areas"
                                  options={areaState.list.data}
                                  getOptionLabel={(option) => option.name ? option.name : ""}
                                  getOptionSelected={(option, value) => value.name === patientState.data?.area_id.name}
                                  renderInput={(params) => <TextField {...params} label="Área" variant="outlined"/>}
                                  size="small"
                                  defaultValue={selectPatientArea()}
                                  value={selectPatientArea()}
                                  // onChange={(event: any, newValue) => {
                                  //   if (newValue) {
                                  //     setState({...state, area_id: newValue._id})
                                  //   }
                                  // }}
                                  noOptionsText="Nenhum resultado encontrado"
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>
                            </Grid>
                            <Grid container>
                            </Grid>
                          </FormGroupSection>
                          <FormGroupSection>
                            <Grid container>
                              <Grid item md={8} xs={12}>
                                <TextField
                                  id="input-responsible-name"
                                  label="Nome do responsável"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data?.responsable?.name}
                                  // onChange={(element) => setState({ ...state, responsable: { ...state.responsable, name: element.target.value } })}
                                  placeholder=""
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>

                              <Grid item md={4} xs={6}>
                                <TextField
                                  id="input-responsible"
                                  label="Parentesco"
                                  variant="outlined"
                                  size="small"
                                  value={patientState.data?.responsable?.relationship}
                                  //  onChange={(element) => setState({ ...state, responsable: { ...state.responsable, relationship: element.target.value } })}
                                  placeholder=""
                                  fullWidth
                                  disabled={!canEdit}
                                />
                              </Grid>
                            </Grid>
                          </FormGroupSection>
                        </FormContent>
                      </FormSection>
                    </BoxCustom>

                    {patient?._id && (
                      <Grid container>
                        <Grid item md={12} xs={12}>
                          <PatientResume>
                            <PatientResumeContent>
                              <PatientData>
                                <div className="patientIcon">
                                  <AccountCircle/>
                                </div>
                                <div>
                                  <p className="title">{patient?.name}</p>
                                  <div className="subTitle">
                                    <p>
                                      {patient?.birthdate
                                        ? age(patient?.birthdate)
                                        : ""}
                                    </p>
                                    <p>Sexo: {patient?.gender}</p>
                                    <p>Nome da Mãe: {patient?.mother_name}</p>
                                  </div>
                                </div>
                              </PatientData>
                              <Button
                                background="default"
                                onClick={() => {
                                  history.push(`/patient/${patient?._id}/edit`);
                                }}
                              >
                                <CreateIcon/>
                              </Button>
                            </PatientResumeContent>
                          </PatientResume>
                        </Grid>
                      </Grid>
                    )}

                    {patientState.error && (
                      <PatientNotFound>
                        <NoDataIcon/>
                        <p>Paciente não encontrado</p>
                      </PatientNotFound>
                    )}

                    {patientState.loading && (
                      <PatientNotFound>
                        <p>Buscando...</p>
                      </PatientNotFound>
                    )}
                  </>
                )}
                {/* Step 2 */}
                {currentStep === 1 && (

                  <Grid container style={{marginBottom: "40px"}}>
                    <Grid item md={4} xs={12}>
                      <Autocomplete
                        id="combo-box-health-insurance"
                        options={careState?.healthInsurance}
                        getOptionLabel={(option: any) => option.name}
                        defaultValue={selectHealhInsurance()}
                        value={selectHealhInsurance()}
                        // getOptionSelected={(option, value) => option._id === value._id}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Convênio"
                            variant="outlined"
                          />
                        )}
                        // onChange={(event, value) => {
                        //   if (value) {
                        //     setState((prevState) => ({
                        //       ...prevState,
                        //       health_insurance_id: value._id,
                        //     }));
                        //     dispatch(healthPlanRequest(value && value._id));
                        //   }
                        // }}
                        size="small"
                        noOptionsText="Nenhum convênio encontrado"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Autocomplete
                        id="combo-box-health-plan"
                        options={careState.healthPlan}
                        getOptionLabel={(option) => option.name}
                        defaultValue={selectHealhPlan()}
                        value={selectHealhPlan()}
                        // getOptionSelected={(option, value) =>
                        //   option._id === state.health_plan_id
                        // }
                        renderInput={(params) => (
                          <TextField {...params} label="Plano" variant="outlined"/>
                        )}
                        size="small"
                        // onChange={(event, value) => {
                        //   if (value) {
                        //     setState((prevState) => ({
                        //       ...prevState,
                        //       health_plan_id: value._id,
                        //     }));
                        //     dispatch(healthSubPlanRequest(value && value._id));
                        //   }
                        // }}
                        noOptionsText="Nenhum plano encontrado"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Autocomplete
                        id="combo-box-health-sub-plan"
                        options={careState.healthSubPlan}
                        getOptionLabel={(option) => option.name}
                        defaultValue={selectHealhSubPlan()}
                        value={selectHealhSubPlan()}
                        // getOptionSelected={(option, value) =>
                        //   option._id === state.health_sub_plan_id
                        // }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Sub-Plano"
                            variant="outlined"
                          />
                        )}
                        size="small"
                        // onChange={(event, value) => {
                        //   if (value) {
                        //     setState((prevState) => ({
                        //       ...prevState,
                        //       health_sub_plan_id: value._id,
                        //     }));
                        //   }
                        // }}
                        noOptionsText="Nenhum sub-plano encontrado"
                        fullWidth
                      />
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-contract"
                        label="Contrato"
                        variant="outlined"
                        size="small"
                        value={state.contract}
                        onChange={(element) =>
                          setState((prevState) => ({
                            ...prevState,
                            contract: element.target.value,
                          }))
                        }
                        fullWidth
                      />
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-health-plan-card-number"
                        label="Número da carteira"
                        variant="outlined"
                        size="small"
                        value={state.health_plan_card_number}
                        onChange={(element) =>
                          setState((prevState) => ({
                            ...prevState,
                            health_plan_card_number: element.target.value,
                          }))
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-health-plan-card-validity"
                        label="Validade"
                        variant="outlined"
                        size="small"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={state.health_plan_card_validate}
                        onChange={(element) =>
                          setState((prevState) => ({
                            ...prevState,
                            health_plan_card_validate: element.target.value,
                          }))
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="input-origin"
                        label="Procedência"
                        variant="outlined"
                        size="small"
                        value={state.origin_id}
                        // onChange={(element) =>
                        //   setState((prevState) => ({
                        //     ...prevState,
                        //     origin_id: element.target.value,
                        //   }))
                        // }
                        fullWidth
                      />
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="input-type-accommodation"
                    options={careState.accommondation_type}
                    getOptionLabel={(option) => option.name}
                    value={selectAccommodationType()}
                    getOptionSelected={(option, value) =>
                      option._id === state.accommodation_type_id
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipo de acomodação"
                        variant="outlined"
                      />
                    )}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        setState((prevState) => ({
                          ...prevState,
                          accommodation_type_id: value._id,
                        }));
                      }
                    }}
                    noOptionsText="Nenhum Tipo de acomodação encontrada"
                    fullWidth
                  />
                </Grid> */}
                    <Grid item md={4} xs={12}>
                      <Autocomplete
                        id="input-care-type"
                        options={careState.care_type}
                        getOptionLabel={(option) => option.name}
                        value={selectCareType()}
                        getOptionSelected={(option, value) =>
                          option._id === state.care_type_id
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Tipo do programa Home Care"
                            variant="outlined"
                          />
                        )}
                        size="small"
                        onChange={(event, value) => {
                          if (value) {
                            setState((prevState) => ({
                              ...prevState,
                              care_type_id: value._id,
                            }));
                          }
                        }}
                        noOptionsText="Nenhum Tipo do programa Home Care foi encontrado"
                        fullWidth
                      />
                    </Grid>
                    {/* <Grid item md={12} xs={12}>
                  <TextField
                    id="input-procedure"
                    label="Procedimento"
                    variant="outlined"
                    size="small"
                    value={state?.procedure_id}
                    onChange={(element) =>
                      setState((prevState) => ({
                        ...prevState,
                        procedure_id: element.target.value,
                      }))
                    }
                    fullWidth
                  />
                </Grid> */}
                    {/* <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="input-diagnostic"
                    options={careState.cid}
                    getOptionLabel={(option) =>
                      `${option.cid} - ${option.name}`
                    }
                    value={selectCid()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Diaginóstico (CID)"
                        variant="outlined"
                      />
                    )}
                    size="small"
                    onKeyUp={debounceSearchCidData}
                    onChange={(event, value) => {
                      if (value) {
                        handleSelectCid({
                          _id: value._id || "",
                          name: value.name,
                        });
                      }
                    }}
                    noOptionsText="Nenhum CID foi encontrado"
                    fullWidth
                  />
                </Grid> */}
                    <Grid item md={8} xs={12}>
                      <Autocomplete
                        id="combo-box-users"
                        options={userState.list.data}
                        getOptionLabel={(option) => option.name}
                        value={selectUser()}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Médico Assistente"
                            variant="outlined"
                          />
                        )}
                        size="small"
                        onChange={(event, value) => {
                          if (value) {
                            handleSelectUser({
                              _id: value._id || "",
                              name: value.name,
                            });
                          }
                        }}
                        noOptionsText="Nenhum médico foi encontrado na empresa"
                        fullWidth
                      />
                    </Grid>
                    {/* <Grid item md={4} xs={12}>
                  <Autocomplete
                    id="combo-box-areas"
                    options={areaState.list.data}
                    getOptionLabel={(option) => option.name}
                    value={selectArea()}
                    renderInput={(params) => (
                      <TextField {...params} label="Área" variant="outlined" />
                    )}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        handleSelectArea({
                          _id: value._id || "",
                          name: value.name,
                        });
                      }
                    }}
                    fullWidth
                  />
                </Grid> */}
                  </Grid>

                )}


                {/* Step 3 */}

                {currentStep === 2 && (
                  <Grid container direction="column">
                    <Box mb={2} paddingLeft={5}>
                      <Profile>
                        <IconProfile/>
                        <div>
                          <h5>
                            {selectCheckbox?.patient_id &&
                            selectCheckbox.patient_id?.name}
                          </h5>
                          <p>
                            {selectCheckbox?.patient_id &&
                            age(selectCheckbox.patient_id?.birthdate)}
                          </p>
                          <p>
                            {selectCheckbox?.patient_id &&
                            selectCheckbox.patient_id?.fiscal_number}
                          </p>
                        </div>
                      </Profile>
                    </Box>

                    <Box>
                      <Divider/>
                    </Box>

                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      mt={4}
                      paddingLeft={9}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        className="box-position-icon"
                      >
                        <EventIcon style={{color: "#0899BA"}}/>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          style={{fontWeight: "bold"}}
                        >
                          Dados do atendimento
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatDate(new Date().toISOString(), "DD/MM/YYYY HH:mm:ss")}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Procedimento: {state?.procedure_id}
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        mt={4}
                        className="box-position-icon"
                      >
                        <HomeIcon style={{color: "#0899BA"}}/>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          style={{fontWeight: "bold"}}
                        >
                          Dados do Home Care
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Tipo do programa: {selectCareType()?.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Área: {selectArea()?.name}
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        mt={4}
                        className="box-position-icon"
                      >
                        <RecentActorsSharpIcon style={{color: "#0899BA"}}/>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          style={{fontWeight: "bold"}}
                        >
                          Dados do plano de saúde
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Convênio: {selectHealhInsurance()?.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Número da carteira: {state?.health_plan_card_number}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Validade da carteira: {state?.health_plan_card_validate}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Plano: {selectHealhPlan()?.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Sub-plano: {selectHealhSubPlan()?.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Contrato: {state?.contract}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Tipo de acomodação: {selectAccommodationType()?.name}
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        mt={4}
                        mb={5}
                        className="box-position-icon"
                      >
                        <LocalHospitalSharpIcon style={{color: "#0899BA"}}/>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          style={{fontWeight: "bold"}}
                        >
                          Dados do hospital
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Médico Assistente: {selectUser()?.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {`${selectCid()?.cid ?? ""} - ${selectCid()?.name ?? ""}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </>

            )}

          </FormContent>



          <ButtonsContent>
            {!startStep && (<Button
              background="default"
              onClick={() => {
                history.push('/care')
                setStartStep(!startStep);
                setCurrentStep(0)
              }}
            >
              Voltar
            </Button>)}
            {!startStep && (
              <Button
                background="default"
                onClick={handleBackStep}
              >
                Anterior
              </Button>
            )}

            {(currentStep === steps.length - 1 && !startStep) && (
              <Button background="primary" onClick={handleSaveFormCare}>
                Finalizar
              </Button>
            )}
            {(currentStep !== steps.length - 1 && !startStep) && (
              <Button
                style={{marginLeft: '0.6rem'}}
                disabled={currentStep === (steps.length - 1) || !selectCheckbox?._id}
                background="primary"
                onClick={handleNextStep}

              >
                Próximo
              </Button>
            )}
          </ButtonsContent>
        </FormSection>
      </Container>

      <Dialog
        open={openModalCancel}
        onClose={handleCloseModalCancel}
        aria-labelledby="alert-dialog-title"
        aria-namedby="alert-dialog-description"
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
