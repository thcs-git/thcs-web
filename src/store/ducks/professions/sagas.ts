import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { apiSollar, viacep } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  loadFailureCreateProfession,
  createProfessionSuccess,
  updateProfessionSuccess,
  setIfRegistrationCompleted,
} from "./actions";
import { ProfessionInterface, LoadRequestParams } from "./types";

const token = localStorage.getItem("token");

export function* get({ payload }: any) {
  const { params } = payload;

  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/profession?limit=${params.limit ?? 100}&page=${params.page || 1}${
      params.search ? "&search=" + params.search : ""
    }`
  );

  try {
    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createProfession({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/patient/store`,
      data,
      { headers: { token } }
    );
    yield put(createProfessionSuccess(response.data));
    yield put(setIfRegistrationCompleted(true, response.data._id));

    toast.success("Profissão cadastrado com sucesso!");
  } catch (e) {
    toast.error("Erro ao cadastrar a profissão");
    yield put(setIfRegistrationCompleted(false));
    yield put(loadFailureCreateProfession());
  }
}

export function* updateProfession({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/profession/${_id}/update`,
      { ...data },
      { headers: { token } }
    );

    toast.success("Profissão atualizado com sucesso!");
    yield put(updateProfessionSuccess(response.data));
    yield put(setIfRegistrationCompleted(true));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados da profissão");
    yield put(setIfRegistrationCompleted(false));
    yield put(loadFailure());
  }
}

export function* searchProfession({ payload: { params } }: any) {
  try {
    let searchQuery, requestParams;

    if (typeof params === "string") {
      searchQuery = `&search=${params}`;
    } else {
      requestParams = params;

      delete requestParams.limit;
      delete requestParams.page;

      requestParams = { params: requestParams };
    }

    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/profession/?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }${searchQuery}`,
      requestParams
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados da profissão");
    yield put(loadFailure());
  }
}
