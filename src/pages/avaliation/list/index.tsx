import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, RadioGroup, FormControlLabel, Radio, InputLabel, Tooltip, TableRow, TableCell, TextField } from '@material-ui/core';
import { FiberManualRecord, ErrorOutline, MoreVert, Check as CheckIcon } from '@material-ui/icons';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/';
import { loadRequest, searchCareRequest } from '../../../store/ducks/cares/actions';

import { searchCareRequest as getCares, updateCareRequest as updateCareAction, cleanAction } from '../../../store/ducks/cares/actions';

import PaginationComponent from '../../../components/Pagination';
import Sidebar from '../../../components/Sidebar';
import Table from '../../../components/Table';
import SearchComponent from '../../../components/List/Search';
import Loading from '../../../components/Loading';
import { FormTitle, SelectComponent as Select, FieldContent } from '../../../styles/components/Form';

import { formatDate } from '../../../helpers/date';

import { ListItemCaptureStatus, CaptionList } from './styles';

import Popup from '../../../components/Dialogs/Popup';
interface ICaptureStatus {
  care: any;
  approved: string;
  attachment: string;
  complexity: string;
}

export default function AvaliationList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);

  const [search, setSearch] = useState('');
  const [file, setFile] = useState({ error: false });
  const [captureStatus, setCaptureStatus] = useState<ICaptureStatus>({
    care: {},
    approved: '',
    attachment: '',
    complexity: '',
  });
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);
  const [modalConfirmUpdateStatus, setModalConfirmUpdateStatus] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

  useEffect(() => {
    dispatch(cleanAction());
    dispatch(getCares({}))
  }, []);

  // useEffect(() => {
  //   if (careState.data.status === 'Atendimento') {
  //     history.push(`care/${careState.data._id}/overview`);
  //   }
  // }, [careState.data.status]);

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
    dispatch(searchCareRequest({ search: event.target.value }));
  }, [search]);

  const debounceSearchRequest = debounce(handleChangeInput, 900);

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl]);

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

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
          <ErrorOutline style={{ color: '#FF6565', cursor: 'pointer' }} onClick={() => history.push(`/patient/capture/${found.care_id}/${documentRoute()}/${found._id}`)} />
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

  const handleStartUpdateCaptureStatus = useCallback((care: any) => {
    handleCloseRowMenu();
    setModalUpdateStatus(true);

    setCaptureStatus(prevState => ({
      ...prevState,
      care
    }));

  }, [captureStatus]);

  const handleChangeComplexity = useCallback((event: any) => {
    setCaptureStatus(prevState => ({
      ...prevState,
      complexity: event.target.value,
    }));
  }, [captureStatus]);

  const readFile = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleChangeFiles = async (element: React.ChangeEvent<HTMLInputElement>) => {

    const files = element.target.files;

    if (!element) {
      setFile(prevState => ({
        ...prevState,
        error: false
      }))
      return;
    } else {
      if (files && files?.length > 0) {
        console.log(files[0]);
        if (files[0].type == 'application/pdf' && files[0].size < 5000000) {
          setFile(prevState => ({
            ...prevState,
            error: false
          }))
        } else {
          setFile(prevState => ({
            ...prevState,
            error: true
          }))
        }
      }
    }

    if (files && files?.length > 0) {
      const fileData: any = await readFile(files[0]);
      if (!file.error) {
        setCaptureStatus(prevState => ({
          ...prevState,
          attachment: fileData
        }));
      }
    }
  };

  const handleUpdateCaptureStatus = useCallback(() => {
    setModalUpdateStatus(false);
    setModalConfirmUpdateStatus(false);

    const { care } = captureStatus;

    const updateParams = {
      ...care,
      capture: {
        ...care.capture,
        status: captureStatus.approved,
        complexity: captureStatus.complexity,
      }
    };

    dispatch(updateCareAction(updateParams));
    dispatch(getCares({ status: 'Pre-Atendimento' }));

  }, [captureStatus, careState]);


  const handleCaptureAttendance = useCallback(() => {
    setModalUpdateStatus(false);
    setModalConfirmUpdateStatus(false);

    const { care } = captureStatus;

    const updateParams = {
      ...care,
      capture: {
        ...care.capture,
        status: captureStatus.approved,
        complexity: captureStatus.complexity,
      }
    };

    dispatch(updateCareAction(updateParams));
    dispatch(getCares({ status: 'Pre-Atendimento' }));

    history.push('/care/create/')

  }, [captureStatus, careState]);

  const openInPopup = (care: any) => {
    setRecordForEdit(care)
    setOpenPopup(true)
  }

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading />}
        <Container>
          <FormTitle>Lista de Avaliações</FormTitle>

          <SearchComponent
            handleButton={() => history.push('/patient/capture/create')}
            buttonTitle="Nova avaliação"
            inputPlaceholder="Busque nome do Paciente, Atendimento e Status"
            onChangeInput={debounceSearchRequest}
          />

          <Table
            tableCells={[
              { name: 'Paciente', align: 'left' },
              { name: 'Tipo', align: 'left' },
              { name: 'Socioambiental', align: 'center' },
              { name: 'NEAD', align: 'center' },
              { name: 'ABEMID', align: 'center' },
              { name: 'Última captação', align: 'left' },
              { name: 'Status da captação', align: 'left' },
              { name: ' ', align: 'left' }
            ]}
          >
            {careState.list.data.map((care, index) => (
              <TableRow key={`care_${index}`}>
                <TableCell component="th" scope="row">
                  <Link to={`/patient/capture/${care._id}/overview`}>
                    {care?.patient_id?.name}
                  </Link>
                </TableCell> {/* Paciente */}
                <TableCell align="left">{care.capture?.order_number || '-'}</TableCell> {/* Pedido */}
                <TableCell align="center">{handleCheckDocument('5ffd79012f5d2b1d8ff6bea3', care?.documents_id || [])}</TableCell> {/* Socioambiental */}
                <TableCell align="center">{handleCheckDocument('5ff65469b4d4ac07d186e99f', care?.documents_id || [])}</TableCell> {/* NEAD */}
                <TableCell align="center">{handleCheckDocument('5ffd7acd2f5d2b1d8ff6bea4', care?.documents_id || [])}</TableCell> {/* ABEMID */}
                <TableCell align="left">{care?.created_at ? formatDate(care.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</TableCell> {/* Última captação */}
                <TableCell>
                  <ListItemCaptureStatus status={care?.capture?.status || ''}>
                    <FiberManualRecord /> {care?.capture?.status}
                  </ListItemCaptureStatus>
                </TableCell>
                <TableCell align="center">
                  <Button aria-controls={`patient-capture-menu${index}`} id={`btn_patient-capture-menu${index}`} aria-haspopup="true" onClick={handleOpenRowMenu}>
                    <MoreVert style={{ color: '#0899BA' }} />
                  </Button>
                  <Menu
                    id={`patient-capture-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_patient-capture-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    {care.capture?.status === 'Aguardando' && (
                      <MenuItem onClick={() => handleStartUpdateCaptureStatus(care)}>Atualizar status</MenuItem>
                    )}
                    <MenuItem onClick={() => history.push(`/patient/capture/${care._id}/overview`)}>Visualizar perfil</MenuItem>
                    <MenuItem onClick={() => { openInPopup(care) }}>Histórico</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <PaginationComponent
            page={careState.list.page}
            rowsPerPage={careState.list.limit}
            totalRows={careState.list.total}

            handleFirstPage={() => dispatch(loadRequest({
              page: '1',
              limit: careState.list.limit,
              total: careState.list.total,
              search
            }))}

            handleLastPage={() => dispatch(loadRequest({
              page: (Math.ceil(+careState.list.total / +careState.list.limit)).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
              search
            }))}

            handleNextPage={() => dispatch(loadRequest({
              page: (+careState.list.page + 1).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
              search
            }))}

            handlePreviosPage={() => dispatch(loadRequest({
              page: (+careState.list.page - 1).toString(),
              limit: careState.list.limit,
              total: careState.list.total,
              search
            }))}

            handleChangeRowsPerPage={event => dispatch(loadRequest({
              limit: event.target.value,
              page: '1',
              search
            }))}
          />

          <div>
            <h3>Legendas para status de captação:</h3>
            <br />
            <CaptionList>
              <div className="captionItem aprovado"><FiberManualRecord /> <span>Aprovado</span> &nbsp;- o pedido foi aprovado pelo plano de saúde</div>
              <div className="captionItem recusado"><FiberManualRecord /> <span>Recusado</span> &nbsp;- o pedido foi recusado pelo plano</div>
              <div className="captionItem aguardando"><FiberManualRecord /> <span>Aguardando</span> &nbsp;- o pedido está aguardando análise do plano de saúde</div>
              <div className="captionItem andamento"><FiberManualRecord /> <span>Em andamento</span> &nbsp;- as captações estão em andamento</div>
            </CaptionList>
          </div>


          <Dialog
            open={modalUpdateStatus}
            onClose={() => setModalUpdateStatus(false)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Atualização de status</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
              >
                Para dar continuidade ao atendimento, é necessário atualizar o status do pedido do paciente, anexar a guia de autorização do plano (formato PDF) e definir complexidade:
              </DialogContentText>

              <FieldContent>
                <RadioGroup onChange={e =>
                  setCaptureStatus(prevState => ({
                    ...prevState,
                    approved: e.target.value,
                  }))}>
                  <FormControlLabel
                    value="Aprovado"
                    control={(
                      <Radio
                        color="primary"
                        checked={captureStatus.approved === 'Aprovado'}
                      />
                    )}
                    label="Aprovado"
                  />
                  <FormControlLabel
                    value="Recusado"
                    control={(
                      <Radio
                        color="primary"
                        checked={captureStatus.approved === 'Recusado'}
                      />
                    )}
                    label="Recusado"
                  />
                </RadioGroup>
              </FieldContent>

              {/* <FieldContent>
                <DialogContentText tabIndex={-1}>Anexar Guia de Autorização</DialogContentText>
                <input type="file" accept="application/pdf" onChange={handleChangeFiles} />
              </FieldContent> */}
              <FieldContent>
                <DialogContentText tabIndex={-1}>Anexar Guia de Autorização</DialogContentText>
                <DialogContentText>Arquivos .pdf e menores que 5 megabytes.</DialogContentText>
                <TextField
                  error={file.error}
                  onChange={handleChangeFiles}
                  helperText={file.error ? "Aquivo não compatível ou muito grande" : null}
                  type='file'>
                </TextField>
              </FieldContent>

              <FieldContent>
                <InputLabel id="capture-status-complexity-label">Complexidade</InputLabel>
                <Select
                  labelId="capture-status-complexity-label"
                  id="capture-status-complexity"
                  value={captureStatus.complexity}
                  onChange={handleChangeComplexity}
                  fullWidth
                >
                  <MenuItem key="complexity-low" value="Baixa Complexidade">Baixa Complexidade</MenuItem>
                  <MenuItem key="complexity-medium" value="Média Complexidade">Média Complexidade</MenuItem>
                  <MenuItem key="complexity-high" value="Alta Complexidade">Alta Complexidade</MenuItem>
                </Select>
              </FieldContent>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModalUpdateStatus(false)} color="primary">
                Fechar
              </Button>
              {captureStatus.approved === 'Aprovado' ? (
                <Button onClick={handleCaptureAttendance} color="primary">
                  Atualizar
                </Button>
              ) : (
                <>
                  {captureStatus.approved === 'Recusado' ? (
                    <Button onClick={handleUpdateCaptureStatus} color="secondary">
                      Atualizar
                    </Button>
                  ) : null}
                </>
              )}
            </DialogActions>
          </Dialog>

          <Dialog
            open={modalConfirmUpdateStatus && captureStatus.approved === 'Recusado'}
            onClose={() => setModalConfirmUpdateStatus(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Finalizar Captação</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja prosseguir?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModalConfirmUpdateStatus(false)} color="primary">
                Não
              </Button>
              <Button onClick={handleUpdateCaptureStatus} color="primary" autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={modalConfirmUpdateStatus && captureStatus.approved === 'Aprovado'}
            onClose={() => setModalConfirmUpdateStatus(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Finalizar Captação</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Ao alterar o status dessa captação você iniciará o atendimento do paciente. Tem certeza que deseja prosseguir?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModalConfirmUpdateStatus(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleUpdateCaptureStatus} color="primary" autoFocus>
                Confirmar
              </Button>
              <Button onClick={handleCaptureAttendance} color="primary" autoFocus>
                Iniciar Atendimento
              </Button>
            </DialogActions>
          </Dialog>
          <Popup
            title="Histórico de Captações"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
          </Popup>

        </Container>
      </Sidebar>
    </>
  );
}
