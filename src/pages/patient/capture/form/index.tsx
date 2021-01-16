import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { Create as CreateIcon, Search as SearchIcon, AccountCircle, Visibility } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { searchRequest as searchPatientAction } from '../../../../store/ducks/patients/actions';
import { PatientDataItems } from '../../../../store/ducks/patients/types';

import { createCareRequest as createCareAction, searchCareRequest as getCares } from '../../../../store/ducks/cares/actions';
import { CareInterface } from '../../../../store/ducks/cares/types';

import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import { age, formatDate } from '../../../../helpers/date';

import Button from '../../../../styles/components/Button';
import { FormTitle } from '../../../../styles/components/Form';

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

export default function PatientCaptureForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const patientState = useSelector((state: ApplicationState) => state.patients);
  const careState = useSelector((state: ApplicationState) => state.cares);

  const [patientSearch, setPatientSearch] = useState<string>('');
  const [patient, setPatient] = useState<any>({});

  const [care, setCare] = useState<CareInterface>({
    health_insurance_id: '5f903db15104287582ba58af',
    health_plan_id: '5fd666cd48392d0621196551',
    health_sub_plan_id: '5fd6671f48392d0621196552',
    health_plan_card_validate: '2021-01-30T12:00:00',
    health_plan_card_number: '123456789',
    contract: '123123',
    care_type_id: '5fd66ca189a402ec48110cc1',
    user_id: '5e8cfe7de9b6b8501c8033ac',
    created_by: { _id: '5e8cfe7de9b6b8501c8033ac' },
    status: 'Pre-Atendimento',
  });

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [openModalCare, setOpenModalCare] = useState<boolean>(false);

  useEffect(() => {
    if (patientState.list.total === 1) {
      setPatient(patientState.list.data[0]);
      setPatientSearch(patientState.list.data[0].fiscal_number);

      dispatch(getCares({ patient_id: patientState.list.data[0]._id, status: 'Pre-Atendimento' }))
    }
  }, [patientState.list]);

  useEffect(() => {
    if (careState.success && !careState.error && careState.data._id) {
      history.push(`/patient/capture/${careState.data._id}/overview`);
    }
  }, [careState])

  const searchPatient = useCallback((value: string) => {
    setPatient({});

    if (value.length > 0) {
      dispatch(searchPatientAction(value));
    }
  }, []);

  const toggleModalConfirm = useCallback((open?: boolean) => {
    open ? setOpenModalConfirm(open) : setOpenModalConfirm(!openModalConfirm);
  }, [openModalConfirm]);

  const toggleModalCares = useCallback((open?: boolean) => {
    open ? setOpenModalCare(open) : setOpenModalCare(!openModalCare);
  }, [openModalCare]);

  const handleSubmitPatientCapture = useCallback(() => {
    setOpenModalConfirm(false);

    const params = { ...care, patient_id: patient._id };

    dispatch(createCareAction(params))

  }, [dispatch, care, patient]);

  return (
    <>
      <Sidebar>
        {(patientState.loading || careState.loading) && (
          <Loading />
        )}
        {console.log('careState', careState)}
        <Container>
          <FormTitle>Captação de Pacientes</FormTitle>
          <h4>Primeiro, encontre o paciente que deseja realizar a captação:</h4>
          <br />
          <Grid container>
            <Grid item md={3} xs={12}>
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
                  autoFocus
                />
                <Button
                  background="success"
                  size="large"
                >
                  <SearchIcon />
                </Button>
              </SearchContent>
            </Grid>
          </Grid>

          {patient?._id && (
            <Grid container>
              <Grid item md={12} xs={12}>

                <p>Encontramos este paciente:</p>

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

                    <ButtonsContent>
                      <Button
                        background="default"
                        onClick={() => { history.push(`/patient/${patient?._id}/edit`) }}
                      >
                        <CreateIcon />
                      </Button>
                    </ButtonsContent>

                  </PatientResumeContent>
                </PatientResume>
              </Grid>

              {careState.list.total > 0 && (
                <Grid item md={12} xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Atenção!</AlertTitle>
                    Você não pode iniciar a captação desse paciente porque ele já está sendo atendido.
                    <br /><br />
                    <div>
                      <Button
                        background="default"
                        onClick={() => toggleModalCares()}
                      >
                        Visualizar
                      </Button>
                    </div>
                  </Alert>
                </Grid>
              )}

              <Grid item md={12} xs={12}>
                <ButtonsContent>
                  <Button
                    background="success"
                    onClick={() => toggleModalConfirm(true)}
                    disabled={careState.list.total > 0}
                  >
                    Selecionar Paciente
                  </Button>
                </ButtonsContent>
              </Grid>
            </Grid>
          )}

          {patientState.error && (
            <PatientNotFound>
              <NoDataIcon />
              <p>Paciente não encontrado</p>
            </PatientNotFound>
          )}

          <Dialog
            open={openModalConfirm}
            onClose={() => toggleModalConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Cancelar</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja iniciar a captação deste paciente?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => toggleModalConfirm()} color="primary">
                Não
                </Button>
              <Button onClick={handleSubmitPatientCapture} color="primary" autoFocus>
                Sim
                </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openModalCare}
            scroll="paper"
            maxWidth="md"
            fullWidth
            onClose={() => toggleModalCares(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Atendimentos do Paciente</DialogTitle>
            <DialogContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Data do Atendimento</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {careState.list.data.map((care, index) => (
                      <TableRow key={`care_table_row_${index}`}>
                        <TableCell component="th" scope="row">{care?.patient_id?.name} </TableCell>
                        <TableCell>{care?.created_at ? formatDate(care.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</TableCell>
                        <TableCell>{care?.status}</TableCell>
                        <TableCell>
                          <Button onClick={() => { history.push(`/patient/capture/${care._id}/overview`); }} color="primary">
                            <Visibility />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => toggleModalCares()} color="primary">
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Sidebar>
    </>
  );
}
