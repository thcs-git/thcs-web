import { put, call } from 'redux-saga/effects';

import axios from '../../../services/axios';

import { loadSuccess, loadFailure } from './actions';
import { CompanyInterface } from './types';

export function* get() {
  console.log('Executando get!!!')

  const { data } = yield call(axios.get, `52131305/json`);

  const company = {
    id: '',
    companyId: '',
    socialName: '',
    fantasyName: '',
    fiscalNumber: '',
    postalCode: data.cep,
    city: data.localidade,
    neighborhood: data.bairro,
    address: data.logradouro,
    addressNumber: '',
    addressComplement: '',
    email: '',
    phone: '',
    cellphone: '',
  };

  yield put(loadSuccess(company));
}
