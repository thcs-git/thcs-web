import {put, call} from "redux-saga/effects";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";

import {apiSollar, viacep} from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  loadFailureCep,
  loadSuccessCustomerById,
  successGetAddress,
  createCustomerSuccess,
  updateCustomerSuccess, createPermissionSuccess, loadPermissionSuccess, updatePermissionSuccess,
} from "./actions";
import {ViacepDataInterface} from "./types";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER);

export function* get({payload}: any) {
  const {params} = payload;

  try {
    const {data} = yield call(
      apiSollar.get,
      `/client?limit=${params.limit ?? 10}&page=${params.page || 1}${
        params.search ? "&search=" + params.search : ""
      }`
    );

    yield put(loadSuccess(data));
  } catch (error) {
    toast.error("Não foi possível buscar os dados dos clientes");
    yield put(loadFailure());
  }
}

export function* getCustomerById({payload: {id: _id}}: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/client`, {
      params: {_id},
    });
    const {phones = []} = response.data;
    if (phones.length > 0) {
      phones.forEach((phone: any) => {
        if (phone.phone) {
          response.data.phone = phone.phone;
        } else if (phone.cellphone) {
          response.data.cellphone = phone.cellphone;
        }
      });
    }
    yield put(loadSuccessCustomerById(response.data));
  } catch (error) {
    toast.error("Não foi possível carregar o cliente");
    yield put(loadFailure());
  }
}

export function* createCompanyCustomer({payload: {data}}: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/client/store`,
      data
    );

    if (response.data) {
      yield put(createCustomerSuccess(response.data[0]));
      toast.success("Cliente cadastrado com sucesso!");
    } else {
      toast.error("Não foi possível cadastrar um novo cliente");
      yield put(loadFailure());
    }
  } catch (e) {
    toast.error("Não foi possível cadastrar um novo cliente");
    yield put(loadFailure());
  }
}

export function* updateCompanyCustomer({payload: {data}}: any) {
  const {_id} = data;

  try {
    const phones = [];


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


    const response: AxiosResponse = yield call(
      apiSollar.put,
      `/client/${_id}/update`,
      {...data}
    );

    toast.success("Empresa atualizada com sucesso!");
    yield put(updateCustomerSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do cliente");
    yield put(loadFailure());
  }
}

export function* getAddress({payload}: any) {
  try {
    const {data}: AxiosResponse<ViacepDataInterface> = yield call(
      viacep.get,
      `${payload.postalCode}/json`
    );

    if (data.erro) {
      yield put(loadFailureCep());
      return;
    }

    yield put(successGetAddress(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* searchCustomer({payload: {value}}: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/client/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do cliente");
    yield put(loadFailure());
  }
}

export function* loadPermission({payload: {id: _id}}: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/permission/${_id}`,
      {headers: {token, customer_id}}
    );

    if (response.data) {
      yield put(loadPermissionSuccess(response.data));
    } else {
      toast.error("Não foi possível buscar os dados da permissão");
      yield put(loadFailure());
    }
  } catch (e) {
    toast.error("Não foi possível buscar os dados da permissão");
    yield put(loadFailure());
  }
}

export function* updatePermissionCustomer({payload: {data}}: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.put,
      `/permission/${data._id}`,
      data,
      {headers: {token, customer_id}}
    );

    if (response.data) {
      yield put(updatePermissionSuccess(response.data));
    } else {
      toast.error("Não foi possível buscar os dados da permissão");
      yield put(loadFailure());
    }
  } catch (e) {
    toast.error("Não foi possível buscar os dados da permissão");
    yield put(loadFailure());
  }
}

export function* createPermission({payload: {data}}: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/permission`,
      data,
      {headers: {token, customer_id}}
    );

    if (response.data) {
      yield put(createPermissionSuccess(response.data));
      toast.success("Permissão cadastrada com sucesso!");
    } else {
      toast.error("Não foi possível cadastrar uma nova permissão");
      yield put(loadFailure());
    }
  } catch (e) {
    toast.error("Não foi possível cadastrar uma nova permissão");
    yield put(loadFailure());
  }
}
