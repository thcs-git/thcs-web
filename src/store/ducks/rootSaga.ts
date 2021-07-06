import { cleanAction } from "./customers/actions";
import { all, takeLatest } from "redux-saga/effects";

import { AreaTypes } from "./areas/types";
import {
  get as getAreas,
  createArea,
  updateArea,
  getAreaById,
  getDistricts,
  searchArea,
  getCitys,
  getDistrict,
  getPoints,
} from "./areas/sagas";

import { LoginTypes } from "./login/types";
import { doLogin } from "./login/sagas";

import { CustomerTypes } from "./customers/types";
import {
  get,
  getCustomerById,
  getAddress as getAddressCustomer,
  createCompanyCustomer,
  updateCompanyCustomer,
  searchCustomer,
} from "./customers/sagas";

import { CompanyTypes } from "./companies/types";
import {
  get as getCompanies,
  getAddress,
  store as createCompany,
  getById as getCompanyById,
  update as updateCompany,
  searchCompany,
} from "./companies/sagas";

import { SpecialtyTypes } from "./specialties/types";
import {
  get as getSpecialties,
  store as storeSpecialty,
  getById as getSpecialtyById,
  update as updateSpecialty,
  searchSpecialty,
} from "./specialties/sagas";

import { CouncilTypes } from "./councils/types";
import {
  get as getCouncils,
  store as storeCouncil,
  getById as getCouncilById,
  update as updateCouncil,
  searchConcil,
} from "./councils/sagas";

import { DocumentTypes } from "./documents/types";
import {
  store as storeDocuments,
  getByCareId as getDocumentsByCareId,
  get as getDocuments,
} from "./documents/sagas";

import { DocumentGroupTypes } from "./documentGroups/types";
import {
  get as getDocumentGroups,
  getByIds as getDocumentGroupsByIds,
} from "./documentGroups/sagas";

import { PatientTypes } from "./patients/types";
import {
  get as getPatients,
  createPatient,
  getAddress as getAddressPatient,
  getPatientById,
  updatePatient,
  searchPatient,
  getPatientCapture,
} from "./patients/sagas";

import { UserTypes } from "./users/types";

//import { CareTypes } from './cares/types';
import {
  get as getUsers,
  createUser,
  getAddress as getAddressUser,
  getUserById,
  updateUser,
  searchUser,
  getProfessions,
  getUserTypes,
  loadGetUserDisengaged,
  searchUserDisengaged,
  checkEmail,
  getUserByEmail,
  recoveryPassword,
  recoverypasswordiftoken,
} from "./users/sagas";

import { CareTypes } from "./cares/types";
import {
  get as getCares,
  createCare,
  getCareById,
  updateCare,
  search as searchCare,
  getDocumentGroupSocioAmbiental,
  getDocumentSocioAmbiental,
  storeDocumentSocioAmbiental,
  updateDocumentSocioAmbiental,
  getDocumentGroupAbemid,
  getDocumentAbemid,
  storeDocumentAbemid,
  updateDocumentAbemid,
  getDocumentGroupNead,
  getDocumentNead,
  storeDocumentNead,
  updateDocumentNead,
  getHealthInsurance,
  getHealthPlan,
  getHealthSubPlan,
  getAccommodationType,
  getCareType,
  searchCid,
  getDocumentById,
  getSchedule,
  storeSchedule,
  updateSchedule,
  deleteSchedule,
} from "./cares/sagas";

import { get as getProfession } from "./professions/sagas";
import { ProfessionTypes } from "./professions/types";
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
    takeLatest(AreaTypes.LOAD_GET_CITYS, getCitys),
    takeLatest(AreaTypes.LOAD_GET_DISTRICTS_, getDistrict),
    takeLatest(AreaTypes.SEARCH_REQUEST, searchArea),
    takeLatest(AreaTypes.LOAD_POINTS_AREA, getPoints),
    takeLatest(AreaTypes.CLEAN, cleanAction),

    // Care
    takeLatest(CareTypes.LOAD_REQUEST, getCares),
    takeLatest(CareTypes.LOAD_REQUEST_CARE_BY_ID, getCareById),
    takeLatest(CareTypes.CREATE_CARE_REQUEST, createCare),
    takeLatest(CareTypes.UPDATE_CARE_REQUEST, updateCare),
    takeLatest(CareTypes.SEARCH_CARE_REQUEST, searchCare),

    takeLatest(
      CareTypes.DOCUMENT_GROUP_SOCIOAMBIENTAL_REQUEST,
      getDocumentGroupSocioAmbiental
    ),
    takeLatest(
      CareTypes.DOCUMENT_SOCIOAMBIENTAL_REQUEST,
      getDocumentSocioAmbiental
    ),
    takeLatest(
      CareTypes.DOCUMENT_SOCIOAMBIENTAL_STORE_REQUEST,
      storeDocumentSocioAmbiental
    ),
    takeLatest(
      CareTypes.DOCUMENT_SOCIOAMBIENTAL_UPDATE_REQUEST,
      updateDocumentSocioAmbiental
    ),

    takeLatest(CareTypes.DOCUMENT_GROUP_ABEMID_REQUEST, getDocumentGroupAbemid),
    takeLatest(CareTypes.DOCUMENT_ABEMID_REQUEST, getDocumentAbemid),
    takeLatest(CareTypes.DOCUMENT_ABEMID_STORE_REQUEST, storeDocumentAbemid),
    takeLatest(CareTypes.DOCUMENT_ABEMID_UPDATE_REQUEST, updateDocumentAbemid),

    takeLatest(CareTypes.DOCUMENT_GROUP_NEAD_REQUEST, getDocumentGroupNead),
    takeLatest(CareTypes.DOCUMENT_NEAD_REQUEST, getDocumentNead),
    takeLatest(CareTypes.DOCUMENT_NEAD_STORE_REQUEST, storeDocumentNead),
    takeLatest(CareTypes.DOCUMENT_NEAD_UPDATE_REQUEST, updateDocumentNead),

    takeLatest(CareTypes.HEALTH_INSURANCE_REQUEST, getHealthInsurance),
    takeLatest(CareTypes.HEALTH_PLAN_REQUEST, getHealthPlan),
    takeLatest(CareTypes.HEALTH_SUBPLAN_REQUEST, getHealthSubPlan),
    takeLatest(CareTypes.TYPE_ACCOMMODATION_REQUEST, getAccommodationType),
    takeLatest(CareTypes.CARE_TYPE_REQUEST, getCareType),
    takeLatest(CareTypes.SEARCH_CID_REQUEST, searchCid),
    //takeLatest(CareTypes.LOAD_DOCUMENT_REQUEST, getDocumentById),

    takeLatest(CareTypes.LOAD_SCHEDULE_REQUEST, getSchedule),
    takeLatest(CareTypes.CREATE_SCHEDULE_REQUEST, storeSchedule),
    takeLatest(CareTypes.DELETE_SCHEDULE_REQUEST, deleteSchedule),
    takeLatest(CareTypes.UPDATE_SCHEDULE_REQUEST, updateSchedule),

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
    takeLatest(SpecialtyTypes.SEARCH_REQUEST, searchSpecialty),

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

    // Documents
    takeLatest(DocumentTypes.LOAD_REQUEST, getDocuments),
    takeLatest(DocumentTypes.CREATE_DOCUMENT_REQUEST, storeDocuments),
    takeLatest(DocumentTypes.LOAD_REQUEST_BY_CARE_ID, getDocumentsByCareId),

    // Document Groups
    takeLatest(DocumentGroupTypes.LOAD_REQUEST, getDocumentGroups),
    takeLatest(
      DocumentGroupTypes.LOAD_REQUEST_DOCUMENTS_BY_ID,
      getDocumentGroupsByIds
    ),

    /** Patients */
    takeLatest(PatientTypes.LOAD_REQUEST, getPatients),
    takeLatest(PatientTypes.CREATE_PATIENT_REQUEST, createPatient),
    takeLatest(PatientTypes.LOAD_REQUEST_ADDRESS, getAddressPatient),
    takeLatest(PatientTypes.LOAD_REQUEST_PATIENT_BY_ID, getPatientById),
    takeLatest(PatientTypes.UPDATE_PATIENT_REQUEST, updatePatient),
    takeLatest(PatientTypes.SEARCH_REQUEST, searchPatient),
    takeLatest(PatientTypes.LOAD_PATIENT_CAPTURE, getPatientCapture),

    /** Users */
    takeLatest(UserTypes.LOAD_REQUEST, getUsers),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UserTypes.LOAD_REQUEST_CHECK_EMAIL, checkEmail),
    takeLatest(UserTypes.LOAD_REQUEST_ADDRESS, getAddressUser),
    takeLatest(UserTypes.LOAD_REQUEST_USER_BY_ID, getUserById),
    takeLatest(UserTypes.LOAD_REQUEST_USER_BY_EMAIL, getUserByEmail),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
    takeLatest(UserTypes.SEARCH_REQUEST, searchUser),
    takeLatest(UserTypes.LOAD_REQUEST_PROFESSION, getProfessions),
    takeLatest(UserTypes.LOAD_REQUEST_USER_TYPES, getUserTypes),
    takeLatest(UserTypes.LOAD_REQUEST_RECOVERY_PASSWORD, recoveryPassword),
    takeLatest(UserTypes.LOAD_REQUEST_USER_DISENGAGED, loadGetUserDisengaged),
    takeLatest(UserTypes.SEARCH_REQUEST_USER_DISENGAGED, searchUserDisengaged),
    takeLatest(
      UserTypes.LOAD_REQUEST_RECOVERY_PASSWORD_TOKEN,
      recoverypasswordiftoken
    ),

    /** Profession */
    takeLatest(ProfessionTypes.LOAD_REQUEST, getProfession),

    /** UnconfirmedUsers */
    //  takeLatest(UnconfirmedUserTypes.LOAD_REQUEST, getUnconfirmedUsers),
    // takeLatest(UnconfirmedUserTypes.CREATE_USER_REQUEST, createUnconfirmedUser),
    //  takeLatest(
    //    UnconfirmedUserTypes.LOAD_REQUEST_USER_BY_ID,
    //    getUnconfirmedUserById
    //  ),
    // takeLatest(UnconfirmedUserTypes.UPDATE_USER_REQUEST, updateUnconfirmedUser),
    // takeLatest(UnconfirmedUserTypes.SEARCH_REQUEST, searchUnconfirmedUser),
  ]);
}
