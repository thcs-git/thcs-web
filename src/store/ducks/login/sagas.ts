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

    console.log('data', data);

    localStorage.setItem(LOCALSTORAGE.TOKEN, data.token)
    localStorage.setItem(LOCALSTORAGE.USERNAME, data.username)
    localStorage.setItem(LOCALSTORAGE.USER_ID, data._id)
    localStorage.setItem(LOCALSTORAGE.COMPANY_SELECTED, data.companies[0]._id || null)
    localStorage.setItem(LOCALSTORAGE.CUSTOMER, data.companies[0].customer_id || null)

    yield put(loadSuccess(data));

    history.push('/');
    location.reload();

  } catch (err) {
    yield put(loadFailure());

    toast.error("E-mail e/ou senha errada.");
  }


}
