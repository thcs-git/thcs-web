import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { loadSuccess, loadFailure, createCareSuccess, loadSuccessGetCareById, updateCareSuccess, searchCareSuccess } from './actions';

import { apiSollar, ibge } from '../../../services/axios';

const token = localStorage.getItem('token');

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = params;

    delete searchParams.limit;
    delete searchParams.page;

    console.log('search params', searchParams);

    const response: AxiosResponse = yield call(apiSollar.get, `/care?limit=${params.limit ?? 10}&page=${params.page || 1}`, { params: searchParams })

    yield put(searchCareSuccess(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os atendimentos');
    yield put(loadFailure());
  }
}

export function* search({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = params;

    delete searchParams.limit;
    delete searchParams.page;

    console.log('search params', searchParams);

    const response: AxiosResponse = yield call(apiSollar.get, `/care?limit=${params.limit ?? 10}&page=${params.page || 1}`, { params: searchParams })

    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os atendimentos');
    yield put(loadFailure());
  }
}

export function* getCareById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/care`, { headers: { token }, params: { _id } })

    yield put(loadSuccessGetCareById(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createCare({payload: { data }}: any) {
  try {
    const response:AxiosResponse = yield call(apiSollar.post, `/care/store`, data, { headers: { token } })

    yield put(createCareSuccess(response.data))

    toast.success('Atendimento cadastrado com sucesso!');
  } catch(e) {
    toast.error('Erro ao cadastrar o atendimento');
    yield put(loadFailure());
  }
}

export function* updateCare({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/care/${_id}/update`, { ...data }, { headers: { token } })

    toast.success('Atendimento atualizado com sucesso!');
    yield put(updateCareSuccess(response.data))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do atendimento");
    yield put(loadFailure());
  }
}
