import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import {
  loadSuccess,
  loadFailure, createCareSuccess,
  loadSuccessGetCareById,
  updateCareSuccess,
  searchCareSuccess,
  actionDocumentGroupSocioAmbiental,
  actionDocumentSocioAmbiental,
  actionDocumentSocioAmbientalStore,
  actionDocumentSocioAmbientalUpdate,
  actionDocumentGroupAbemid,
  actionDocumentAbemid,
  actionDocumentAbemidStore,
  actionDocumentAbemidUpdate,
  actionDocumentGroupNead,
  actionDocumentNead,
  actionDocumentNeadStore,
  actionDocumentNeadUpdate
} from './actions';

import { apiSollar } from '../../../services/axios';

const token = localStorage.getItem('token');

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = params;

    delete searchParams.limit;
    delete searchParams.page;

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

    const response: AxiosResponse = yield call(apiSollar.get, `/care?limit=${params.limit ?? 10}&page=${params.page || 1}`, { params: searchParams })

    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os atendimentos');
    yield put(loadFailure());
  }
}

export function* getCareById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/care`, { headers: { token }, params: { _id } });

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

/**
 * Documento Socioambiental
 */

export function* getDocumentGroupSocioAmbiental() {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/documentsgroup?limit=1&page=1`, { params: { _id: '5ffd79012f5d2b1d8ff6bea3' } })

    yield put(actionDocumentGroupSocioAmbiental(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

export function* getDocumentSocioAmbiental({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = { ...params, document_group_id: '5ffd79012f5d2b1d8ff6bea3' };

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(apiSollar.get, `/documents?limit=${params?.limit || 10}&page=${params?.page || 1}`, { params: searchParams });

    const data = response.data.data.length > 0 ? response.data.data[0] : response.data;

    yield put(actionDocumentSocioAmbiental(data))
  } catch (error) {
    console.log('error', error)
    toast.error('Erro ao buscar dados do documento socioambiental');
    yield put(loadFailure());
  }
}

export function* storeDocumentSocioAmbiental({ payload }: any) {
  try {

    const response: AxiosResponse = yield call(apiSollar.post, `/documents/store`, { ...payload, document_group_id: '5ffd79012f5d2b1d8ff6bea3' });

    yield put(actionDocumentSocioAmbientalStore(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

export function* updateDocumentSocioAmbiental({ payload }: any) {
  try {
    const { _id } = payload;

    console.log('payload', payload)

    delete payload._id;

    const response: AxiosResponse = yield call(apiSollar.put, `/documents/${_id}/update`, { ...payload });

    yield put(actionDocumentSocioAmbientalUpdate(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

/**
 * Documento ABEMID
 */

export function* getDocumentGroupAbemid() {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/documentsgroup?limit=1&page=1`, { params: { _id: '5ffd7acd2f5d2b1d8ff6bea4' } })

    yield put(actionDocumentGroupAbemid(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

export function* getDocumentAbemid({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = { ...params, document_group_id: '5ffd7acd2f5d2b1d8ff6bea4' };

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(apiSollar.get, `/documents?limit=${params?.limit || 10}&page=${params?.page || 1}`, { params: searchParams });

    const data = response.data.data.length > 0 ? response.data.data[0] : response.data;

    yield put(actionDocumentAbemid(data))
  } catch (error) {
    console.log('error', error)
    toast.error('Erro ao buscar dados do documento abemid');
    yield put(loadFailure());
  }
}

export function* storeDocumentAbemid({ payload }: any) {
  try {

    const response: AxiosResponse = yield call(apiSollar.post, `/documents/store`, { ...payload, document_group_id: '5ffd7acd2f5d2b1d8ff6bea4' });

    yield put(actionDocumentAbemidStore(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

export function* updateDocumentAbemid({ payload }: any) {
  try {
    const { _id } = payload;

    console.log('payload', payload)

    delete payload._id;

    const response: AxiosResponse = yield call(apiSollar.put, `/documents/${_id}/update`, { ...payload });

    yield put(actionDocumentAbemidUpdate(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}


/**
 * Documento NEAD
 */

export function* getDocumentGroupNead() {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/documentsgroup?limit=1&page=1`, { params: { _id: '5ff65469b4d4ac07d186e99f' } })

    yield put(actionDocumentGroupNead(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

export function* getDocumentNead({ payload }: any) {
  try {
    const { params } = payload;
    const searchParams = { ...params, document_group_id: '5ff65469b4d4ac07d186e99f' };

    delete searchParams.limit;
    delete searchParams.page;

    const response: AxiosResponse = yield call(apiSollar.get, `/documents?limit=${params?.limit || 10}&page=${params?.page || 1}`, { params: searchParams });

    const data = response.data.data.length > 0 ? response.data.data[0] : response.data;

    yield put(actionDocumentNead(data))
  } catch (error) {
    console.log('error', error)
    toast.error('Erro ao buscar dados do documento nead');
    yield put(loadFailure());
  }
}

export function* storeDocumentNead({ payload }: any) {
  try {

    const response: AxiosResponse = yield call(apiSollar.post, `/documents/store`, { ...payload, document_group_id: '5ff65469b4d4ac07d186e99f' });

    yield put(actionDocumentNeadStore(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}

export function* updateDocumentNead({ payload }: any) {
  try {
    const { _id } = payload;

    console.log('payload', payload)

    delete payload._id;

    const response: AxiosResponse = yield call(apiSollar.put, `/documents/${_id}/update`, { ...payload });

    yield put(actionDocumentNeadUpdate(response.data))
  } catch (error) {
    toast.error('Erro ao buscar os grupos de documentos');
    yield put(loadFailure());
  }
}
