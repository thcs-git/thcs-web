import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { apiSollar, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress, createPatientSuccess, loadSuccessGetPatientById, updatePatientSuccess } from './actions';
import { PatientInterface, ViacepDataInterface, LoadRequestParams } from './types';

const token = localStorage.getItem('token');

export function* get({ payload }: any) {
  const { params } = payload;

  const response: AxiosResponse = yield call(apiSollar.get, `/patient?limit=${params.limit ?? 10}&page=${params.page || 1}${params.search ? '&search=' + params.search : ''}`)

  try {
    yield put(loadSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getPatientById({ payload: { id: _id } }: any) {
  try {

    const response: AxiosResponse = yield call(apiSollar.get, `/patient`, { headers: { token }, params: { _id } })
    yield put(loadSuccessGetPatientById(response.data))

  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createPatient({ payload: { data } }: any) {
  try {
    const response:AxiosResponse = yield call(apiSollar.post, `/patient/store`, data, { headers: { token } })
    yield put(createPatientSuccess(response.data))
    toast.success('Paciente cadastrado com sucesso!');
  } catch(e) {
    toast.error('Erro ao cadastrar o paciente');
    yield put(loadFailure(data));
  }
}

export function* updatePatient({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/patient/${_id}/update`, { ...data }, { headers: { token } })

    toast.success('Paciente atualizado com sucesso!');
    yield put(updatePatientSuccess(response.data))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do paciente");
    yield put(loadFailure());
  }
}

export function* getAddress({ payload }:any) {
  try {
    const { data }: AxiosResponse<ViacepDataInterface> = yield call(viacep.get, `${payload.postalCode}/json`);

    if (data.erro) {
      yield put(loadFailure());
      return;
    }

    yield put(successGetAddress(data));
  } catch (error) {
    toast.error("Não foi possível obter os dados do endereço");
    yield put(loadFailure());
  }
}

export function* searchPatient({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/patient/?limit=10&page=1${!!value ? '&search=' + value : ''}`)
    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.info("Não foi possível buscar os dados do paciente");
    yield put(loadFailure());
  }
}
