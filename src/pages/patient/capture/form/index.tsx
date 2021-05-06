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
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Tooltip
} from '@material-ui/core';
import { Create as CreateIcon, Search as SearchIcon, AccountCircle, Visibility, Check as CheckIcon, Error } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import InputMask from 'react-input-mask';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';

import { getPatientCapture,loadRequest, searchRequest as searchPatientAction } from '../../../../store/ducks/patients/actions';

import {  createCareRequest as createCareAction, searchCareRequest as getCares } from '../../../../store/ducks/cares/actions';
import { CareInterface, ICaptureData } from '../../../../store/ducks/cares/types';

import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import { age, formatDate } from '../../../../helpers/date';
import LOCALSTORAGE from '../../../../helpers/constants/localStorage';

import { Table, Th, Td } from "../../../../styles/components/Table";
import Button from '../../../../styles/components/Button';
import { FormTitle } from '../../../../styles/components/Form';
import CaptureDataDialog from '../../../../components/Dialogs/CaptureData';

import {
  ButtonsContent,
  InputFiled as TextField,
  PatientResume,
  PatientResumeContent,
  PatientData,
  SearchContent,
  NoDataIcon,
  PatientNotFound,
} from './styles';


export default function PatientCaptureForm(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { location: { search: searchParams } } = props;

  const query = new URLSearchParams(searchParams);
  const patientId = query.get('patient_id');

  const patientState = useSelector((state: ApplicationState) => state.patients);
  const careState = useSelector((state: ApplicationState) => state.cares);

  const [patientSearch, setPatientSearch] = useState<string>('');
  const [patient, setPatient] = useState<any>({});
  const [selectedPatient, setSelectedPatient] = useState<any>({});

  const [care, setCare] = useState<CareInterface>({
    status: 'Pre-Atendimento',
    capture: {
      status: 'Em Andamento',
    }
  });

  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [openModalCare, setOpenModalCare] = useState<boolean>(false);
  const [captureOptionsModalOpen, setCaptureModalModalOpen] = useState<boolean>(false);
  const [captureData, setCaptureData] = useState<ICaptureData | any>({
  });

  useEffect(() => {
  dispatch(getPatientCapture());
  }, []);

  // useEffect(() => {
  //   if (patientState.list.total === 1) {
  //     setPatient(patientState.list.data[0]);
  //     setPatientSearch(patientState.list.data[0].fiscal_number);
  //   }

  //   validatePatientParam();

  // }, [patientState]);

  // useEffect(() => {
  //   if (patient?._id) {
  //     dispatch(getCares({ status: 'Pre-Atendimento', 'capture.status': 'Em Andamento', 'patient_id.fiscal_number': patient.fiscal_number, 'patient_id.active': true }));
  //   }
  // }, [patient]);

  // useEffect(() => {
  //   if (careState.success && !careState.error && careState.data._id) {
  //     history.push(`/patient/capture/${careState.data._id}/overview`);
  //   }
  // }, [careState])

  // const searchPatient = useCallback((value: string) => {
  //   setPatient({});

  //  // (value.length > 0) ? dispatch(searchPatientAction({ fiscal_number: value })) : dispatch(searchPatientAction({ active: true }));
  // }, []);

  const toggleModalConfirm = useCallback((open?: boolean) => {
    open ? setOpenModalConfirm(open) : setOpenModalConfirm(!openModalConfirm);
  }, [openModalConfirm]);

  const toggleModalCares = useCallback((open?: boolean) => {
    open ? setOpenModalCare(open) : setOpenModalCare(!openModalCare);
  }, [openModalCare]);

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
            style={{ color: "#FF6565", cursor: "pointer" }}
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
            style={{ color: "#4FC66A", cursor: "pointer" }}
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
          <CheckIcon style={{ color: "#EBEBEB" }} />
        </Tooltip>
      );
    }
  };

  const validatePatientParam = useCallback(() => {
    const patientFounded = patientState.list.data.filter(item => patientId === item._id);

    if (patientFounded.length > 0) {
      setSelectedPatient(patientFounded[0]);
      setCaptureModalModalOpen(true);
    }

    return (patientFounded);
  }, [patientState]);

  const handleSubmitCaptureData = () => {
    const careParams = {
      patient_id: selectedPatient?._id || '',
      status: 'Pre-Atendimento',
      capture: {
        ...captureData,
        status: 'Em Andamento',
      },
      care_type_id: '5fd66ca189a402ec48110cc1',
      user_id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
      company_id: localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || ``,
    };

   // dispatch(createCareAction(careParams));
  };

  const handleSubmitPatientCapture = useCallback(() => {
    setOpenModalConfirm(false);

    const params = { ...care, patient_id: selectedPatient._id || patient._id };

    //dispatch(createCareAction(params))

  }, [dispatch, care, patient, selectedPatient]);

  return (
    <>
      <Sidebar>
        {(patientState.loading || careState.loading) && (
          <Loading />
        )}
        <Container>
          <FormTitle>Captação de Pacientes</FormTitle>
          <h4>Primeiro, encontre o paciente que deseja realizar a captação:</h4>
          <br />
          <Grid container>
            <Grid item md={4} sm={4} xs={12}>
              <SearchContent>
                <InputMask
                  mask="999.999.999-99"
                  value={patientSearch}
                  onChange={element => setPatientSearch(element.target.value)}
                //  onBlur={(element) => searchPatient(element.target.value)}
                >
                  {(inputProps: any) => (
                    <TextField
                      id="input-search-fiscal-number"
                      label="Paciente"
                      variant="outlined"
                      size="small"
                      value={patientSearch}
                      placeholder="Buscar por CPF"
                      fullWidth
                      autoFocus
                    />
                  )}
                </InputMask>
                <Button
                  background="success"
                  size="large"
                >
                  <SearchIcon />
                </Button>
              </SearchContent>
            </Grid>
          </Grid>

          {patient?._id ? (
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

              {careState.list.data.length > 0 && (
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
                    onClick={() => setCaptureModalModalOpen(true)}
                    disabled={careState.list.data.length > 0}
                  >
                    Selecionar Paciente
                  </Button>
                </ButtonsContent>
              </Grid>
            </Grid>
          ) : (
            <>
              <h3>Pra te ajudar, aqui tem a lista dos últimos pacientes cadastrados</h3>

              <br />

              <Table>
                <thead>
                  <tr>
                    <Th></Th>
                    <Th>Paciente</Th>
                    <Th>CPF</Th>
                    <Th>Cadastrado em</Th>
                  </tr>
                </thead>
                <tbody>
                  {patientState.list.data.map((item, index) => (
                    <tr key={`select_patient_${index}`}>
                      <Td center>
                        <Checkbox
                          checked={selectedPatient?._id === item?._id}
                          onChange={(element) => {
                            if (item._id && (item._id === element.target.value || item._id === selectedPatient?._id)) {
                              setSelectedPatient({});
                            } else {
                              setSelectedPatient(item);
                            }
                          }}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </Td>
                      <Td>{item?.social_name || item?.name}</Td>
                      <Td>{item?.fiscal_number}</Td>
                      <Td>{formatDate(item?.created_at, 'DD/MM/YYYY HH:mm:ss')}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {selectedPatient && (
                <ButtonsContent>
                  <Button
                    background="success"
                    onClick={() => setCaptureModalModalOpen(true)}
                  >
                    Selecionar Paciente
                    </Button>
                </ButtonsContent>
              )}
            </>
          )}

          {patientState.error && (
            <PatientNotFound>
              <NoDataIcon />
              <p>Paciente não encontrado</p>
            </PatientNotFound>
          )}

          <CaptureDataDialog
            dialogState={captureOptionsModalOpen}
            toogleModalState={() => setCaptureModalModalOpen(false)}
            captureData={captureData}
            setCaptureData={setCaptureData}
            saveCallback={handleSubmitCaptureData}
          />

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
                <Table>
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
