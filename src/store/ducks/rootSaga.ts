import { all, takeLatest } from "redux-saga/effects";

import { AreaTypes } from "./areas/types";
import { get as getAreas } from "./areas/sagas";

import { LoginTypes } from "./login/types";
import { doLogin } from "./login/sagas";

import { CustomerTypes } from './customers/types';
import { get } from './customers/sagas';

import { CompanyTypes } from './companies/types';
import { getAddress, createCompany } from './companies/sagas';

import { SpecialtyTypes } from './specialties/types';
import { get as getSpecialty } from './specialties/sagas';

import { CouncilTypes } from './councils/types';
import { get as getCouncil } from './councils/sagas';

import { UserTypes } from './users/types';
import { createUser, getAddress as getAddressUser, getUserById, updateUser, get as getUsers } from './users/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(LoginTypes.LOAD_REQUEST, doLogin),
    // takeLatest(AreaTypes.LOAD_REQUEST, getAreas),
    // takeLatest(CustomerTypes.LOAD_REQUEST, get),
    takeLatest(SpecialtyTypes.LOAD_REQUEST, getSpecialty),
    takeLatest(CouncilTypes.LOAD_REQUEST, getCouncil),

    // Company
    takeLatest(CompanyTypes.CREATE_COMPANY_REQUEST, createCompany),
    takeLatest(CompanyTypes.LOAD_REQUEST_ADDRESS, getAddress),

    // Users
    takeLatest(UserTypes.LOAD_REQUEST, getUsers),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UserTypes.LOAD_REQUEST_ADDRESS, getAddressUser),
    takeLatest(UserTypes.LOAD_REQUEST_USER_BY_ID, getUserById),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
  ]);
}
