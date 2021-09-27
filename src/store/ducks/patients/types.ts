import { AreaInterface } from "../areas/types";

/**
 * Action types
 */
export enum PatientTypes {
  LOAD_REQUEST = "@patient/LOAD_REQUEST",
  LOAD_SUCCESS = "@patient/LOAD_SUCCESS",
  LOAD_FAILURE = "@patient/LOAD_FAILURE",
  LOAD_FAILURE_CREATE_PATIENT = "@patient/LOAD_FAILURE_CREATE_PATIENT",

  CREATE_PATIENT_REQUEST = "@patient/CREATE_PATIENT_REQUEST",
  CREATE_PATIENT_SUCCESS = "@patient/CREATE_PATIENT_SUCCESS",

  UPDATE_PATIENT_REQUEST = "@patient/UPDATE_PATIENT_REQUEST",
  UPDATE_PATIENT_SUCCESS = "@patient/UPDATE_PATIENT_SUCCESS",

  LOAD_REQUEST_ADDRESS = "@patient/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@patient/LOAD_RESPONSE_ADDRESS",

  LOAD_REQUEST_PATIENT_BY_ID = "@patient/LOAD_REQUEST_PATIENT_BY_ID",
  LOAD_SUCCESS_PATIENT_BY_ID = "@patient/LOAD_SUCCESS_PATIENT_BY_ID",

  SEARCH_REQUEST = "@patient/SEARCH_REQUEST",

  REGISTRAION_COMPLETED = "@patient/REGISTRAION_COMPLETED",
  LOAD_PATIENT_CAPTURE = "@patient/LOAD_PATIENT_CAPTURE",
  LOAD_PATIENT_CAPTURE_SUCCESS = "@patient/LOAD_PATIENT_CAPTURE_SUCCESS",

  CLEAN = "@patient/CLEAN",
}

/**
 * Data types
 */

export interface PatientAddressInterface {
  postal_code: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
}

export interface PatientPhonesInterface {
  whatsapp?: boolean;
  telegram?: boolean;
  cellnumber?: string;
  number?: string;
}

export interface PatientInterface {
  social_status: boolean;
  _id?: string;
  companies: [string] | [];
  name: string;
  social_name: string;
  birthdate: string;
  gender: string;
  mother_name: string;
  profession: string;
  nationality: string;
  naturalness: string;
  marital_status: string;
  fiscal_number: string;
  national_id: string;
  issuing_organ: string;
  address_id: PatientAddressInterface;
  area_id?: any;
  email: string;
  phones: [{
    cellnumber?: string;
    number?: string;
    telegram: boolean;
    whatsapp: boolean;
  }];
  // phones: PatientPhonesInterface[] | [];
  sus_card: string;
  blood_type: string;
  organ_donor: boolean;
  responsable: {
    name: string;
    phone: string;
    cellphone: string;
    relationship: string;
  };
  active: boolean;
  hospital?: string;
  unit_health?: string;
  assistent_doctor?: string;
  sector?: string;
  hospital_bed?: string;
  convenio?: string;
  health_insurance?: string;
  sub_health_insurance?: string;
  created_at: string;
}

export interface PatientList {
  data: PatientInterface[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

export interface PatientDataItems {
  _id: string;
  name: string;
  mother_name: string;
  social_name: string;
  email: string;
  fiscal_number: string;
  created_at: string;
  active: boolean;
}

export interface ViacepDataInterface {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
  errorCep?: boolean;
}

/**
 * State type
 */
export interface PatientState {
  data: PatientInterface;
  list: PatientList;
  loading: boolean;
  error: boolean;
  success: boolean;
  errorCep?: boolean;
  isRegistrationCompleted?: boolean;
}

export type LoadRequestParams = Partial<Omit<PatientList, "data">>;
