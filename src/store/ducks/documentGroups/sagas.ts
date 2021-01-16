import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { loadSuccess, loadFailure, loadSuccessByIds } from './actions';
import { loadRequestGetByCareId } from '../documents/actions';

import { apiSollar } from '../../../services/axios';

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = {...params};

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(apiSollar.get, `/documentsgroup?limit=${params.limit ?? 10}&page=${params.page ?? 1}`, { params: searchParams })

    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os atendimentos');
    yield put(loadFailure());
  }
}

export function* getByIds({ payload }: any) {
  try {
    const { ids } = payload;

    const response: AxiosResponse = yield call(apiSollar.get, `/documentsgroup/getDocumentsGroupByArrayIds`, { params: { ids } })

    yield put(loadSuccessByIds(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os atendimentos');
    yield put(loadFailure());
  }
}

export function* getCaptureList({ payload }: any) {
  try {
    const { care_id } = payload;

    const response: AxiosResponse = yield call(apiSollar.get, `/documentsgroup/getDocumentsGroupByArrayIds`, { params: { ids: '5ffd7acd2f5d2b1d8ff6bea4,5ffd79012f5d2b1d8ff6bea3,5ff65469b4d4ac07d186e99f' } });



    yield put(loadSuccessByIds(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os atendimentos');
    yield put(loadFailure());
  }
}
