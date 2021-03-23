import { AxiosResponse } from "axios";
import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { viacep, apiSollar } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  successGetAddress,
  createCompanySuccess,
  loadSuccessGetCompanyById,
  updateCompanySuccess,
} from "./actions";
import { ViacepDataInterface } from "./types";

const token = localStorage.getItem("token");

export function* get({ payload }: any) {
  const { params } = payload;

  const response: AxiosResponse = yield call(
    apiSollar.get,
    `/companies?limit=${params.limit ?? 10}&page=${params.page || 1}${
      params.search ? "&search=" + params.search : ""
    }`
  );

  try {
    yield put(loadSuccess(response.data));
  } catch (error) {
    console.log("error", error);
    yield put(loadFailure());
  }
}

export function* getAddress({ payload }: any) {
  try {
    const { data }: AxiosResponse<ViacepDataInterface> = yield call(
      viacep.get,
      `${payload.postalCode}/json`
    );

    if (data.erro) {
      yield put(loadFailure());
      return;
    }

    yield put(successGetAddress(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* store({ payload: { data } }: any) {
  try {
    const phones = [];

    if (data?.phone?.length > 0) {
      phones.push({
        whatsapp: false,
        telegram: false,
        number: data.phone,
      });
    }

    if (data?.cellphone?.length > 0) {
      phones.push({
        whatsapp: false,
        telegram: false,
        number: data.cellphone,
      });
    }

    data.phones = phones;

    delete data.phone;
    delete data.cellphone;

    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/companies/store`,
      data,
      { headers: { token } }
    );

    yield put(createCompanySuccess(response.data));
    toast.success("Empresa cadastrada com sucesso!");
  } catch (e) {
    toast.error("Ocorreu um erro ao cadastrar uma nova empresa");
    yield put(loadFailure());
  }
}

export function* getById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/companies`, {
      params: { _id },
    });
    const { phones = [] } = response.data;

    if (phones.length > 0) {
      phones.forEach((phone: any) => {
        if (phone.phone) {
          response.data.phone = phone.phone;
        } else if (phone.cellphone) {
          response.data.cellphone = phone.cellphone;
        }
      });
    }
    yield put(loadSuccessGetCompanyById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* update({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const phones = [];

    console.log("data", data);

    if (data?.phone?.length > 0) {
      phones.push({
        whatsapp: false,
        telegram: false,
        phone: data.phone,
      });
    }

    if (data?.cellphone?.length > 0) {
      phones.push({
        whatsapp: false,
        telegram: false,
        cellphone: data.cellphone,
      });
    }

    data.phones = phones;

    delete data.phone;
    delete data.cellphone;

    const response: AxiosResponse = yield call(
      apiSollar.put,
      `/companies/${_id}/update`,
      { ...data }
    );

    toast.success("Empresa atualizada com sucesso!");
    yield put(updateCompanySuccess(response.data[0]));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados da empresa");
    yield put(loadFailure());
  }
}

export function* searchCompany({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/companies/?limit=10${!!value ? "&search=" + value : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    console.log("error", error);
    toast.info("Não foi possível buscar os dados da empresa");
    yield put(loadFailure());
  }
}
