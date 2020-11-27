import { put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { apiSollar } from '../../../services/axios';

import { loadSuccess, loadFailure } from './actions';
import { CouncilInterface } from './types';

export function* get() {
  console.log('Executando get!!!')

  const response: AxiosResponse = yield call(apiSollar.get, `/council`);

  try {
    yield put(loadSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}
