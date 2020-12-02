import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { apiSollar } from '../../../services/axios';

import { loadSuccess, loadFailure, loadSuccessCustomerById } from './actions';

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
