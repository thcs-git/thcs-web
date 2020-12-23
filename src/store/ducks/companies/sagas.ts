import { AxiosResponse } from 'axios';
import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { viacep, apiSollar } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress, createCompanySuccess, loadSuccessGetCompanyById, updateCompanySuccess } from './actions';
import { ViacepDataInterface } from './types';

const token = localStorage.getItem('token');

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(apiSollar.get, `/companies?limit=${params.limit ?? 10}&page=${params.page || 1}${params.search ? '&search=' + params.search : ''}`);

  try {
    yield put(loadSuccess(response.data))
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

export function* createCompany({ payload: { data } }: any) {
  console.log('data', data);
  try {
    const response:AxiosResponse = yield call(apiSollar.post, `/companies/store`, data, { headers: { token } })

    yield put(loadSuccess(response.data))
  } catch(e) {
    yield put(loadFailure());
  }

}

export function* store({ payload }: any) {
  const response: AxiosResponse = yield call(apiSollar.post, `/companies/store`, { ...payload });

  try {
    yield put(createCompanySuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/companies`, { params: { _id } })
    yield put(loadSuccessGetCompanyById(response.data))

  } catch (error) {
    yield put(loadFailure());
  }
}


export function* update({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/companies/${_id}/update`, { ...data })

    toast.success('Empresa atualizada com sucesso!');
    yield put(updateCompanySuccess(response.data[0]))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados da empresa");
    yield put(loadFailure());
  }
}

export function* searchCompany({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/companies/?limit=10${!!value ? '&search=' + value : ''}`)
    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.info("Não foi possível buscar os dados da empresa");
    yield put(loadFailure());
  }
}
