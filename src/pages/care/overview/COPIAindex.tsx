import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { Link, useHistory } from "react-router-dom";

import QueueIcon from "@material-ui/icons/Queue";
import CropFreeIcon from "@material-ui/icons/CropFree";
import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import { FieldContent, FormTitle } from "../../../styles/components/Form";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header/Overview";
import ScrollCard from "../../../components/Card/ScrollCard";
import CardInfo from "../../../components/Card/Info";

import {
  deleteCareRequest,
  loadCareById,
  updateCareRequest,
} from "../../../store/ducks/cares/actions";

import IconProfile from "../../../assets/img/icon-profile.svg";
import IconProntuario from "../../../assets/img/icon-prontuario.svg";
import { ReactComponent as SuccessImage } from "../../../assets/img/illustration-token.svg";
import IconMultidisciplinar from "../../../assets/img/icon-equipe-medica.svg";
import IconDadosPessoais from "../../../assets/img/icon-dados-pessoais.svg";
import IconPlanoInternacoes from "../../../assets/img/icon-plano-internacoes.svg";
import IconUltimosProced from "../../../assets/img/icon-ultimos-procedimentos.svg";

import IconAfericao from "../../../assets/img/icon-afericao.svg";
import IconCurativos from "../../../assets/img/icon-curativos.svg";
import IconMedicacao from "../../../assets/img/icon-medicacao.svg";
import IconStatus from "../../../assets/img/icon-status.svg";

import { ReactComponent as IconAlergic } from "../../../assets/img/icon-alergic.svg";
import { ReactComponent as IconAntibiotics } from "../../../assets/img/icon-antibiotics.svg";
import { ReactComponent as IconEvolution } from "../../../assets/img/icon-diagnosis.svg";
import { ReactComponent as IconHistory } from "../../../assets/img/icon-history.svg";
import { ReactComponent as IconMeasurement } from "../../../assets/img/icon-measurement.svg";
import { ReactComponent as IconPrescription } from "../../../assets/img/icon-prescription.svg";
import { ReactComponent as IconHome } from "../../../assets/img/marca-sollar-home.svg";

import IconAgenda from "../../../assets/img/agenda.png";

import { ContainerStyle as Container, Profile } from "./styles";
import ButtonComponent from "../../../styles/components/Button";
import Button from "../../../styles/components/Button";
import {
  MoreVert,
  Check as CheckIcon,
  Close as CloseIcon,
  Add as AddIcon,
  AccountCircle as AccountCircleIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import { ApplicationState } from "../../../store";
import { RouteComponentProps } from "react-router-dom";
import { age, formatDate } from "../../../helpers/date";
import mask from "../../../utils/mask";
import Loading from "../../../components/Loading";
import QRCode from "react-qr-code";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import Table from "../../../components/Table";
import ViewCard from "../../../components/Card/ViewCard";
import MedicalReleaseDialog from "../../../components/Dialogs/Release/Medical";
import AdmReleaseDialog from "../../../components/Dialogs/Release/Adm";
import moment from "moment";
import { Autocomplete } from "@material-ui/lab";
import { releaseReferral } from "../../../helpers/patient";
import RoomIcon from "@material-ui/icons/Room";

interface IPageParams {
  id?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexWrap: 'wrap',
    justifyContent: "space-evenly",
    paddingTop: "25px",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  itens: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: "25px",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  item_button: {
    height: "100px !important",
    width: "150px !important",
    maxHeight: "100px !important",
    display: "block",
  },
  item_box: {
    display: "flex",
    width: "115px",
    height: "105px",
  },
  item_svg: {
    height: "25px",
    width: "25px",
  },
  box: {
    display: "flex",
    width: "125px",
    height: "175px",
  },
  button: {
    height: "175px !important",
    width: "250px !important",
    maxHeight: "175px !important",
    display: "block",
  },
  svg: {
    height: "85px",
    width: "100px",
  },
}));

export default function PatientOverview(
  props: RouteComponentProps<IPageParams>
) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = props.match;
  const classes = useStyles();
  const careState = useSelector((state: ApplicationState) => state.cares);

  const [medicalReleaseModal, setMedicalReleaseModal] = useState(false);
  const [revertMedicalReleaseModal, setRevertMedicalReleaseModal] =
    useState(false);
  const [admReleaseModal, setAdmReleaseModal] = useState(false);
  const [revertAdmReleaseModal, setRevertAdmReleaseModal] = useState(false);

  const [prescriptionModal, setPrescriptionModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
    }
  }, [dispatch]);

  const handleOpenRowMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const renderPatientStatus = useCallback((status: string) => {
    switch (status) {
      case "Não Elegível":
        return <CloseIcon style={{ color: "#FF6565", cursor: "pointer" }} />;
      case "Elegível":
        return <CheckIcon style={{ color: "#4FC66A", cursor: "pointer" }} />;
      default:
        return <CheckIcon style={{ color: "#EBEBEB" }} />;
    }
  }, []);

  const getLastDocument = useCallback(() => {
    const { documents_id: documents } = careState.data;

    return documents ? documents[documents.length - 1]?.created_at : "";
  }, [careState]);

  const getPatientPhone = useCallback(() => {
    const { patient_id: patient } = careState.data;

    const number = patient?.phones[0].number;

    return number;
  }, [careState]);

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const [careModalOpen, setCareModalOpen] = useState(false);

  const rows = [];
  careState?.data?.patient_id?.fiscal_number &&
    rows.push({
      name: "CPF",
      value: careState?.data?.patient_id?.fiscal_number,
    });
  careState?.data?.patient_id?.name &&
    rows.push({ name: "Nome", value: careState?.data?.patient_id?.name });
  careState?.data?.tipo &&
    rows.push({ name: "Tipo de Atendimento", value: careState?.data?.tipo });
  careState?.data?._id &&
    rows.push({ name: "Número do Atendimento", value: careState?.data?._id });
  careState?.data?.cid_id &&
    rows.push({ name: "CID", value: careState?.data?.cid_id });
  careState?.data?.health_insurance_id &&
    rows.push({
      name: "Convênio",
      value: careState?.data?.health_insurance_id,
    });
  careState?.data?.health_plan_id &&
    rows.push({ name: "Plano", value: careState?.data?.health_plan_id });
  careState?.data?.health_sub_plan_id &&
    rows.push({ name: "Subplano", value: careState?.data?.health_sub_plan_id });
  careState?.data?.capture?.assistant_doctor &&
    rows.push({
      name: "Médico Assistente",
      value: careState?.data?.capture?.assistant_doctor,
    });
  careState?.data?.capture?.unity &&
    rows.push({ name: "Unidade", value: careState?.data?.capture?.unity });
  careState?.data?.capture?.sector &&
    rows.push({ name: "Setor", value: careState?.data?.capture?.sector });
  careState?.data?.capture?.type &&
    rows.push({ name: "Acomodação", value: careState?.data?.capture?.type });
  careState?.data?.capture?.bed &&
    rows.push({ name: "Leito", value: careState?.data?.capture?.bed });
  careState?.data?.created_at &&
    rows.push({
      name: "Data de Atendimento",
      value: formatDate(careState?.data?.created_at, "DD/MM/YYYY HH:mm"),
    });
  careState?.data?.mot_alta &&
    rows.push({ name: "Motivo de Alta", value: careState?.data?.mot_alta });
  careState?.data?.health_plan_card_number &&
    rows.push({
      name: "Número da carteira",
      value: careState?.data?.health_plan_card_number,
    });
  careState?.data?.health_plan_card_validate &&
    rows.push({
      name: "Data de validade",
      value: formatDate(
        careState?.data?.health_plan_card_validate,
        "DD/MM/YYYY"
      ),
    });
  careState?.data?.speciality &&
    rows.push({
      name: "Especialidade do Atendimento",
      value: careState?.data?.speciality,
    });
  careState?.data?.dt_alta &&
    rows.push({
      name: "Data de Alta",
      value: formatDate(careState?.data?.dt_alta, "DD/MM/YYYY HH:mm"),
    });

  const content = {
    tittle: "HeaderOverview",
    // icon: <InfoRoundedIcon style={{color: "#ffffff"}}/>,
    rows: rows,
  };

  const cards = [
    "Prescrições",
    "Aferições",
    "Alergias",
    "Antibióticos",
    "Evolução",
    "Exames/Atestados",
    "Relatórios",
  ];

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading />}
        <Container style={{ padding: "20px", maxWidth: "1000px" }}>
          <FormTitle>Overview de Paciente</FormTitle>
          <Container style={{ backgroundColor: "#f5f5f5" }}>
            {/*{integration ? (*/}
            {true ? (
              <>
                {/* <Header content={content} /> */}
                <ScrollCard
                  tittle="Relatório de Prontuário"
                  iconName="ChartIcon"
                  cards={cards}
                />

                <Grid
                  container
                  xs={12}
                  style={{ justifyContent: "space-evenly" }}
                >
                  <Grid
                    container
                    xs={12}
                    md={7}
                    lg={8}
                    spacing={2}
                    style={{ marginTop: "2%", minWidth: "480px" }}
                  >
                    {/* Dados pessoais */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img src={IconDadosPessoais} alt="Dados pessoais" />
                          <h5>Dados pessoais</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                          >
                            {/*<h5>Ver Mais</h5>*/}
                          </Button>
                        </Box>

                        <List
                          className="text-list"
                          component="ul"
                          aria-label="mailbox folders"
                        >
                          {careState?.data?.patient_id?.name && (
                            <ListItem>
                              <p>Nome: {careState.data.patient_id.name}</p>
                            </ListItem>
                          )}
                          {careState?.data?.patient_id?._id && (
                            <ListItem style={{ fontWeight: "bold" }}>
                              <p>
                                Código do Paciente:{" "}
                                {careState.data.patient_id._id}
                              </p>
                            </ListItem>
                          )}
                          {careState?.data?.patient_id?.birthdate && (
                            <ListItem>
                              <p>
                                Data de Nascimento:{" "}
                                {formatDate(
                                  careState.data.patient_id.birthdate,
                                  "DD/MM/YYYY"
                                )}
                              </p>
                            </ListItem>
                          )}
                          {careState?.data?.patient_id?.birthdate && (
                            <ListItem>
                              <p>
                                Idade:{" "}
                                {age(careState.data.patient_id.birthdate)}
                              </p>
                            </ListItem>
                          )}
                          {careState?.data?.patient_id?.fiscal_number && (
                            <ListItem>
                              <p>
                                CPF: {careState.data.patient_id.fiscal_number}
                              </p>
                            </ListItem>
                          )}
                          {careState?.data?.patient_id?.patient_gender && (
                            <ListItem>
                              <p>
                                Sexo: {careState.data.patient_id.patient_gender}
                              </p>
                            </ListItem>
                          )}
                          {careState?.data?.patient_id?.name && (
                            <ListItem>
                              <p>
                                Nome da Mãe: {careState.data.patient_id.name}
                              </p>
                            </ListItem>
                          )}
                          {/*<ListItem>*/}
                          {/*  <p>CPF: {mask(careState.data.patient_id?.fiscal_number, '###.###.###-##')}</p>*/}
                          {/*</ListItem>*/}
                        </List>

                        <footer>
                          <Typography variant="caption" color="textSecondary">
                            <Button
                              className="btn-dropwdown"
                              aria-controls={`menu-prontuario`}
                              id={`btn_menu-prontuario`}
                              aria-haspopup="true"
                              onClick={() =>
                                history.push(
                                  `/patient/${careState?.data?.patient_id?._id}/view/care/${careState?.data?._id}`
                                )
                              }
                            >
                              <h5>Ver Mais</h5>
                            </Button>
                          </Typography>
                        </footer>
                      </Card>
                    </Grid>
                    {/* Atendimento */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img
                            src={IconPlanoInternacoes}
                            alt="Plano Internações"
                          />
                          <h5>Atendimento</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                          >
                            {/*<MoreVert/>*/}
                          </Button>
                        </Box>

                        <List
                          className="text-list"
                          component="ul"
                          aria-label="mailbox folders"
                        >
                          {/*<ListItem>*/}
                          {/*  <p>Hospital: {careState.data.capture?.hospital}</p>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                          {/*  <p>Unidade: {careState.data.capture?.unity}</p>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                          {/*  <p>Setor: {careState.data.capture?.sector}</p>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                          {/*  <p>Leito: {careState.data.capture?.bed}</p>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                          {/*  <p>Convênio: {careState.data.health_insurance_id?.name}</p>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                          {/*  <p>Plano: {careState.data.health_plan_id?.name}</p>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                          {/*  <p>Sub Plano: {careState.data.health_sub_plan_id?.name}</p>*/}
                          {/*</ListItem>*/}
                          {careState?.data?.tipo && (
                            <ListItem>
                              <p>Tipo de Atendimento: {careState.data.tipo}</p>
                            </ListItem>
                          )}
                          {careState?.data?._id && (
                            <ListItem style={{ fontWeight: "bold" }}>
                              <p>Número do Atendimento: {careState.data._id}</p>
                            </ListItem>
                          )}
                          {careState?.data?.health_insurance_id && (
                            <ListItem>
                              <p>
                                Convênio:{" "}
                                {typeof careState.data.health_insurance_id ===
                                "string"
                                  ? careState.data.health_insurance_id
                                  : careState.data.health_insurance_id.name}
                              </p>
                            </ListItem>
                          )}
                          {/*{careState?.data?.health_plan_id && (*/}
                          {/*  <ListItem>*/}
                          {/*    <p>Plano: {careState.data.health_plan_id}</p>*/}
                          {/*  </ListItem>*/}
                          {/*)}*/}
                          {/*{careState?.data?.health_sub_plan_id && (*/}
                          {/*  <ListItem>*/}
                          {/*    <p>Subplano: {careState.data.health_sub_plan_id}</p>*/}
                          {/*  </ListItem>*/}
                          {/*)}*/}
                          {careState?.data?.capture?.assistant_doctor && (
                            <ListItem>
                              <p>
                                Médico Assistente:{" "}
                                {careState.data.capture.assistant_doctor}
                              </p>
                            </ListItem>
                          )}
                          {careState?.data?.capture?.unity && (
                            <ListItem>
                              <p>Unidade: {careState.data.capture.unity}</p>
                            </ListItem>
                          )}
                          {careState?.data?.capture?.sector && (
                            <ListItem>
                              <p>Setor: {careState.data.capture.sector}</p>
                            </ListItem>
                          )}
                          {careState?.data?.capture?.type && (
                            <ListItem>
                              <p>Acomodação: {careState.data.capture.type}</p>
                            </ListItem>
                          )}
                          {careState?.data?.capture?.bed && (
                            <ListItem>
                              <p>Leito: {careState.data.capture.bed}</p>
                            </ListItem>
                          )}
                        </List>

                        <footer>
                          <Typography variant="caption" color="textSecondary">
                            <Button
                              className="btn-dropwdown"
                              aria-controls={`menu-prontuario`}
                              id={`btn_menu-prontuario`}
                              aria-haspopup="true"
                              onClick={() => setCareModalOpen(true)}
                            >
                              <h5>Ver Mais</h5>
                            </Button>
                          </Typography>
                        </footer>
                      </Card>
                    </Grid>
                    {/* Equipe Multidisciplinar */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img src={IconMultidisciplinar} alt="Equipe médica" />
                          <h5>Equipe multidisciplinar</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                          >
                            {/*<MoreVert/>*/}
                          </Button>
                        </Box>

                        {/*<List className="text-list" component="ul" aria-label="mailbox folders">*/}
                        {/*  <ListItem>*/}
                        {/*    <CheckIcon style={{color: '#4FC66A'}}/>*/}
                        {/*    <p>texto</p>*/}
                        {/*  </ListItem>*/}
                        {/*  <ListItem>*/}
                        {/*    <CloseIcon style={{color: '#FF6565'}}/>*/}
                        {/*    <p>texto</p>*/}
                        {/*  </ListItem>*/}
                        {/*  <ListItem>*/}
                        {/*    <AddIcon style={{color: '#0899BA'}}/>*/}
                        {/*    <p>texto</p>*/}
                        {/*  </ListItem>*/}
                        {/*  <ListItem>*/}

                        {/*  </ListItem>*/}
                        {/*</List>*/}

                        {/*<footer>*/}
                        {/*  <Typography variant="caption" color="textSecondary">*/}
                        {/*    Última avaliação*/}
                        {/*    /!* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} *!/*/}
                        {/*  </Typography>*/}
                        {/*</footer>*/}
                      </Card>
                    </Grid>
                    {/* Antibióticos */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img src={IconUltimosProced} alt="Antibióticos" />
                          <h5>Acessos</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                          >
                            {/*<MoreVert/>*/}
                          </Button>
                        </Box>

                        <div className={classes.root}>
                          <Paper elevation={4} className={classes.box}>
                            <Button className={classes.button}>
                              <RoomIcon
                                style={{ color: "var(--primary)" }}
                                className={classes.svg}
                              />
                              <p>Check-In/Out</p>
                            </Button>
                          </Paper>
                          <Paper elevation={4} className={classes.box}>
                            <Button className={classes.button}>
                              <QRCode
                                value={JSON.stringify("careState.data._id")}
                                size={96}
                              />
                              <p>QR Code</p>
                            </Button>
                          </Paper>
                        </div>

                        {/*<List className="text-list" component="ul" aria-label="mailbox folders">*/}
                        {/*  <ListItem>*/}
                        {/*    <CheckIcon style={{color: '#4FC66A'}}/>*/}
                        {/*    <p>texto</p>*/}
                        {/*  </ListItem>*/}
                        {/*  <ListItem>*/}
                        {/*    <CloseIcon style={{color: '#FF6565'}}/>*/}
                        {/*    <p>texto</p>*/}
                        {/*  </ListItem>*/}
                        {/*  <ListItem>*/}
                        {/*    <AddIcon style={{color: '#0899BA'}}/>*/}
                        {/*    <p>texto</p>*/}
                        {/*  </ListItem>*/}
                        {/*  <ListItem>*/}

                        {/*  </ListItem>*/}
                        {/*</List>*/}

                        {/*<footer>*/}
                        {/*  <Typography variant="caption" color="textSecondary">*/}
                        {/*    Última avaliação*/}
                        {/*    /!* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} *!/*/}
                        {/*  </Typography>*/}
                        {/*</footer>*/}
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    xs={12}
                    md={5}
                    lg={4}
                    spacing={2}
                    style={{ marginTop: "2%", minWidth: "280px" }}
                  >
                    {/* Agenda */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Card className="card-styles">
                        <ButtonComponent
                          onClick={() =>
                            history.push(`/care/${params.id}/overview/schedule`)
                          }
                          background="primary"
                          fullWidth
                        >
                          <TodayRoundedIcon />
                          <p>Agenda</p>
                        </ButtonComponent>
                        <Card
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <p style={{ paddingTop: "1.6rem" }}>
                            {/*<SuccessImage style={{height: '258px'}}/>*/}
                            <img
                              src={IconAgenda}
                              style={{
                                height: "auto",
                                width: "100%",
                                marginTop: "-25px",
                              }}
                            />
                          </p>
                        </Card>
                      </Card>
                    </Grid>
                    {/* QR Code */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <IconHome />
                          <h5>Próximos Eventos</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                          >
                            {/*<MoreVert/>*/}
                          </Button>
                        </Box>
                        <List
                          className="text-list"
                          component="ul"
                          aria-label="mailbox folders"
                        >
                          <ListItem>
                            <p>13/11/2020 - 7h às 19h15 - Cuidador 1</p>
                          </ListItem>
                          <ListItem>
                            <p>20/11/2020 - 19h às 8h30 - Cuidador 2</p>
                          </ListItem>
                          <ListItem>
                            <p>27/11/2020 - 14h às 15h - Médico 1</p>
                          </ListItem>
                          <ListItem>
                            <p>02/12/2020 - 17h às 18h20 - Fisioterapia</p>
                          </ListItem>
                        </List>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  xs={12}
                  spacing={2}
                  style={{ justifyContent: "space-evenly" }}
                >
                  {/* Ultimos procedimentos */}
                  <Grid item md={12} xs={12} style={{ marginTop: "20px" }}>
                    <Card className="card-styles">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        padding={2}
                      >
                        <img src={IconProntuario} alt="Procedimentos" />
                        <h5>Prontuario</h5>
                        <Button
                          className="btn-dropwdown"
                          aria-controls={`menu-prontuario`}
                          id={`btn_menu-prontuario`}
                          aria-haspopup="true"
                        >
                          {/*<MoreVert/>*/}
                        </Button>
                      </Box>

                      <Grid container>
                        <Grid item md={12} xs={12} style={{}}>
                          <div className={classes.itens}>
                            <Paper elevation={4} className={classes.item_box}>
                              <Button
                                className={classes.item_button}
                                onClick={() => setPrescriptionModal(true)}
                              >
                                <IconPrescription
                                  style={{ color: "var(--primary)" }}
                                />
                                <h5>Prescrição</h5>
                              </Button>
                            </Paper>
                            <Paper elevation={4} className={classes.item_box}>
                              <Button className={classes.item_button}>
                                <IconAlergic
                                  style={{ color: "var(--primary)" }}
                                />
                                <h5>Alergia</h5>
                              </Button>
                            </Paper>
                            <Paper elevation={4} className={classes.item_box}>
                              <Button className={classes.item_button}>
                                <IconMeasurement
                                  style={{ color: "var(--primary)" }}
                                />
                                <h5>Aferição</h5>
                              </Button>
                            </Paper>
                            <Paper elevation={4} className={classes.item_box}>
                              <Button className={classes.item_button}>
                                <IconEvolution
                                  style={{ color: "var(--primary)" }}
                                />
                                <h5>Evolução</h5>
                              </Button>
                            </Paper>
                            <Paper elevation={4} className={classes.item_box}>
                              <Button className={classes.item_button}>
                                <IconAntibiotics
                                  style={{ color: "var(--primary)" }}
                                />
                                <h5>Antibióticos</h5>
                              </Button>
                            </Paper>
                            <Paper elevation={4} className={classes.item_box}>
                              <Button className={classes.item_button}>
                                <IconHistory
                                  style={{ color: "var(--primary)" }}
                                />
                                <h5>Relatórios</h5>
                              </Button>
                            </Paper>
                          </div>
                        </Grid>
                      </Grid>

                      {/*<footer>*/}
                      {/*  <Typography variant="caption" color="textSecondary">*/}
                      {/*    Placeholder*/}
                      {/*  </Typography>*/}
                      {/*</footer>*/}
                    </Card>
                  </Grid>

                  {/* Alta */}
                  {/*<Grid item md={4} xs={4} style={{marginTop: '20px'}}>*/}
                  {/*  <Card className="card-styles">*/}
                  {/*    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>*/}
                  {/*      <img src={IconProntuario} alt="Procedimentos"/>*/}
                  {/*      <h5>Alta</h5>*/}
                  {/*      <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}*/}
                  {/*              aria-haspopup="true">*/}
                  {/*        /!*<MoreVert/>*!/*/}
                  {/*      </Button>*/}
                  {/*    </Box>*/}

                  {/*    <Grid container spacing={2}>*/}
                  {/*      <Grid item md={11} xs={12} style={{paddingLeft: '6%'}}>*/}
                  {/*        {careState.data.medical_release ? (*/}
                  {/*          <>*/}
                  {/*            <List className="text-list" component="ul" aria-label="mailbox folders">*/}
                  {/*              {careState?.data?.medical_release?.release_at && (*/}
                  {/*                <ListItem>*/}
                  {/*                  <p>Data da*/}
                  {/*                    Alta: {formatDate(careState.data.medical_release.release_at, 'YYYY-MM-DD HH:mm')}</p>*/}
                  {/*                </ListItem>*/}
                  {/*              )}*/}
                  {/*              {careState?.data?.medical_release?.release_reason && (*/}
                  {/*                <ListItem>*/}
                  {/*                  <p>Motivo: {careState.data.medical_release.release_reason.name}</p>*/}
                  {/*                </ListItem>*/}
                  {/*              )}*/}
                  {/*              {careState?.data?.medical_release?.release_responsible && (*/}
                  {/*                <ListItem>*/}
                  {/*                  <p>Responsável: {careState.data.medical_release.release_responsible.name}</p>*/}
                  {/*                </ListItem>*/}
                  {/*              )}*/}
                  {/*            </List>*/}

                  {/*            <ButtonComponent onClick={() => setRevertMedicalReleaseModal(true)}*/}
                  {/*                             background="primary" style={{background: 'var(--alert)'}}*/}
                  {/*                             disabled={careState.data.adm_release_status} fullWidth>*/}
                  {/*              <p>Desfazer Alta Médica</p>*/}
                  {/*            </ButtonComponent>*/}

                  {/*          </>*/}
                  {/*        ) : (*/}
                  {/*          <>*/}
                  {/*            <ButtonComponent onClick={() => setMedicalReleaseModal(true)}*/}
                  {/*                             background="primary" fullWidth>*/}
                  {/*              <p>Alta Médica</p>*/}
                  {/*            </ButtonComponent>*/}
                  {/*          </>*/}
                  {/*        )}*/}

                  {/*      </Grid>*/}
                  {/*      <Grid item md={11} xs={12} style={{paddingLeft: '6%'}}>*/}
                  {/*        {careState.data.adm_release ? (*/}
                  {/*          <>*/}
                  {/*            <List className="text-list" component="ul" aria-label="mailbox folders">*/}
                  {/*              {careState?.data?.adm_release?.release_at && (*/}
                  {/*                <ListItem>*/}
                  {/*                  <p>Data da*/}
                  {/*                    Alta: {formatDate(careState.data.adm_release.release_at, 'YYYY-MM-DD HH:mm')}</p>*/}
                  {/*                </ListItem>*/}
                  {/*              )}*/}
                  {/*              {careState?.data?.adm_release?.release_reason && (*/}
                  {/*                <ListItem>*/}
                  {/*                  <p>Motivo: {careState.data.adm_release.release_reason.name}</p>*/}
                  {/*                </ListItem>*/}
                  {/*              )}*/}
                  {/*              {careState?.data?.adm_release?.release_responsible && (*/}
                  {/*                <ListItem>*/}
                  {/*                  <p>Responsável: {careState.data.adm_release.release_responsible.name}</p>*/}
                  {/*                </ListItem>*/}
                  {/*              )}*/}
                  {/*            </List>*/}
                  {/*            <ButtonComponent onClick={() => setRevertAdmReleaseModal(true)}*/}
                  {/*                             background="primary" style={{background: 'var(--alert)'}} fullWidth>*/}
                  {/*              <p>Desfazer Alta Administrativa</p>*/}
                  {/*            </ButtonComponent>*/}
                  {/*          </>*/}
                  {/*        ) : (*/}
                  {/*          <ButtonComponent onClick={() => setAdmReleaseModal(true)}*/}
                  {/*                           background="primary" disabled={careState.data.medical_release ? false : true}*/}
                  {/*                           fullWidth>*/}
                  {/*            <p>Alta Administrativa</p>*/}
                  {/*          </ButtonComponent>*/}
                  {/*        )}*/}
                  {/*      </Grid>*/}
                  {/*    </Grid>*/}

                  {/*    /!*<footer>*!/*/}
                  {/*    /!*  <Typography variant="caption" color="textSecondary">*!/*/}
                  {/*    /!*    Placeholder*!/*/}
                  {/*    /!*  </Typography>*!/*/}
                  {/*    /!*</footer>*!/*/}
                  {/*  </Card>*/}
                  {/*</Grid>*/}
                </Grid>

                <MedicalReleaseDialog
                  modalOpen={medicalReleaseModal}
                  setModalOpen={setMedicalReleaseModal}
                />

                <AdmReleaseDialog
                  modalOpen={admReleaseModal}
                  setModalOpen={setAdmReleaseModal}
                />

                {/* {Histórico} */}
                <Dialog
                  maxWidth="lg"
                  open={careModalOpen}
                  onClose={() => setCareModalOpen(false)}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">
                    <h3>Atendimento</h3>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="scroll-dialog-description"
                      tabIndex={-1}
                    >
                      <Grid
                        container
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <ViewCard content={content} md={12} />
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setCareModalOpen(false)}
                      color="primary"
                    >
                      <h3 style={{ color: "#0899BA", fontSize: "11pt" }}>
                        Fechar
                      </h3>
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <>
                <Card>
                  <Box
                    mb={2}
                    mt={2}
                    paddingLeft={5}
                    paddingRight={5}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Profile>
                      <img src={IconProfile} alt="Profile" />
                      <div>
                        <h5>{careState.data.patient_id?.name}</h5>
                        <p>
                          {careState.data.patient_id?.birthdate
                            ? age(careState.data.patient_id?.birthdate)
                            : ""}
                        </p>
                      </div>
                    </Profile>
                    <div>
                      <ButtonComponent background="success">
                        <QueueIcon />
                        <p>Protuário do paciente</p>
                      </ButtonComponent>
                    </div>
                  </Box>
                </Card>

                <Grid container xs={12}>
                  <Grid container md={8} xs={12} style={{ marginTop: "2%" }}>
                    {/* Avalicao paciente */}
                    <Grid item md={6} xs={12} style={{ paddingRight: "10px" }}>
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img src={IconProntuario} alt="Procedimentos" />
                          <h5>Avaliação do paciente</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                            onClick={handleOpenRowMenu}
                          >
                            <MoreVert />
                          </Button>
                          <Menu
                            id={`menu-prontuario`}
                            anchorEl={anchorEl}
                            keepMounted
                            open={anchorEl?.id === `btn_menu-prontuario`}
                            onClose={handleCloseRowMenu}
                          >
                            <MenuItem onClick={() => {}}>Visualizar</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => {}}>Editar</MenuItem>
                          </Menu>
                        </Box>

                        <List
                          className="text-list"
                          component="ul"
                          aria-label="mailbox folders"
                        >
                          {careState.data.documents_id?.map((document) => (
                            <ListItem>
                              {renderPatientStatus(document.status)}
                              <p>
                                {document.document_group_id.name} :{" "}
                                {document.complexity}
                              </p>
                            </ListItem>
                          ))}
                        </List>

                        <Box
                          display="flex"
                          justifyContent="center"
                          paddingTop={2}
                          paddingBottom={1}
                        >
                          <Button background="primary" onClick={() => {}}>
                            Adicionar manutenção
                          </Button>
                        </Box>

                        <footer>
                          <Typography variant="caption" color="textSecondary">
                            Última avaliação:
                            {formatDate(
                              getLastDocument(),
                              " DD/MM/YYYY [às] HH:mm"
                            )}
                          </Typography>
                        </footer>
                      </Card>
                    </Grid>

                    {/* Dados pessoais */}
                    <Grid item md={6} xs={12} style={{ paddingRight: "10px" }}>
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img src={IconDadosPessoais} alt="Dados pessoais" />
                          <h5>Dados pessoais</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                            onClick={handleOpenRowMenu}
                          >
                            <MoreVert />
                          </Button>
                          <Menu
                            id={`menu-prontuario`}
                            anchorEl={anchorEl}
                            keepMounted
                            open={anchorEl?.id === `btn_menu-prontuario`}
                            onClose={handleCloseRowMenu}
                          >
                            <MenuItem onClick={() => {}}>Visualizar</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => {}}>Editar</MenuItem>
                          </Menu>
                        </Box>

                        <List
                          className="text-list"
                          component="ul"
                          aria-label="mailbox folders"
                        >
                          <ListItem>
                            <p>
                              CPF:{" "}
                              {mask(
                                careState.data.patient_id?.fiscal_number,
                                "###.###.###-##"
                              )}
                            </p>
                          </ListItem>
                          <ListItem>
                            <p>
                              RG:{" "}
                              {mask(
                                careState.data.patient_id?.national_id,
                                "#.###.###"
                              )}{" "}
                              {careState.data.patient_id?.issuing_organ
                                .toString()
                                .toUpperCase()}
                            </p>
                          </ListItem>
                          <ListItem>
                            <p>
                              DN:{" "}
                              {formatDate(
                                careState.data.patient_id?.birthdate,
                                " DD/MM/YYYY"
                              )}
                            </p>
                          </ListItem>
                          <ListItem>
                            <p>Mãe: {careState.data.patient_id?.mother_name}</p>
                          </ListItem>
                          <ListItem>
                            <p>
                              Tipo Sanguíneo:{" "}
                              {careState.data.patient_id?.blood_type}
                            </p>
                          </ListItem>
                          <ListItem>
                            <p>
                              Doador de órgãos:{" "}
                              {careState.data.patient_id?.organ_donor
                                ? "Sim"
                                : "Não"}
                            </p>
                          </ListItem>
                          <ListItem>
                            <p>Sexo: {careState.data.patient_id?.gender}</p>
                          </ListItem>
                          <ListItem>
                            <p>
                              Telefone:{" "}
                              {mask(getPatientPhone(), "(##) #####-####")}
                            </p>
                          </ListItem>
                        </List>

                        <footer>
                          <Typography variant="caption" color="textSecondary">
                            Última avaliação:
                            {formatDate(
                              careState.data.patient_id?.created_at,
                              " DD/MM/YYYY [às] HH:mm"
                            )}
                            {/* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} */}
                          </Typography>
                        </footer>
                      </Card>
                    </Grid>

                    {/* Equipe Multidisciplinar */}
                    <Grid
                      item
                      md={6}
                      xs={12}
                      style={{ paddingRight: "10px", marginTop: "20px" }}
                    >
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img src={IconMultidisciplinar} alt="Equipe médica" />
                          <h5>Equipe multidisciplinar</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                            onClick={handleOpenRowMenu}
                          >
                            <MoreVert />
                          </Button>
                          <Menu
                            id={`menu-prontuario`}
                            anchorEl={anchorEl}
                            keepMounted
                            open={anchorEl?.id === `btn_menu-prontuario`}
                            onClose={handleCloseRowMenu}
                          >
                            <MenuItem onClick={() => {}}>Visualizar</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => {}}>Editar</MenuItem>
                          </Menu>
                        </Box>

                        <List
                          className="text-list"
                          component="ul"
                          aria-label="mailbox folders"
                        >
                          <ListItem>
                            <CheckIcon style={{ color: "#4FC66A" }} />
                            <p>texto</p>
                          </ListItem>
                          <ListItem>
                            <CloseIcon style={{ color: "#FF6565" }} />
                            <p>texto</p>
                          </ListItem>
                          <ListItem>
                            <AddIcon style={{ color: "#0899BA" }} />
                            <p>texto</p>
                          </ListItem>
                          <ListItem></ListItem>
                        </List>

                        <footer>
                          <Typography variant="caption" color="textSecondary">
                            Última avaliação: 08/11/2020, às 14h25
                            {/* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} */}
                          </Typography>
                        </footer>
                      </Card>
                    </Grid>

                    {/* Plano de internacao */}
                    <Grid
                      item
                      md={6}
                      xs={12}
                      style={{ paddingRight: "10px", marginTop: "20px" }}
                    >
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img
                            src={IconPlanoInternacoes}
                            alt="Plano Internações"
                          />
                          <h5>Plano e internação</h5>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                            onClick={handleOpenRowMenu}
                          >
                            <MoreVert />
                          </Button>
                          <Menu
                            id={`menu-prontuario`}
                            anchorEl={anchorEl}
                            keepMounted
                            open={anchorEl?.id === `btn_menu-prontuario`}
                            onClose={handleCloseRowMenu}
                          >
                            <MenuItem onClick={() => {}}>Visualizar</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => {}}>Editar</MenuItem>
                          </Menu>
                        </Box>

                        <List
                          className="text-list"
                          component="ul"
                          aria-label="mailbox folders"
                        >
                          <ListItem>
                            <p>Hospital: {careState.data.capture?.hospital}</p>
                          </ListItem>
                          <ListItem>
                            <p>Unidade: {careState.data.capture?.unity}</p>
                          </ListItem>
                          <ListItem>
                            <p>Setor: {careState.data.capture?.sector}</p>
                          </ListItem>
                          <ListItem>
                            <p>Leito: {careState.data.capture?.bed}</p>
                          </ListItem>
                          <ListItem>
                            <p>
                              Convênio:{" "}
                              {careState.data.health_insurance_id?.name}
                            </p>
                          </ListItem>
                          <ListItem>
                            <p>Plano: {careState.data.health_plan_id?.name}</p>
                          </ListItem>
                          <ListItem>
                            <p>
                              Sub Plano:{" "}
                              {careState.data.health_sub_plan_id?.name}
                            </p>
                          </ListItem>
                        </List>

                        <footer>
                          <Typography variant="caption" color="textSecondary">
                            Última avaliação:
                            {formatDate(
                              careState.data.updated_at,
                              "DD/MM/YYYY [às] HH:mm"
                            )}
                          </Typography>
                        </footer>
                      </Card>
                    </Grid>

                    {/* Ultimos procedimentos */}
                    <Grid
                      item
                      md={12}
                      xs={12}
                      style={{
                        paddingRight: "10px",
                        marginTop: "20px",
                        marginBottom: "10%",
                      }}
                    >
                      <Card className="card-styles">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          padding={2}
                        >
                          <img
                            src={IconUltimosProced}
                            style={{ marginLeft: "2%" }}
                            alt="Dados pessoais"
                          />
                          <div className="card-styles-footer">
                            <h5>Últimos procedimentos</h5>
                            <Typography
                              variant="caption"
                              component="p"
                              color="textSecondary"
                            >
                              Check in na Rua Conde da Boa Vista, 705 - Boa
                              Vista
                            </Typography>
                            <Typography
                              variant="caption"
                              component="p"
                              color="textSecondary"
                            >
                              Atualizado em 12/11/2020, às 19h04
                            </Typography>
                          </div>
                          <Button
                            className="btn-dropwdown"
                            aria-controls={`menu-prontuario`}
                            id={`btn_menu-prontuario`}
                            aria-haspopup="true"
                            onClick={handleOpenRowMenu}
                          >
                            <MoreVert />
                          </Button>
                          <Menu
                            id={`menu-prontuario`}
                            anchorEl={anchorEl}
                            keepMounted
                            open={anchorEl?.id === `btn_menu-prontuario`}
                            onClose={handleCloseRowMenu}
                          >
                            <MenuItem onClick={() => {}}>Visualizar</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => {}}>Editar</MenuItem>
                          </Menu>
                        </Box>

                        <Grid container>
                          <Grid
                            item
                            md={4}
                            xs={12}
                            style={{ paddingLeft: "6%" }}
                          >
                            <Box display="flex" mt={4}>
                              <img src={IconCurativos} alt="Curativo" />
                              <p>Curativo A</p>
                            </Box>
                            <Box display="flex" mt={4}>
                              <img src={IconMedicacao} alt="Medicação" />
                              <p>Medicação A</p>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            md={4}
                            xs={12}
                            style={{ paddingLeft: "6%" }}
                          >
                            <Box display="flex" mt={4}>
                              <img src={IconStatus} alt="Status" />
                              <p>Informação importante Y</p>
                            </Box>
                            <Box display="flex" mt={4}>
                              <img src={IconMedicacao} alt="Medicação" />
                              <p>Aplicação de soro C 5%</p>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            md={4}
                            xs={12}
                            style={{ paddingLeft: "6%" }}
                          >
                            <Box display="flex" mt={4}>
                              <img src={IconAfericao} alt="Aferição" />
                              <p>Aferição de pressão A</p>
                            </Box>
                            <Box display="flex" mt={4}>
                              <img src={IconCurativos} alt="Curativo" />
                              <p>Remoção de curativo B</p>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  </Grid>{" "}
                  {/* grid container */}
                  <Grid container md={4} xs={12} style={{ marginTop: "2%" }}>
                    {" "}
                    {/** Aside */}
                    <Grid item md={12}>
                      <ButtonComponent
                        onClick={() =>
                          history.push(`/care/${params.id}/overview/schedule`)
                        }
                        background="primary"
                        fullWidth
                      >
                        <TodayRoundedIcon />
                        <p>Agenda</p>
                      </ButtonComponent>
                      {careState.data._id && (
                        <Card
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <p style={{ paddingTop: "1.6rem" }}>
                            <QRCode
                              value={JSON.stringify(careState.data._id)}
                            />
                          </p>
                        </Card>
                      )}
                    </Grid>
                    <Grid item md={4}></Grid>
                  </Grid>
                </Grid>
              </>
            )}

            {/*PrescriptionModal*/}
            <Dialog
              open={revertMedicalReleaseModal}
              onClose={() => setRevertMedicalReleaseModal(false)}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              maxWidth="md"
            >
              <DialogTitle id="scroll-dialog-title">
                Deseja desfazer a alta médica?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                  texto de apoio.
                </DialogContentText>

                <div>
                  <Grid container></Grid>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setRevertMedicalReleaseModal(false)}
                  color="primary"
                >
                  Sair
                </Button>
                <Button
                  onClick={() => {
                    if (
                      careState.data?.medical_release?.release_reason?.type ===
                      "TRANSFERÊNCIA INTERNA"
                    ) {
                      dispatch(
                        deleteCareRequest(
                          careState?.data?.transferred_from
                            ? careState?.data?.transferred_from
                            : ""
                        )
                      );
                    }
                    careState.data.medical_release = null;
                    careState.data.medical_release_status = false;
                    dispatch(updateCareRequest(careState.data));
                    setRevertMedicalReleaseModal(false);
                    setMedicalReleaseModal(true);
                  }}
                  color="primary"
                >
                  Desfazer
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={prescriptionModal}
              onClose={() => setPrescriptionModal(false)}
              aria-labelledby="dialog-prescription"
              aria-describedby="dialog-prescription-description"
              maxWidth="md"
            >
              <DialogTitle id="dialog-prescription-title">Title</DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="dialog-prescription-description"
                  tabIndex={-1}
                >
                  texto de apoio.
                </DialogContentText>

                <div>
                  <Grid container></Grid>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setPrescriptionModal(false)}
                  color="primary"
                >
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>

            {/*MedicalRelease*/}
            <Dialog
              open={revertMedicalReleaseModal}
              onClose={() => setRevertMedicalReleaseModal(false)}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              maxWidth="md"
            >
              <DialogTitle id="scroll-dialog-title">
                Deseja desfazer a alta médica?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                  texto de apoio.
                </DialogContentText>

                <div>
                  <Grid container></Grid>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setRevertMedicalReleaseModal(false)}
                  color="primary"
                >
                  Sair
                </Button>
                <Button
                  onClick={() => {
                    if (
                      careState.data?.medical_release?.release_reason?.type ===
                      "TRANSFERÊNCIA INTERNA"
                    ) {
                      dispatch(
                        deleteCareRequest(
                          careState?.data?.transferred_from
                            ? careState?.data?.transferred_from
                            : ""
                        )
                      );
                    }
                    careState.data.medical_release = null;
                    careState.data.medical_release_status = false;
                    dispatch(updateCareRequest(careState.data));
                    setRevertMedicalReleaseModal(false);
                    setMedicalReleaseModal(true);
                  }}
                  color="primary"
                >
                  Desfazer
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={revertAdmReleaseModal}
              onClose={() => setRevertAdmReleaseModal(false)}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              maxWidth="md"
            >
              <DialogTitle id="scroll-dialog-title">
                Deseja desfazer a alta administrativa?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                  texto de apoio.
                </DialogContentText>

                <div>
                  <Grid container></Grid>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setRevertAdmReleaseModal(false)}
                  color="primary"
                >
                  Fechar
                </Button>
                <Button
                  onClick={() => {
                    careState.data.adm_release = null;
                    careState.data.adm_release_status = false;
                    careState.data.status = "Atendimento";
                    careState.data.death = false;
                    dispatch(updateCareRequest(careState.data));
                    setRevertAdmReleaseModal(false);
                  }}
                  color="primary"
                >
                  Salvar
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Container>
      </Sidebar>
    </>
  );
}
