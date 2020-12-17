/**
 * Action types
 */
export enum PatientTypes {
  LOAD_REQUEST = "@patient/LOAD_REQUEST",
  LOAD_SUCCCES = "@patient/LOAD_SUCCCES",
  LOAD_FAILURE = "@patient/LOAD_FAILURE",

  CREATE_PATIENT_REQUEST = "@patient/CREATE_PATIENT_REQUEST",
  CREATE_PATIENT_SUCCESS = "@patient/CREATE_PATIENT_SUCCESS",

  UPDATE_PATIENT_REQUEST = "@patient/UPDATE_PATIENT_REQUEST",
  UPDATE_PATIENT_SUCCESS = "@patient/UPDATE_PATIENT_SUCCESS",

  LOAD_REQUEST_ADDRESS = "@patient/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@patient/LOAD_RESPONSE_ADDRESS",

  LOAD_REQUEST_PATIENT_BY_ID = "@patient/LOAD_REQUEST_PATIENT_BY_ID",
  LOAD_SUCCCES_PATIENT_BY_ID = "@patient/LOAD_SUCCCES_PATIENT_BY_ID",

  SEARCH_REQUEST = "@patient/SEARCH_REQUEST",

}

/**
 * Data types
 */

export interface PatientAddressInterface {
  postal_code: string;
  street: string,
  number: string,
  district: string;
  city: string;
  state: string;
  complement: string;
}

export interface PatientPhonesInterface {
  whatsapp: boolean;
  telegram: boolean;
  cellnumber?: string;
  number?: string;
};

export interface PatientInterface {
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
	email: string;
  phones: PatientPhonesInterface[] | [];
	sus_card: string;
	blood_type: string;
	organ_donor: boolean;
	active: boolean;
}

export interface PatientList {
  data: PatientDataItems[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

interface PatientDataItems {
  _id: string;
  name: string;
  email: string;
  fiscal_number: string;
  active: boolean;
}

export interface ViacepDataInterface {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  erro?: boolean,
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
}

export type LoadRequestParams = Partial<Omit<PatientList, 'data'>>
