import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import {
  loadSuccess,
  loadFailure,
  createDocumentSuccess,
  loadSuccessGetByCareId,
} from "./actions";

import { apiSollar, ibge } from "../../../services/axios";

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = params;

    delete searchParams.limit;
    delete searchParams.page;

    console.log("search params documents", searchParams);

    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/documents?limit=${params.limit ?? 10}&page=${params.page || 1}`,
      { params: searchParams }
    );

    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao buscar os grupos de documentos");
    yield put(loadFailure());
  }
}

export function* store({ payload }: any) {
  console.log("saga document payload", payload);

  const response: AxiosResponse = yield call(
    apiSollar.post as any,
    `/documents/store`,
    { ...payload }
  );

  try {
    yield put(createDocumentSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getByCareId({ payload }: any) {
  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/documents/indexAndParams`,
    { params: { ...payload } }
  );

  try {
    yield put(loadSuccessGetByCareId(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getByScore({ payload }: any) {
  const { params } = payload;
  console.log("saga docu", params);

  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/documents/getbyScore?patient_id=${params.patient}&document_group_id=${params.document_group_id}`
  );
  console.log("id_patient", params.patient);
  console.log(response.data);
  try {
    yield put(loadSuccessGetByCareId(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}
