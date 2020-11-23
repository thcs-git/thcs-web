import { put, call } from 'redux-saga/effects';

import axios from '../../../services/axios';

import { loadSuccess, loadFailure } from './actions';
import { AreaInterface } from './types';

export function* get() {
  console.log('Executando get!!!')

  // const { data } = yield call(axios.get, `52131305/json`);

  const area:AreaInterface = {
    id: '',
    description: '',
    supplyDay: 0,
    dayOfTheWeek: 0,
    users: [],
    neighborhoods: [],
    active: true,
  };

  yield put(loadSuccess(area));
}
