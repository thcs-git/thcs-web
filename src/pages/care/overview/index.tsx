import React, { useCallback, useEffect, useState } from "react";

// Router
import { Link, useNavigate, useParams } from "react-router-dom";

// MUI
import { Typography, Container, Grid } from "@mui/material";
import {
  MoreVert,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
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
import NoPermission from "../../../components/Erros/NoPermission";

import UnexpectedError from "../../../components/Erros/UnexpectedError";
// Styles
// import { ContainerStyle as Container } from "./styles";
import { IButtons } from "../../../components/Button/ButtonTabs";
import theme from "../../../theme/theme";
// Helper
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import { age, formatDate } from "../../../helpers/date";
import { checkViewPermission } from "../../../utils/permissions";

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
import {
  loadRequestByCareId as loadRequestPrescriptionByCareId,
  loadRequestWithItems as loadRequestPrescriptionWithItems,
} from "../../../store/ducks/prescripition/actions";
import { loadRequest as loadRequestAntibiotic } from "../../../store/ducks/antibiotic/actions";
import { loadRequest as loadRequestExams } from "../../../store/ducks/exams/actions";
import { loadRequest as loadRequestAttests } from "../../../store/ducks/attest/actions";
import { loadRequest as loadRequestCompanyLogo } from "../../../store/ducks/logo/actions";
import { loadRequest as loadRequestTelemedicine } from "../../../store/ducks/telemedicine/actions";
import { loadRequest as loadRequestAttachments } from "../../../store/ducks/attachment/actions";
import { loadFormsTabsRequest, loadRequest as LoadRequestForms } from "../../../store/ducks/forms/actions";
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

export default function PatientOverview(props: IPageParams) {
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const currentCompanyiD = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
  const currentCustomerId = localStorage.getItem(LOCALSTORAGE.CUSTOMER);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const patientState = useSelector((state: ApplicationState) => state.patients);
  const allergiesState = useSelector(
    (state: ApplicationState) => state.allergies
  );
  const measurementState = useSelector(
    (state: ApplicationState) => state.measurements
  );
  const prescriptionState = useSelector(
    (state: ApplicationState) => state.prescription
  );
  const antibioticState = useSelector(
    (state: ApplicationState) => state.antibiotic
  );
  const qrCodeState = useSelector((state: ApplicationState) => state.qrCode);
  const examsState = useSelector((state: ApplicationState) => state.exams);
  const attestState = useSelector((state: ApplicationState) => state.attest);
  const telemedicineState = useSelector(
    (state: ApplicationState) => state.telemedicine
  );
  const attachmentState = useSelector(
    (state: ApplicationState) => state.attachments
  );
  const formState = useSelector((state: ApplicationState) => state.forms);
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const logoState = useSelector((state: ApplicationState) => state.logo);
  const [team, setTeam] = useState<any[]>([]);
  const [reportActive, setReportActive] = useState(false);
  const [reportType, setReportType] = useState("");
  const [openFilterReport, setOpenFilterReport] = useState(false);
  const [selectReportCard, setSelectReportCard] = useState("");

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
      dispatch(loadRequestQrCode(params.id));
      dispatch(loadCheckinRequest(params.id));
      // dispatch(loadRequestCompanyLogo());
      // dispatch(loadScheduleRequest({ attendance_id: params.id }));
    }
  }, [params.id]);

  useEffect(() => {
    if (careState.data.patient_id) {
      dispatch(loadPatientById(careState.data.patient_id._id));
      dispatch(loadRequestAllergies(careState.data.patient_id._id));
    }
  }, [careState?.data?.patient_id, integration]);
  useEffect(() => {
    handleTeam();
  }, [careState.schedule]);

  useEffect(() => {
    const attendanceId = careState?.data?._id;
    const patientId = careState?.data?.patient_id?._id;
    if (attendanceId && reportType === "Aferições") {
      dispatch(loadRequestMeasurements(attendanceId));
    } else if (attendanceId && reportType === "Evolução") {
      dispatch(loadEvolutionRequest(attendanceId));
    } else if (attendanceId && reportType === "Check-in/out") {
      dispatch(loadCheckinRequest(attendanceId));
    } else if (attendanceId && reportType === "Prescrições") {
      integration
        ? dispatch(
            loadRequestPrescriptionByCareId({
              external_attendance_id: attendanceId,
            })
          )
        : dispatch(
            loadRequestPrescriptionByCareId({
              attendance_id: attendanceId,
            })
          );
    } else if (patientId && reportType === "Antibióticos") {
      dispatch(loadRequestAntibiotic(patientId));
    } else if (patientId && reportType === "Exames") {
      dispatch(loadRequestExams(patientId));
    } else if (patientId && reportType === "Atestados") {
      dispatch(loadRequestAttests(patientId));
    } else if (attendanceId && reportType === "Checagens") {
      integration
        ? dispatch(
            loadRequestPrescriptionWithItems({
              external_attendance_id: attendanceId,
            })
          )
        : dispatch(
            loadRequestPrescriptionWithItems({
              attendance_id: attendanceId,
            })
          );
    } else if (attendanceId && reportType === "Telemedicina") {
      dispatch(loadRequestTelemedicine(attendanceId));
    } else if (patientId && reportType === "Anexos") {
      dispatch(loadRequestAttachments(patientId));
    } else if (attendanceId && reportType === "Formulários") {
      dispatch(loadFormsTabsRequest(currentCustomerId));
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

  const rows: any[] = [];
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
    careState?.data?.patient_id?.email &&
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
    careState?.data?.patient_id?.email &&
      rows.push({
        name: "Email",
        value: careState.data.patient_id.email,
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
    // "Atestados",
    // "Exames",
    "Check-in/out",
    "Alergias",
    "Prescrições",
    "Checagens",
    "Antibióticos",
    "Evolução",
    "Aferições",
    // "Telemedicina",
    // "Anexos",
    "Formulários",
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
      }
      if (item === "data" && allergie[item]["event"]) {
        if (allergie[item]["event"].length > 0) {
          allergicExist = true;
        }
      }
    });
    return allergicExist;
  };

  const buttons: IButtons[] = [
    {
      name: "Voltar",
      onClick: () => {
        !reportActive ? navigate("/care") : setReportActive(false);
        setSelectReportCard("");
      },
      variant: "contained",
      background: "primary",
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
        error: measurementState.error,
      };
    } else if (
      report === "Alergias" &&
      Object.keys(allergiesState.data).length > 0
    ) {
      return contentAllergyExist(allergiesState)
        ? {
            data: allergiesState.data,
            error: allergiesState.error,
          }
        : "";
    } else if (report === "Evolução" && careState.evolution.data.length > 0) {
      return {
        data: careState.evolution.data,
        error: careState.evolution.error,
      };
    } else if (report === "Check-in/out" && careState.checkin.data.length > 0) {
      return {
        data: careState.checkin.data,
        error: false,
      };
    } else if (
      report === "Prescrições" &&
      Object.keys(prescriptionState.data).length > 0
    ) {
      return {
        data: Object.entries(prescriptionState.data.prescriptionData),
        error: prescriptionState.error,
      };
    } else if (
      report === "Antibióticos" &&
      Object.keys(antibioticState.data).length > 0
    ) {
      return {
        data: Object.entries(antibioticState.data),
        error: antibioticState.error,
      };
    } else if (report === "Exames" && examsState.data.data.length > 0) {
      return {
        data: examsState.data.data,
        error: examsState.error,
      };
    } else if (report === "Atestados" && attestState.data.data.length > 0) {
      return {
        data: attestState.data.data,
        error: attestState.error,
      };
    } else if (
      report === "Checagens" &&
      Object.keys(prescriptionState.data).length > 0
    ) {
      return {
        data: Object.entries(prescriptionState.data.prescriptionData),
        error: prescriptionState.error,
      };
    } else if (report === "Telemedicina" && telemedicineState.data.length > 0) {
      return {
        data: telemedicineState.data,
        error: telemedicineState.error,
      };
    } else if (report === "Anexos" && attachmentState.data.length > 0) {
      return {
        data: attachmentState.data,
        error: attachmentState.error,
      };
    } else if (report === "Formulários" && formState.formTab.length > 0) {
      return {
        data: formState.formTab,
        error: formState.error,
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
  function handleLoadingReport(type: string) {
    switch (type) {
      case "Aferições":
        return measurementState.loading;
      case "Alergias":
        return allergiesState.loading;
      case "Evolução":
        return careState.evolution.loading;
      case "Check-in/out":
        return careState.checkin.loading;
      case "Prescrições":
        return prescriptionState.loading;
      case "Antibióticos":
        return antibioticState.loading;
      case "Exames":
        return examsState.loading;
      case "Atestados":
        return attestState.loading;
      case "Checagens":
        return prescriptionState.loading;
      case "Telemedicina":
        return telemedicineState.loading;
      case "Anexos":
        return attachmentState.loading;
      case "Formulários":
        return formState.loading;
      default:
        return false;
    }
  }

  return (
    <Sidebar>
      {checkViewPermission("care", JSON.stringify(rightsOfLayoutState)) ? (
        !careState.loading && !careState.data?._id && careState.error ? (
          <UnexpectedError />
        ) : (
          <Container sx={{ padding: "20px" }}>
            {/* {careState.loading && <Loading />} */}
            <Typography variant="h5" fontWeight={700} mb={5} color="primary">
              Overview de Paciente
            </Typography>
            <Grid container sx={{ background: "rgb(245, 245, 245)" }}>
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
                    selectCard={selectReportCard}
                    setSelectCard={setSelectReportCard}
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
                        careState.data.company_id
                          ? careState.data.company_id
                          : ""
                      }
                      reportType={reportType}
                      state={careState}
                      loading={handleLoadingReport(reportType)}
                    />
                  ) : (
                    <Grid
                      container
                      // gap={"8px"}
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        padding: "0 0 32px 0",
                        width: "calc(100% - 68px)",
                        margin: "0 auto",
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
                    </Grid>
                  )}
                </>
              ) : (
                <></>
              )}
            </Grid>
            <ButtonTabs buttons={buttons} canEdit={false} />
          </Container>
        )
      ) : (
        <NoPermission />
      )}
    </Sidebar>
  );
}
