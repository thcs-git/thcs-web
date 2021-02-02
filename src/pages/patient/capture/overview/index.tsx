import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, Grid, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Radio, RadioGroup, FormControlLabel, TextField, FormControl, Card, CardContent, FormGroup, Checkbox } from '@material-ui/core';
import { AccountCircle, CheckCircle, MoreVert, CheckCircleOutline, Edit, Print, Visibility } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { loadCareById, updateCareRequest, cleanAction } from '../../../../store/ducks/cares/actions';
import { CareInterface } from '../../../../store/ducks/cares/types';

import { loadRequestByIds as getDocumentGroupsByIds } from '../../../../store/ducks/documentGroups/actions';
import { DocumentGroupList } from '../../../../store/ducks/documentGroups/types';

import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import { formatDate } from '../../../../helpers/date';

import Button from '../../../../styles/components/Button';
import { FormTitle, FieldContent } from '../../../../styles/components/Form';
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

interface IPageParams {
  id: string;
}

interface ICaptureData {
  inpatient: boolean;
  estimate: string;
  order_number: string;
  health_insurance: string;
  health_plan: string;
  health_sub_plan: string;
  hospital: string;
  unity: string;
  assistant_doctor: string;
  sector: string;
  bed: string;
  status: string;
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
  const [captureFinishModalOpen, setCaptureFinishModalOpen] = useState(false);
  const [finishEnable, setFinishEnable] = useState(false);
  const [modalPrint, setModalPrint] = useState(false);

  const [captureData, setCaptureData] = useState<ICaptureData | any>({
  });

  useEffect(() => {
    getCare(params.id);
  }, []);

  useEffect(() => {
    if (careState.data?._id) {
      setCare(careState.data);
      setDocumentGroups(documentGroupsState.list);

      if (careState?.data?.capture) {
        setCaptureData(careState.data.capture);
      }
    }
  }, [careState.data]);

  useEffect(() => {
    handleValidadeFinishEnable();
  }, [captureData]);

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

    return (found) ? <CheckCircle style={{ color: '#4FC66A', cursor: 'pointer' }} /> : <CheckCircle style={{ color: '#EBEBEB', cursor: 'pointer' }} />;
  };

  const handleDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(doc => (
      doc.document_group_id === documentId &&
      !doc.canceled &&
      doc.finished
    ));

    return found;
  };

  const handleSubmitCaptureData = () => {
    const updateParams = {
      ...care,
      capture: {
        ...care?.capture,
        ...captureData
      },
      care_type_id: '5fd66ca189a402ec48110cc1',
      user_id: '600f0d615ba0702f45864035',
    };

    dispatch(updateCareRequest(updateParams));
  };

  const handleSubmitFinishCapture = useCallback(() => {
    setCaptureFinishModalOpen(false);

    const updateParams = {
      ...care,
      capture: {
        ...care?.capture,
        ...captureData,
        status: 'Aguardando'
      },
      care_type_id: '5fd66ca189a402ec48110cc1',
      user_id: '600f0d615ba0702f45864035',
    };

    dispatch(updateCareRequest(updateParams));
  }, [care, captureData]);

  const handleValidadeFinishEnable = useCallback(() => {
    const abemidDocument = handleDocument('5ffd7acd2f5d2b1d8ff6bea4', care?.documents_id || []);
    const neadDocument = handleDocument('5ff65469b4d4ac07d186e99f', care?.documents_id || []);

    if (captureData.estimate && (abemidDocument || neadDocument)) {
      setFinishEnable(true);
    } else {
      setFinishEnable(false);
    }
  }, [captureData]);

  const handlePrint = () => {
    alert('print');
  };

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading />}
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
                            <p>Pedido: {care?.capture?.order_number}</p>
                            <p>Data do Atendimento: {care?.created_at ? formatDate(care.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</p>
                            <p>Status: {care.status}</p>
                            {care.capture?.status === 'Em Andamento' && (
                              <Button onClick={() => setCaptureModalModalOpen(true)}><Edit style={{ width: 15, marginRight: 5 }} /> Editar</Button>
                            )}
                          </div>
                        </div>
                      </PatientData>

                      {care.capture?.status === 'Em Andamento' ? (
                        <div>
                          <Button background={finishEnable ? "success" : "disable"} disabled={!finishEnable} onClick={() => setCaptureFinishModalOpen(true)}>
                            <CheckCircleOutline />
                            Concluir Captação
                          </Button>
                        </div>
                      ) : (
                          <div>
                            <Button center onClick={() => setModalPrint(true)}>
                              <Print className="primary" style={{ width: 30, height: 30 }} />
                            </Button>
                          </div>
                        )}


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
                          {care.capture?.status === 'Em Andamento' ? (
                            <>
                              <Button aria-controls={`simple-menu${index}`} id={`btn_simple-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                                <MoreVert className="primary" />
                              </Button>
                              <Menu
                                id={`simple-menu${index}`}
                                anchorEl={anchorEl}
                                keepMounted
                                open={anchorEl?.id === `btn_simple-menu${index}`}
                                onClose={handleCloseRowMenu}
                              >
                                {document?._id ? (
                                  <div>
                                    <MenuItem onClick={() => history.push(handleScoreRoute(documentGroup?._id || '', care?._id || '', document?._id))}>Editar</MenuItem>
                                    <MenuItem onClick={() => console.log(document?._id)}>Excluir</MenuItem>
                                  </div>
                                ) : (
                                    <MenuItem onClick={() => history.push(handleScoreRoute(documentGroup?._id || '', care?._id || ''))}>Adicionar novo</MenuItem>
                                  )}
                                <MenuItem onClick={() => toggleHistoryModal()}>Ver histórico</MenuItem>
                              </Menu>
                            </>
                          ) : (
                              <>
                                {(document?._id) && (
                                  <Button onClick={() => history.push(handleScoreRoute(documentGroup?._id || '', care?._id || '', document?._id))}>
                                    <Visibility className="primary" />
                                  </Button>
                                )}
                              </>
                            )}
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
                  {care.capture?.status === 'Em Andamento' ? (
                    <>
                      <FieldContent>
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
                      </FieldContent>
                      <p className="text-danger">Para concluir a captação, os itens com asterisco são obrigatórios: Orçamento + Tabela NEAD ou Tabela Abemid.</p>
                    </>
                  ) : (
                      <p>{captureData.estimate}</p>
                    )}
                </CardContent>
              </Card>
            </>
          )}

          <BackButtonContent>
            <Button background="primary" onClick={() => history.push('/avaliation')}>Voltar</Button>
            {care?.capture?.status === 'Em Andamento' && (
              <Button background="success" onClick={handleSubmitCaptureData}>Salvar</Button>
            )}
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
          <DialogContent>
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
          maxWidth="md"
        >
          <DialogTitle id="scroll-dialog-title">Preencha os dados da captação</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >Para iniciar a captação, é obrigatório preencher as informações abaixo.</DialogContentText>

            <div>
              <p>O paciente encontra-se internado?</p>
              <RadioGroup onChange={e => setCaptureData({ ...captureData, inpatient: e.target.value === 'Sim' })} style={{ marginBottom: 20 }}>
                <FormControlLabel
                  value="Não"
                  control={<Radio color="primary" />}
                  label="Não"
                  checked={!captureData.inpatient}
                />
                <FormControlLabel
                  value="Sim"
                  control={<Radio color="primary" />}
                  label="Sim"
                  checked={captureData.inpatient}
                />
              </RadioGroup>

              <Grid container>

                <Grid item md={5}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <TextField
                      id="input-health-insurance"
                      label="Convênio"
                      variant="outlined"
                      size="small"
                      value={captureData.health_insurance}
                      onChange={(element) => setCaptureData({ ...captureData, health_insurance: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={6}></Grid>

                <Grid item md={4}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <TextField
                      id="input-order-number"
                      label="Número de Guia"
                      variant="outlined"
                      size="small"
                      value={captureData.order_number}
                      onChange={(element) => setCaptureData({ ...captureData, order_number: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={4}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <TextField
                      id="input-health-plan"
                      label="Plano"
                      variant="outlined"
                      size="small"
                      value={captureData.health_plan}
                      onChange={(element) => setCaptureData({ ...captureData, health_plan: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={4}>
                  <FieldContent>
                    <TextField
                      id="input-health-sub-plan"
                      label="Sub-plano"
                      variant="outlined"
                      size="small"
                      value={captureData.health_sub_plan}
                      onChange={(element) => setCaptureData({ ...captureData, health_sub_plan: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={8}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <TextField
                      id="input-hospital"
                      label="Hospital"
                      variant="outlined"
                      size="small"
                      value={captureData.hospital}
                      onChange={(element) => setCaptureData({ ...captureData, hospital: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={4}>
                  <FieldContent>
                    <TextField
                      id="input-hospital-unity"
                      label="Unidade"
                      variant="outlined"
                      size="small"
                      value={captureData.unity}
                      onChange={(element) => setCaptureData({ ...captureData, unity: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={6}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <TextField
                      id="input-assistance-doctor"
                      label="Médico Assistente"
                      variant="outlined"
                      size="small"
                      value={captureData.assistant_doctor}
                      onChange={(element) => setCaptureData({ ...captureData, assistant_doctor: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={3}>
                  <FieldContent style={{ paddingRight: 15 }}>
                    <TextField
                      id="input-hospital-sector"
                      label="Setor"
                      variant="outlined"
                      size="small"
                      value={captureData.sector}
                      onChange={(element) => setCaptureData({ ...captureData, sector: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>

                <Grid item md={3}>
                  <FieldContent>
                    <TextField
                      id="input-hospital-room"
                      label="Leito"
                      variant="outlined"
                      size="small"
                      value={captureData.bed}
                      onChange={(element) => setCaptureData({ ...captureData, bed: element.target.value })}
                      fullWidth
                    />
                  </FieldContent>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCaptureModalModalOpen(false)} color="primary">
              Fechar
            </Button>
            <Button onClick={() => {
              setCaptureModalModalOpen(false);
              handleSubmitCaptureData();
            }} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={captureFinishModalOpen}
          onClose={() => setCaptureFinishModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Concluir a Captação</DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              Tem certeza que deseja concluir a captação do paciente e iniciar o atendimento?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCaptureFinishModalOpen(false)} color="primary">
              Não
            </Button>
            <Button onClick={handleSubmitFinishCapture} color="primary">
              Sim
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={modalPrint}
          onClose={() => setModalPrint(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Deseja imprimir a captação?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Selecione abaixo quais scores você deseja imprimir:
            </DialogContentText>
            <FormGroup>
              {documentGroups?.data.map((documentGroup: any, index: number) => (
                <FormControlLabel
                  key={`document_print_${index}`}
                  control={<Checkbox name="documentPrint[]" />}
                  label={documentGroup.name}
                />
              ))}
            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalPrint(false)} color="primary">
              Cancelar
              </Button>
            <Button onClick={handlePrint} color="primary" autoFocus>
              Imprimir
              </Button>
          </DialogActions>
        </Dialog>
      </Sidebar>
    </>
  );
}
