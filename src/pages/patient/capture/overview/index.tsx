import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  TableRow,
  TableCell,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  TextField,
  Card,
  CardContent,
  FormGroup,
  Checkbox,
  RadioGroup,
  Radio,
  InputLabel,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  CheckCircle,
  MoreVert,
  CheckCircleOutline,
  Edit,
  Print,
  Visibility,
  Add,
  Description,
} from "@mui/icons-material";

import { ReactComponent as IconAlertRed } from "../../../../assets/img/Icon-alert-red.svg";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
import {
  loadCareById,
  updateCareRequest,
  healthInsuranceRequest,
  healthPlanRequest,
  healthSubPlanRequest,
  createCareRequest as createCareAction,
  cleanAction,
} from "../../../../store/ducks/cares/actions";

import { loadRequestGetByScore } from "../../../../store/ducks/documents/actions";
import { CareInterface } from "../../../../store/ducks/cares/types";
import { DocumentInterface } from "../../../../store/ducks/documents/types";

import { loadRequestByIds as getDocumentGroupsByIds } from "../../../../store/ducks/documentGroups/actions";
import { DocumentGroupList } from "../../../../store/ducks/documentGroups/types";

import CaptureDataDialog from "../../../../components/Dialogs/CaptureData";
import Loading from "../../../../components/Loading";
import Sidebar from "../../../../components/Sidebar";

import LOCALSTORAGE from "../../../../helpers/constants/localStorage";
import { formatDate } from "../../../../helpers/date";

import Button from "../../../../styles/components/Button";
import { FormTitle, FieldContent } from "../../../../styles/components/Form";
import { Table, Th, Td } from "../../../../styles/components/Table";
import Tables from "../../../../components/Table";

import {
  LowerComplexityLabel,
  MediumComplexityLabel,
  HighComplexityLabel,
  NoComplexityLabel,
  ElegibleLabel,
  NotElegibleLabel,
} from "../../../../styles/components/Text";

import {
  PatientResume,
  PatientResumeContent,
  PatientData,
  SuccessContent,
  BackButtonContent,
  MaleIconLogo,
  FemaleIconLogo,
} from "./styles";

import { ReactComponent as SuccessImage } from "../../../../assets/img/ilustracao-avaliacao-concluida.svg";
import { age } from "../../../../helpers/date";
import { forEach } from "cypress/types/lodash";
import ButtonComponent from "../../../../styles/components/Button";
import { HeaderContent } from "../../../care/overview/schedule/styles";
import debounce from "lodash.debounce";
import _ from "lodash";

interface IPageParams {
  id: string;
  mode: string;
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

export default function PatientCaptureForm(props: IPageParams) {
  console.log("teste");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const documentGroupsState = useSelector(
    (state: ApplicationState) => state.documentGroups
  );
  const documentState = useSelector(
    (state: ApplicationState) => state.documents
  );

  const params = useParams();
  const { state } = props.location;

  const userSessionId = localStorage.getItem(LOCALSTORAGE.USER_ID) || "";

  const [care, setCare] = useState<CareInterface>();
  const [document, setDocument] = useState<DocumentInterface>();
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupList>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [captureOptionsModalOpen, setCaptureModalModalOpen] = useState(false);
  const [captureFinishModalOpen, setCaptureFinishModalOpen] = useState(false);
  const [captureNewModalOpen, setCaptureNewModalOpen] = useState(false);
  const [finishEnable, setFinishEnable] = useState(false);
  const [modalPrint, setModalPrint] = useState(false);
  const [documentHistory, setDocumentHistory] = useState<any>([]);

  const [modalAnexo, setModalAnexo] = useState(false);
  const [file, setFile] = useState({ error: false });
  const [captureData, setCaptureData] = useState<ICaptureData | any>({});

  useEffect(() => {
    getCare(params.id);
    dispatch(healthInsuranceRequest());
    setDocumentHistory([]);
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

  useEffect(() => {
    setDocumentGroups(documentGroupsState.list);
  }, [documentGroupsState.list]);

  useEffect(() => {
    // if(careState.data.status){
    //   let document_group_id = careState.data.documents_id? careState.data.documents_id[0].document_group_id._id : ""
    //   dispatch(loadRequestGetByScore({
    //     page: '1',
    //     limit: '100',
    //     total: 100,
    //     patient: careState.data.patient_id?._id,
    //     document_group_id: document_group_id
    //   }));
    //   console.log("ds", careState.data);
    // }
    // if(careState.data.status){
    //   console.log("d", documentGroupsState.list.data);
    // }
    if (documentState.success) {
      setDocumentHistory(documentState.list);
      console.log("t", documentState.list);
    }
  }, [documentState]);

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
      // console.log(fileData)
      // if (!file.error) {
      //   setCaptureStatus(prevState => ({
      //     ...prevState,
      //     attachment: fileData
      //   }));
      // }
    }
  };

  const getCare = useCallback((id: string) => {
    if (id.length > 0) {
      dispatch(loadCareById(id));
      dispatch(
        getDocumentGroupsByIds(
          "5ffd7acd2f5d2b1d8ff6bea4,5ffd79012f5d2b1d8ff6bea3,5ff65469b4d4ac07d186e99f"
        )
      );
    }
  }, []);

  const handleOpenRowMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleComplexityLabel = (
    name: string = "",
    complexity: string = ""
  ) => {
    if (name === "Tabela Socioambiental") {
      return "-";
    }
    switch (complexity.toLocaleLowerCase()) {
      case "sem complexidade":
        return "-";
      // return <NoComplexityLabel>-</NoComplexityLabel>;

      case "baixa complexidade":
        return <LowerComplexityLabel>{complexity}</LowerComplexityLabel>;

      case "média complexidade":
        return <MediumComplexityLabel>{complexity}</MediumComplexityLabel>;

      case "alta complexidade":
        return <HighComplexityLabel>{complexity}</HighComplexityLabel>;

      default:
        return "-";
    }
  };

  const handleElegibilityLabel = (
    name: string = "",
    elegibile: string = ""
  ) => {
    if (name === "ABEMID") {
      return "-";
    }
    switch (elegibile.toLocaleLowerCase()) {
      case "elegível":
        return <ElegibleLabel>{elegibile}</ElegibleLabel>;

      case "não elegível":
        return <NotElegibleLabel>{elegibile}</NotElegibleLabel>;

      default:
        return "-";
    }
  };

  const handleCareTypeLabel = (name: string = "", elegibile: string = "") => {
    if (name === "Tabela Socioambiental") {
      return "-";
    }
    switch (elegibile.toLocaleLowerCase()) {
      case "baixa complexidade":
        return "Internação Domiciliar";

      case "média complexidade":
        return "Internação Domiciliar";

      case "alta complexidade":
        return "Internação Domiciliar";

      case "atenção domiciliar":
        return "Atenção Domiciliar";

      case "sem complexidade":
        return "Atenção Domiciliar";

      default:
        return "-";
    }
  };

  const scoreStatusLabel = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <span style={{ color: "#4FC66A" }}>{status}</span>;

      case "Reprovado":
        return <span style={{ color: "#FF6565" }}>{status}</span>;

      case "Em Andamento":
        return <span style={{ color: "#0899BA" }}>{status}</span>;

      default:
        return <span>{status}</span>;
    }
  };

  const handleScoreRoute = useCallback(
    (id: string, care_id: string, document_id?: string) => {
      const routes: any = {
        "5ff65469b4d4ac07d186e99f": `/patient/capture/${care_id}/nead`,
        "5ffd7acd2f5d2b1d8ff6bea4": `/patient/capture/${care_id}/abemid`,
        "5ffd79012f5d2b1d8ff6bea3": `/patient/capture/${care_id}/socioambiental`,
      };

      // Verificar se tem um documento de nead preenchido para indicar que o katz foi preenchido
      let katzIsDone = false;

      if (care?.documents_id && care?.documents_id?.length > 0) {
        const founded = care?.documents_id.find(
          (doc) =>
            doc.document_group_id._id === "5ff65469b4d4ac07d186e99f" &&
            !doc.canceled &&
            doc.finished
        );

        katzIsDone = !!founded;
      }

      document_id
        ? navigate(`${routes[id]}/${document_id}`, { katzIsDone })
        : navigate(routes[id], { katzIsDone });
    },
    [care]
  );

  const toggleHistoryModal = useCallback(
    (patient: any, document_group_id: any) => {
      handleCloseRowMenu();

      //let document_group_id = careState.data.documents_id? careState.data.documents_id[0].document_group_id._id : ""
      dispatch(
        loadRequestGetByScore({
          page: "1",
          limit: "100",
          total: 100,
          patient: patient,
          document_group_id: document_group_id,
        })
      );

      //setDocumentHistory(documentState.list);
      //isDone(patient, document_group_id);

      setHistoryModalOpen(!historyModalOpen);
    },
    []
  );

  const toggleHistoryModal_2 = useCallback(() => {
    console.log("tt", documentState);
    setDocumentHistory(documentState.list.data);
  }, [documentState]);

  const handleCheckDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(
      (doc) =>
        doc.document_group_id._id === documentId &&
        !doc.canceled &&
        doc.finished
    );

    if (care?.capture?.status === "Em Andamento") {
      return found ? (
        <CheckCircle style={{ color: "#4FC66A", cursor: "pointer" }} />
      ) : (
        <Add style={{ color: "#0899BA", cursor: "pointer" }} />
      );
    } else {
      return found ? (
        <CheckCircle style={{ color: "#4FC66A", cursor: "pointer" }} />
      ) : (
        <></>
      );
    }
  };

  const handleDocument = (documentId: string, documents: Array<any>) => {
    const found = documents.find(
      (doc) =>
        doc.document_group_id._id === documentId &&
        !doc.canceled &&
        doc.finished
    );

    return found;
  };

  const handleSubmitCaptureData = () => {
    const updateParams = {
      ...care,
      capture: {
        ...care?.capture,
        ...captureData,
      },
      care_type_id: "5fd66ca189a402ec48110cc1",
      user_id: userSessionId,
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
        status: "Aguardando",
        finished_at: new Date(),
      },
      care_type_id: "5fd66ca189a402ec48110cc1",
      user_id: userSessionId,
    };

    dispatch(updateCareRequest(updateParams));
    dispatch(cleanAction());

    navigate("/avaliation");
  }, [care, captureData]);

  const handleSubmitNewCapture = useCallback(() => {
    setCaptureNewModalOpen(false);

    const careParams = {
      patient_id: care?.patient_id?._id || "",
      status: "Pre-Atendimento",
      capture: {
        ...captureData,
        status: "Em Andamento",
        estimate: "",
      },
      care_type_id: care?.care_type_id?._id,
      user_id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
      company_id: localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || ``,
    };

    const updateParams = {
      ...care,
      capture: {
        ...care?.capture,
        ...captureData,
        status: "Cancelado",
      },
      care_type_id: care?.care_type_id?._id,
      user_id: userSessionId,
    };

    dispatch(updateCareRequest(updateParams));

    dispatch(cleanAction());
    dispatch(createCareAction(careParams));
    handleNewCaptureData();
  }, [care, careState]);

  const handleNewCaptureData = useCallback(() => {
    navigate(`/patient/capture/${careState.data._id}/overview`);
  }, [careState.success]);

  const handleValidadeFinishEnable = useCallback(() => {
    const abemidDocument = handleDocument(
      "5ffd7acd2f5d2b1d8ff6bea4",
      care?.documents_id || []
    );
    const neadDocument = handleDocument(
      "5ff65469b4d4ac07d186e99f",
      care?.documents_id || []
    );

    if (captureData.estimate && (abemidDocument || neadDocument)) {
      setFinishEnable(true);
    } else {
      setFinishEnable(false);
    }
  }, [captureData]);

  const handlePrint = () => {
    alert("print");
  };

  return (
    <>
      <Sidebar>
        {/* {careState.loading && <Loading />} */}
        <Container>
          <FormTitle>Overview da Captação</FormTitle>

          {/*{state?.success && (*/}
          {/*  <SuccessContent>*/}
          {/*    <SuccessImage />*/}
          {/*    <h1>Avaliação concluída</h1>*/}

          {/*    <p><strong>Os dados da avaliação foram salvos no sistema. Para adicionar ou visualizar avaliações, use o menu <MoreVert /></strong></p>*/}
          {/*  </SuccessContent>*/}
          {/*)}*/}

          {care?._id && (
            <>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <PatientResume>
                    <PatientResumeContent>
                      <PatientData>
                        <div className="patientIcon">
                          <AccountCircleIcon />
                        </div>
                        <div>
                          <p className="title">{care?.patient_id?.name}</p>
                          <div className="subTitle">
                            <a className="patientInfo">
                              {care?.patient_id?.birthdate
                                ? age(care?.patient_id?.birthdate)
                                : ""}{" "}
                              | CPF: {care?.patient_id.fiscal_number} | Mãe:{" "}
                              {care?.patient_id?.mother_name} |{" "}
                            </a>
                            {care?.patient_id?.gender != "Masculino" ? (
                              <>
                                <a> Sexo: </a> <FemaleIconLogo />
                              </>
                            ) : (
                              <>
                                <a>Sexo: </a> <MaleIconLogo />
                              </>
                            )}
                            <p>Pedido: {care?.capture?.order_number}</p>
                            <p>
                              Data de Nascimento:{" "}
                              {formatDate(
                                care?.patient_id?.birthdate,
                                "DD/MM/YYYY"
                              )}
                            </p>
                            {care.capture?.status != "Em Andamento" ? (
                              <Button
                                onClick={() => setCaptureModalModalOpen(true)}
                              >
                                <Visibility
                                  className="primary"
                                  style={{
                                    width: 20,
                                    marginRight: 5,
                                  }}
                                />{" "}
                                Dados da captação
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setCaptureModalModalOpen(true)}
                              >
                                <Edit
                                  className="primary"
                                  style={{
                                    width: 20,
                                    marginRight: 5,
                                  }}
                                />{" "}
                                Editar Dados da captação
                              </Button>
                            )}
                          </div>
                        </div>
                      </PatientData>

                      {care.capture?.status === "Em Andamento" ||
                      care.capture?.status === "Aguardando" ||
                      care.capture?.status === "Recusado" ? (
                        <div>
                          {care.capture?.status === "Aguardando" && (
                            <Button
                              // background={"primary"}
                              onClick={() => setCaptureNewModalOpen(true)}
                            >
                              <Add />
                              Nova Captação
                            </Button>
                          )}
                          {care.capture?.status === "Em Andamento" && (
                            <Button
                              // background={finishEnable ? "success" : "disable"}
                              disabled={!finishEnable}
                              onClick={() => setCaptureFinishModalOpen(true)}
                            >
                              <CheckCircleOutline />
                              Concluir Captação
                            </Button>
                          )}
                          <Button onClick={() => setModalPrint(true)}>
                            <Print
                              className="primary"
                              style={{ width: 30, height: 30 }}
                            />
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => setModalPrint(true)}>
                          <Print
                            className="primary"
                            style={{ width: 30, height: 30 }}
                          />
                        </Button>
                      )}
                    </PatientResumeContent>
                  </PatientResume>
                </Grid>
              </Grid>

              <Table>
                <thead>
                  <tr>
                    <Th colSpan={2} style={{ paddingLeft: 25 }}>
                      Tipo do Score
                    </Th>
                    <Th center>Tipo</Th>
                    <Th center>Complexidade</Th>
                    {/*<Th>Adicionado em</Th>*/}
                    <Th center>Status</Th>
                    <Th center>Histórico</Th>
                  </tr>
                </thead>
                <tbody>
                  {documentGroups?.data.map(
                    (documentGroup: any, index: number) => {
                      const document = handleDocument(
                        documentGroup._id,
                        care?.documents_id || []
                      );

                      return (
                        <tr key={`documentGroup_${index}`}>
                          <Td
                            center
                            onClick={() => {
                              if (document?._id) {
                                handleScoreRoute(
                                  documentGroup?._id || "",
                                  care?._id || "",
                                  document?._id
                                );
                              } else {
                                handleScoreRoute(
                                  documentGroup?._id || "",
                                  care?._id || ""
                                );
                              }
                            }}
                          >
                            {handleCheckDocument(
                              documentGroup._id,
                              care?.documents_id || []
                            )}
                          </Td>

                          {documentGroup.name != "Tabela Socioambiental" ? (
                            <>
                              <Td>
                                {documentGroup.name}
                                <span style={{ color: "red" }}> *</span>
                              </Td>
                              <Td center>
                                {handleCareTypeLabel(
                                  documentGroup.name,
                                  document?.complexity
                                )}
                              </Td>
                              <Td center>
                                {handleComplexityLabel(
                                  documentGroup.name,
                                  document?.complexity
                                )}
                              </Td>
                              {/*<Td center>{document?.created_at ? formatDate(document.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</Td>*/}
                              <Td center>
                                {handleElegibilityLabel(
                                  documentGroup.name,
                                  document?.status
                                )}
                              </Td>
                            </>
                          ) : (
                            <>
                              <Td>{documentGroup.name}</Td>
                              <Td center>
                                {handleCareTypeLabel(documentGroup.name, "-")}
                              </Td>
                              <Td center>
                                {handleComplexityLabel(documentGroup.name, "-")}
                              </Td>
                              {/*<Td center>{document?.created_at ? formatDate(document.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}</Td>*/}
                              <Td center>
                                {handleElegibilityLabel(
                                  documentGroup.name,
                                  document?.status
                                )}
                              </Td>
                            </>
                          )}
                          <Td center>
                            {care.capture?.status === "Em Andamento" ? (
                              <>
                                {/*<Button aria-controls={`simple-menu${index}`} id={`btn_simple-menu${index}`}*/}
                                {/*        aria-haspopup="true" onClick={handleOpenRowMenu}>*/}
                                {/*  <MoreVert className="primary"/>*/}
                                {/*</Button>*/}
                                {/*<Menu*/}
                                {/*  id={`simple-menu${index}`}*/}
                                {/*  anchorEl={anchorEl}*/}
                                {/*  keepMounted*/}
                                {/*  open={anchorEl?.id === `btn_simple-menu${index}`}*/}
                                {/*  onClose={handleCloseRowMenu}*/}
                                {/*>*/}
                                {/*  {document?._id ? (*/}
                                {/*    <div>*/}
                                {/*      <MenuItem*/}
                                {/*        onClick={() => handleScoreRoute(documentGroup?._id || '', care?._id || '', document?._id)}>Editar</MenuItem>*/}
                                {/*      <MenuItem onClick={() => console.log(document?._id)}>Excluir</MenuItem>*/}
                                {/*    </div>*/}
                                {/*  ) : (*/}
                                {/*    <MenuItem onClick={() => handleScoreRoute(documentGroup?._id || '', care?._id || '')}>Adicionar*/}
                                {/*      novo</MenuItem>*/}
                                {/*  )}*/}
                                {/*  <MenuItem onClick={() => toggleHistoryModal(documentGroup._id)}>Ver histórico</MenuItem>*/}
                                {/*</Menu>*/}
                                {document?._id ? (
                                  <Button
                                    onClick={() =>
                                      toggleHistoryModal(
                                        care?.patient_id?._id,
                                        documentGroup._id
                                      )
                                    }
                                  >
                                    <Visibility className="primary" />
                                  </Button>
                                ) : (
                                  <>-</>
                                )}
                              </>
                            ) : (
                              <>
                                {document?._id ? (
                                  // <Button
                                  //   onClick={() => window.open(`/care/${care?._id}/medical-records/document/${document?._id}/print`, "_blank")}>
                                  //   <Visibility className="primary"/>
                                  // </Button>
                                  <Button
                                    onClick={() =>
                                      toggleHistoryModal(
                                        care?.patient_id?._id,
                                        documentGroup._id
                                      )
                                    }
                                  >
                                    <Visibility className="primary" />
                                  </Button>
                                ) : (
                                  <>-</>
                                )}
                              </>
                            )}
                          </Td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </Table>

              <Card>
                <CardContent>
                  {care.capture?.status === "Em Andamento" ? (
                    <>
                      <HeaderContent>
                        <h3>
                          Orçamento <span style={{ color: "red" }}>*</span>
                        </h3>
                      </HeaderContent>
                      <br />
                      <FieldContent>
                        <TextField
                          id="input-estimate"
                          label="Orçamento"
                          variant="outlined"
                          size="small"
                          placeholder="Adicione detalhes de orçamento"
                          value={captureData.estimate}
                          onChange={(element) =>
                            setCaptureData({
                              ...captureData,
                              estimate: element.target.value,
                            })
                          }
                          fullWidth
                          multiline
                        />
                      </FieldContent>
                      <div>
                        <ButtonComponent
                          onClick={() => {
                            setModalAnexo(true);
                          }}
                          // background="default"
                          style={{ color: "#0899BA" }}
                        >
                          <Description />
                          Anexar Documento
                        </ButtonComponent>
                      </div>
                      <br />
                      <p>
                        <span style={{ marginRight: 10 }}>
                          <IconAlertRed />
                        </span>
                        Para concluir a captação, os itens com{" "}
                        <span style={{ color: "red" }}>asterisco</span> são
                        obrigatórios: Orçamento + Tabela NEAD ou Tabela Abemid.
                      </p>
                    </>
                  ) : (
                    <>
                      <h4>
                        Orçamento <span style={{ color: "red" }}>*</span>
                      </h4>
                      <p>{captureData.estimate}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          <BackButtonContent>
            <Button
              // background="primary"
              onClick={() => navigate("/avaliation")}
            >
              Voltar
            </Button>
            {care?.capture?.status === "Em Andamento" && (
              <Button
                //  background="success"
                onClick={handleSubmitCaptureData}
              >
                Salvar
              </Button>
            )}
          </BackButtonContent>
        </Container>

        <CaptureDataDialog
          dialogState={captureOptionsModalOpen}
          toogleModalState={() => setCaptureModalModalOpen(false)}
          captureData={captureData}
          setCaptureData={setCaptureData}
          saveCallback={handleSubmitCaptureData}
          cantEdit={care?.capture?.status != "Em Andamento"}
        />

        <Dialog
          scroll="paper"
          open={historyModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <h3>Histórico do Score</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {documentState.loading ? (
                <>
                  {/* <Loading /> */}
                  ""
                </>
              ) : (
                <>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={1} style={{ padding: "0" }}>
                      <AccountCircleIcon
                        style={{ color: "#0899BA", fontSize: "30pt" }}
                      />
                    </Grid>
                    <Grid
                      item
                      md={11}
                      style={{ padding: "0", paddingTop: "0.4rem" }}
                    >
                      <h3 style={{ color: "#333333" }}>
                        {care?.patient_id?.name}
                      </h3>
                    </Grid>
                  </Grid>
                  <Tables
                    tableCells={[
                      { name: "Tipo", align: "left" },
                      { name: "Complexidade", align: "left" },
                      { name: "Adicionado em", align: "left" },
                      { name: "Status", align: "left" },
                    ]}
                  >
                    {documentHistory.map((doc: any, index: number) => (
                      <TableRow key={`doc_${index}`}>
                        <TableCell>{doc.document_group_id.name}</TableCell>
                        <TableCell>
                          {handleComplexityLabel(doc.name, doc.complexity)}
                        </TableCell>
                        <TableCell>
                          {formatDate(doc.created_at, "DD/MM/YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell>{doc.status}</TableCell>
                      </TableRow>
                    ))}
                  </Tables>{" "}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoryModalOpen(false)} color="primary">
              <h3 style={{ color: "#0899BA", fontSize: "11pt" }}>Fechar</h3>
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={captureFinishModalOpen}
          onClose={() => setCaptureFinishModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Concluir a Captação
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              Tem certeza que deseja concluir a captação do paciente e iniciar o
              processo de autorização do plano de saúde?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setCaptureFinishModalOpen(false)}
              color="primary"
            >
              Não
            </Button>
            <Button onClick={handleSubmitFinishCapture} color="primary">
              Sim
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={captureNewModalOpen}
          onClose={() => setCaptureNewModalOpen(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Nova Captação</DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              Tem certeza que deseja iniciar uma nova captação do paciente?
            </DialogContentText>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              Ao iniciar uma nova a atual será recusada e uma nova vai ser
              iniciada
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setCaptureNewModalOpen(false)}
              color="primary"
            >
              Não
            </Button>
            <Button onClick={handleSubmitNewCapture} color="primary">
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
          <DialogTitle id="alert-dialog-title">
            Deseja imprimir a captação?
          </DialogTitle>
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

        {/*Anexar Documento*/}
        <Dialog
          open={modalAnexo}
          onClose={() => setModalAnexo(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Anexo de documentos
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              Para dar continuidade a captação, é necessário a documentação!
            </DialogContentText>

            <FieldContent>
              <DialogContentText tabIndex={-1}>
                Anexar Documentos
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
              ></TextField>
            </FieldContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalAnexo(false)} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Sidebar>
    </>
  );
}
