import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Container,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Tooltip,
  TableRow,
  TableCell,
  TextField,
  Grid,
  Box
} from '@material-ui/core';
import { FiberManualRecord, Visibility as VisibilityIcon, ErrorOutline, MoreVert, Check as CheckIcon, AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import debounce from 'lodash.debounce';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchRequest, setIfRegistrationCompleted } from '../../../store/ducks/patients/actions';

import { formatDate } from '../../../helpers/date';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import SearchComponent from '../../../components/List/Search';
import PaginationComponent from '../../../components/Pagination';
import Table from '../../../components/Table';

import { FormTitle } from '../../../styles/components/Form';

import { loadRequestPopUp } from '../../../store/ducks/cares/actions';
import { CareInterface } from "../../../store/ducks/cares/types";

import { PatientInterface } from "../../../store/ducks/patients/types";

import { HighComplexityLabel, LowerComplexityLabel, MediumComplexityLabel } from "../../../styles/components/Text";

import { ListItemCaptureStatus, CaptionList } from '../../avaliation/list/styles';

export default function PatientList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patientState = useSelector((state: ApplicationState) => state.patients);
  const careState = useSelector((state: ApplicationState) => state.cares);
  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [historyModalOpen, setHistoryModalOpen] = useState(false); //Captação
  const [historyModalOpen_2, setHistoryModalOpen_2] = useState(false); //Atendimento
  const [patientArray, setpatientArray] = useState<any>();
  const [patientIndex, setPatientIndex] = useState(0);

  useEffect(() => {
    dispatch(loadRequest());
    dispatch(loadRequestPopUp({
      page: '1',
      limit: '1000',
      total: 1000,
      search
    }));
  }, []);

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl]);

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    dispatch(searchRequest(event.target.value));
  }, []);

  const debounceSearchRequest = debounce(handleChangeInput, 900)

  const handleClickButton = useCallback(() => {
    dispatch(setIfRegistrationCompleted(false))
    history.push('/patient/create/')
  }, [])

  const isDone = useCallback((care: any) => {
    let patientId = _.filter(careState.list2.data, { patient_id: { _id: care } });
    console.log("teste", patientId);
    setpatientArray(patientId);
    //console.log(patientArray);
  }, [careState]);

  const toggleHistoryModal = (index: number, patient: any) => {
    handleCloseRowMenu();
    setPatientIndex(index);
    isDone(patient);
    setHistoryModalOpen(!historyModalOpen);
  };

  const toggleHistoryModal_2 = (index: number, patient: any) => {
    handleCloseRowMenu();
    setPatientIndex(index);
    isDone(patient);
    setHistoryModalOpen_2(!historyModalOpen_2);
  };


  const handleType = useCallback((care: any) => {
    let complexitiesArray: any = []
    let complexity: string = ""
    //console.log(care)
    care?.documents_id?.map((field: any) => {
      complexitiesArray.push(field.complexity);
    })
    if (
      complexitiesArray.findIndex(
        (item: string) => item === "Alta Complexidade"
      ) > -1
    ) {
      complexity = "Internação";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Média Complexidade"
      ) > -1
    ) {
      complexity = "Internação";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Baixa Complexidade"
      ) > -1
    ) {
      complexity = "Internação";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Sem Complexidade"
      ) > -1
    ) {
      complexity = "Atenção";
    } else {
      complexity = "-";
    }

    return complexity
  }, [careState]);

  const handleCoplexities = useCallback((care: any) => {
    let complexitiesArray: any = []
    let complexity: string = ""
    care?.documents_id?.map((field: any) => {
      complexitiesArray.push(field.complexity);
    })
    if (
      complexitiesArray.findIndex(
        (item: string) => item === "Alta Complexidade"
      ) > -1
    ) {
      complexity = "Alta";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Média Complexidade"
      ) > -1
    ) {
      complexity = "Média";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Baixa Complexidade"
      ) > -1
    ) {
      complexity = "Baixa";
    } else {
      complexity = "-";
    }

    switch (complexity.toLocaleLowerCase()) {
      case 'sem complexidade':
        return '-';

      case 'baixa':
        return <LowerComplexityLabel>{complexity}</LowerComplexityLabel>;

      case 'média':
        return <MediumComplexityLabel>{complexity}</MediumComplexityLabel>;

      case 'alta':
        return <HighComplexityLabel>{complexity}</HighComplexityLabel>;

      default:
        return '-';
    }
  }, [careState]);

  return (
    <>
      <Sidebar>
        {patientState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Pacientes</FormTitle>

          <SearchComponent
            handleButton={handleClickButton}
            inputPlaceholder="Pesquise por nome, CPF, data, etc..."
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <Table
            tableCells={[
              { name: 'Paciente', align: 'left', },
              { name: 'CPF', align: 'left' },
              { name: 'Mãe', align: 'left' },
              { name: 'Data de cadastro', align: 'left' },
              { name: '', align: 'left' },
            ]}
          >
            {patientState.list.data.map((patient: PatientInterface, index: number) => (
              <TableRow key={`patient_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/patient/${patient?._id}/view/edit`}>{patient.social_name || patient.name}</Link>
                </TableCell>
                <TableCell align="left">{patient.fiscal_number}</TableCell>
                <TableCell align="left">{patient.mother_name}</TableCell>
                <TableCell align="left">{formatDate(patient.created_at, 'DD/MM/YYYY HH:mm:ss')}</TableCell>
                <TableCell align="center">
                  <Button aria-controls={`patient-menu${index}`} id={`btn_patient-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert style={{ color: '#0899BA' }} />
                  </Button>
                  <Menu
                    id={`patient-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_patient-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem onClick={() => history.push(`/patient/${patient._id}/edit/edit`)}>Editar</MenuItem>
                    <MenuItem onClick={() => history.push(`/patient/${patient._id}/view/edit`)}>Visualizar</MenuItem>
                    <MenuItem onClick={() => history.push(`/patient/capture/create?patient_id=${patient._id}`)}>Iniciar captação</MenuItem>
                    <MenuItem onClick={() => toggleHistoryModal(index, patient?._id)}>Histórico de captação</MenuItem>
                    <MenuItem onClick={() => toggleHistoryModal_2(index, patient?._id)}>Histórico de atendimento</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </Table>

          <PaginationComponent
            page={patientState.list.page}
            rowsPerPage={patientState.list.limit}
            totalRows={patientState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: patientState.list.limit,
              total: patientState.list.total,
              search
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+patientState.list.total / +patientState.list.limit)).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
              search
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+patientState.list.page + 1).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
              search
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+patientState.list.page - 1).toString(),
              limit: patientState.list.limit,
              total: patientState.list.total,
              search
            }))}

            handleChangeRowsPerPage={event => dispatch(loadRequest({
              limit: event.target.value,
              page: '1',
              search
            }))}
          />
        </Container>
        {/* Historico de Captação */}
        <Dialog

          maxWidth="lg"
          open={historyModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title"><h3>Histórico de Captações</h3></DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Grid item md={1} style={{ padding: "0" }}>
                  <AccountCircleIcon style={{ color: '#0899BA', fontSize: '30pt' }} />
                </Grid>
                <Grid item md={11} style={{ padding: "0", paddingTop: "0.4rem" }}>
                  <h3 style={{ color: '#333333' }}>{patientState.list.data[patientIndex]?.name}</h3>
                </Grid>
              </Grid>
              <Table
                tableCells={[
                  { name: 'Data da captação', align: 'left' },
                  { name: 'Tipo', align: 'center' },
                  { name: 'Complexidade', align: 'center' },
                  { name: 'Status', align: 'center' },
                  { name: 'Visualizar', align: 'left' }
                ]}
              >
                {patientArray?.map((patient: any, index: number) => {
                  return (
                    <TableRow key={`patient_${index}`}>
                      <TableCell >
                        <p>{patient?.capture?.created_at ? formatDate(patient?.created_at, 'DD/MM/YYYY') : '-'}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{handleType(patient)}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{handleCoplexities(patient)}</p>
                      </TableCell>
                      <TableCell align="center">
                        <ListItemCaptureStatus status={patient?.capture?.status || ''}>
                          <FiberManualRecord /> {patient?.capture?.status}
                        </ListItemCaptureStatus>
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => history.push(`/patient/capture/${patient._id}/overview`)}>
                          <VisibilityIcon style={{ color: '#0899BA' }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </Table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoryModalOpen(false)} color="primary">
              <h3 style={{ color: '#0899BA', fontSize: '11pt' }}>Fechar</h3>
            </Button>
          </DialogActions>
        </Dialog>

        {/* {Histórico de atendimento} */}
        <Dialog

          maxWidth="lg"
          open={historyModalOpen_2}
          onClose={() => setHistoryModalOpen_2(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title"><h3>Histórico de Atendimento</h3></DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Grid item md={1} style={{ padding: "0" }}>
                  <AccountCircleIcon style={{ color: '#0899BA', fontSize: '30pt' }} />
                </Grid>
                <Grid item md={11} style={{ padding: "0", paddingTop: "0.4rem" }}>
                  <h3 style={{ color: '#333333' }}>{patientState.list.data[patientIndex]?.name}</h3>
                </Grid>
              </Grid>
              <Table
                tableCells={[
                  { name: 'Data do Atendimento', align: 'left' },
                  { name: 'Atendimento', align: 'left' },
                  { name: 'Data da Alta', align: 'left' },
                  { name: 'Tipo', align: 'center' },
                  { name: 'Visualizar', align: 'center' }
                ]}
              >
                {patientArray?.map((patient: any, index: number) => {
                  return (
                    <TableRow key={`patient_${index}`}>
                      <TableCell >
                      <p>{patient?.started_at ? formatDate(patient?.started_at ?? "", "DD/MM/YYYY") : "-"}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{patient?._id}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>-</p>
                      </TableCell>
                      <TableCell align="center">
                        {typeof patient?.care_type_id === "object"
                          ? patient?.care_type_id.name
                          : patient?.care_type_id}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => history.push(`/care/${patient?._id}/overview`)}>
                          <VisibilityIcon style={{ color: '#0899BA' }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </Table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoryModalOpen_2(false)} color="primary">
              <h3 style={{ color: '#0899BA', fontSize: '11pt' }}>Fechar</h3>
            </Button>
          </DialogActions>
        </Dialog>
      </Sidebar>
    </>
  );
}
