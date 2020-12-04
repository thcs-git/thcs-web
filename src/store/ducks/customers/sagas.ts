import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { apiSollar, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, loadSuccessCustomerById, successGetAddress } from './actions';

import { ViacepDataInterface } from './types';
import { AxiosResponse } from 'axios';

export function* get() {

  try {
    const { data } = yield call(apiSollar.get, '/client');

    yield put(loadSuccess(data));
  } catch (error) {
    toast.error("Não foi possível buscar os dados dos clientes");
    yield put(loadFailure());
  }

}

export function* getCustomerById({ payload: { id: _id } }: any) {
  try {
    const response = yield call(apiSollar.get, `/client`, { params: { _id } })
    yield put(loadSuccessCustomerById(response.data[0]))

  } catch (error) {
    toast.error("Não foi possível carregar o cliente");
    yield put(loadFailure());
  }
}

export function* getAddress({payload}:any) {

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
