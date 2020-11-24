import { all, takeLatest } from "redux-saga/effects";

import { AreaTypes } from "./areas/types";
import { get as getAreas } from "./areas/sagas";

import { LoginTypes } from "./login/types";
import { doLogin } from "./login/sagas";

import { CustomerTypes } from './customers/types';
import { get } from './customers/sagas';

import { CompanyTypes } from './companies/types';
import { getAddress, createCompany } from './companies/sagas';

import { EspecialtyTypes } from './especialties/types';
import { get as getEspecialty } from './especialties/sagas';

import { CouncilTypes } from './councils/types';
import { get as getCouncil } from './councils/sagas';

import { UserTypes } from './users/types';
import { get as getUser } from './users/sagas';

export default function* rootSaga() {
  return yield all([
    // takeLatest(AreaTypes.LOAD_REQUEST, getAreas),
    // takeLatest(CustomerTypes.LOAD_REQUEST, get),
    // takeLatest(EspecialtyTypes.LOAD_REQUEST, getEspecialty),
    // takeLatest(CouncilTypes.LOAD_REQUEST, getCouncil),
    takeLatest(LoginTypes.LOAD_REQUEST, doLogin),
    takeLatest(CompanyTypes.CREATE_COMPANY_REQUEST, createCompany),
    takeLatest(CompanyTypes.LOAD_REQUEST_ADDRESS, getAddress),
  ]);
}
