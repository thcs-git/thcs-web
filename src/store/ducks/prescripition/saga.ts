import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { apiSollar, apiSollarReport } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  createPrescriptionSuccess,
  loadSuccessGetPrescriptionById,
  updatePrescriptionSuccess,
  loadSuccessByCareId,
  loadSuccessWithItems,
  loadFailuretWithItems,
  loadSucessReportUnique,
  loadFailureReportUnique,
  loadFailureReportCheck,
  loadSuccesstReportCheck,
} from "./actions";
import { PrescriptionInterface } from "./types";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/prescription?limit=${params.limit ?? 10}&page=${params.page || 1}${
      params.search ? "&search=" + params.search : ""
    }`
  );

  try {
    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* store({ payload }: any) {
  const response: AxiosResponse = yield call(
    apiSollar.post as any,
    `/prescription/store`,
    { ...payload }
  );

  try {
    yield put(createPrescriptionSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/prescription`,
      {
        params: { _id },
      }
    );
    yield put(loadSuccessGetPrescriptionById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* update({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/prescription/${_id}/update`,
      { ...data }
    );

    toast.success("Especialidade atualizada com sucesso!");
    yield put(updatePrescriptionSuccess(response.data[0]));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados da prescrição");
    yield put(loadFailure());
  }
}

export function* searchPrescription({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/prescription/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados da prescrição");
    yield put(loadFailure());
  }
}

export function* loadPrescriptionByCareId({ payload }: any) {
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      "care/prescription?items=false",
      { headers: payload.data }
    );
    yield put(loadSuccessByCareId(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar as prescriçções");
    yield put(loadFailure());
  }
}

export function* loadPrescriptionWithItems({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      "care/prescription",
      { headers: payload }
    );
    yield put(loadSuccessWithItems(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar as checagens.");
    yield put(loadFailure());
  }
}

export function* loadReportUnique(data: any) {
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID);
  const { id, careId } = data.payload;

  console.log(data.payload, "data payload em prescription");
  try {
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `prescription/${id}`,
      {
        responseType: "blob",
        headers: { ...Headers, user_id, external_attendance_id: careId },
      }
    );
    yield put(loadSucessReportUnique(response.data));
  } catch (error) {
    toast.info("Não foi possível gerar relatório de prescrições.");
    yield put(loadFailureReportUnique());
  }
}
export function* loadReportCheck(data: any) {
  try {
    const { id, careId } = data.payload;
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `checks/${id}`,
      { responseType: "blob", headers: { external_attendance_id: careId } }
    );

    yield put(loadSuccesstReportCheck(response.data));
  } catch (error) {
    yield put(loadFailureReportCheck());
  }
}
