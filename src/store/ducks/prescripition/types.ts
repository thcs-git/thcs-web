/**
 * Action types
 */
export enum PrescriptionTypes {
  LOAD_REQUEST = "@prescription/LOAD_REQUEST",
  LOAD_SUCCCES = "@prescription/LOAD_SUCCCES",
  LOAD_FAILURE = "@prescription/LOAD_FAILURE",

  CREATE_PRESCRIPTION_REQUEST = "@prescripition/CREATE_PRESCRIPTION_REQUEST",
  CREATE_PRESCRIPTION_SUCCESS = "@prescripition/CREATE_PRESCRIPTION_SUCCESS",

  UPDATE_PRESCRIPTION_REQUEST = "@prescripition/UPDATE_PRESCRIPTION_REQUEST",
  UPDATE_PRESCRIPTION_SUCCESS = "@prescripition/UPDATE_PRESCRIPTION_SUCCESS",



  LOAD_REQUEST_PRESCRIPTION_BY_ID = "@prescripition/LOAD_REQUEST_PRESCRIPTION_BY_ID",
  LOAD_SUCCCES_PRESCRIPTION_BY_ID = "@prescripition/LOAD_SUCCCES_PRESCRIPTION_BY_ID",

  SEARCH_REQUEST = "@prescripition/SEARCH_REQUEST",

}

/**
 * Data types
 */

export interface PrescriptionAddressInterface {
  postal_code: string;
  street: string,
  number: string,
  district: string;
  city: string;
  state: string;
  complement: string;
}

export interface PrescriptionPhonesInterface {
  whatsapp: boolean;
  telegram: boolean;
  cellnumber?: string;
  number?: string;
};

export interface PrescriptionInterface {
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
	address_id: PrescriptionAddressInterface;
	email: string;
  phones: PrescriptionPhonesInterface[] | [];
	sus_card: string;
	blood_type: string;
	organ_donor: boolean;
	active: boolean;
}

export interface PrescriptionList {
  data: PrescriptionDataItems[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

export interface PrescriptionDataItems {
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
export interface PrescriptionState {
  data: PrescriptionInterface;
  list: PrescriptionList;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<PrescriptionList, 'data'>>
