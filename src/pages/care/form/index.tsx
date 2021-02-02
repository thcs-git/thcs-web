import React, { useState, useEffect, useCallback, ChangeEvent, ReactNode } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import debounce from 'lodash.debounce';

import { Error } from '@material-ui/icons';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';
import RecentActorsSharpIcon from '@material-ui/icons/RecentActorsSharp';
import LocalHospitalSharpIcon from '@material-ui/icons/LocalHospitalSharp';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { CareInterface } from '../../../store/ducks/cares/types';
import { loadCareById, updateCareRequest, createCareRequest, searchCareRequest as getCares, healthInsuranceRequest, healthPlanRequest, healthSubPlanRequest, AccommodationTypeRequest, careTypeRequest, cidRequest } from '../../../store/ducks/cares/actions';
import { loadRequest as getAreasAction } from '../../../store/ducks/areas/actions';
import { loadRequest as getUsersAction } from '../../../store/ducks/users/actions';

import { Table, Th, Td } from '../../../styles/components/Table';
import { PatientInterface } from '../../../store/ducks/patients/types';
import { searchRequest as searchPatientAction } from '../../../store/ducks/patients/actions';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Badge,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  StepLabel,
  Typography,
  Tooltip,
} from '@material-ui/core';

import { Autocomplete } from '@material-ui/lab';

import { Create as CreateIcon, AccountCircle } from '@material-ui/icons';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import { age, formatDate } from '../../../helpers/date';

import { ReactComponent as IconProfile } from '../../../assets/img/icon-profile.svg';
import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  PatientResume,
  PatientResumeContent,
  PatientData,
  SearchContent,
  StepperComponent,
  StepComponent,
  NoDataIcon,
  PatientNotFound,
  Profile,
} from './styles';

interface IFormFields extends CareInterface {
  form?: {
    bloodType: string | null,
  }
}

interface IPageParams {
  id?: string;
}

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

export default function AreaForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const areaState = useSelector((state: ApplicationState) => state.areas);
  const userState = useSelector((state: ApplicationState) => state.users);
  const patientState = useSelector((state: ApplicationState) => state.patients);

  const { params } = props.match;

  const [state, setState] = useState<IFormFields>({
    health_insurance_id: '',
    health_plan_id: '',
    health_sub_plan_id: '',
    contract: '',
    health_plan_card_number: '',
    health_plan_card_validate: '',
    origin_id: '',
    accommodation_type_id: '',
    care_type_id: '',
    procedure_id: '',
    cid_id: '',
    user_id: '',
    area_id: '',
    status: '', // Pre-Atendimento, Em atendimento, Cancelado, Finalizad,
    created_at: '',
    updated_at: '',
  });

  const [selectCheckbox, setSelectCheckbox] = useState<Partial<CareInterface>>();

  const [patientSearch, setPatientSearch] = useState<string>('');
  const [patient, setPatient] = useState<any>();

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [openModalCancel, setOpenModalCancel] = useState(false);

  const steps = ['Paciente', 'Atendimento', 'Confirmação'];

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
    }

    dispatch(getAreasAction());
    dispatch(getUsersAction());
    dispatch(healthInsuranceRequest());
    dispatch(AccommodationTypeRequest());
    dispatch(careTypeRequest());
    dispatch(getCares({ status: 'Pre-Atendimento', 'capture.status': 'Aprovado' }))
  }, [dispatch]);

  useEffect(() => {
    if (patientState.list.total === 1) {
      setPatient(patientState.list.data[0]);
    }
  }, [patientState.list]);

  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
  }, [currentTab]);

  const handleNextStep = useCallback(() => {
    setCurrentStep(prevState => (prevState + 1))
  }, [currentStep]);

  const handleBackStep = useCallback(() => {
    setCurrentStep(prevState => (prevState - 1))
  }, [currentStep]);

  const searchPatient = useCallback((value: string) => {
    if (value.length > 0) {
      setPatient({});
      dispatch(searchPatientAction(value));
    }
  }, []);

  const searchCidData = useCallback((event) => {
    dispatch(cidRequest(event.target.value))
  }, [dispatch])

  const debounceSearchCidData = debounce(searchCidData, 900)


  function handleSelectUser(value: any) {
    setState(prevState => ({
      ...prevState,
      user_id: value._id
    }));
  }

  function handleSelectCid(value: any) {
    setState(prevState => ({
      ...prevState,
      cid_id: value._id
    }));
  }

  function handleSelectArea(value: any) {
    setState(prevState => ({
      ...prevState,
      area_id: value._id
    }));
  }

  function handleSaveFormCare() {
    // if (state?._id) {
    //   dispatch(updateCareRequest(state));
    // } else {
    //   dispatch(createCareRequest(state));
    // }

    console.log('state', state);
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

  const handleBloodType = useCallback((event: any, newValue: any) => {
    setState(prevState => ({
      ...prevState,
      form: {
        bloodType: newValue,
      }
    }));
  }, []);

  const handleCheckDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(doc => (
      doc.document_group_id === documentId &&
      !doc.canceled &&
      doc.finished
    ));

    const documentRoute = () => {
      switch (documentId) {
        case '5ffd79012f5d2b1d8ff6bea3':
          return 'socioambiental';
        case '5ff65469b4d4ac07d186e99f':
          return 'nead';
        case '5ffd7acd2f5d2b1d8ff6bea4':
          return 'abemid';
        default:
          return '';
      }
    };

    if (found) {
      return found.status === 'Não Elegível' ? (
        <Tooltip title="Não Elegível">
          <Error style={{ color: '#FF6565', cursor: 'pointer' }} onClick={() => history.push(`/patient/capture/${found.care_id}/${documentRoute()}/${found._id}`)} />
        </Tooltip>
      )
        :
        (
          <Tooltip title="Elegível">
            <CheckIcon style={{ color: '#4FC66A', cursor: 'pointer' }} onClick={() => history.push(`/patient/capture/${found.care_id}/${documentRoute()}/${found._id}`)} />
          </Tooltip>
        );
    } else {
      return <Tooltip title="Não Realizado"><CheckIcon style={{ color: '#EBEBEB' }} /></Tooltip>;
    }
  };

  const selectHealhInsurance = useCallback(() => {
    const selected = careState.healthInsurance.filter(item => item._id === state.health_insurance_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.health_insurance_id]);

  const selectHealhPlan = useCallback(() => {
    const selected = careState.healthPlan.filter(item => item._id === state.health_plan_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.health_plan_id]);

  const selectHealhSubPlan = useCallback(() => {
    const selected = careState.healthSubPlan.filter(item => item._id === state.health_sub_plan_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.health_sub_plan_id]);

  const selectAccommodationType = useCallback(() => {
    const selected = careState.accommondation_type.filter(item => item._id === state.accommodation_type_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.accommodation_type_id]);

  const selectCareType = useCallback(() => {
    const selected = careState.care_type.filter(item => item._id === state.care_type_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.care_type_id]);

  const selectUser = useCallback(() => {
    const selected = userState.list.data.filter(item => item._id === state.user_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.user_id]);

  const selectArea = useCallback(() => {
    const selected = areaState.list.data.filter(item => item._id === state.area_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.area_id]);

  const selectCid = useCallback(() => {
    const selected = careState.cid.filter(item => item._id === state.cid_id);
    console.log(selected)
    return (selected[0]) ? selected[0] : null;
  }, [state.cid_id]);

  return (
    <Sidebar>
      {careState.loading && <Loading />}

      <Container>
        <FormTitle>Cadastro de Atendimento</FormTitle>

        <FormSection>
          <FormContent>

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
                        <Td>
                          <Checkbox
                            checked={selectCheckbox?._id === care?._id}
                            onChange={(element) => {
                              if (care._id && care._id === element.target.value) setSelectCheckbox({})
                              else setSelectCheckbox(care)
                            }}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </Td>
                        <Td>
                          {care?.patient_id?.name}
                        </Td>
                        <Td>{care.patient_id?.fiscal_number}</Td>
                        <Td>{handleCheckDocument('5ffd79012f5d2b1d8ff6bea3', care?.documents_id || [])}</Td>
                        <Td>{handleCheckDocument('5ff65469b4d4ac07d186e99f', care?.documents_id || [])}</Td>
                        <Td>{handleCheckDocument('5ffd7acd2f5d2b1d8ff6bea4', care?.documents_id || [])}</Td>
                        <Td>{formatDate(care?.created_at ?? '', 'DD/MM/YYYY HH:mm:ss')}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {patient?._id && (
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <PatientResume>
                        <PatientResumeContent>
                          <PatientData>
                            <div className="patientIcon">
                              <AccountCircle />
                            </div>
                            <div>
                              <p className="title">{patient?.name}</p>
                              <div className="subTitle">
                                <p>{patient?.birthdate ? age(patient?.birthdate) : ''}</p>
                                <p>Sexo: {patient?.gender}</p>
                                <p>Nome da Mãe: {patient?.mother_name}</p>
                              </div>
                            </div>
                          </PatientData>
                          <Button
                            background="default"
                            onClick={() => { history.push(`/patient/${patient?._id}/edit`) }}
                          >
                            <CreateIcon />
                          </Button>
                        </PatientResumeContent>
                      </PatientResume>
                    </Grid>
                  </Grid>
                )}

                {patientState.error && (
                  <PatientNotFound>
                    <NoDataIcon />
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
              <Grid container style={{ marginBottom: '40px' }}>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="input-care-date"
                    label="Data e hora do atendimento"
                    variant="outlined"
                    // defaultValue={new Date().toISOString()}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="datetime-local"
                    size="small"
                    value={state.started_at}
                    onChange={(element) => setState(prevState => ({ ...prevState, started_at: element.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="combo-box-health-insurance"
                    options={careState.healthInsurance}
                    getOptionLabel={(option) => option.name}
                    value={selectHealhInsurance()}
                    getOptionSelected={(option, value) => option._id === state.health_insurance_id}
                    renderInput={(params) => <TextField {...params} label="Convênio" variant="outlined" />}
                    onChange={(event, value) => {
                      if (value) {
                        setState(prevState => ({ ...prevState, health_insurance_id: value._id }));
                      }
                      dispatch(healthPlanRequest(value && value._id));
                    }}
                    size="small"
                    noOptionsText="Nenhum convênio encontrado"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="combo-box-health-plan"
                    options={careState.healthPlan}
                    getOptionLabel={(option) => option.name}
                    value={selectHealhPlan()}
                    getOptionSelected={(option, value) => option._id === state.health_plan_id}
                    renderInput={(params) => <TextField {...params} label="Plano" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        setState(prevState => ({ ...prevState, health_plan_id: value._id }));
                      }
                      dispatch(healthSubPlanRequest(value && value._id));
                    }}
                    noOptionsText="Nenhum plano encontrado"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="combo-box-health-sub-plan"
                    options={careState.healthSubPlan}
                    getOptionLabel={(option) => option.name}
                    value={selectHealhSubPlan()}
                    getOptionSelected={(option, value) => option._id === state.health_sub_plan_id}
                    renderInput={(params) => <TextField {...params} label="Sub-Plano" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        setState(prevState => ({ ...prevState, health_sub_plan_id: value._id }));
                      }
                    }}
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
                    onChange={(element) => setState(prevState => ({ ...prevState, contract: element.target.value }))}
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
                    onChange={(element) => setState(prevState => ({ ...prevState, health_plan_card_number: element.target.value }))}
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
                    onChange={(element) => setState(prevState => ({ ...prevState, health_plan_card_validate: element.target.value }))}
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
                    onChange={(element) => setState(prevState => ({ ...prevState, origin_id: element.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                   <Autocomplete
                    id="input-type-accommodation"
                    options={careState.accommondation_type}
                    getOptionLabel={(option) => option.name}
                    value={selectAccommodationType()}
                    getOptionSelected={(option, value) => option._id === state.accommodation_type_id}
                    renderInput={(params) => <TextField {...params} label="Tipo de acomodação" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        setState(prevState => ({ ...prevState, accommodation_type_id: value._id }));
                      }
                    }}
                    noOptionsText="Nenhum Tipo de acomodação encontrada"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="input-care-type"
                    options={careState.care_type}
                    getOptionLabel={(option) => option.name}
                    value={selectCareType()}
                    getOptionSelected={(option, value) => option._id === state.care_type_id}
                    renderInput={(params) => <TextField {...params} label="Tipo do programa Home Care" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        setState(prevState => ({ ...prevState, care_type_id: value._id }));
                      }
                    }}
                    noOptionsText="Nenhum Tipo do programa Home Care foi encontrado"
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-procedure"
                    label="Procedimento"
                    variant="outlined"
                    size="small"
                    value={state?.procedure_id}
                    onChange={(element) => setState(prevState => ({ ...prevState, procedure_id: element.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  {/* <TextField
                    id="input-diagnostic"
                    label="Diaginóstico (CID)" // CID - Name
                    variant="outlined"
                    size="small"
                    value={state?.cid_id}
                    onChange={(element) => setState(prevState => ({ ...prevState, cid_id: element.target.value }))}
                    fullWidth
                  /> */}
                   <Autocomplete
                    id="input-diagnostic"
                    options={careState.cid}
                    getOptionLabel={(option) => `${option.cid} - ${option.name}`}
                    value={selectCid()}
                    renderInput={(params) => <TextField {...params} label="Diaginóstico (CID)" variant="outlined" />}
                    size="small"
                    onKeyUp={debounceSearchCidData}
                    onChange={(event, value) => {
                      // console.log('asdasd')
                      if (value) {
                        handleSelectCid({ _id: value._id || '', name: value.name })
                      }
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <Autocomplete
                    id="combo-box-users"
                    options={userState.list.data}
                    getOptionLabel={(option) => option.name}
                    value={selectUser()}
                    renderInput={(params) => <TextField {...params} label="Médico responsável" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        handleSelectUser({ _id: value._id || '', name: value.name })
                      }
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    id="combo-box-areas"
                    options={areaState.list.data}
                    getOptionLabel={(option) => option.name}
                    value={selectArea()}
                    renderInput={(params) => <TextField {...params} label="Área" variant="outlined" />}
                    size="small"
                    onChange={(event, value) => {
                      if (value) {
                        handleSelectArea({ _id: value._id || '', name: value.name })
                      }
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            )}


            {/* Step 3 */}
            {currentStep === 2 && (
              <Grid container direction="column">
                <Box mb={2} paddingLeft={5}>
                  <Profile>
                    <IconProfile />
                    <div>
                      <h5>{selectCheckbox?.patient_id && selectCheckbox.patient_id?.name}</h5>
                      <p>{selectCheckbox?.patient_id && age(selectCheckbox.patient_id?.birthdate)}</p>
                      <p>{selectCheckbox?.patient_id && selectCheckbox.patient_id?.fiscal_number}</p>
                    </div>
                  </Profile>
                </Box>

                <Box>
                  <Divider />
                </Box>

                <Box display="flex" flexDirection="column" justifyContent="center" mt={4} paddingLeft={9}>
                  <Box display="flex" flexDirection="column" className="box-position-icon">
                    <EventIcon color="primary" />
                    <Typography variant="subtitle2" component="p" style={{ fontWeight: 'bold' }}>
                      Dados do atendimento
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {state?.started_at}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {state?.procedure_id}
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" mt={4} className="box-position-icon">
                    <HomeIcon color="primary" />
                    <Typography variant="subtitle2" component="p" style={{ fontWeight: 'bold' }}>
                      Dados do Home Care
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectCareType()?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectArea()?.name}
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" mt={4} className="box-position-icon">
                    <RecentActorsSharpIcon color="primary" />
                    <Typography variant="subtitle2" component="p" style={{ fontWeight: 'bold' }}>
                      Dados do plano de saúde
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectHealhInsurance()?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {state?.health_plan_card_number}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {state?.health_plan_card_validate}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectHealhPlan()?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectHealhSubPlan()?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {state?.contract}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectAccommodationType()?.name}
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" mt={4} mb={5} className="box-position-icon">
                    <LocalHospitalSharpIcon color="primary" />
                    <Typography variant="subtitle2" component="p" style={{ fontWeight: 'bold' }}>
                      Dados do hospital
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectUser()?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {`${selectCid()?.cid} - ${selectCid()?.name}`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </FormContent>

          <ButtonsContent>
            <Button
              disabled={currentStep === 0}
              background="default"
              onClick={handleBackStep}
            >
              Anterior
            </Button>

            {currentStep === (steps.length - 1) ? (
              <Button
                background="primary"
                onClick={handleSaveFormCare}
              >
                Finalizar
              </Button>
            ) : (
                <Button
                  disabled={currentStep === (steps.length - 1)}
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
    </Sidebar >
  );
}
