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
import { loadPatientById } from "../../../store/ducks/patients/actions";

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
  const patientState = useSelector((state: ApplicationState) => state.patients);

  useEffect(() => {
    if (careState.data.patient_id) {
      dispatch(loadPatientById(careState.data.patient_id._id));
    }
  }, [careState?.data?.patient_id]);
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
  console.log(patientState, "patientstate");
  const rows = [];

  careState?.data?.patient_id?.name &&
    rows.push({ name: "Nome", value: careState?.data?.patient_id?.name });
  patientState?.data?.gender &&
    rows.push({
      name: "Gênero",
      value: patientState?.data?.gender,
    });
  patientState?.data?.marital_status &&
    rows.push({
      name: "Estado Civil ",
      value: patientState?.data?.marital_status,
    });
  careState?.data?.patient_id?.birthdate &&
    rows.push({
      name: "Data de nascimento",
      value: formatDate(careState.data.patient_id.birthdate, "DD/MM/YYYY"),
    });
  careState?.data?.patient_id?.mother_name &&
    rows.push({
      name: "Mãe",
      value: careState.data.patient_id.mother_name,
    });
  patientState?.data?.national_id &&
    rows.push({
      name: "RG",
      value: patientState?.data?.national_id,
    });

  careState?.data?.patient_id?.fiscal_number &&
    rows.push({
      name: "CPF",
      value: careState?.data?.patient_id?.fiscal_number,
    });
  patientState?.data?.phones &&
    patientState.data.phones.forEach((phone) => {
      if (phone.cellnumber) {
        rows.push({
          name: "Celular",
          value: phone.cellnumber,
        });
      }
      if (phone.number) {
        rows.push({
          name: "Telefone",
          value: phone.number,
        });
      }
    });
  careState?.data?.patient_id?.organ_donor &&
    rows.push({
      name: "Doador de órgãos",
      value: careState.data.patient_id.organ_donor,
    });

  careState?.data?.patient_id?.birthdate &&
    rows.push({
      name: "Idade",
      value: age(careState.data.patient_id.birthdate),
    });

  careState?.data?.patient_id?.blood_type &&
    rows.push({
      name: "Tipo sanguíneo",
      value: careState.data.patient_id.blood_type,
    });

  careState?.data?.patient_id?._id &&
    rows.push({
      name: "Código do paciente",
      value: careState.data.patient_id._id,
    });
  patientState?.data?.nationality &&
    rows.push({
      name: "Nacionalidade",
      value: patientState?.data?.nationality,
    });
  patientState?.data?.address_id?.postal_code &&
    rows.push({
      name: "CEP",
      value: patientState?.data?.address_id?.postal_code,
    });
  patientState?.data?.address_id?.street &&
    rows.push({ name: "Rua", value: patientState?.data?.address_id?.street });
  patientState?.data?.address_id?.number &&
    rows.push({
      name: "Número",
      value: patientState?.data?.address_id?.number,
    });

  patientState?.data?.address_id?.district &&
    rows.push({
      name: "Bairro",
      value: patientState?.data?.address_id?.district,
    });
  patientState?.data?.address_id?.city &&
    rows.push({ name: "Cidade", value: patientState?.data?.address_id?.city });
  patientState?.data?.address_id?.complement &&
    rows.push({
      name: "Complemento",
      value: patientState?.data?.address_id?.complement,
    });
  patientState?.data?.address_id?.state &&
    rows.push({ name: "UF", value: patientState?.data?.address_id?.state });

  careState?.data?.tipo &&
    rows.push({ name: "Tipo de Atendimento", value: careState?.data?.tipo });
  careState?.data?._id &&
    rows.push({ name: "Número do Atendimento", value: careState?.data?._id });
  careState?.data?.capture?.assistant_doctor &&
    rows.push({
      name: "Médico Assistente",
      value: careState?.data?.capture?.assistant_doctor,
    });
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
  const gridPropsPlan = {
    lg: 6,
    xl: 6,
    sx: 6,
    md: 6,
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
    <Sidebar>
      {careState.loading && <Loading />}
      <Container style={{ padding: "20px", maxWidth: "1100px" }}>
        <FormTitle>Overview de Paciente</FormTitle>
        <Container style={{ backgroundColor: "#f5f5f5" }}>
          {/*{integration ? (*/}
          {true ? (
            <>
              <Header content={content} />
              <ScrollCard
                tittle="Relatório de Prontuário"
                iconName="ChartIcon"
                cards={cards}
              />
              <Container
                style={{
                  padding: "0 40px 20px 40px",
                }}
              >
                <Grid
                  container
                  spacing={0}
                  style={{ justifyContent: "space-between", gap: "16px" }}
                >
                  <CardInfo
                    content={content}
                    tittleCard="Dados Pessoais"
                    alergicIs={true}
                    gridProps={gridPropsPlan}
                  />

                  <CardInfo
                    content={content}
                    tittleCard="Plano e Internação"
                    alergicIs={false}
                    gridProps={gridPropsPlan}
                  />
                </Grid>
              </Container>
            </>
          ) : (
            <></>
          )}
        </Container>
      </Container>
    </Sidebar>
  );
}
