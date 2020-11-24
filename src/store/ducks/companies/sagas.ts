import { AxiosResponse } from 'axios';
import { put, call } from 'redux-saga/effects';

import { viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress } from './actions';
import { ViacepDataInterface } from './types';

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

export function* createCompany({payload}: any) {
  console.log(payload);
}
