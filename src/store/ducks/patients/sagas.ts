import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { apiSollar, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, successGetAddress, createPatientSuccess, loadSuccessGetPatientById, updatePatientSuccess } from './actions';
import { PatientInterface, ViacepDataInterface } from './types';

const token = localStorage.getItem('token');

export function* get() {
  const response: AxiosResponse = yield call(apiSollar.get, `/patient`, { headers: { token } })

  try {
    yield put(loadSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getPatientById({ payload: { id: _id } }: any) {
  try {

    const response: AxiosResponse = yield call(apiSollar.get, `/patient`, { headers: { token }, params: { _id } })
    yield put(loadSuccessGetPatientById(response.data[0]))

  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createPatient({payload: { data }}: any) {
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

  delete data.phone;
  delete data.cellphone;

  try {
    const response:AxiosResponse = yield call(apiSollar.post, `/patient/store`, data, { headers: { token } })
    yield put(createPatientSuccess(response.data))
    toast.success('Paciente cadastrado com sucesso!');
  } catch(e) {
    toast.error('Erro ao cadastrar o paciente');
    yield put(loadFailure());
  }
}

export function* updatePatient({ payload: { data } }: any) {
  const { _id } = data;

  console.log('!!!! data', data);

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/patient/${_id}/update`, { ...data }, { headers: { token } })

    toast.success('Paciente atualizado com sucesso!');
    yield put(updatePatientSuccess(response.data))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do paciente");
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
    toast.error("Não foi possível obter os dados do endereço");
    yield put(loadFailure());
  }
}
