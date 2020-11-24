import { put, call } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../routes/history';


import { loadSuccess, loadFailure } from './actions';

export function* doLogin({payload}: any) {
  try {
    console.log('payload.credentials', payload.credentials)
    const response = yield call(api.post, `/user/login`, payload.credentials)
    console.log(response);

    const { data } = response;

    localStorage.setItem('token', data.token);

    yield put(loadSuccess(data));

    // yield put(push('/dashboard'));
    history.push('/dashboard');
    location.reload();

  } catch (err) {
    console.log(err);
    yield put(loadFailure());
  }


}
