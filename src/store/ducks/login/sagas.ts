import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

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

    history.push('/');
    location.reload();

  } catch (err) {
    yield put(loadFailure()); console.log('passoiu');

    toast.error("E-mail e/ou senha errada.");
  }


}
