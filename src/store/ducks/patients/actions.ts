import { action } from 'typesafe-actions';
import { PatientTypes, PatientInterface, ViacepDataInterface, LoadRequestParams } from './types';

export const loadRequest = (params: LoadRequestParams = {}) => action(PatientTypes.LOAD_REQUEST, { params });
export const loadSuccess = (data: PatientInterface) => action(PatientTypes.LOAD_SUCCCES, { data });
export const loadFailure = (data?: PatientInterface) => action(PatientTypes.LOAD_FAILURE, { data });
export const loadFailureCreatePatient = (data?: PatientInterface) => action(PatientTypes.LOAD_FAILURE_CREATE_PATIENT, { data });

export const getAddress = (postalCode: string) => action(PatientTypes.LOAD_REQUEST_ADDRESS, { postalCode });
export const successGetAddress = (data: ViacepDataInterface) => action(PatientTypes.LOAD_RESPONSE_ADDRESS, { data });

export const createPatientRequest = (data: PatientInterface) => action(PatientTypes.CREATE_PATIENT_REQUEST, { data });
export const createPatientSuccess = (data: PatientInterface) => action(PatientTypes.CREATE_PATIENT_SUCCESS, { data });

export const updatePatientRequest = (data: PatientInterface) => action(PatientTypes.UPDATE_PATIENT_REQUEST, { data });
export const updatePatientSuccess = (data: PatientInterface) => action(PatientTypes.UPDATE_PATIENT_SUCCESS, { data });

export const loadPatientById = (id: string) => action(PatientTypes.LOAD_REQUEST_PATIENT_BY_ID, { id });
export const loadSuccessGetPatientById = (data: PatientInterface) => action(PatientTypes.LOAD_SUCCCES_PATIENT_BY_ID, { data });

export const searchRequest = (value: string) => action(PatientTypes.SEARCH_REQUEST, { value });

export const setIfRegistrationCompleted = (value: boolean, id?: string) => action(PatientTypes.REGISTRAION_COMPLETED, { value, id });
