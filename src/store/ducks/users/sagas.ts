import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { apiSollar, viacep } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  successGetAddress,
  createUserSuccess,
  loadSuccessGetUserById,
  updateUserSuccess,
  loadProfessionsSuccess,
  loadUserTypesSuccess,
} from "./actions";
import { ViacepDataInterface } from "./types";
import { Console } from "console";

const token = localStorage.getItem("token");

export function* get({ payload }: any) {
  const { params } = payload;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/user?limit=${params.limit ?? 10}&page=${params.page || 1}${
        params.search ? "&search=" + params.search : ""
      }${params.profession_id ? "&profession_id=" + params.profession_id : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do usuario");
    yield put(loadFailure());
  }
}

export function* getUserById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/user`, {
      headers: { token },
      params: { _id },
    });

    yield put(loadSuccessGetUserById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}
export function* registerUser({ payload: { data } }: any) {
  const phones = [];

  if (data.phone.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.phone,
    });
  }

  if (data.cellphone.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.cellphone,
    });
  }

  data.username = data.email;
  data.password = data.fiscal_number;

  data.phones = phones;

  data.user_type_id = { _id: "5fc05d1803058800244bc41b" };

  try {
    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/user/register`,
      data,
      { headers: { token } }
    );
    yield put(createUserSuccess(response.data));
    toast.success("Usuário cadastrado com sucesso!");
  } catch (e) {
    toast.error("Não foi possível cadastrar o usuário");
    yield put(loadFailure());
  }
}

export function* createUser({ payload: { data } }: any) {
  const phones = [];

  if (data.phone.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.phone,
    });
  }

  if (data.cellphone.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.cellphone,
    });
  }

  data.username = data.email;
  data.password = data.fiscal_number
    .replaceAll(".", "")
    .replaceAll("/", "")
    .replaceAll("-", "");

  data.phones = phones;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/user/store`,
      data,
      { headers: { token } }
    );

    yield put(createUserSuccess(response.data));
    toast.success("Usuário cadastrado com sucesso!");
  } catch (e) {
    console.log("e", e);
    toast.error("Não foi possível cadastrar o usuário");
    yield put(loadFailure());
  }
}

export function* updateUser({ payload: { data } }: any) {
  const { _id } = data;

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

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put,
      `/user/${_id}/update`,
      { ...data },
      { headers: { token } }
    );

    console.log(response.data);

    toast.success("Usuário atualizado com sucesso!");
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do usuario");
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

export function* getProfessions() {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/profession`, {
      headers: { token },
    });
    console.log(response);

    yield put(loadProfessionsSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* searchUser({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/user/?limit=10&page=1`,
      { params: data }
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do usuário");
    yield put(loadFailure());
  }
}

export function* getUserTypes({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/usertype/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );

    yield put(loadUserTypesSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do usuário");
    yield put(loadFailure());
  }
}
