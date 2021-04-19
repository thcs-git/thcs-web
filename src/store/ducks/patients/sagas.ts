import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { apiSollar, googleMaps, viacep } from '../../../services/axios';

import { loadSuccess, loadFailure, loadFailureCreatePatient, successGetAddress, createPatientSuccess, loadSuccessGetPatientById, updatePatientSuccess, setIfRegistrationCompleted } from './actions';
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

    if (data.address_id.postal_code) {
      let { street, number, district, city, state } = data.address_id;

      try {
        const { data: googleAddressData }: AxiosResponse = yield googleMaps.get(
          `/geocode/json?address=${street},${number},${district},${city},${state}`
        );

        if (googleAddressData.results) {
          const { lat: latitude, lng: longitude } = googleAddressData.results[0].geometry.location;
          data.address_id.geolocation = { latitude, longitude }
        }
      } catch (e) {
        console.error('Get google maps data', e.message);
      }
    }

    const response: AxiosResponse = yield call(apiSollar.post, `/patient/store`, data, { headers: { token } })
    yield put(createPatientSuccess(response.data))
    yield put(setIfRegistrationCompleted(true, response.data._id));

    toast.success('Paciente cadastrado com sucesso!');
  } catch (e) {
    toast.error('Erro ao cadastrar o paciente');
    yield put(setIfRegistrationCompleted(false));
    yield put(loadFailureCreatePatient());
  }
}

export function* updatePatient({ payload: { data } }: any) {
  const { _id } = data;

  if (data.address_id.postal_code) {
    let { street, number, district, city, state } = data.address_id;

    try {
      const { data: googleAddressData }: AxiosResponse = yield googleMaps.get(
        `/geocode/json?address=${street},${number},${district},${city},${state}`
      );

      if (googleAddressData.results) {
        const { lat: latitude, lng: longitude } = googleAddressData.results[0].geometry.location;
        data.address_id.geolocation = { latitude, longitude }
      }
    } catch (e) {
      console.error('Get google maps data', e.message);
    }
  }

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/patient/${_id}/update`, { ...data }, { headers: { token } })

    toast.success('Paciente atualizado com sucesso!');
    yield put(updatePatientSuccess(response.data))
    yield put(setIfRegistrationCompleted(true));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do paciente");
    yield put(setIfRegistrationCompleted(false));
    yield put(loadFailure());
  }
}

export function* getAddress({ payload }: any) {
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

export function* searchPatient({ payload: { params } }: any) {
  try {
    let searchQuery, requestParams;

    if (typeof params === 'string') {
      searchQuery = `&search=${params}`
    } else {
      requestParams = params;

      delete requestParams.limit;
      delete requestParams.page;

      requestParams = { params: requestParams };
    }

    const response: AxiosResponse = yield call(apiSollar.get, `/patient/?limit=${params.limit ?? 10}&page=${params.page || 1}${searchQuery}`, requestParams)
    yield put(loadSuccess(response.data))
  } catch (error) {
    toast.info("Não foi possível buscar os dados do paciente");
    yield put(loadFailure());
  }
}
