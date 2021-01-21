import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { loadSuccess, loadFailure, createDocumentSuccess, loadSuccessGetByCareId } from './actions';

import { apiSollar, ibge } from '../../../services/axios';

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = params;

    delete searchParams.limit;
    delete searchParams.page;

    console.log('search params documents', searchParams);

    const response: AxiosResponse = yield call(apiSollar.get, `/documents?limit=${params.limit ?? 10}&page=${params.page || 1}`, { params: searchParams })

    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

export function* store({ payload }: any) {

  console.log('saga document payload', payload)

  const response: AxiosResponse = yield call(apiSollar.post, `/documents/store`, { ...payload });

  try {
    yield put(createDocumentSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getByCareId({ payload }: any) {

  const response: AxiosResponse = yield call(apiSollar.get, `/documents/indexAndParams`, { params: {...payload } });

  try {
    yield put(loadSuccessGetByCareId(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}
