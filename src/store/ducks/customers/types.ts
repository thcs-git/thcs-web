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

  LOAD_REQUEST_PERMISSION = "@customer/LOAD_REQUEST_PERMISSION",
  LOAD_RESPONSE_PERMISSION = "@customer/LOAD_RESPONSE_PERMISSION",
  CLEAN_PERMISSION = "@customer/CLEAN_PERMISSION",

  CREATE_PERMISSION_REQUEST = "@customer/CREATE_PERMISSION_REQUEST",
  CREATE_PERMISSION_SUCCESS = "@customer/CREATE_PERMISSION_SUCCESS",
  UPDATE_PERMISSION_REQUEST = "@customer/UPDATE_PERMISSION_REQUEST",
  UPDATE_PERMISSION_SUCCESS = "@customer/UPDATE_PERMISSION_SUCCESS",

  SEARCH_REQUEST = "@customer/SEARCH_REQUEST",

  CLEAN = "@customer/CLEAN",
}

/**
 * Data types
 */
export interface CustomerInterface {
  usertypes?: [{
    _id?: string;
    active: boolean;
    name: string;
    permission: string;
    created_at?: string;
  }];
  active: boolean;
  _id?: string;
  name: string;
  social_name: string;
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
  phones: [{
    cellphone?: string;
    phone?: string;
    telegram: boolean;
    whatsapp: boolean;
  }];
  cellphone?: string;
  phone?: string;
  responsible_user: string;
  integration?: string;
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
  fiscal_number: string;
  name: string;
  active: boolean;
  email: string;
  created_at: string;
}

export interface PermissionInterface {
  _id?: string;
  rights?: string[];
  customer_id?: string;
  name?: string;
  active?: boolean;
}

/**
 * State type
 */
export interface CustomerState {
  data: CustomerInterface;
  list: CustomerList;
  permission: PermissionInterface;
  loading: boolean;
  error: boolean;
  success: boolean;
  errorCep?: boolean;
  isRegistrationCompleted?: boolean;
  permissionSuccess?: boolean;
  permissionLoad?: boolean;
  requestSucess?: boolean;
}

export type LoadRequestParams = Partial<Omit<CustomerList, "data">>;
