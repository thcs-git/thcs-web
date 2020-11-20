import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import api from '../../../services/api';

import { loadSuccess, loadFailure } from './actions';

export function* doLogin({payload}: any) {
  try {
    const response = yield call(api.post, `/user/login`, payload.credentials)
    console.log(response);

    const { data } = response;

    yield put(loadSuccess(data));

    yield put(push('/dashboard'));

  } catch (err) {
    console.log(err);
    yield put(loadFailure());
  }


}
