import { put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { apiSollar } from '../../../services/axios';

import { loadSuccess, loadFailure, createCouncilSuccess, loadSuccessGetCouncilById, updateCouncilSuccess } from './actions';
import { CouncilInterface } from './types';

export function* get() {
  const response: AxiosResponse = yield call(apiSollar.get, `/council`);

  try {
    yield put(loadSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* store({ payload }: any) {
  const response: AxiosResponse = yield call(apiSollar.post, `/council/store`, { ...payload });

  try {
    yield put(createCouncilSuccess(response.data))
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/council`, { params: { _id } })
    yield put(loadSuccessGetCouncilById(response.data[0]))

  } catch (error) {
    yield put(loadFailure());
  }
}


export function* update({ payload: { data } }: any) {
  const { _id } = data;

  try {
    const response: AxiosResponse = yield call(apiSollar.put, `/council/${_id}/update`, { ...data })

    toast.success('Conselho atualizado com sucesso!');
    yield put(updateCouncilSuccess(response.data[0]))
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do conselho");
    yield put(loadFailure());
  }
}
