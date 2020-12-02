import { action } from 'typesafe-actions';
import { PatientTypes, PatientInterface, ViacepDataInterface } from './types';

export const loadRequest = () => action(PatientTypes.LOAD_REQUEST);
export const loadSuccess = (data: PatientInterface) => action(PatientTypes.LOAD_SUCCCES, { data });

export const getAddress = (postalCode: string) => action(PatientTypes.LOAD_REQUEST_ADDRESS, { postalCode });

export const successGetAddress = (data: ViacepDataInterface) => action(PatientTypes.LOAD_RESPONSE_ADDRESS, { data });


export const createPatientRequest = (data: PatientInterface) => action(PatientTypes.CREATE_PATIENT_REQUEST, { data });
export const createPatientSuccess = (data: PatientInterface) => action(PatientTypes.CREATE_PATIENT_SUCCESS, { data });

export const updatePatientRequest = (data: PatientInterface) => action(PatientTypes.UPDATE_PATIENT_REQUEST, { data });
export const updatePatientSuccess = (data: PatientInterface) => action(PatientTypes.UPDATE_PATIENT_SUCCESS, { data });

export const loadPatientById = (id: string) => action(PatientTypes.LOAD_REQUEST_PATIENT_BY_ID, { id });
export const loadSuccessGetPatientById = (data: PatientInterface) => action(PatientTypes.LOAD_SUCCCES_PATIENT_BY_ID, { data });

export const loadFailure = () => action(PatientTypes.LOAD_FAILURE);
