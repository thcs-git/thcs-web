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
  UPDATE_USER_SUCCESS = "@user/UPDATE_USER_SUCCESS",

  LOAD_REQUEST_ADDRESS = "@user/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@user/LOAD_RESPONSE_ADDRESS",

  LOAD_REQUEST_USER_BY_ID = "@user/LOAD_REQUEST_USER_BY_ID",
  LOAD_SUCCCES_USER_BY_ID = "@user/LOAD_SUCCCES_USER_BY_ID",
}

/**
 * Data types
 */

export interface SpecialtiesUserInterface {
  id: string;
  name: string;
};

export interface UserListItems {
  _id: string;
  name: string;
  email: string;
  active: boolean;
}

export interface UserInterface {
  _id?: string;
  companies: [string] | [];
	name: string; // name
  birthdate: string;
  gender: string;
  national_id: string;
  issuing_organ: string;
  fiscal_number: string;
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
	email: string; // email
	phone: string;
  cellphone: string;
  user_type_id: string;
  specialties: (SpecialtiesUserInterface | {})[];
  council_id?: {
    _id: string;
    company_id: { _id: string; };
    name: string;
    describe?: string;
    initials?: string;
    active?: boolean;
  };
  council_number: string;
  username?: string;
  password?: string;
  active: boolean; // active
}


export interface UserList {
  data: UserListItems[];
  limit: string;
  page: string;
  total: number;
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
  list: UserList;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<UserList, 'data'>>
