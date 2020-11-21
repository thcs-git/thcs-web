import { put, call } from 'redux-saga/effects';

import axios from '../../../services/axios';

import { loadSuccess, loadFailure } from './actions';
import { CouncilInterface } from './types';

export function* get() {
  console.log('Executando get!!!')

  // const { data } = yield call(axios.get, `52131305/json`);

  const council = {
    id: '',
    description: '',
    initials: '',
    active: true,
  };

  yield put(loadSuccess(council));
}
