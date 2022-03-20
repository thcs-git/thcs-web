import React, { useCallback, useEffect, useState } from "react";

// Router
import { Link, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core";
import {
  MoreVert,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@material-ui/icons";
// Components
import { FieldContent, FormTitle } from "../../../styles/components/Form";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header/Overview";
import ScrollCard from "../../../components/Card/ScrollCard";
import CardInfo from "../../../components/Card/Info";
import ButtonTabs from "../../../components/Button/ButtonTabs";
import AccordionReport from "../../../components/Accordion/Report";
import Loading from "../../../components/Loading";
import FilterReport from "../../../components/Dialogs/Filter/Report";

// Styles
import { ContainerStyle as Container } from "./styles";

// Helper
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import { age, formatDate } from "../../../helpers/date";

// Redux e Sagas
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCareRequest,
  loadCareById,
  updateCareRequest,
  loadScheduleRequest,
  loadEvolutionRequest,
  loadCheckinRequest,
} from "../../../store/ducks/cares/actions";
import { loadPatientById } from "../../../store/ducks/patients/actions";
import { loadRequest as loadRequestAllergies } from "../../../store/ducks/allergies/actions";
import {
  AllergiesInterface,
  AllergiesState,
} from "../../../store/ducks/allergies/types";
import { loadRequest as loadRequestMeasurements } from "../../../store/ducks/measurements/actions";
import { loadRequest as loadRequestQrCode } from "../../../store/ducks/qrCode/actions";
import { ApplicationState } from "../../../store";

interface IPageParams {
  id?: string;
}
interface IAllergiIntegration {
  allergie: {
    data: {
      allergy: [
        {
          active: number;
          created_at: string;
          created_by: string;
          description: string;
          id: number;
          name: string;
          severity: string;
          type: string;
        }
      ];
      event: [];
    };
    error: boolean;
    loading: boolean;
    success: boolean;
  };
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
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

  const history = useHistory();
  const dispatch = useDispatch();
  const { params } = props.match;
  const careState = useSelector((state: ApplicationState) => state.cares);
  const patientState = useSelector((state: ApplicationState) => state.patients);
  const allergiesState = useSelector(
    (state: ApplicationState) => state.allergies
  );
  const measurementState = useSelector(
    (state: ApplicationState) => state.measurements
  );
  const qrCodeState = useSelector((state: ApplicationState) => state.qrCode);
  const [team, setTeam] = useState<any[]>([]);
  const [reportActive, setReportActive] = useState(false);
  const [reportType, setReportType] = useState("");
  const [openFilterReport, setOpenFilterReport] = useState(false);

  useEffect(() => {
    if (careState.data.patient_id) {
      dispatch(loadPatientById(careState.data.patient_id._id));
    }
  }, [careState?.data?.patient_id, integration]);

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
      dispatch(loadRequestQrCode(params.id));

      // console.log(dispatch(loadRequestQrCode(params.id)), "TESTEEEEEE");
      dispatch(loadScheduleRequest({ attendance_id: params.id }));
    }
  }, [params.id]);

  useEffect(() => {
    handleTeam();
  }, [careState.schedule]);

  useEffect(() => {
    if (patientState.data._id) {
      dispatch(loadRequestAllergies(patientState.data._id));
    }
  }, [patientState.data._id, integration]);

  useEffect(() => {
    if (patientState?.data?._id && reportType === "Aferições") {
      dispatch(loadRequestMeasurements(patientState?.data?._id));
    }
    if (patientState.data._id && reportType === "Evolução") {
      dispatch(loadEvolutionRequest(careState?.data?._id));
    }
    if (careState?.data?._id && reportType === "Check-in/out") {
      dispatch(loadCheckinRequest(careState.data._id));
    }
  }, [careState.data._id, reportType]);

  const handleTeam = useCallback(() => {
    const teamUsers: any = [];

    try {
      careState.schedule?.forEach((item) => {
        if (teamUsers.length === 0) {
          teamUsers.push(item.user_id);
        } else {
          const founded = teamUsers.findIndex((user: any) => {
            if (typeof item.user_id === "object") {
              return user._id === item.user_id._id;
            }
          });

          if (founded < 0) {
            teamUsers.push(item.user_id);
          }
        }
      });
    } catch (error) {}

    setTeam(teamUsers);
  }, [careState.schedule]);

  const rows = [];
  (function handleDataRows() {
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
      rows.push({
        name: "Cidade",
        value: patientState?.data?.address_id?.city,
      });
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
      rows.push({
        name: "CID",
        value: integration
          ? careState?.data?.cid_id
          : careState?.data?.cid_id.name,
      });
    careState?.data?.health_insurance_id &&
      rows.push({
        name: "Convênio",
        value: integration
          ? { name: careState?.data?.health_insurance_id }
          : careState?.data?.health_insurance_id,
      });
    careState?.data?.health_plan_id &&
      rows.push({
        name: "Plano",
        value: integration
          ? { name: careState?.data?.health_plan_id }
          : careState?.data?.health_plan_id,
      });
    careState?.data?.health_sub_plan_id &&
      rows.push({
        name: "Subplano",
        value: integration
          ? { name: careState?.data?.health_sub_plan_id }
          : careState?.data?.health_sub_plan_id,
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
        value: integration
          ? { name: careState?.data?.speciality }
          : careState?.data?.speciality,
      });
    careState?.data?.dt_alta &&
      rows.push({
        name: "Data de Alta",
        value: formatDate(careState?.data?.dt_alta, "DD/MM/YYYY HH:mm"),
      });

    rows.push({
      name: "Equipe",
      value: team,
    });
  })();

  const content = {
    tittle: "HeaderOverview",
    rows: rows,
    qrCodeState: qrCodeState,
    careState: careState,
  };
  const gridPropsPlan = {
    lg: 6,
    xl: 6,
    sx: 6,
    md: 6,
  };
  const cards = [
    "Check-in/out",
    "Prescrições",
    "Aferições",
    "Alergias",
    "Antibióticos",
    "Evolução",
    "Exames",
    "Atestados",
  ];
  const personalCard = {
    card: "Dados Pessoais",
    info: ["Dados Pessoais"],
  };
  const planCard = {
    card: "Plano e Internação",
    info: ["Dados de atendimento", "Dados do Plano"],
  };
  const teamCard = {
    card: "Equipe Multidisciplinar",
    info: ["Equipe Multidisciplinar"],
  };

  function isAllergic(allergie: any) {
    let allergic = false;
    Object.keys(allergie).map((item: any) => {
      if (item === "data" && allergie[item]["allergy"]) {
        allergie[item]["allergy"].map((item: any) => {
          if (integration && item.active === 1) {
            allergic = true;
          } else if (!integration && item.active) {
            allergic = true;
          }
        });
      }
    });
    return allergic;
  }
  const contentAllergyExist = (allergie: any) => {
    let allergicExist = false;
    Object.keys(allergie).map((item: any) => {
      if (item === "data" && allergie[item]["allergy"]) {
        if (allergie[item]["allergy"].length > 0) allergicExist = true;
      } else if (item === "data" && allergie[item]["event"]) {
        if (allergie[item]["event"].length > 0) allergicExist = true;
      }
    });
    return allergicExist;
  };

  const buttons = [
    {
      name: "Voltar",
      onClick: () => {
        history.push("/care");
      },
      variant: "contained",
      background: "secondary",
      show: true,
    },
  ];

  function handleReport(nameReport: string) {
    if (nameReport === reportType || reportActive === false) {
      setReportActive(!reportActive);
    }
    setReportType(nameReport);
  }

  function handleContentReport(report: string): any {
    if (report === "Aferições" && measurementState.data.length > 0) {
      return {
        data: measurementState.data,
        loading: measurementState.loading,
        error: measurementState.error,
      };
    } else if (
      report === "Alergias" &&
      Object.keys(allergiesState.data).length > 0
    ) {
      contentAllergyExist(allergiesState);
      return contentAllergyExist(allergiesState)
        ? {
            data: allergiesState.data,
            loading: allergiesState.loading,
            error: allergiesState.error,
          }
        : "";
    } else if (report === "Evolução" && careState.evolution.length > 0) {
      return {
        data: careState.evolution,
        loading: false,
        error: false,
      };
    } else if (report === "Check-in/out" && careState.checkin.length > 0) {
      return {
        data: careState.checkin,
        loading: false,
        error: false,
      };
    } else {
      return "";
    }
  }

  function handleOpenFilter() {
    setOpenFilterReport(true);
  }
  function handleCloseFilter() {
    setOpenFilterReport(false);
  }

  return (
    <Sidebar>
      {careState.loading && <Loading />}
      <Container style={{ padding: "20px", maxWidth: "1100px" }}>
        <FormTitle>Overview de Paciente</FormTitle>
        <Container style={{ backgroundColor: "#f5f5f5" }}>
          {true ? (
            <>
              <Header
                content={content}
                allergic={isAllergic(allergiesState)}
                integration={integration}
              />
              <ScrollCard
                tittle="Relatório de Prontuário"
                iconName="ChartIcon"
                cards={cards}
                onClickCard={handleReport}
                allergic={isAllergic(allergiesState)}
                loadingCard={allergiesState.loading}
                openFilter={handleOpenFilter}
                reportType={reportType}
                reportActive={reportActive}
                existContent={!!handleContentReport(reportType)}
              />
              <FilterReport
                openFilter={openFilterReport}
                closeFilter={handleCloseFilter}
                reportType={reportType}
                content={rows}
                careState={careState}
                contentReport={handleContentReport(reportType)}
              />
              {reportActive ? (
                <AccordionReport
                  content={handleContentReport(reportType)}
                  company_id={
                    careState.data.company_id ? careState.data.company_id : ""
                  }
                  reportType={reportType}
                  state={careState}
                />
              ) : (
                <Container
                  style={{
                    padding: "0 32px 20px ",
                  }}
                >
                  <Container
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardInfo
                      content={content}
                      tittle={personalCard}
                      alergicIs={true}
                      gridProps={gridPropsPlan}
                      integration={integration}
                    />

                    <CardInfo
                      content={content}
                      tittle={planCard}
                      alergicIs={false}
                      gridProps={gridPropsPlan}
                      integration={integration}
                    />
                    <CardInfo
                      content={content}
                      tittle={teamCard}
                      alergicIs={false}
                      gridProps={gridPropsPlan}
                      integration={integration}
                    />
                  </Container>
                </Container>
              )}
            </>
          ) : (
            <></>
          )}
        </Container>
        <ButtonTabs buttons={buttons} canEdit={false} />
      </Container>
    </Sidebar>
  );
}
