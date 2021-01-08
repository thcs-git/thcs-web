import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, Grid, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { AccountCircle, Add, CheckCircle, MoreVert, Schedule, ArrowBackIos } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { searchRequest as searchPatientAction } from '../../../../store/ducks/patients/actions';

import Sidebar from '../../../../components/Sidebar';

import { age } from '../../../../helpers/date';

import Button from '../../../../styles/components/Button';
import { FormTitle } from '../../../../styles/components/Form';
import { Table, Th, Td } from '../../../../styles/components/Table';

interface IPageParams {
  id: string;
}

import {
  PatientResume,
  PatientResumeContent,
  PatientData,
} from './styles';

export default function PatientCaptureForm(props: RouteComponentProps<IPageParams>) {
  const dispatch = useDispatch();
  const history = useHistory();
  const patientState = useSelector((state: ApplicationState) => state.patients);

  const { params } = props.match;

  const [scores, setScores] = useState([
    {
      title: 'Tabela Socioambiental',
      complexity: 'Baixa',
      created_at: '00/00/0000 00:00:00',
      status: 'Aprovado',
      route: '/patient/capture/08686353401/nead'
    },
    {
      title: 'Tabela NEAD',
      complexity: 'Média',
      created_at: '',
      status: 'Reprovado',
      route: '/patient/capture/08686353401/nead'
    },
    {
      title: 'Tabela ABEMID',
      complexity: '-',
      created_at: '',
      status: 'Em Andamento',
      route: '/patient/capture/08686353401/nead'
    },
    {
      title: 'Score de Manutenção',
      complexity: '-',
      created_at: '-',
      status: '-',
      route: '/patient/capture/08686353401/nead'
    },
  ]);

  const [patientSearch, setPatientSearch] = useState<string>('');
  const [patient, setPatient] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  useEffect(() => {
    searchPatient(params.id);
  }, []);

  useEffect(() => {
    if (patientState.list.total === 1) {
      setPatient(patientState.list.data[0]);
    }
  }, [patientState.list]);

  const searchPatient = useCallback((value: string) => {
    setPatient({});

    if (value.length > 0) {
      dispatch(searchPatientAction(value));
    }
  }, []);

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('anchorEl?.id', event.currentTarget)
  }, [anchorEl])

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const scoreStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <CheckCircle style={{ fill: '#4FC66A' }} />;

      case 'Reprovado':
        return <CheckCircle style={{ fill: '#FF6565' }} />;

      case 'Em Andamento':
        return <Schedule style={{ fill: '#0899BA' }} />;

      default:
        return <Add style={{ fill: '#0899BA' }} />;
    }
  };

  const scoreStatusLabel = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <span style={{ color: '#4FC66A' }}>{status}</span>

      case 'Reprovado':
        return <span style={{ color: '#FF6565' }}>{status}</span>

      case 'Em Andamento':
        return <span style={{ color: '#0899BA' }}>{status}</span>

      default:
        return <span>{status}</span>
    }
  };

  const handleNewScore = (route: string) => {
    handleCloseRowMenu();
    history.push(route);
  };

  const toggleHistoryModal = () => {
    handleCloseRowMenu();
    setHistoryModalOpen(!historyModalOpen);
  };

  return (
    <>
      <Sidebar>
        <Container>
          <FormTitle>Overview da Captação</FormTitle>

          <Button background="default" onClick={() => history.push('/patient/capture')}><ArrowBackIos /> Voltar</Button>

          {patient?._id && (
            <>
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

                    </PatientResumeContent>
                  </PatientResume>
                </Grid>
              </Grid>

              <Table>
                <thead>
                  <tr>
                    <Th colSpan={2}>Tipo do Score</Th>
                    <Th>Complexidade</Th>
                    <Th>Adicionado em</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr>
                      <Td center>{scoreStatusIcon(score.status)}</Td>
                      <Td>{score.title}</Td>
                      <Td>{score.complexity}</Td>
                      <Td>{score.created_at}</Td>
                      <Td>{scoreStatusLabel(score.status)}</Td>
                      <Td center>
                        <Button aria-controls={`simple-menu${index}`} id={`btn_simple-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                          <MoreVert />
                        </Button>
                        <Menu
                          id={`simple-menu${index}`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={anchorEl?.id === `btn_simple-menu${index}`}
                          onClose={handleCloseRowMenu}
                        >
                          <MenuItem onClick={() => handleNewScore(score.route)}>Adicionar novo</MenuItem>
                          <MenuItem onClick={() => toggleHistoryModal()}>Ver histórico</MenuItem>
                        </Menu>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Container>



        <Dialog
          scroll="paper"
          open={historyModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Histórico do Score</DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <Table>
                <thead>
                  <tr>
                    <Th>Tipo do Score</Th>
                    <Th>Complexidade</Th>
                    <Th>Adicionado em</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Score de Manutenção</Td>
                    <Td>Baixa</Td>
                    <Td>00/00/0000 00:00</Td>
                    <Td>{scoreStatusLabel('Reprovado')}</Td>
                  </tr>
                </tbody>
              </Table>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoryModalOpen(false)} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Sidebar>
    </>
  );
}
