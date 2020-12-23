import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { apiSollar, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress, createUserSuccess, loadSuccessGetUserById, updateUserSuccess } from './actions';
import { UserInterface, ViacepDataInterface } from './types';

const token = localStorage.getItem('token');

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(apiSollar.get, `/user?limit=${params.limit ?? 10}&page=${params.page || 1}${params.search ? '&search=' + params.search : ''}`)

  try {
    yield put(loadSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getUserById({ payload: { id: _id } }: any) {

  try {

    const response: AxiosResponse = yield call(apiSollar.get, `/user`, { headers: { token }, params: { _id } })

    yield put(loadSuccessGetUserById(response.data))

  } catch (error) {
    yield put(loadFailure());
  }


}

export function* createUser({payload: { data }}: any) {
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
  data.password = data.fiscal_number;

  data.phones = phones;

  data.user_type_id = { _id: '5fc05d1803058800244bc41b' }

  try {
    const response:AxiosResponse = yield call(apiSollar.post, `/user/store`, data, { headers: { token } })
    yield put(createUserSuccess(response.data))
    toast.success('Usuário atualizado com sucesso!');
  } catch(e) {
    toast.error('Não foi possível cadastrar o usuário');
    yield put(loadFailure());
  }
}

export function* updateUser({ payload: { data } }: any) {
  const { _id } = data;

  const phones = [];

  if (data?.phone?.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.phone
    });
  }

  if (data?.cellphone?.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.cellphone
    });
  }

  data.phones = phones;

  delete data.phone;
  delete data.cellphone;

  data.user_type_id = { _id: '5fc05d1803058800244bc41b' }

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/user/${_id}/update`, { ...data }, { headers: { token } })

    console.log(response.data);

    toast.success('Usuário atualizado com sucesso!');
    yield put(updateUserSuccess(response.data))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do usuario");
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


export function* searchUser({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/user/?limit=10&page=1${!!value ? '&search=' + value : ''}`)
    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.info("Não foi possível buscar os dados do usuário");
    yield put(loadFailure());
  }
}
