/**
 * Action types
 */
export enum CustomerTypes {
  LOAD_REQUEST = "@customer/LOAD_REQUEST",
  LOAD_SUCCESS = "@customer/LOAD_SUCCESS",
  LOAD_FAILURE = "@customer/LOAD_FAILURE",
  LOAD_FAILURE_CEP = "@customer/LOAD_FAILURE_CEP",

  LOAD_REQUEST_BY_ID = "@customer/LOAD_REQUEST_BY_ID",
  LOAD_SUCCESS_BY_ID = "@customer/LOAD_SUCCESS_BY_ID",

  CREATE_CUSTOMER_REQUEST = "@customer/CREATE_CUSTOMER_REQUEST",
  CREATE_CUSTOMER_SUCCESS = "@customer/CREATE_CUSTOMER_SUCCESS",

  UPDATE_CUSTOMER_REQUEST = "@customer/UPDATE_CUSTOMER_REQUEST",
  UPDATE_CUSTOMER_SUCCESS = "@customer/UPDATE_CUSTOMER_SUCCESS",

  LOAD_REQUEST_ADDRESS = "@customer/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@customer/LOAD_RESPONSE_ADDRESS",

  SEARCH_REQUEST = "@customer/SEARCH_REQUEST",

  CLEAN = "@customer/CLEAN",
}

/**
 * Data types
 */
export interface CustomerInterface {
  _id?: string;
  name: string;
  social_name: string;
  fantasy_name: string;
  fiscal_number: string;
  address: {
    _id?: string;
    postal_code: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    complement: string;
  };
  email: string;
  phones: {
    number: string;
    telegram: boolean;
    whatsapp: boolean;
  };
  cellphone?: string;
  active?: boolean;
}

export interface ViacepDataInterface {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface CustomerList {
  data: CustomerDataItems[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

export interface CustomerDataItems {
  _id: string;
  name: string;
  active: boolean;
  email: string;
}

/**
 * State type
 */
export interface CustomerState {
  data: CustomerInterface;
  list: CustomerList;
  loading: boolean;
  error: boolean;
  success: boolean;
  errorCep?: boolean;
}

export type LoadRequestParams = Partial<Omit<CustomerList, "data">>;
