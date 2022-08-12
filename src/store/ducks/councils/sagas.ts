import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { apiSollar } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  createCouncilSuccess,
  loadSuccessGetCouncilById,
  updateCouncilSuccess,
} from "./actions";
import { CouncilInterface } from "./types";

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/council?limit=${params.limit ?? 10}&page=${params.page || 1}${
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
    `/council/store`,
    {
      ...payload,
    }
  );

  try {
    yield put(createCouncilSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/council`,
      { params: { _id } }
    );
    yield put(loadSuccessGetCouncilById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* update({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/council/${_id}/update`,
      { ...data }
    );

    toast.success("Conselho atualizado com sucesso!");
    yield put(updateCouncilSuccess(response.data[0]));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do conselho");
    yield put(loadFailure());
  }
}

export function* searchConcil({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/council/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do conselho");
    yield put(loadFailure());
  }
}
