import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { apiSollar, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress, createUserSuccess, loadSuccessGetUserById } from './actions';
import { UserInterface, ViacepDataInterface } from './types';

const token = localStorage.getItem('token');

export function* get() {
  const response: AxiosResponse = yield call(apiSollar.get, `/user`, { headers: { token } })

  try {
    yield put(loadSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getUserById({ payload: { id: _id } }: any) {

  try {

    const response: AxiosResponse = yield call(apiSollar.get, `/user`, { headers: { token }, params: { _id } })
    yield put(loadSuccessGetUserById(response.data[0]))

  } catch (error) {
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
  }

  data.username = data.email;
  data.password = data.cpf;
  data.phones = phones;

  try {
    const response:AxiosResponse = yield call(apiSollar.post, `/user/store`, data, { headers: { token } })
    yield put(createUserSuccess(response.data))
  } catch(e) {
    yield put(loadFailure());
  }
}

export function* updateUser({ payload: { data } }: any) {
  const { _id } = data;

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
  }

  data.phones = phones;

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/user/${_id}/update`, { ...data }, { headers: { token } })

    toast.success('Usuário atualizado com sucesso!');
    yield put(loadSuccessGetUserById(response.data[0]))
  } catch (error) {
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
