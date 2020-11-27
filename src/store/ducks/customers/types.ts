/**
 * Action types
 */
export enum CustomerTypes {
  LOAD_REQUEST = "@customer/LOAD_REQUEST",
  LOAD_SUCCCES = "@customer/LOAD_SUCCCES",
  LOAD_FAILURE = "@customer/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface CustomerInterface {
  id?: string;
	socialName: string;
	fantasyName: string;
	fiscalNumber: string;
	postalCode: string;
	city: string;
	neighborhood: string;
	address: string;
	addressNumber: string;
	addressComplement: string;
	email: string;
	phone: string;
	cellphone: string;
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
