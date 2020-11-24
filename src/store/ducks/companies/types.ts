/**
 * Action types
 */
export enum CompanyTypes {
  LOAD_REQUEST = "@customer/LOAD_REQUEST",
  LOAD_SUCCCES = "@customer/LOAD_SUCCCES",
  LOAD_FAILURE = "@customer/LOAD_FAILURE",
  LOAD_REQUEST_ADDRESS = "@customer/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@customer/LOAD_RESPONSE_ADDRESS",
  CREATE_COMPANY_REQUEST = "@customer/CREATE_COMPANY_REQUEST",
}

/**
 * Data types
 */

export interface CompanyInterface {
  id?: string;
  customerId: string;
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
  loading: boolean;
  error: boolean;
}
