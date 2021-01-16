import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, Grid, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { AccountCircle, Add, CheckCircle, MoreVert, Schedule, ArrowBackIos } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { loadCareById } from '../../../../store/ducks/cares/actions';
import { CareInterface } from '../../../../store/ducks/cares/types';

import { loadRequestByIds as getDocumentGroupsByIds } from '../../../../store/ducks/documentGroups/actions';
import { loadRequestGetByCareId as getDocumentByCareId } from '../../../../store/ducks/documents/actions';

import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import { age, formatDate } from '../../../../helpers/date';

import Button from '../../../../styles/components/Button';
import { FormTitle } from '../../../../styles/components/Form';
import { Table, Th, Td } from '../../../../styles/components/Table';

import {
  PatientResume,
  PatientResumeContent,
  PatientData,
  SuccessContent,
  BackButtonContent,
} from './styles';

import { ReactComponent as SuccessImage } from '../../../../assets/img/ilustracao-avaliacao-concluida.svg';
import { DocumentGroupInterface, DocumentGroupList } from '../../../../store/ducks/documentGroups/types';

interface IPageParams {
  id: string;
}

export default function PatientCaptureForm(props: RouteComponentProps<IPageParams>) {
  const dispatch = useDispatch();
  const history = useHistory();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const documentGroupsState = useSelector((state: ApplicationState) => state.documentGroups);
  const documentsState = useSelector((state: ApplicationState) => state.documents);

  const { params } = props.match;
  const { state } = props.location;

  const [care, setCare] = useState<CareInterface>();
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupList>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [scores, setScore] = useState<any[]>([]);

  useEffect(() => {
    getCare(params.id);
  }, []);

  useEffect(() => {
    getDocuments();
    handleScoreList();
  }, [care]);

  useEffect(() => {
    handleScoreList();
  }, [documentsState]);

  useEffect(() => {
    if (careState.data?._id) {
      setCare(careState.data);
    }
  }, [careState.data]);

  useEffect(() => {
    setDocumentGroups(documentGroupsState.list)
  }, [documentGroupsState]);


  const getCare = useCallback((id: string) => {
    if (id.length > 0) {
      dispatch(loadCareById(id));
      dispatch(getDocumentGroupsByIds('5ffd7acd2f5d2b1d8ff6bea4,5ffd79012f5d2b1d8ff6bea3,5ff65469b4d4ac07d186e99f'));
    }
  }, []);

  const getDocuments = useCallback(() => {
    if (care?._id && documentsState.list.total === 0) {
      dispatch(getDocumentByCareId(care._id));
    }
  }, [care])

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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

  const handleScoreRoute = (id: string, care_id: string) => {
    const routes: any = {
      "5ff65469b4d4ac07d186e99f": `/patient/capture/${care_id}/nead`,
      "5ffd7acd2f5d2b1d8ff6bea4": `/patient/capture/${care_id}/abemid`,
      "5ffd79012f5d2b1d8ff6bea3": `/patient/capture/${care_id}/socioambiental`,
    };

    return routes[id];
  };

  const handleScoreList = () => {

    let scoresList: any = [];

    documentGroupsState.list.data.map(doc => {
      const entries = documentsState.list.data.find(entry => (
        entry?.document_group_id?._id === doc._id &&
        entry.finished &&
        !entry.canceled
      ));

      let route = handleScoreRoute(doc?._id || '', care?._id || '');
      let status = scoreStatusIcon((entries?.finished && !entries.canceled) ? 'Aprovado' : '');

      if (entries?._id) {
        route = `${route}/${entries?._id}`;
      }

      scoresList.push({ _id: doc._id, name: doc.name, route, document: { _id: entries?._id, status, created_at: entries?.created_at } })
    });

    setScore(scoresList);
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
        {careState.loading && (
          <Loading />
        )}
        <Container>
          <FormTitle>Overview da Captação</FormTitle>

          {state?.success && (
            <SuccessContent>
              <SuccessImage />
              <h1>Avaliação concluída</h1>

              <p><strong>Os dados da avaliação foram salvos no sistema. Para adicionar ou visualizar avaliações, use o menu <MoreVert /></strong></p>
            </SuccessContent>
          )}

          {care?._id && (
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
                          <p className="title">{care?.patient_id?.name}</p>
                          <div className="subTitle">
                            <p>{care?.patient_id?.birthdate}</p>
                            <p>Sexo: {care?.patient_id?.gender}</p>
                            <p>Nome da Mãe: {care?.patient_id?.mother_name}</p>
                          </div>
                        </div>
                      </PatientData>
                      <div>
                        <strong>Data do Atendimento:</strong>
                        <p>{care?.created_at ? formatDate(care.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</p>
                        <br />
                        <div>
                          <strong>Status:</strong>
                          <p>{care.status}</p>
                        </div>
                      </div>


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
                  {scores.map((score: any, index: number) => (
                    <tr key={`documentGroup_${index}`}>
                      <Td center>{score.document.status}</Td>
                      <Td>{score.name}</Td>
                      <Td></Td>
                      <Td>{formatDate(score.document.created_at, 'DD/MM/YYYY HH:mm:ss')}</Td>
                      <Td></Td>
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

          <BackButtonContent>
            <Button background="primary" onClick={() => history.push('/patient/capture')}>Voltar</Button>
          </BackButtonContent>
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
