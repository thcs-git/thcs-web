import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";

import {
  loadSuccess,
  loadFailure,
  createCareSuccess,
  loadSuccessGetCareById,
  updateCareSuccess,
  searchCareSuccess,
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
} from "./actions";

import { apiSollar } from "../../../services/axios";

import { handleCompanySelected } from "../../../helpers/localStorage";

const token = localStorage.getItem("token");

export function* get({ payload }: any) {
  try {
    const { params } = payload;

    console.log(
      `/attendance/getAttendance?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }`
    );

    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/attendance/getAttendance?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }${params.search ? "&search=" + params.search : ""}`
    );

    yield put(searchCareSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os atendimentos");
    yield put(loadFailure());
  }
}

export function* search({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = params;

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/attendance/getAttendance?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }`,
      { params: searchParams }
    );

    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os atendimentos");
    yield put(loadFailure());
  }
}

export function* getCareById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/care`, {
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
      apiSollar.post,
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

  try {
    console.log(data);
    const response: AxiosResponse = yield call(
      apiSollar.put,
      `/care/${_id}/update`,
      { ...data },
      { headers: { token } }
    );

    toast.success("Atendimento atualizado com sucesso!");
    yield put(updateCareSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do atendimento");
    yield put(loadFailure());
  }
}

/**
 * Documento Socioambiental
 */

export function* getDocumentGroupSocioAmbiental() {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
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
      apiSollar.get,
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
      apiSollar.post,
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

    console.log("payload", payload);

    delete payload._id;

    const response: AxiosResponse = yield call(
      apiSollar.put,
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
      apiSollar.get,
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
      apiSollar.get,
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
      apiSollar.post,
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
      apiSollar.put,
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
      apiSollar.get,
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
      apiSollar.get,
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
      apiSollar.post,
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
      apiSollar.put,
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
      apiSollar.get,
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
      apiSollar.get,
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
      apiSollar.get,
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
      apiSollar.get,
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
    const { data }: AxiosResponse = yield call(apiSollar.get, `/caretype`);

    console.log(data);
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
      apiSollar.get,
      `/cid?search=${cid}`
    );

    yield put(cidSuccess(data.data));
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
      apiSollar.get,
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
    const { data }: AxiosResponse = yield call(apiSollar.get, `/schedule`, {
      ...payload,
    });

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
      apiSollar.post,
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
      apiSollar.put,
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
      apiSollar.delete,
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
