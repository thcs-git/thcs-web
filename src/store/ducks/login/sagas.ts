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

    localStorage.removeItem(LOCALSTORAGE.TOKEN);
    localStorage.removeItem(LOCALSTORAGE.USERNAME);
    localStorage.removeItem(LOCALSTORAGE.USER_ID);
    localStorage.removeItem(LOCALSTORAGE.COMPANY_SELECTED);
    localStorage.removeItem(LOCALSTORAGE.COMPANY_NAME);
    localStorage.removeItem(LOCALSTORAGE.CUSTOMER);
    localStorage.removeItem(LOCALSTORAGE.CUSTOMER_NAME);

    localStorage.setItem(LOCALSTORAGE.TOKEN, data.token)
    localStorage.setItem(LOCALSTORAGE.USERNAME, data.username)
    localStorage.setItem(LOCALSTORAGE.USER_ID, data._id)
    localStorage.setItem(LOCALSTORAGE.CUSTOMER, data.customer_id?._id || null)
    localStorage.setItem(LOCALSTORAGE.CUSTOMER_NAME, data.customer_id?.name || null)

    if (data.companies.length > 0) {
      localStorage.setItem(LOCALSTORAGE.COMPANY_SELECTED, data.companies[0]._id || null)
      localStorage.setItem(LOCALSTORAGE.COMPANY_NAME, data.companies[0].name || null)
    }


    yield put(loadSuccess(data));

    history.push('/');
    location.reload();

  } catch (err) {
    console.log('err', err);
    yield put(loadFailure());

    toast.error("E-mail e/ou senha errada.");
  }


}
