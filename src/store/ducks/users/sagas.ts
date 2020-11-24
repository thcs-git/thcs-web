import { put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { backend, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress, createUserSuccess } from './actions';
import { UserInterface, ViacepDataInterface } from './types';

const token = localStorage.getItem('token');

export function* get() {
  const response:AxiosResponse = yield call(backend.get, `/user`, { headers: { token } })

  if (response.status === 200) {
    yield put(loadSuccess(response.data))
  } else {
    yield put(loadFailure());
  }
}

export function* getUserById({ payload: { id: _id } }: any) {
  const response:AxiosResponse = yield call(backend.get, `/user`, { headers: { token }, params: { _id } })

  if (response.status === 200) {
    yield put(loadSuccess(response.data[0]))
  } else {
    yield put(loadFailure());
  }
}

export function* createUser({payload: { data }}: any) {
  console.log('create user payload', data)

  const phones = [];

  if (data.phone.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.phone
    });
  }

  if (data.cellphone.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.cellphone
    });

    delete data.cellphone;
  }

  data.username = data.email;
  data.password = data.cpf;

  try {
    const response:AxiosResponse = yield call(backend.post, `/user/store`, data, { headers: { token } })
    yield put(createUserSuccess(response.data))
  } catch(e) {
    yield put(loadFailure());
  }
}

export function* updateUser({ payload: { data } }: any) {
  const { _id } = data;

  console.log('update', data);

  delete data._id;

  const response:AxiosResponse = yield call(backend.put, `/user/${_id}/update`, { data }, { headers: { token } })

  console.log('update response', response);

  if (response.status === 200) {
    yield put(loadSuccess(response.data[0]))
  } else {
    yield put(loadFailure());
  }
}

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
