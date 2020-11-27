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
}

/**
 * Data types
 */

export interface CompanyInterface {
  id?: string;
  customerId: string;
	name: string;
	fantasyName: string;
	fiscalNumber: string;
	address: {
    postalCode: string;
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
