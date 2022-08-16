import { call, put } from "redux-saga/effects";

import { apiSollar, apiSollarReport } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  loadFailure,
  loadSuccess,
  loadSuccessReportUnique,
  loadSuccessReportByDay,
  loadSuccessReportFilter,
} from "./actions";
import { formatDate } from "../../../helpers/date";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

const token = localStorage.getItem("token");

type params = { payload: string; type: string | undefined };

export function* get({ payload }: params) {
  try {
    let response: AxiosResponse = yield call(apiSollar.get, `/telemedicine`, {
      headers: { external_attendance_id: payload },
    });
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível carregar atendimentos da Telemedicina.");
    yield put(loadFailure());
  }
}
export function* getReportUnique({ payload }: any) {
  try {
    let response: AxiosResponse = yield call(
      apiSollarReport.get,
      `/telemedicine/${payload.telemedicine_id}`,
      {
        responseType: "blob",
        headers: {
          external_attendance_id: payload.external_attendance_id,
        },
      }
    );
    yield put(loadSuccessReportUnique());
  } catch (error) {
    toast.error("Não foi possível carregar atendimentos da Telemedicina.");
    yield put(loadFailure());
  }
}
export function* getReportByDay({ payload }: any) {
  try {
    let response: AxiosResponse = yield call(
      apiSollarReport.get,
      `/telemedicine/get/ByDay?dataStart=${payload.date.date}`,
      {
        responseType: "blob",
        headers: {
          external_attendance_id: payload.external_attendance_id,
        },
      }
    );
    yield put(loadSuccessReportByDay());
  } catch (error) {
    toast.error("Não foi possível carregar atendimentos da Telemedicina.");
    yield put(loadFailure());
  }
}

export function* getFilterTelemedicine({ payload }: any) {
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
      `/telemedicine/get/filter?dataStart=${dataStart}&dataEnd=${dataEnd}&name=${name}&type=${type}`,
      { responseType: "blob", headers: { ...headers } }
    );
    yield put(loadSuccessReportFilter());
  } catch (err) {
    // toast.error("Erro ao Filtrar Relatório De Evolução");
    yield put(loadFailure());
  }
}
