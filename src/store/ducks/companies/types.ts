/**
 * Action types
 */
export enum CompanyTypes {
  LOAD_REQUEST = "@company/LOAD_REQUEST",
  LOAD_SUCCCES = "@company/LOAD_SUCCCES",
  LOAD_FAILURE = "@company/LOAD_FAILURE",

  LOAD_REQUEST_ADDRESS = "@company/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@company/LOAD_RESPONSE_ADDRESS",

  CREATE_COMPANY_REQUEST = "@company/CREATE_COMPANY_REQUEST",
  CREATE_COMPANY_SUCCESS = "@company/CREATE_COMPANY_SUCCESS",

  LOAD_REQUEST_COMPANY_BY_ID = "@council/LOAD_REQUEST_COMPANY_BY_ID",
  LOAD_SUCCESS_COMPANY_BY_ID = "@council/LOAD_SUCCESS_COMPANY_BY_ID",

  UPDATE_COMPANY_REQUEST = "@company/UPDATE_COMPANY_REQUEST",
  UPDATE_COMPANY_SUCCESS = "@company/UPDATE_COMPANY_SUCCESS",
}

/**
 * Data types
 */

export interface CompanyInterface {
  _id?: string;
  customerId: string;
	name: string;
	fantasy_name: string;
	fiscal_number: string;
	address: {
    postal_code: string;
    street: string,
    number: string,
    district: string;
    city: string;
    state: string;
    complement: string;
  };
	email: string;
	phone: string;
	cellphone: string;
	active: boolean;
	created_by: { _id: string };
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
export interface CompanyState {
  data: CompanyInterface;
  list: CompanyInterface[];
  loading: boolean;
  error: boolean;
  success: boolean;
}
