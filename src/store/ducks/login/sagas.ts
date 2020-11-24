import { put, call } from 'redux-saga/effects';

import { apiSollar } from '../../../services/axios';
import history from '../../../routes/history';

import LOCALSTORAGE from '../../../helpers/constants/localStorage';

import { loadSuccess, loadFailure } from './actions';

export function* doLogin({ payload }: any) {
  try {
    const response = yield call(apiSollar.post, `/user/login`, payload.credentials)

    const { data } = response;

    localStorage.setItem(LOCALSTORAGE.TOKEN, data.token)

    yield put(loadSuccess(data));

    history.push('/dashboard');
    location.reload();

  } catch (err) {
    console.log(err);
    yield put(loadFailure());
  }


}
