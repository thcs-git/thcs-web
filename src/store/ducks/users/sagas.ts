import { put, call } from 'redux-saga/effects';

// import axios from '../../../services/axios';

import { loadSuccess, loadFailure } from './actions';
import { UserInterface } from './types';

export function* get() {
  console.log('Executando get!!!')

  // const { data } = yield call(axios.get, `52131305/json`);

  // const user = {
  //   id: '',
  //   companyId: '',
  //   name: '',
  //   birthdayDate: '',
  //   gender: '',
  //   rg: '',
  //   dispatchingAgency: '',
  //   fiscalNumber: '',
  //   motherName: '',
  //   nationality: '',
  //   postalCode: '',
  //   city: '',
  //   neighborhood: '',
  //   address: '',
  //   addressNumber: '',
  //   addressComplement: '',
  //   state: '',
  //   email: '',
  //   phone: '',
  //   cellphone: '',
  //   userType: '',
  //   especialties: [],
  //   council: '',
  //   councilNumber: '',
  // };

  // yield put(loadSuccess(user));
}
