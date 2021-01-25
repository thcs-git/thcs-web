import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, Grid, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Radio, RadioGroup, FormControlLabel, TextField, FormControl, Card, CardContent } from '@material-ui/core';
import { AccountCircle, Add, CheckCircle, MoreVert, Schedule, Check as CheckIcon } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { loadCareById } from '../../../../store/ducks/cares/actions';
import { CareInterface } from '../../../../store/ducks/cares/types';

import { loadRequestByIds as getDocumentGroupsByIds } from '../../../../store/ducks/documentGroups/actions';

import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import { age, formatDate } from '../../../../helpers/date';

import Button from '../../../../styles/components/Button';
import { FormTitle } from '../../../../styles/components/Form';
import { Table, Th, Td } from '../../../../styles/components/Table';

import { LowerComplexityLabel, MediumComplexityLabel, HighComplexityLabel, NoComplexityLabel, ElegibleLabel, NotElegibleLabel } from '../../../../styles/components/Text';

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

interface ICaptureData {
  type: string;
  orderNumber: string;
  estimate: string;
}

export default function PatientCaptureForm(props: RouteComponentProps<IPageParams>) {
  const dispatch = useDispatch();
  const history = useHistory();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const documentGroupsState = useSelector((state: ApplicationState) => state.documentGroups);

  const { params } = props.match;
  const { state } = props.location;

  const [care, setCare] = useState<CareInterface>();
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupList>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [captureOptionsModalOpen, setCaptureModalModalOpen] = useState(false);

  const [captureData, setCaptureData] = useState<ICaptureData>({
    type: '',
    orderNumber: '',
    estimate: '',
  });

  useEffect(() => {
    getCare(params.id);
  }, []);

  useEffect(() => {
    if (careState.data?._id) {
      setCare(careState.data);
      setDocumentGroups(documentGroupsState.list);
    }
  }, [careState.data]);

  const getCare = useCallback((id: string) => {
    if (id.length > 0) {
      dispatch(loadCareById(id));
      dispatch(getDocumentGroupsByIds('5ffd7acd2f5d2b1d8ff6bea4,5ffd79012f5d2b1d8ff6bea3,5ff65469b4d4ac07d186e99f'));
    }
  }, []);

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl])

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleComplexityLabel = (complexity: string = '') => {
    switch (complexity.toLocaleLowerCase()) {
      case 'sem complexidade':
        return <NoComplexityLabel>{complexity}</NoComplexityLabel>;

      case 'baixa complexidade':
        return <LowerComplexityLabel>{complexity}</LowerComplexityLabel>;

      case 'média complexidade':
        return <MediumComplexityLabel>{complexity}</MediumComplexityLabel>;

      case 'alta complexidade':
        return <HighComplexityLabel>{complexity}</HighComplexityLabel>;

      default:
        return complexity;
    }
  };

  const handleElegibilityLabel = (elegibile: string = '') => {
    switch (elegibile.toLocaleLowerCase()) {
      case 'elegível':
        return <ElegibleLabel>{elegibile}</ElegibleLabel>;

      case 'não elegível':
        return <NotElegibleLabel>{elegibile}</NotElegibleLabel>;

      default:
        return elegibile;
    }
  };

  const handleCareTypeLabel = (elegibile: string = '') => {
    switch (elegibile.toLocaleLowerCase()) {
      case 'elegível':
        return 'Internação Domiciliar';

      case 'não elegível':
        return 'Assistência Domiciliar';

      default:
        return elegibile;
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

  const handleScoreRoute = (id: string, care_id: string, document_id?: string) => {
    const routes: any = {
      "5ff65469b4d4ac07d186e99f": `/patient/capture/${care_id}/nead`,
      "5ffd7acd2f5d2b1d8ff6bea4": `/patient/capture/${care_id}/abemid`,
      "5ffd79012f5d2b1d8ff6bea3": `/patient/capture/${care_id}/socioambiental`,
    };

    return (document_id) ? `${routes[id]}/${document_id}` : routes[id];
  };

  const toggleHistoryModal = () => {
    handleCloseRowMenu();
    setHistoryModalOpen(!historyModalOpen);
  };

  const handleCheckDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(doc => (
      doc.document_group_id === documentId &&
      !doc.canceled &&
      doc.finished
    ));

    return (found) ? <CheckCircle style={{ color: '#4FC66A', cursor: 'pointer' }} /> : <CheckCircle style={{ color: '#EBEBEB' }} />;
  };

  const handleDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(doc => (
      doc.document_group_id === documentId &&
      !doc.canceled &&
      doc.finished
    ));

    return found;
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
                      <div>
                        <Button onClick={() => setCaptureModalModalOpen(true)}>Dados da Captação</Button>
                        <Button onClick={() => setCaptureModalModalOpen(true)}>Concluir Captação</Button>
                      </div>


                    </PatientResumeContent>
                  </PatientResume>
                </Grid>
              </Grid>

              <Table>
                <thead>
                  <tr>
                    <Th colSpan={2}>Tipo do Score</Th>
                    <Th>Tipo</Th>
                    <Th>Complexidade</Th>
                    <Th>Adicionado em</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {documentGroups?.data.map((documentGroup: any, index: number) => {

                    const document = handleDocument(documentGroup._id, care?.documents_id || []);

                    return (
                      <tr key={`documentGroup_${index}`}>
                        <Td center onClick={() => {
                          if (document?._id) {
                            history.push(handleScoreRoute(documentGroup?._id || '', care?._id || '', document?._id))
                          } else {
                            history.push(handleScoreRoute(documentGroup?._id || '', care?._id || ''))
                          }
                        }}>{handleCheckDocument(documentGroup._id, care?.documents_id || [])}</Td>
                        <Td>{documentGroup.name}</Td>
                        <Td>{handleCareTypeLabel(document?.status)}</Td>
                        <Td>{handleComplexityLabel(document?.complexity)}</Td>
                        <Td>{document?.created_at ? formatDate(document.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</Td>
                        <Td>{handleElegibilityLabel(document?.status)}</Td>
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
                            {document?._id ? (
                              <MenuItem onClick={() => history.push(handleScoreRoute(documentGroup?._id || '', care?._id || '', document?._id))}>Editar</MenuItem>
                            ) : (
                                <MenuItem onClick={() => history.push(handleScoreRoute(documentGroup?._id || '', care?._id || ''))}>Adicionar novo</MenuItem>
                              )}
                            <MenuItem onClick={() => toggleHistoryModal()}>Ver histórico</MenuItem>
                          </Menu>
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <Card>
                <CardContent>
                  <h4>Orçamento</h4>
                  <br />
                  <TextField
                    id="input-estimate"
                    label="Orçamento"
                    variant="outlined"
                    size="small"
                    placeholder="Adicione detalhes de orçamento"
                    value={captureData.estimate}
                    onChange={(element) => setCaptureData({ ...captureData, estimate: element.target.value })}
                    fullWidth
                    multiline
                  />
                  <br />
                  <br />
                  <p>Para concluir a captação, os itens com asterisco são obrigatórios: Orçamento + Tabela NEAD ou Tabela Abemid.</p>
                </CardContent>
              </Card>
            </>
          )}

          <BackButtonContent>
            <Button background="primary" onClick={() => history.push('/avaliation')}>Voltar</Button>
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

        <Dialog
          open={captureOptionsModalOpen}
          onClose={() => setCaptureModalModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Selecione o tipo de cobertura</DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >Para iniciar a captação, é obrigatório definir a cobertura. Em caso de convênio, preencher o número da guia.</DialogContentText>

            <div>
              <RadioGroup onChange={e => setCaptureData({ ...captureData, type: e.target.value })} style={{ marginBottom: 20 }}>
                <FormControlLabel
                  value="Particular"
                  control={<Radio color="primary" />}
                  label="Particular"
                  checked={(captureData?.type === 'Particular')}
                />
                <FormControlLabel
                  value="Convênio"
                  control={<Radio color="primary" />}
                  label="Convênio"
                  checked={(captureData?.type === 'Convênio')}
                />
              </RadioGroup>

              {captureData?.type === 'Convênio' && (
                <FormControl>
                  <TextField
                    id="input-order-number"
                    label="Número de Guia"
                    variant="outlined"
                    size="small"
                    value={captureData.orderNumber}
                    onChange={(element) => setCaptureData({ ...captureData, orderNumber: element.target.value })}
                    fullWidth
                  />
                </FormControl>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCaptureModalModalOpen(false)} color="primary">
              Fechar
            </Button>
            <Button onClick={() => setCaptureModalModalOpen(false)} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Sidebar>
    </>
  );
}
