import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { loadSuccess, loadFailure, createAreaSuccess, loadSuccessGetAreaById, updateAreaSuccess, loadSuccessGetDistricts } from './actions';

import { apiSollar, ibge } from '../../../services/axios';

const token = localStorage.getItem('token');

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    const response: AxiosResponse = yield call(apiSollar.get, `/patientarea?limit=${params.limit ?? 10}&page=${params.page || 1}`,)

    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.error('Erro ao buscar as áreas');
    yield put(loadFailure());
  }
}

export function* getAreaById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/patientarea`, { headers: { token }, params: { _id } })

    yield put(loadSuccessGetAreaById(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createArea({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.post, `/patientarea/store`, data, { headers: { token } })

    yield put(createAreaSuccess(response.data))

    toast.success('Area cadastrado com sucesso!');
  } catch (e) {
    toast.error('Erro ao cadastrar o area');
    yield put(loadFailure());
  }
}

export function* updateArea({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/patientarea/${_id}/update`, { ...data }, { headers: { token } })

    toast.success('Area atualizado com sucesso!');
    yield put(updateAreaSuccess(response.data))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados da area");
    yield put(loadFailure());
  }
}

export function* getDistricts({ payload: { name } }: any) {
  try {
    const { data }: AxiosResponse = yield call(apiSollar.get, `/location${!!name ? '?name=' + name.toUpperCase() : ''}`);

    if (data.erro) {
      yield put(loadFailure());
      return;
    }

    yield put(loadSuccessGetDistricts(data));
  } catch (error) {
    toast.error("Não foi possível obter os dados do endereço");
    yield put(loadFailure());
  }
}

export function* searchArea({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/patientarea/?limit=10&page=1${!!value ? '&search=' + value : ''}`)
    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.info("Não foi possível buscar os dados da área");
    yield put(loadFailure());
  }
}

