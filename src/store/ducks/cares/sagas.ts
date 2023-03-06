import { apiSollarMobi, apiSollarReport } from "./../../../services/axios";
import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
// helps
import { formatDate } from "./../../../helpers/date";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";

import {
  loadSuccess,
  loadFailure,
  createCareSuccess,
  loadSuccessGetCareById,
  updateCareSuccess,
  searchCareSuccess,
  searchPatientSuccess,
  actionDocumentGroupSocioAmbiental,
  actionDocumentSocioAmbiental,
  actionDocumentSocioAmbientalStore,
  actionDocumentSocioAmbientalUpdate,
  actionDocumentGroupAbemid,
  actionDocumentAbemid,
  actionDocumentAbemidStore,
  actionDocumentAbemidUpdate,
  actionDocumentGroupNead,
  actionDocumentNead,
  actionDocumentNeadStore,
  actionDocumentNeadUpdate,
  healthInsuranceSuccess,
  healthPlanSuccess,
  healthSubPlanSuccess,
  AccommodationTypeSuccess,
  careTypeSuccess,
  cidSuccess,
  loadDocumentSuccess,
  loadScheduleSuccess,
  createScheduleSuccess,
  updateScheduleSuccess,
  deleteScheduleSuccess,
  loadHistorySuccess,
  releaseReasonSuccess,
  releaseReferralSuccess,
  deleteCareSuccess,
  loadEvolutionRequest,
  loadEvolutionSuccess,
  loadEvolutionFailure,
  loadCheckinSuccess,
  loadCheckinFailure,
  loadCheckinReportSuccess,
  loadCheckinReportFailure,
  loadEvolutionFilterSuccess,
  loadMeasurementFilterRequest,
  loadMeasurementFilterSuccess,
  loadAllergyFilterRequest,
  loadAdverseEventFilterRequest,
  loadAllergyFilterSuccess,
  loadAdverseEventFilterSuccess,
  loadHistoryFailure,
} from "./actions";

import { apiIntegra, apiSollar } from "../../../services/axios";

import { handleCompanySelected } from "../../../helpers/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import { pull } from "cypress/types/lodash";
import { IFilterReport } from "./types";

const token = localStorage.getItem("token");

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    let response: AxiosResponse;
    // const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION)
    // console.log('here')
    // if (integration) {
    //   response = yield call(
    //     apiIntegra(integration),
    //     `/attendance?limit=${params.limit ?? 10}&page=${
    //       params.page || 1}`
    //   );
    // } else {
    response = yield call(
      apiSollar.get as any,
      `/attendance/getAttendance?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }${params.search ? "&search=" + params.search : ""}${
        params.status ? "&status=" + params.status : ""
      }${params.patient_id ? "&patient_id=" + params.patient_id : ""}`
    );

    yield put(searchCareSuccess(response.data));
  } catch (error) {
    // toast.error("Erro ao buscar os atendimentos");
    yield put(loadFailure());
  }
}

export function* getPopUp({ payload }: any) {
  try {
    const { params } = payload;
    let response: AxiosResponse;
    // const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION)

    // if (integration) {
    //   response = yield call(
    //     apiSollar.get as any,
    //     `/attendance/getAttendance?limit=${params.limit ?? 10}&page=${
    //       params.page || 1
    //     }${params.search ? "&search=" + params.search : ""}${params.status ? "&status=" + params.status : ""}${params.patient_id ? "&patient_id=" + params.patient_id : ""}`
    //   );
    // } else {
    response = yield call(
      apiSollar.get as any,
      `/attendance/getAttendance?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }${params.search ? "&search=" + params.search : ""}${
        params.status ? "&status=" + params.status : ""
      }${params.patient_id ? "&patient_id=" + params.patient_id : ""}`
    );

    yield put(searchPatientSuccess(response.data));
  } catch (error) {
    // toast.error("Erro ao buscar o Paciente");
    yield put(loadFailure());
  }
}

export function* search({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = params;

    let response: AxiosResponse;
    // const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION)

    delete searchParams.limit;
    delete searchParams.page;

    // if (integration) {
    //   response = yield call(
    //     apiIntegra(integration),
    //     `/attendance?limit=${params.limit ?? 10}&page=${
    //       params.page || 1
    //     }`,
    //     {params: searchParams}
    //   );
    // } else {
    response = yield call(
      apiSollar.get as any,
      `/attendance/getAttendance?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }`,
      { params: searchParams }
    );

    yield put(loadSuccess(response.data));
  } catch (error) {
    // toast.error("Erro ao buscar os atendimentos");
    yield put(loadFailure());
  }
}

export function* getCareById({ payload: { id: _id } }: any) {
  try {
    let response: AxiosResponse;
    // const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION)

    // if (integration) {
    //   response = yield call(
    //     apiIntegra(integration),
    //     `/attendance/${_id}`, {});
    // } else {
    response = yield call(apiSollar.get as any, `/care`, {
      headers: { token },
      params: { _id },
    });

    yield put(loadSuccessGetCareById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createCare({ payload: { data } }: any) {
  try {
    const company = handleCompanySelected();

    if (!company) {
      toast.error("Parametro de empresa nao encontrado");
      return;
    }
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/care/store`,
      data,
      { headers: { token } }
    );

    yield put(createCareSuccess(response.data));

    toast.success("Atendimento cadastrado com sucesso!");
  } catch (e) {
    toast.error("Erro ao cadastrar o atendimento");
    yield put(loadFailure());
  }
}

export function* updateCare({ payload: { data } }: any) {
  const { _id } = data;

  console.log(data, " DATA REQUESTTT");
  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/care/${_id}/update`,
      { ...data },
      { headers: { token } }
    );

    toast.success("Atendimento atualizado com sucesso!");
    console.log(response.data, "DATAA RESPONSE");
    yield put(updateCareSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do atendimento");
    yield put(loadFailure());
  }
}

export function* transferCare({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/care/${_id}/transfer`,
      { ...data },
      { headers: { token } }
    );

    toast.success("Atendimento transferido com sucesso!");
    yield put(updateCareSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do atendimento");
    yield put(loadFailure());
  }
}

export function* deleteCare({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.delete as any,
      `/care/${_id}/delete`,
      { headers: { token } }
    );

    toast.success("Atendimento deletado com sucesso!");
    yield put(deleteCareSuccess());
  } catch (error) {
    toast.error("Não foi possível deletar o dados do atendimento");
    yield put(loadFailure());
  }
}

/**
 * Documento Socioambiental
 */

export function* getDocumentGroupSocioAmbiental() {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documentsgroup?limit=1&page=1`,
      { params: { _id: "5ffd79012f5d2b1d8ff6bea3" } }
    );

    yield put(actionDocumentGroupSocioAmbiental(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* getDocumentSocioAmbiental({ payload }: any) {
  try {
    const searchParams = {
      ...payload,
      document_group_id: "5ffd79012f5d2b1d8ff6bea3",
    };

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documents?limit=${payload?.limit || 10}&page=${payload?.page || 1}`,
      { params: searchParams }
    );

    const data = response.data?.data ? response.data.data[0] : response.data;

    yield put(actionDocumentSocioAmbiental(data));
  } catch (error) {
    console.log("error", error);
    toast.error("Erro ao buscar dados do documento socioambiental");
    yield put(loadFailure());
  }
}

export function* storeDocumentSocioAmbiental({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/documents/store`,
      { ...payload, document_group_id: "5ffd79012f5d2b1d8ff6bea3" }
    );

    yield put(actionDocumentSocioAmbientalStore(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* updateDocumentSocioAmbiental({ payload }: any) {
  try {
    const { _id } = payload;

    delete payload._id;

    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/documents/${_id}/update`,
      { ...payload }
    );

    yield put(actionDocumentSocioAmbientalUpdate(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

/**
 * Documento ABEMID
 */

export function* getDocumentGroupAbemid() {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documentsgroup?limit=1&page=1`,
      { params: { _id: "5ffd7acd2f5d2b1d8ff6bea4" } }
    );

    yield put(actionDocumentGroupAbemid(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* getDocumentAbemid({ payload }: any) {
  try {
    const searchParams = {
      ...payload,
      document_group_id: "5ffd7acd2f5d2b1d8ff6bea4",
    };

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documents?limit=${payload?.limit || 10}&page=${payload?.page || 1}`,
      { params: searchParams }
    );

    const data = response.data?.data ? response.data.data[0] : response.data;

    yield put(actionDocumentAbemid(data));
  } catch (error) {
    console.log("error", error);
    toast.error("Erro ao buscar dados do documento abemid");
    yield put(loadFailure());
  }
}

export function* storeDocumentAbemid({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/documents/store`,
      { ...payload, document_group_id: "5ffd7acd2f5d2b1d8ff6bea4" }
    );

    yield put(actionDocumentAbemidStore(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* updateDocumentAbemid({ payload }: any) {
  try {
    const { _id } = payload;

    console.log("payload", payload);

    delete payload._id;

    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/documents/${_id}/update`,
      { ...payload }
    );

    yield put(actionDocumentAbemidUpdate(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

/**
 * Documento NEAD
 */

export function* getDocumentGroupNead() {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documentsgroup?limit=1&page=1`,
      { params: { _id: "5ff65469b4d4ac07d186e99f" } }
    );

    yield put(actionDocumentGroupNead(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* getDocumentNead({ payload }: any) {
  try {
    const searchParams = {
      ...payload,
      document_group_id: "5ff65469b4d4ac07d186e99f",
    };

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documents?limit=${payload?.limit || 10}&page=${payload?.page || 1}`,
      { params: searchParams }
    );

    const data = response.data?.data ? response.data.data[0] : response.data;

    yield put(actionDocumentNead(data));
  } catch (error) {
    console.log("error", error);
    toast.error("Erro ao buscar dados do documento nead");
    yield put(loadFailure());
  }
}

export function* storeDocumentNead({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/documents/store`,
      { ...payload, document_group_id: "5ff65469b4d4ac07d186e99f" }
    );

    yield put(actionDocumentNeadStore(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* updateDocumentNead({ payload }: any) {
  try {
    const { _id } = payload;

    console.log("payload", payload);

    delete payload._id;

    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/documents/${_id}/update`,
      { ...payload }
    );

    yield put(actionDocumentNeadUpdate(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* getHealthInsurance() {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      "/healthinsurance"
    );

    yield put(healthInsuranceSuccess(data.data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar os Convenios");
    yield put(loadFailure());
  }
}

export function* getHealthPlan({ payload }: any) {
  const { id } = payload;

  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/healthplan?health_insurance_id=${id}`
    );

    yield put(healthPlanSuccess(data.data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar os Convenios");
    yield put(loadFailure());
  }
}

export function* getHealthSubPlan({ payload }: any) {
  const { id } = payload;

  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/healthsubplan?health_plan_id=${id}`
    );

    yield put(healthSubPlanSuccess(data.data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar os Convenios");
    yield put(loadFailure());
  }
}

export function* getAccommodationType() {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/accomodationtype`
    );

    yield put(AccommodationTypeSuccess(data.data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar tipos de acomodações");
    yield put(loadFailure());
  }
}

export function* getCareType() {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/caretype`
    );

    yield put(careTypeSuccess(data.data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar tipos de acomodações");
    yield put(loadFailure());
  }
}

export function* searchCid({ payload }: any) {
  const { cid } = payload;

  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/cid?search=${cid}`
    );

    yield put(cidSuccess(data.data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar CID");
    yield put(loadFailure());
  }
}

export function* getAllCid() {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/cid/getAll`
    );

    yield put(cidSuccess(data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar CID");
    yield put(loadFailure());
  }
}

export function* getReleaseReason() {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/releaseReasons/getAll`
    );

    yield put(releaseReasonSuccess(data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar CID");
    yield put(loadFailure());
  }
}

export function* getReleaseReferral() {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/releaseReferrals/getAll`
    );

    yield put(releaseReferralSuccess(data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao buscar CID");
    yield put(loadFailure());
  }
}

export function* getDocumentById({ payload }: any) {
  const { id } = payload;

  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documents?_id=${id}`
    );

    yield put(loadDocumentSuccess(data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao obter documento");
    yield put(loadFailure());
  }
}

export function* getSchedule({ payload }: any) {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/schedule`,
      {
        ...payload,
      }
    );

    yield put(loadScheduleSuccess(data.data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao obter a agenda");
    yield put(loadFailure());
  }
}

export function* storeSchedule({ payload }: any) {
  try {
    delete payload.exchange;
    const { data }: AxiosResponse = yield call(
      apiSollar.post as any,
      `/schedule/store`,
      { ...payload }
    );

    yield put(createScheduleSuccess(data));

    toast.success("Agendamento adicionado com sucesso!");
  } catch (error) {
    console.log(error);
    toast.error("Erro ao obter a agenda");
    yield put(loadFailure());
  }
}

export function* updateSchedule({ payload }: any) {
  try {
    const { _id, ...scheduleData } = payload;
    console.log(scheduleData);

    scheduleData.user_id = scheduleData.user_id._id;

    if (scheduleData.exchange) {
      scheduleData.exchange.created_at = new Date();
      scheduleData.exchange.created_by = localStorage.getItem(
        LOCALSTORAGE.USER_ID
      );
    }

    if (scheduleData.exchange) {
      scheduleData.exchange.created_at = new Date();
      scheduleData.exchange.created_by = localStorage.getItem(
        LOCALSTORAGE.USER_ID
      );
    }

    const { data }: AxiosResponse = yield call(
      apiSollar.put as any,
      `/schedule/${_id}/update`,
      { ...scheduleData }
    );

    // yield put(updateScheduleSuccess(data));

    toast.success("Agendamento atualizado com sucesso!");
  } catch (error) {
    console.log(error);
    toast.error("Erro ao obter a agenda");
    yield put(loadFailure());
  }
}

export function* deleteSchedule({ payload }: any) {
  try {
    const { data }: AxiosResponse = yield call(
      apiSollar.delete as any,
      `/schedule/${payload.id}/delete`,
      { params: { type: payload?.type } }
    );

    yield put(deleteScheduleSuccess(data));

    toast.success("Agendamento removido com sucesso!");
  } catch (error) {
    console.log(error);
    toast.error("Erro ao obter a agenda");
    yield put(loadFailure());
  }
}

export function* getHistory({ payload }: any) {
  try {
    const { id, type } = payload;
    const { data }: AxiosResponse = yield call(
      apiSollar.get as any,
      `/attendance/getHistory?patient_id=${id}${type ? "&status=" + type : ""}`
    );

    yield put(loadHistorySuccess(data));
  } catch (error) {
    console.log(error);
    toast.error("Erro ao obter o histórico");
    yield put(loadHistoryFailure());
  }
}

export function* getEvolution({ payload }: any) {
  try {
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { external_attendance_id: payload }
      : { attendance_id: payload };
    const response: AxiosResponse = yield call(
      apiSollarMobi.post as any,
      `/evolution/getGroup`,
      { attendance_id: payload },
      { headers: { ...headers } }
    );
    yield put(loadEvolutionSuccess(response.data));
  } catch (err) {
    yield put(loadEvolutionFailure());
    toast.error("Erro ao buscar Evoluções");
  }
}

export function* getChekin({ payload }: any) {
  try {
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { external_attendance_id: payload }
      : { attendance_id: payload };
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/checkin/getGroup`,
      { headers: { ...headers } },
      { attendance_id: payload }
    );
    yield put(loadCheckinSuccess(response.data));
  } catch (err) {
    yield put(loadCheckinFailure());
    toast.error("Erro ao buscar Checkins");
  }
}

export function* getChekInReport({ payload }: any) {
  try {
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { token, external_attendance_id: payload }
      : { token, attendance_id: payload };
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `/checkin`,
      { responseType: "blob", headers: { ...headers } }
    );
    yield put(loadCheckinReportSuccess(response.data));
  } catch (err) {
    yield put(loadCheckinReportFailure());
    // toast.error("Erro Ao Buscar Relatório De Check-In/Out");
  }
}

export function* getFilterCheckin({ payload }: any) {
  console.log(payload)
  try {
    let { dataStart, dataEnd, type, name } = payload;
    dataStart =
      typeof dataStart === "string"
        ? dataStart
        : formatDate(dataStart["$d"], "YYYY-MM-DD");
    dataEnd =
      typeof dataEnd === "string"
        ? dataEnd
        : formatDate(dataEnd["$d"], "YYYY-MM-DD");
    payload = {
      ...payload,
      dataStart,
      dataEnd,
    };
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { token, external_attendance_id: payload.attendance_id }
      : { token, attendance_id: payload.attendance_id };
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `/checkin?dataStart=${dataStart}&dataEnd=${dataEnd}&name=${name}&type=${type}`,
      { responseType: "blob", headers: { ...headers } }
    );
    yield put(loadCheckinReportSuccess(response.data));
  } catch (err) {
    // toast.error("Erro ao Filtrar Relatório De Check-In/Out");
    yield put(loadCheckinReportFailure());
  }
}

export function* getFilterEvolution({ payload }: any) {
  try {
    let { dataStart, dataEnd, type, name } = payload;
    dataStart =
      typeof dataStart === "string"
        ? dataStart
        : formatDate(dataStart["$d"], "YYYY-MM-DD");
    dataEnd =
      typeof dataEnd === "string"
        ? dataEnd
        : formatDate(dataEnd["$d"], "YYYY-MM-DD");
    payload = {
      ...payload,
      dataStart,
      dataEnd,
    };
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { token, external_attendance_id: payload.attendance_id }
      : { token, attendance_id: payload.attendance_id };
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `/evolution?dataStart=${dataStart}&dataEnd=${dataEnd}&name=${name}&type=${type}`,
      { responseType: "blob", headers: { ...headers } }
    );
    yield put(loadEvolutionFilterSuccess(response.data));
  } catch (err) {
    // toast.error("Erro ao Filtrar Relatório De Evolução");
    yield put(loadCheckinReportFailure());
  }
}

export function* getFilterMeasurement({ payload }: any) {
  try {
    let { dataStart, dataEnd, type, name } = payload;
    dataStart =
      typeof dataStart === "string"
        ? dataStart
        : formatDate(dataStart["$d"], "YYYY-MM-DD");
    dataEnd =
      typeof dataEnd === "string"
        ? dataEnd
        : formatDate(dataEnd["$d"], "YYYY-MM-DD");
    payload = {
      ...payload,
      dataStart,
      dataEnd,
    };
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { token, external_attendance_id: payload.attendance_id }
      : { token, attendance_id: payload.attendance_id };
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `/measurement?dataStart=${dataStart}&dataEnd=${dataEnd}&name=${name}&type=${type}`,
      { responseType: "blob", headers: { ...headers } }
    );
    yield put(loadMeasurementFilterSuccess(response.data));
  } catch (err) {
    // toast.error("Erro ao Filtrar Relatório De Aferição");
    yield put(loadCheckinReportFailure());
  }
}

export function* getFilterAllergy({ payload }: any) {
  try {
    let { dataStart, dataEnd, type, name } = payload;
    dataStart =
      typeof dataStart === "string"
        ? dataStart
        : formatDate(dataStart["$d"], "YYYY-MM-DD");
    dataEnd =
      typeof dataEnd === "string"
        ? dataEnd
        : formatDate(dataEnd["$d"], "YYYY-MM-DD");
    payload = {
      ...payload,
      dataStart,
      dataEnd,
    };
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { token, external_attendance_id: payload.attendance_id }
      : { token, attendance_id: payload.attendance_id };
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `/allergy?dataStart=${dataStart}&dataEnd=${dataEnd}&name=${name}&type=${type}&patient_id=${payload.patient_id}`,
      { responseType: "blob", headers: { ...headers } }
    );
    yield put(loadAllergyFilterSuccess(response.data));
  } catch (err) {
    // toast.error("Erro ao Filtrar Relatório De Alergia");
    yield put(loadCheckinReportFailure());
  }
}

export function* getFilterAdverseEvent({ payload }: any) {
  try {
    let { dataStart, dataEnd, type, name } = payload;
    dataStart =
      typeof dataStart === "string"
        ? dataStart
        : formatDate(dataStart["$d"], "YYYY-MM-DD");
    dataEnd =
      typeof dataEnd === "string"
        ? dataEnd
        : formatDate(dataEnd["$d"], "YYYY-MM-DD");
    payload = {
      ...payload,
      dataStart,
      dataEnd,
    };
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration
      ? { token, external_attendance_id: payload.attendance_id }
      : { token, attendance_id: payload.attendance_id };
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `/allergy/event?dataStart=${dataStart}&dataEnd=${dataEnd}&name=${name}&type=${type}&patient_id=${payload.patient_id}`,
      { responseType: "blob", headers: { ...headers } }
    );
    yield put(loadAdverseEventFilterSuccess(response.data));
  } catch (err) {
    // toast.error("Erro ao Filtrar Relatório De Evento Adverso");
    yield put(loadCheckinReportFailure());
  }
}
