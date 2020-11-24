import { AxiosResponse } from 'axios';
import { put, call } from 'redux-saga/effects';

import { viacep, backend } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress } from './actions';
import { ViacepDataInterface } from './types';

const token = localStorage.getItem('token');

export function* getAddress({payload}:any) {

  try {
    const { data }: AxiosResponse<ViacepDataInterface> = yield call(viacep.get, `${payload.postalCode}/json`);

    console.log('saga data', data)

    if (data.erro) {
      yield put(loadFailure());
      return;
    }

    yield put(successGetAddress(data));
  } catch (error) {

    yield put(loadFailure());
  }
}

export function* createCompany({ payload: { data } }: any) {
  console.log('saga', data);

  try {
    const response:AxiosResponse = yield call(backend.post, `/companies/store`, data, { headers: { token } })
    console.log(response);
    yield put(loadSuccess(response.data))
  } catch(e) {
    yield put(loadFailure());
  }

}

export function* get() {
  const response:AxiosResponse = yield call(backend.get, `/companies`, { headers: { token } })

  if (response.status === 200) {
    yield put(loadSuccess(response.data))
  } else {
    yield put(loadFailure());
  }
}
