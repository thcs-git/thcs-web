import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { apiSollar } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  createPrescriptionSuccess,
  loadSuccessGetPrescriptionById,
  updatePrescriptionSuccess,
  loadSuccessByCareId,
} from "./actions";
import { PrescriptionInterface } from "./types";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(
    apiSollar.get,
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
    apiSollar.post,
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
    const response: AxiosResponse = yield call(apiSollar.get, `/prescription`, {
      params: { _id },
    });
    yield put(loadSuccessGetPrescriptionById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* update({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put,
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
      apiSollar.get,
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
      apiSollar.get,
      "care/prescription?items=false",
      { headers: payload.data }
    );
    yield put(loadSuccessByCareId(response.data));
  } catch (error) {
    toast.info("Não foi possível prescrição");
    yield put(loadFailure());
  }
}
