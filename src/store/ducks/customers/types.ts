/**
 * Action types
 */
export enum CustomerTypes {
  LOAD_REQUEST = "@customer/LOAD_REQUEST",
  LOAD_SUCCCES = "@customer/LOAD_SUCCCES",
  LOAD_FAILURE = "@customer/LOAD_FAILURE",

  LOAD_REQUEST_BY_ID = "@customer/LOAD_REQUEST_BY_ID",
  LOAD_SUCCESS_BY_ID = "@customer/LOAD_SUCCESS_BY_ID",
}

/**
 * Data types
 */

export interface CustomerInterface {
  id?: string;
  socialName?: string;
  fantasyName?: string;
  fiscalNumber?: string;
  address: [{
    neighborhood: string;
    postal_code: string;
    street: string,
    number: string,
    district: string;
    city: string;
    state: string;
    complement: string;
  }];
  email?: string;
  phones: [{
    number: string,
    telegram: boolean,
    whatsapp: boolean,
  }],
  cellphone?: string;
}

export interface CustomerList {
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
  list: CustomerList[];
  loading: boolean;
  error: boolean;
}
