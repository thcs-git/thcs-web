/**
 * Action types
 */
export enum UserTypes {
  LOAD_REQUEST = "@user/LOAD_REQUEST",
  LOAD_SUCCCES = "@user/LOAD_SUCCCES",
  LOAD_FAILURE = "@user/LOAD_FAILURE",
  CREATE_USER_REQUEST = "@user/CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS = "@user/CREATE_USER_SUCCESS",
  UPDATE_USER_REQUEST = "@user/UPDATE_USER_REQUEST",
  LOAD_REQUEST_USER_BY_ID = "@user/LOAD_REQUEST_USER_BY_ID",
  LOAD_REQUEST_ADDRESS = "@user/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@user/LOAD_RESPONSE_ADDRESS",
}

/**
 * Data types
 */

export interface EspecialtiesUserInterface {
  id: string;
  description: string;
};

export interface UserInterface {
  _id?: string;
  companies: [string] | [];
	name: string;
  birthdayDate: string;
  gender: string;
  rg: string;
  issuing_organ: string;
  cpf: string;
  mother_name: string;
  nationality: string;
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
  userType: string;
  especialties: (EspecialtiesUserInterface | {})[];
  council: string;
  councilNumber: string;
  username?: string;
  password?: string;
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
export interface UserState {
  data: UserInterface;
  loading: boolean;
  error: boolean;
  success: boolean;
}
