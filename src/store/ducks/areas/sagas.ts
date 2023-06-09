import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import {
  loadSuccess,
  loadFailure,
  createAreaSuccess,
  loadSuccessGetAreaById,
  updateAreaSuccess,
  loadGetCitys,
  loadSuccessGetDistricts,
  loadSuccessGetCitys,
  loadPointSuccess,
} from "./actions";

import { apiSollar, ibge } from "../../../services/axios";

const token = localStorage.getItem("token");

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/patientarea?limit=${params.limit ?? 10}&page=${params.page || 1}${
      params.search ? "&search=" + params.search : ""
    }`
  );

  try {
    const { params } = payload;
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/patientarea?limit=${params.limit ?? 10}&page=${params.page || 1}`
    );

    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao buscar as áreas");
    yield put(loadFailure());
  }
}

export function* getAreaById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/patientarea`,
      {
        headers: { token },
        params: { _id },
      }
    );

    yield put(loadSuccessGetAreaById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createArea({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/patientarea/store`,
      data,
      { headers: { token } }
    );

    yield put(createAreaSuccess(response.data));

    toast.success("Area cadastrado com sucesso!");
  } catch (e) {
    toast.error("Erro ao cadastrar o area");
    yield put(loadFailure());
  }
}

export function* updateArea({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/patientarea/${_id}/update`,
      { ...data },
      { headers: { token } }
    );

    toast.success("Area atualizado com sucesso!");
    yield put(updateAreaSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados da area");
    yield put(loadFailure());
  }
}
export function* getCitys({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/location?&state=${value}`,
      {
        headers: { token },
      }
    );
    yield put(loadSuccessGetCitys(response.data.data));
  } catch (error) {
    yield put(loadFailure());
    toast.error("Não foi possível obter as cidades do estado");
  }
}
export function* getDistrict({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/districts?&city=${value.city}&state=${value.state}`,
      {
        headers: { token },
      }
    );
    yield put(loadSuccessGetDistricts(response.data.data));
  } catch (error) {
    yield put(loadFailure());
    toast.error("Não foi possível obter os bairros da Cidade");
  }
}
export function* getDistricts() {
  try {
    const { data }: AxiosResponse = yield call(
      ibge.get,
      `/localidades/estados/PE/distritos`
    );

    if (data.erro) {
      yield put(loadFailure());
      return;
    }

    yield put(loadSuccessGetDistricts(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getPoints({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/points?patientarea_id=${value}`,
      {
        headers: { token },
      }
    );

    yield put(loadPointSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* searchArea({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/patientarea/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados da área");
    yield put(loadFailure());
  }
}
