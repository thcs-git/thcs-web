import { all, takeLatest } from "redux-saga/effects";

import { AreaTypes } from "./areas/types";
import { get as getAreas, createArea, updateArea, getAreaById, getDistricts, searchArea } from "./areas/sagas";

import { LoginTypes } from "./login/types";
import { doLogin } from "./login/sagas";

import { CustomerTypes } from './customers/types';
import { get, getCustomerById, getAddress as getAddressCustomer, createCompanyCustomer, updateCompanyCustomer, searchCustomer } from './customers/sagas';

import { CompanyTypes } from './companies/types';
import { get as getCompanies, getAddress, createCompany, getById as getCompanyById, update as updateCompany, searchCompany } from './companies/sagas';

import { SpecialtyTypes } from './specialties/types';
import { get as getSpecialties, store as storeSpecialty, getById as getSpecialtyById, update as updateSpecialty } from './specialties/sagas';

import { CouncilTypes } from './councils/types';
import { get as getCouncils, store as storeCouncil, getById as getCouncilById, update as updateCouncil, searchConcil } from './councils/sagas';

import { PatientTypes } from './patients/types';
import { get as getPatients, createPatient, getAddress as getAddressPatient, getPatientById, updatePatient } from './patients/sagas';

import { UserTypes } from './users/types';
import { get as getUsers, createUser, getAddress as getAddressUser, getUserById, updateUser } from './users/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(LoginTypes.LOAD_REQUEST, doLogin),
    // takeLatest(AreaTypes.LOAD_REQUEST, getAreas),
    // takeLatest(EspecialtyTypes.LOAD_REQUEST, getEspecialty),
    // takeLatest(CouncilTypes.LOAD_REQUEST, getCouncil),
    // takeLatest(CustomerTypes.LOAD_REQUEST, get),

    // Area
    takeLatest(AreaTypes.LOAD_REQUEST, getAreas),
    takeLatest(AreaTypes.LOAD_REQUEST_AREA_BY_ID, getAreaById),
    takeLatest(AreaTypes.CREATE_AREA_REQUEST, createArea),
    takeLatest(AreaTypes.UPDATE_AREA_REQUEST, updateArea),
    takeLatest(AreaTypes.LOAD_GET_DISTRICTS, getDistricts),
    takeLatest(AreaTypes.SEARCH_REQUEST, searchArea),

    // Council
    takeLatest(CouncilTypes.LOAD_REQUEST, getCouncils),
    takeLatest(CouncilTypes.LOAD_REQUEST_COUNCIL_BY_ID, getCouncilById),
    takeLatest(CouncilTypes.CREATE_COUNCIL_REQUEST, storeCouncil),
    takeLatest(CouncilTypes.UPDATE_COUNCIL_REQUEST, updateCouncil),
    takeLatest(CouncilTypes.SEARCH_REQUEST, searchConcil),

    // Specialty
    takeLatest(SpecialtyTypes.LOAD_REQUEST, getSpecialties),
    takeLatest(SpecialtyTypes.LOAD_REQUEST_SPECIALTY_BY_ID, getSpecialtyById),
    takeLatest(SpecialtyTypes.CREATE_SPECIALTY_REQUEST, storeSpecialty),
    takeLatest(SpecialtyTypes.UPDATE_SPECIALTY_REQUEST, updateSpecialty),

    // Company
    takeLatest(CompanyTypes.LOAD_REQUEST, getCompanies),
    takeLatest(CompanyTypes.LOAD_REQUEST_ADDRESS, getAddress),
    takeLatest(CompanyTypes.LOAD_REQUEST_COMPANY_BY_ID, getCompanyById),
    takeLatest(CompanyTypes.CREATE_COMPANY_REQUEST, createCompany),
    takeLatest(CompanyTypes.UPDATE_COMPANY_REQUEST, updateCompany),
    takeLatest(CompanyTypes.SEARCH_REQUEST, searchCompany),

    /** Customers */
    takeLatest(CustomerTypes.LOAD_REQUEST, get),
    takeLatest(CustomerTypes.LOAD_REQUEST_BY_ID, getCustomerById),
    takeLatest(CustomerTypes.LOAD_REQUEST_ADDRESS, getAddressCustomer),
    takeLatest(CustomerTypes.CREATE_CUSTOMER_REQUEST, createCompanyCustomer),
    takeLatest(CustomerTypes.UPDATE_CUSTOMER_REQUEST, updateCompanyCustomer),
    takeLatest(CustomerTypes.SEARCH_REQUEST, searchCustomer),

    /** Patients */
    takeLatest(PatientTypes.LOAD_REQUEST, getPatients),
    takeLatest(PatientTypes.CREATE_PATIENT_REQUEST, createPatient),
    takeLatest(PatientTypes.LOAD_REQUEST_ADDRESS, getAddressPatient),
    takeLatest(PatientTypes.LOAD_REQUEST_PATIENT_BY_ID, getPatientById),
    takeLatest(PatientTypes.UPDATE_PATIENT_REQUEST, updatePatient),

    /** Users */
    takeLatest(UserTypes.LOAD_REQUEST, getUsers),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UserTypes.LOAD_REQUEST_ADDRESS, getAddressUser),
    takeLatest(UserTypes.LOAD_REQUEST_USER_BY_ID, getUserById),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
  ]);
}
