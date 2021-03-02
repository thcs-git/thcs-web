import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { apiSollar, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, loadSuccessCustomerById, successGetAddress, createCustomerSuccess, updateCustomerSuccess } from './actions';
import { ViacepDataInterface } from './types';


export function* get({ payload }: any) {
  const { params } = payload;

  try {
    const { data } = yield call(apiSollar.get, `/client?limit=${params.limit ?? 10}&page=${params.page || 1}${params.search ? '&search=' + params.search : ''}`);

    yield put(loadSuccess(data));
  } catch (error) {
    toast.error("Não foi possível buscar os dados dos clientes");
    yield put(loadFailure());
  }

}

export function* getCustomerById({ payload: { id: _id } }: any) {
  try {
    const response = yield call(apiSollar.get, `/client`, { params: { _id } })
    yield put(loadSuccessCustomerById(response.data))

  } catch (error) {
    toast.error("Não foi possível carregar o cliente");
    yield put(loadFailure());
  }
}

export function* createCompanyCustomer({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.post, `/client/store`, data);

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

export function* updateCompanyCustomer({ payload: { data } }: any) {
  const { id: _id } = data;

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/client/${_id}/update`, { ...data, _id })

    toast.success('Empresa atualizada com sucesso!');
    yield put(updateCustomerSuccess(response.data[0]))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do cliente");
    yield put(loadFailure());
  }
}

export function* getAddress({ payload }: any) {

  try {
    const { data }: AxiosResponse<ViacepDataInterface> = yield call(viacep.get, `${payload.postalCode}/json`);

    if (data.erro) {
      yield put(loadFailure());
      return;
    }

    yield put(successGetAddress(data));
  } catch (error) {

    yield put(loadFailure());
  }
}


export function* searchCustomer({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/client/?limit=10&page=1${!!value ? '&search=' + value : ''}`)
    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.info("Não foi possível buscar os dados do cliente");
    yield put(loadFailure());
  }
}
