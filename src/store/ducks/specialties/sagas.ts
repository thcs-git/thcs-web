import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { apiSollar } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  createSpecialtySuccess,
  loadSuccessGetSpecialtyById,
  updateSpecialtySuccess,
} from "./actions";

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/specialty?limit=${params.limit ?? 1000}&page=${params.page || 1}${
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
    `/specialty/store`,
    { ...payload }
  );

  try {
    yield put(createSpecialtySuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/specialty`,
      { params: { _id } }
    );
    yield put(loadSuccessGetSpecialtyById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* update({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/specialty/${_id}/update`,
      { ...data }
    );

    toast.success("Especialidade atualizada com sucesso!");
    yield put(updateSpecialtySuccess(response.data[0]));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados da especialidade");
    yield put(loadFailure());
  }
}

export function* searchSpecialty({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/specialty/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados das especialidades");
    yield put(loadFailure());
  }
}
