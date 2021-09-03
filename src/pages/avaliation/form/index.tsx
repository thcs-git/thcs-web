import React, { useState, useEffect, useCallback, ChangeEvent, ReactNode } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { CareInterface } from '../../../store/ducks/cares/types';
import { loadCareById, updateCareRequest, createCareRequest } from '../../../store/ducks/cares/actions';
import { loadRequest as getAreasAction } from '../../../store/ducks/areas/actions';
import { loadRequest as getUsersAction } from '../../../store/ducks/users/actions';

import { PatientInterface } from '../../../store/ducks/patients/types';
import { searchRequest as searchPatientAction } from '../../../store/ducks/patients/actions';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Badge,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  StepLabel,
} from '@material-ui/core';

import { Autocomplete } from '@material-ui/lab';

import { Create as CreateIcon, AccountCircle } from '@material-ui/icons';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';

import { bloodTypes } from '../../../helpers/patient';
import { age } from '../../../helpers/date';

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
  PatientNotFound
} from './styles';
import { modify_avaliation } from '../../../store/ducks/modify/actions';

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

  const [patientSearch, setPatientSearch] = useState<string>('');
  const [patient, setPatient] = useState<any>({});

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
    dispatch(modify_avaliation());
  }, [dispatch]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...careState.data
    }));

  }, [careState]);

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


  function handleSelectUser(value: any) {
    setState(prevState => ({
      ...prevState,
      user_id: value._id
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
                <Grid container>
                  <Grid item md={3} xs={12}></Grid>
                  <Grid item md={6} xs={12}>
                    <SearchContent>
                      <TextField
                        id="input-search-fiscal-number"
                        label="Paciente"
                        variant="outlined"
                        size="small"
                        value={patientSearch}
                        placeholder="Buscar por CPF"
                        onChange={element => setPatientSearch(element.target.value)}
                        onBlur={(element) => searchPatient(element.target.value)}
                        fullWidth
                      />
                    </SearchContent>
                  </Grid>
                </Grid>

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
              <Grid container>
                <Grid item md={4} xs={12}>
                  <TextField
                    id="input-health-insurance"
                    label="Convênio"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id="input-health-plan"
                    label="Plano"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id="input-health-sub-plan"
                    label="Sub-plano"
                    variant="outlined"
                    size="small"
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

                <Grid item md={3} xs={12}>
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
                <Grid item md={2} xs={12}>
                  <TextField
                    id="input-health-plan-card-validity"
                    label="Validade"
                    variant="outlined"
                    size="small"
                    type="date"
                    value={state.health_plan_card_validate}
                    onChange={(element) => setState(prevState => ({ ...prevState, health_plan_card_validate: element.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item md={4} xs={12}>
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
                <Grid item md={4} xs={12}>
                  <TextField
                    id="input-type-accommodation"
                    label="Tipo de acomodação"
                    variant="outlined"
                    size="small"
                    value={state.accommodation_type_id}
                    onChange={(element) => setState(prevState => ({ ...prevState, accommodation_type_id: element.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    id="input-care-type"
                    label="Tipo do Homecare"
                    variant="outlined"
                    size="small"
                    value={state.care_type_id}
                    onChange={(element) => setState(prevState => ({ ...prevState, care_type_id: element.target.value }))}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-procedure"
                    label="Procedimento"
                    variant="outlined"
                    size="small"
                    // value={form.cellphone}
                    // onChange={(element) => {
                    //   setForm(prevState => ({
                    //     ...prevState,
                    //     cellphone: element.target.value
                    //   }));

                    //   console.log('form', form);
                    // }}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="input-diagnostic"
                    label="Diagnóstico"
                    variant="outlined"
                    size="small"
                    // value={form.cellphone}
                    // onChange={(element) => {
                    //   setForm(prevState => ({
                    //     ...prevState,
                    //     cellphone: element.target.value
                    //   }));

                    //   console.log('form', form);
                    // }}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="combo-box-users"
                    options={userState.list.data}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Prestador" variant="outlined" />}
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
              <>
                <p>Resumo do atendimento</p>
              </>
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
