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
import { doLogin, checkEmail as checkEmailLogin } from "./login/sagas";

import { CustomerTypes } from "./customers/types";
import {
  get,
  getCustomerById,
  getAddress as getAddressCustomer,
  createCompanyCustomer,
  updateCompanyCustomer,
  searchCustomer,
  createPermission,
  loadPermission,
  updatePermissionCustomer,
} from "./customers/sagas";

import { CompanyTypes } from "./companies/types";
import {
  get as getCompanies,
  getAddress,
  store as createCompany,
  getById as getCompanyById,
  update as updateCompany,
  searchCompany,
  getCompaniesById,
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
  getByScore as getByScoreDocuments,
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

import { LayoutTypes } from "./layout/types";
import { get as getLayout } from "./layout/sagas";

import { MessageTypes } from "./message/types";
import { get as getMessage, getMessageById } from "./message/sagas";

import { UserTypes } from "./users/types";

import { PrescriptionTypes } from "./prescripition/types";
import {
  loadPrescriptionByCareId,
  loadPrescriptionWithItems,
  loadReportUnique as loadReportPrescriptionUnique,
  loadReportCheck,
} from "./prescripition/saga";

import { AntibioticTypes } from "./antibiotic/types";
import {
  get as getAntibiotic,
  loadReportUnique as loadReportAntibioticUnique,
} from "./antibiotic/sagas";

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
  getByClient,
  updateUserPassword,
} from "./users/sagas";

import { CareTypes } from "./cares/types";
import {
  get as getCares,
  getPopUp as getPatient,
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
  getHistory,
  getAllCid,
  getReleaseReason,
  getReleaseReferral,
  transferCare,
  deleteCare,
  getEvolution,
  getChekin,
  getChekInReport,
  getFilterCheckin,
  getFilterEvolution,
  getFilterMeasurement,
  getFilterAllergy,
  getFilterAdverseEvent,
} from "./cares/sagas";

import { get as getProfession } from "./professions/sagas";
import { ProfessionTypes } from "./professions/types";

import { AllergiesTypes } from "./allergies/types";
import { load as getAllergies } from "./allergies/sagas";

import { MeasurementsTypes } from "./measurements/types";
import { get as getMeasurements } from "./measurements/sagas";

import { QrCodeTypes } from "./qrCode/types";
import { updateQrCode, createQrCode, get as getQrCode } from "./qrCode/sagas";
import { QrCode } from "@mui/icons-material";

import { ExamsTypes } from "./exams/types";
import { get as getExams } from "./exams/sagas";

import { AttestTypes } from "./attest/types";
import { get as getAttests } from "./attest/sagas";

import { LogoTypes } from "./logo/types";
import { get as getLogo } from "./logo/sagas";

export default function* rootSaga(): any {
  return yield all([
    takeLatest(LoginTypes.LOAD_REQUEST, doLogin),
    takeLatest(LoginTypes.EMAIL_REQUEST, checkEmailLogin),
    takeLatest(UserTypes.UPDATE_USER_PASSWORD, updateUserPassword),
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
    takeLatest(CareTypes.LOAD_PATIENT_REQUEST, getPatient),
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
    takeLatest(CareTypes.LOAD_CID_REQUEST, getAllCid),
    takeLatest(CareTypes.LOAD_RELEASE_REASON_REQUEST, getReleaseReason),
    takeLatest(CareTypes.LOAD_RELEASE_REFERRAL_REQUEST, getReleaseReferral),
    //takeLatest(CareTypes.LOAD_DOCUMENT_REQUEST, getDocumentById),

    takeLatest(CareTypes.LOAD_SCHEDULE_REQUEST, getSchedule),
    takeLatest(CareTypes.CREATE_SCHEDULE_REQUEST, storeSchedule),
    takeLatest(CareTypes.DELETE_SCHEDULE_REQUEST, deleteSchedule),
    takeLatest(CareTypes.UPDATE_SCHEDULE_REQUEST, updateSchedule),

    takeLatest(CareTypes.LOAD_HISTORY_REQUEST, getHistory),
    takeLatest(CareTypes.TRANSFER_CARE_REQUEST, transferCare),
    takeLatest(CareTypes.DELETE_CARE_REQUEST, deleteCare),

    takeLatest(CareTypes.LOAD_EVOLUTION_REQUEST, getEvolution),

    takeLatest(CareTypes.LOAD_CHECKIN_REQUEST, getChekin),
    takeLatest(CareTypes.LOAD_CHECKIN_REPORT_REQUEST, getChekInReport),
    takeLatest(CareTypes.LOAD_CHECKIN_FILTER_REQUEST, getFilterCheckin),
    takeLatest(CareTypes.LOAD_EVOLUTION_FILTER_REQUEST, getFilterEvolution),
    takeLatest(CareTypes.LOAD_MEASUREMENT_FILTER_REQUEST, getFilterMeasurement),
    takeLatest(CareTypes.LOAD_ALLERGY_FILTER_REQUEST, getFilterAllergy),
    takeLatest(
      CareTypes.LOAD_ADVERSE_EVENT_FILTER_REQUEST,
      getFilterAdverseEvent
    ),

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
    takeLatest(CompanyTypes.LOAD_REQUEST_CUSTOMER_BY_ID, getCompaniesById),

    /** Customers */
    takeLatest(CustomerTypes.LOAD_REQUEST, get),
    takeLatest(CustomerTypes.LOAD_REQUEST_BY_ID, getCustomerById),
    takeLatest(CustomerTypes.LOAD_REQUEST_ADDRESS, getAddressCustomer),
    takeLatest(CustomerTypes.CREATE_CUSTOMER_REQUEST, createCompanyCustomer),
    takeLatest(CustomerTypes.UPDATE_CUSTOMER_REQUEST, updateCompanyCustomer),
    takeLatest(CustomerTypes.SEARCH_REQUEST, searchCustomer),
    takeLatest(CustomerTypes.LOAD_REQUEST_PERMISSION, loadPermission),
    takeLatest(
      CustomerTypes.UPDATE_PERMISSION_REQUEST,
      updatePermissionCustomer
    ),
    takeLatest(CustomerTypes.CREATE_PERMISSION_REQUEST, createPermission),

    // Documents
    takeLatest(DocumentTypes.LOAD_REQUEST, getDocuments),
    takeLatest(DocumentTypes.CREATE_DOCUMENT_REQUEST, storeDocuments),
    takeLatest(DocumentTypes.LOAD_REQUEST_BY_CARE_ID, getDocumentsByCareId),
    takeLatest(DocumentTypes.LOAD_REQUEST_GET_BY_SCORE, getByScoreDocuments),

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
    takeLatest(UserTypes.LOAD_REQUEST_BY_CLIENT, getByClient),

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

    /** Layout */
    takeLatest(LayoutTypes.LOAD_REQUEST, getLayout),

    /** Message */
    takeLatest(MessageTypes.LOAD_REQUEST, getMessage),
    takeLatest(MessageTypes.LOAD_REQUEST_MESSAGE_BY_ID, getMessageById),

    /**
     * ALLERGIES
     */
    takeLatest(AllergiesTypes.LOAD_REQUEST, getAllergies),

    /**
     * MEASUREMENT
     */
    takeLatest(MeasurementsTypes.LOAD_REQUEST, getMeasurements),

    /**
     * QR CODE
     */
    takeLatest(QrCodeTypes.LOAD_REQUEST, getQrCode),
    takeLatest(QrCodeTypes.CREATE_QRCODE_REQUEST, createQrCode),
    takeLatest(QrCodeTypes.UPDATE_QRCODE_REQUEST, updateQrCode),

    /**
     * PRESCRIPTION
     */
    takeLatest(
      PrescriptionTypes.LOAD_REQUEST_PRESCRIPTION_BY_CARE_ID,
      loadPrescriptionByCareId
    ),
    takeLatest(
      PrescriptionTypes.LOAD_REQUEST_WITH_ITEMS,
      loadPrescriptionWithItems
    ),
    takeLatest(
      PrescriptionTypes.LOAD_REQUEST_REPORT_UNIQUE,
      loadReportPrescriptionUnique
    ),
    takeLatest(PrescriptionTypes.LOAD_REQUEST_REPORT_CHECK, loadReportCheck),

    /**
     * ANTIBIOTIC
     */
    takeLatest(AntibioticTypes.LOAD_REQUEST, getAntibiotic),
    takeLatest(
      AntibioticTypes.LOAD_REQUEST_REPORT_UNIQUE,
      loadReportAntibioticUnique
    ),

    /**
     * EXAMS
     */

    takeLatest(ExamsTypes.LOAD_REQUEST, getExams),

    /**
     * ATTESTS
     */
    takeLatest(AttestTypes.LOAD_REQUEST, getAttests),

    /**
     * LOGO
     */
    takeLatest(LogoTypes.LOAD_REQUEST, getLogo),
  ]);
}
