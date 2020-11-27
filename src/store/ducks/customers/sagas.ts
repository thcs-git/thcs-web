import { put, call } from 'redux-saga/effects';

import { apiSollar } from '../../../services/axios';

import { loadSuccess, loadFailure } from './actions';

export function* get() {

  try {
    const { data } = yield call(apiSollar.get, '/client');

    yield put(loadSuccess(data));
  } catch (error) {
    yield put(loadFailure());
  }

}
