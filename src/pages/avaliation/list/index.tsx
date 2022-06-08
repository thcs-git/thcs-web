import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useHistory, Link } from "react-router-dom";
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
  Box,
} from "@mui/material";
import {
  FiberManualRecord,
  Visibility as VisibilityIcon,
  ErrorOutline,
  MoreVert,
  Check as CheckIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/";
import {
  careTypeRequest,
  loadRequest,
  searchCareRequest,
  loadRequestPopUp,
} from "../../../store/ducks/cares/actions";

import {
  searchCareRequest as getCares,
  updateCareRequest as updateCareAction,
  searchPatientSuccess as getPatient,
  cleanAction,
} from "../../../store/ducks/cares/actions";

import PaginationComponent from "../../../components/Pagination";
import Sidebar from "../../../components/Sidebar";
import Table from "../../../components/Table";
import SearchComponent from "../../../components/List/Search";
import Loading from "../../../components/Loading";
import {
  FormTitle,
  SelectComponent as Select,
  FieldContent,
} from "../../../styles/components/Form";

import { formatDate } from "../../../helpers/date";

import { ListItemCaptureStatus, CaptionList } from "./styles";
import {
  HighComplexityLabel,
  LowerComplexityLabel,
  MediumComplexityLabel,
} from "../../../styles/components/Text";
import { CareInterface } from "../../../store/ducks/cares/types";
import _ from "lodash";
import { Td, Th } from "../../../styles/components/Table";
import HistoryDialog from "../../../components/Dialogs/History";

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

  const [search, setSearch] = useState("");
  const [file, setFile] = useState({ error: false });
  const [captureStatus, setCaptureStatus] = useState<ICaptureStatus>({
    care: {},
    approved: "",
    attachment: "",
    complexity: "",
  });
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);
  const [modalConfirmUpdateStatus, setModalConfirmUpdateStatus] =
    useState(false);
  const [careIndex, setCareIndex] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [anexoModalOpen, setAnexoModalOpen] = useState(false);
  const [patientArray, setpatientArray] = useState<any>();
  const [historyPatient, setHistoryPatient] = useState("");
  const [historyPatientName, setHistoryPatientName] = useState("");

  useEffect(() => {
    dispatch(cleanAction());
    dispatch(getCares({}));
    dispatch(careTypeRequest());
    // dispatch(loadRequestPopUp({
    //   page: '1',
    //   limit: '1000',
    //   total: 1000,
    //   search
    // }));
  }, []);

  // useEffect(() => {
  //   if (careState.data.status === 'Atendimento') {
  //     history.push(`care/${careState.data._id}/overview`);
  //   }
  // }, [careState.data.status]);

  const handleType = useCallback(
    (care: any) => {
      let complexitiesArray: any = [];
      let complexity: string = "";
      //console.log(care)
      care?.documents_id?.map((field: any) => {
        complexitiesArray.push(field.complexity);
      });
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

      return complexity;
    },
    [careState]
  );

  const handleCoplexities = useCallback(
    (care: any) => {
      let complexitiesArray: any = [];
      let complexity: string = "";
      care?.documents_id?.map((field: any) => {
        // complexitiesArray.push(field.complexity);
        complexitiesArray.push(care?.capture.complexity);
      });
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
        case "sem complexidade":
          return "-";

        case "baixa":
          return <LowerComplexityLabel>{complexity}</LowerComplexityLabel>;

        case "média":
          return <MediumComplexityLabel>{complexity}</MediumComplexityLabel>;

        case "alta":
          return <HighComplexityLabel>{complexity}</HighComplexityLabel>;

        default:
          return "-";
      }
    },
    [careState]
  );

  const handleCoplexitiesDialog = useCallback(
    (care: any) => {
      let complexitiesArray: any = [];
      let complexity: string = "";
      care?.documents_id?.map((field: any) => {
        complexitiesArray.push(field.complexity);
      });
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
        case "sem complexidade":
          return "Atenção Domiciliar";

        case "baixa":
          return (
            <LowerComplexityLabel>{`${complexity} Complexidade`}</LowerComplexityLabel>
          );

        case "média":
          return (
            <MediumComplexityLabel>{`${complexity} Complexidade`}</MediumComplexityLabel>
          );

        case "alta":
          return (
            <HighComplexityLabel>{`${complexity} Complexidade`}</HighComplexityLabel>
          );

        default:
          return "Atenção Domiciliar";
      }
    },
    [careState]
  );

  // const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setSearch(event.target.value)
  //   dispatch(searchCareRequest({search: event.target.value}));
  // }, [search]);

  // const debounceSearchRequest = debounce(handleChangeInput, 900);

  const handleSearchInput = useCallback((event: any) => {
    dispatch(searchCareRequest({ search: event }));
  }, []);

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);

    if (event.target.value === "") {
      handleSearchInput("");
    }
  };

  const handleKeyEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchInput(search);
    }
  };

  const handleClickSearch = (e: any) => {
    handleSearchInput(search);
  };

  const handleOpenRowMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

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

    // if (found && documentId != '5ffd7acd2f5d2b1d8ff6bea4') {
    if (found) {
      return found.status === "Não Elegível" ? (
        <Tooltip title="Não Elegível">
          <ErrorOutline
            style={{ color: "#FF6565", cursor: "pointer" }}
            onClick={() =>
              history.push(
                `/patient/capture/${found.care_id}/${documentRoute()}/${
                  found._id
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
                `/patient/capture/${found.care_id}/${documentRoute()}/${
                  found._id
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

  const handleStartUpdateCaptureStatus = useCallback(
    (care: any) => {
      handleCloseRowMenu();
      setModalUpdateStatus(true);

      setCaptureStatus((prevState) => ({
        ...prevState,
        care,
      }));
    },
    [captureStatus, careState]
  );

  const toggleHistoryModal = (index: number, care: any) => {
    handleCloseRowMenu();
    setCareIndex(index);
    isDone(care);
    setHistoryModalOpen(!historyModalOpen);
    setHistoryPatient(care.patient_id._id);
    setHistoryPatientName(care.patient_id.name);
  };

  const toggleAnexoModal = () => {
    handleCloseRowMenu();

    setAnexoModalOpen(!anexoModalOpen);
  };

  // const handleChangeComplexity = useCallback((event: any) => {
  //   setCaptureStatus(prevState => ({
  //     ...prevState,
  //     complexity: event.target.value,
  //   }));
  // }, [captureStatus]);

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

  const handleChangeFiles = async (
    element: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = element.target.files;

    if (!element) {
      setFile((prevState) => ({
        ...prevState,
        error: false,
      }));
      return;
    } else {
      if (files && files?.length > 0) {
        // console.log(files[0]);
        if (files[0].type == "application/pdf" && files[0].size < 5000000) {
          setFile((prevState) => ({
            ...prevState,
            error: false,
          }));
        } else {
          setFile((prevState) => ({
            ...prevState,
            error: true,
          }));
        }
      }
    }

    if (files && files?.length > 0) {
      const fileData: any = await readFile(files[0]);
      if (!file.error) {
        setCaptureStatus((prevState) => ({
          ...prevState,
          attachment: fileData,
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
      },
    };

    dispatch(updateCareAction(updateParams));
    // dispatch(getCares({ status: 'Pre-Atendimento' }));
    window.location.reload();
  }, [captureStatus, careState]);

  const handleCaptureAttendance = useCallback(() => {
    setModalUpdateStatus(false);
    setModalConfirmUpdateStatus(false);

    const { care } = captureStatus;

    let complexitiesArray: any = [];
    let complexity: string = "";
    let careType: string = "";
    care?.documents_id?.map((field: any) => {
      complexitiesArray.push(field.complexity);
    });
    if (
      complexitiesArray.findIndex(
        (item: string) => item === "Alta Complexidade"
      ) > -1
    ) {
      complexity = "Alta Complexidade";
      careType = "Internação";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Média Complexidade"
      ) > -1
    ) {
      complexity = "Média Complexidade";
      careType = "Internação";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Baixa Complexidade"
      ) > -1
    ) {
      complexity = "Baixa Complexidade";
      careType = "Internação";
    } else {
      complexity = "Sem Complexidade";
      careType = "Atenção";
    }

    var careTypeObj = _.find(careState.care_type, { name: careType });

    const updateParams = {
      ...care,
      capture: {
        ...care.capture,
        status: captureStatus.approved,
        complexity: complexity,
      },
      care_type_id: {
        _id: careTypeObj?._id,
      },
    };

    dispatch(updateCareAction(updateParams));
    dispatch(getCares({ status: "Pre-Atendimento" }));
    dispatch(cleanAction());

    history.push("/care/create/");
  }, [captureStatus, careState]);

  const isDone = useCallback(
    (care: any) => {
      let patientId = _.filter(careState.list2.data, {
        patient_id: { _id: care?.patient_id._id },
      });
      //console.log("teste", patientId);
      setpatientArray(patientId);
      //console.log(patientArray);
    },
    [careState]
  );

  // const isPopup = useCallback(() => {
  //   //{console.log(patientArray)}
  //   patientArray?.map((patient: any) => {
  //     console.log(patient)
  //     return "string"
  //   })
  // }, [patientArray]);

  const tableCells = [
    { name: "Data da captação", align: "left" },
    { name: "Tipo", align: "center" },
    { name: "Complexidade", align: "center" },
    { name: "Status", align: "center" },
    { name: "Empresa", align: "center" },
    { name: "Visualizar", align: "left" },
  ];

  return (
    <>
      <Sidebar>
        {/* {careState.loading && <Loading />} */}
        <Container>
          <FormTitle>Lista de Avaliações</FormTitle>

          <SearchComponent
            handleButton={() => history.push("/patient/capture/create")}
            buttonTitle="Nova avaliação"
            inputPlaceholder="Busque nome do Paciente, Atendimento e Status"
            onChangeInput={handleChangeInput}
            value={search}
            onKeyEnter={handleKeyEnter}
            onClickSearch={handleClickSearch}
          />

          <Table
            tableCells={[
              { name: "Paciente", align: "left" },
              { name: "Tipo", align: "center" },
              { name: "Complexidade", align: "center" },
              { name: "Socioambiental", align: "center" },
              { name: "NEAD", align: "center" },
              { name: "ABEMID", align: "center" },
              // { name: 'Última captação', align: 'left' },
              { name: "Status da captação", align: "left" },
              { name: " ", align: "left" },
            ]}
          >
            {careState.list.data.map((care: CareInterface, index: number) => (
              <TableRow key={`care_${index}`}>
                <TableCell component="th" scope="row">
                  <Link to={`/patient/capture/${care._id}/overview`}>
                    {care?.patient_id?.name}
                  </Link>
                </TableCell>{" "}
                {/* Paciente */}
                <TableCell align="center">{handleType(care)}</TableCell>{" "}
                {/* Tipo */}
                <TableCell align="center">
                  {handleCoplexities(care)}
                </TableCell>{" "}
                {/*Complexidade*/}
                <TableCell align="center">
                  {handleCheckDocument(
                    "5ffd79012f5d2b1d8ff6bea3",
                    care?.documents_id || []
                  )}
                </TableCell>{" "}
                {/* Socioambiental */}
                <TableCell align="center">
                  {handleCheckDocument(
                    "5ff65469b4d4ac07d186e99f",
                    care?.documents_id || []
                  )}
                </TableCell>{" "}
                {/* NEAD */}
                <TableCell align="center">
                  {handleCheckDocument(
                    "5ffd7acd2f5d2b1d8ff6bea4",
                    care?.documents_id || []
                  )}
                </TableCell>{" "}
                {/* ABEMID */}
                {/*<TableCell*/}
                {/*  align="left">{care?.created_at ? formatDate(care.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</TableCell> /!* Última captação *!/*/}
                <TableCell>
                  <ListItemCaptureStatus status={care?.capture?.status || ""}>
                    <FiberManualRecord /> {care?.capture?.status}
                  </ListItemCaptureStatus>
                </TableCell>
                <TableCell align="center">
                  <Button
                    aria-controls={`patient-capture-menu${index}`}
                    id={`btn_patient-capture-menu${index}`}
                    aria-haspopup="true"
                    onClick={handleOpenRowMenu}
                  >
                    <MoreVert style={{ color: "#0899BA" }} />
                  </Button>
                  <Menu
                    id={`patient-capture-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_patient-capture-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem
                      onClick={() =>
                        history.push(`/patient/capture/${care._id}/overview`)
                      }
                    >
                      Visualizar perfil
                    </MenuItem>
                    <MenuItem onClick={() => toggleHistoryModal(index, care)}>
                      Histórico
                    </MenuItem>
                    <MenuItem onClick={() => toggleAnexoModal()}>
                      Documentos Anexados
                    </MenuItem>
                    {care.capture?.status === "Aguardando" && (
                      <MenuItem
                        onClick={() => handleStartUpdateCaptureStatus(care)}
                      >
                        Atualizar status
                      </MenuItem>
                    )}
                  </Menu>
                  {/* <button onClick={toggleDialog}>
                    Open Dialog
                  </button>

                  <Dialog
                    title={"Status"}
                    onClose={toggleDialog}
                    width={200}
                    height={250}
                  >
                    <p style={{ margin: "25px", textAlign: "center" }}>
                      {care?.patient_id?.name}
                    </p>
                    <DialogActionsBar>
                      <button onClick={toggleDialog}>
                        Launch
                      </button>
                    </DialogActionsBar>
                  </Dialog> */}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <PaginationComponent
            page={careState.list.page}
            rowsPerPage={careState.list.limit}
            totalRows={careState.list.total}
            handleFirstPage={() =>
              dispatch(
                loadRequest({
                  page: "1",
                  limit: careState.list.limit,
                  total: careState.list.total,
                  search,
                })
              )
            }
            handleLastPage={() =>
              dispatch(
                loadRequest({
                  page: Math.ceil(
                    +careState.list.total / +careState.list.limit
                  ).toString(),
                  limit: careState.list.limit,
                  total: careState.list.total,
                  search,
                })
              )
            }
            handleNextPage={() =>
              dispatch(
                loadRequest({
                  page: (+careState.list.page + 1).toString(),
                  limit: careState.list.limit,
                  total: careState.list.total,
                  search,
                })
              )
            }
            handlePreviosPage={() =>
              dispatch(
                loadRequest({
                  page: (+careState.list.page - 1).toString(),
                  limit: careState.list.limit,
                  total: careState.list.total,
                  search,
                })
              )
            }
            handleChangeRowsPerPage={(event) =>
              dispatch(
                loadRequest({
                  limit: event.target.value,
                  page: "1",
                  search,
                })
              )
            }
          />

          <div>
            <h3>Legendas para status de captação:</h3>
            <br />
            <CaptionList>
              <div className="captionItem aprovado">
                <FiberManualRecord /> <span>Aprovado</span> &nbsp;- o pedido foi
                aprovado pelo plano de saúde
              </div>
              <div className="captionItem recusado">
                <FiberManualRecord /> <span>Recusado</span> &nbsp;- o pedido foi
                recusado pelo plano
              </div>
              <div className="captionItem aguardando">
                <FiberManualRecord /> <span>Aguardando</span> &nbsp;- o pedido
                está aguardando análise do plano de saúde
              </div>
              <div className="captionItem andamento">
                <FiberManualRecord /> <span>Em Andamento</span> &nbsp;- as
                captações estão em andamento
              </div>
              <div className="captionItem cancelado">
                <FiberManualRecord /> <span>Cancelado</span> &nbsp;- a captação
                foi cancelada e uma nova foi criada
              </div>
            </CaptionList>
          </div>

          <Dialog
            open={modalUpdateStatus}
            onClose={() => setModalUpdateStatus(false)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">
              Atualização de status
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                Para dar continuidade ao atendimento, é necessário atualizar o
                status do pedido do paciente, anexar a guia de autorização do
                plano (formato PDF) e definir complexidade:
              </DialogContentText>

              <FieldContent>
                <RadioGroup
                  onChange={(e) =>
                    setCaptureStatus((prevState) => ({
                      ...prevState,
                      approved: e.target.value,
                    }))
                  }
                >
                  <FormControlLabel
                    value="Aprovado"
                    control={
                      <Radio
                        color="primary"
                        checked={captureStatus.approved === "Aprovado"}
                      />
                    }
                    label="Aprovado"
                  />
                  <FormControlLabel
                    value="Recusado"
                    control={
                      <Radio
                        color="primary"
                        checked={captureStatus.approved === "Recusado"}
                      />
                    }
                    label="Recusado"
                  />
                </RadioGroup>
              </FieldContent>

              {/*<FieldContent>*/}
              {/*  <DialogContentText tabIndex={-1}>Anexar Guia de Autorização</DialogContentText>*/}
              {/*  <input type="file" accept="application/pdf" onChange={handleChangeFiles} />*/}
              {/*</FieldContent>*/}
              <FieldContent>
                <DialogContentText tabIndex={-1}>
                  Anexar Guia de Autorização
                </DialogContentText>
                <DialogContentText>
                  Arquivos .pdf e menores que 5 megabytes.
                </DialogContentText>
                <TextField
                  error={file.error}
                  onChange={handleChangeFiles}
                  helperText={
                    file.error ? "Aquivo não compatível ou muito grande" : null
                  }
                  type="file"
                  inputProps={{ accept: "application/pdf" }}
                ></TextField>
              </FieldContent>

              <FieldContent>
                <InputLabel id="capture-status-complexity-label">
                  Complexidade:
                </InputLabel>
                {/*<Select*/}
                {/*  labelId="capture-status-complexity-label"*/}
                {/*  id="capture-status-complexity"*/}
                {/*  value={captureStatus.complexity}*/}
                {/*  onChange={handleChangeComplexity}*/}
                {/*  fullWidth*/}
                {/*>*/}
                {/*  <MenuItem key="complexity-low" value="Baixa Complexidade">Baixa Complexidade</MenuItem>*/}
                {/*  <MenuItem key="complexity-medium" value="Média Complexidade">Média Complexidade</MenuItem>*/}
                {/*  <MenuItem key="complexity-high" value="Alta Complexidade">Alta Complexidade</MenuItem>*/}
                {/*</Select>*/}
                <br />
                {handleCoplexitiesDialog(captureStatus?.care)}
              </FieldContent>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setModalUpdateStatus(false)}
                color="primary"
              >
                Fechar
              </Button>
              {captureStatus.approved === "Aprovado" ? (
                <Button onClick={handleCaptureAttendance} color="primary">
                  Atualizar
                </Button>
              ) : (
                <>
                  {captureStatus.approved === "Recusado" ? (
                    <Button
                      onClick={handleUpdateCaptureStatus}
                      color="secondary"
                    >
                      Atualizar
                    </Button>
                  ) : null}
                </>
              )}
            </DialogActions>
          </Dialog>

          <Dialog
            open={
              modalConfirmUpdateStatus && captureStatus.approved === "Recusado"
            }
            onClose={() => setModalConfirmUpdateStatus(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Finalizar Captação
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja prosseguir?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setModalConfirmUpdateStatus(false)}
                color="primary"
              >
                Não
              </Button>
              <Button
                onClick={handleUpdateCaptureStatus}
                color="primary"
                autoFocus
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={
              modalConfirmUpdateStatus && captureStatus.approved === "Aprovado"
            }
            onClose={() => setModalConfirmUpdateStatus(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Finalizar Captação
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Ao alterar o status dessa captação você iniciará o atendimento
                do paciente. Tem certeza que deseja prosseguir?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setModalConfirmUpdateStatus(false)}
                color="primary"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdateCaptureStatus}
                color="primary"
                autoFocus
              >
                Confirmar
              </Button>
              <Button
                onClick={handleCaptureAttendance}
                color="primary"
                autoFocus
              >
                Iniciar Atendimento
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Sidebar>

      <HistoryDialog
        modalOpen={historyModalOpen}
        setModalOpen={setHistoryModalOpen}
        historyPatient={historyPatient}
        historyPatientName={historyPatientName}
        tableCells={tableCells}
        historyType={"avaliation"}
      />

      {/*Historico*/}
      {/*<Dialog*/}

      {/*  maxWidth="lg"*/}
      {/*  open={historyModalOpen}*/}
      {/*  onClose={() => setHistoryModalOpen(false)}*/}
      {/*  aria-labelledby="scroll-dialog-title"*/}
      {/*  aria-describedby="scroll-dialog-description"*/}
      {/*>*/}
      {/*  <DialogTitle id="scroll-dialog-title"><h3>Histórico de Captações</h3></DialogTitle>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogContentText*/}
      {/*      id="scroll-dialog-description"*/}
      {/*      tabIndex={-1}*/}
      {/*    >*/}
      {/*      <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>*/}
      {/*        <Grid item md={1} style={{ padding: "0" }}>*/}
      {/*          <AccountCircleIcon style={{ color: '#0899BA', fontSize: '30pt' }} />*/}
      {/*        </Grid>*/}
      {/*        <Grid item md={11} style={{ padding: "0", paddingTop: "0.4rem" }}>*/}
      {/*          <h3 style={{ color: '#333333' }}>{careState.list.data[careIndex]?.patient_id.name}</h3>*/}
      {/*        </Grid>*/}
      {/*      </Grid>*/}
      {/*      <Table*/}
      {/*        tableCells={[*/}
      {/*          { name: 'Data da captação', align: 'left' },*/}
      {/*          { name: 'Tipo', align: 'center' },*/}
      {/*          { name: 'Complexidade', align: 'center' },*/}
      {/*          { name: 'Status', align: 'center' },*/}
      {/*          { name: 'Visualizar', align: 'left' }*/}
      {/*        ]}*/}
      {/*      >*/}
      {/*        {patientArray?.map((patient: any, index: number) => {*/}
      {/*          return (*/}
      {/*            <TableRow key={`patient_${index}`}>*/}
      {/*              <TableCell >*/}
      {/*                <p>{patient?.capture?.finished_at ? formatDate(patient?.finished_at, 'DD/MM/YYYY') : '-'}</p>*/}
      {/*              </TableCell>*/}
      {/*              <TableCell align="center">*/}
      {/*                <p>{handleType(patient)}</p>*/}
      {/*              </TableCell>*/}
      {/*              <TableCell align="center">*/}
      {/*                <p>{handleCoplexities(patient)}</p>*/}
      {/*              </TableCell>*/}
      {/*              <TableCell align="center">*/}
      {/*                <ListItemCaptureStatus status={patient?.capture?.status || ''}>*/}
      {/*                  <FiberManualRecord /> {patient?.capture?.status}*/}
      {/*                </ListItemCaptureStatus>*/}
      {/*              </TableCell>*/}
      {/*              <TableCell align="center">*/}
      {/*                <Button onClick={() => history.push(`/patient/capture/${patient?._id}/overview`)}>*/}
      {/*                  <VisibilityIcon style={{ color: '#0899BA' }} />*/}
      {/*                </Button>*/}
      {/*              </TableCell>*/}
      {/*            </TableRow>*/}
      {/*          )*/}
      {/*        })}*/}
      {/*      </Table>*/}
      {/*    </DialogContentText>*/}
      {/*  </DialogContent>*/}
      {/*  <DialogActions>*/}
      {/*    <Button onClick={() => setHistoryModalOpen(false)} color="primary">*/}
      {/*      <h3 style={{ color: '#0899BA', fontSize: '11pt' }}>Fechar</h3>*/}
      {/*    </Button>*/}
      {/*  </DialogActions>*/}
      {/*</Dialog>*/}

      {/*Visualizar Anexos*/}
      <Dialog
        scroll="paper"
        open={anexoModalOpen}
        onClose={() => setAnexoModalOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Documentos Anexados</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAnexoModalOpen(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
