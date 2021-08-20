/**
 * Action types
 */
export enum UserTypes {
  LOAD_REQUEST = "@user/LOAD_REQUEST",
  LOAD_SUCCESS = "@user/LOAD_SUCCESS",
  LOAD_FAILURE = "@user/LOAD_FAILURE",

  LOAD_REQUEST_BY_CLIENT = "@user/LOAD_REQUEST_BY_CLIENT",

  CREATE_USER_REQUEST = "@user/CREATE_USER_REQUEST",
  REGISTER_USER_REQUEST = "@user/REGISTER_USER_REQUEST",
  CREATE_USER_SUCCESS = "@user/CREATE_USER_SUCCESS",

  UPDATE_USER_REQUEST = "@user/UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS = "@user/UPDATE_USER_SUCCESS",

  LOAD_REQUEST_ADDRESS = "@user/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@user/LOAD_RESPONSE_ADDRESS",
  ERROR_RESPONSE_ADDRESS = "@user/ERROR_RESPONSE_ADDRESS",

  LOAD_REQUEST_USER_BY_ID = "@user/LOAD_REQUEST_USER_BY_ID",
  LOAD_SUCCESS_USER_BY_ID = "@user/LOAD_SUCCESS_USER_BY_ID",

  LOAD_REQUEST_USER_BY_EMAIL = "@user/LOAD_REQUEST_USER_BY_EMAIL",
  LOAD_SUCCESS_USER_BY_EMAIL = "@user/LOAD_SUCCESS_USER_BY_EMAIL",

  LOAD_REQUEST_USER_DISENGAGED = "@user/lOAD_REQUEST_USER_DISENGAGED",
  LOAD_RESPONSE_USER_DISENGAGED = "@user/LOAD_RESPONSE_USER_DISENGAGED",

  SEARCH_REQUEST_USER_DISENGAGED = "@user/SEARCH_REQUEST_USER_DISENGAGED",

  SEARCH_REQUEST = "@user/SEARCH_REQUEST",

  LOAD_REQUEST_PROFESSION = "@user/LOAD_REQUEST_PROFESSION",
  LOAD_RESPONSE_PROFESSION = "@user/LOAD_RESPONSE_PROFESSION",

  LOAD_REQUEST_USER_TYPES = "@user/LOAD_REQUEST_USER_TYPES",
  LOAD_RESPONSE_USER_TYPES = "@user/LOAD_RESPONSE_USER_TYPES",
  LOAD_REQUEST_CHECK_EMAIL = "@user/LOAD_REQUEST_CHECK_EMAIL",
  LOAD_RESPONSE_CHECK_EMAIL = "@user/LOAD_RESPONSE_CHECK_EMAIL",

  LOAD_REQUEST_RECOVERY_PASSWORD = "@user/LOAD_REQUEST_RECOVERY_PASSWORD",
  LOAD_REQUEST_RECOVERY_PASSWORD_TOKEN = "@user/LOAD_REQUEST_RECOVERY_PASSWORD_TOKEN",

  LOAD_SUCCESS_RECOVERY_PASSWORD = "@user/LOAD_SUCCESS_RECOVERY_PASSWORD",

  LOAD_CONFIRM_USER = "@user/LOAD_CONFIRM_USER",
  LOAD_SUCCESS_CONFIRM = "@user/LOAD_SUCCESS_CONFIRM",

  CLEAN = "@user/CLEAN",
}

/**
 * Data types
 */
export interface Phones {
  _id: string;
  number: string;
  whatapp: string;
  telegram: string;
}

export interface SpecialtiesUserInterface {
  _id: string;
  name: string;
}

export interface UserRecoveryPassword {
  _id: string;
  password: string;
}
export interface ProfessionUserInterface {
  _id: string;
  name: string;
}

export interface UserTypesInterface {
  _id: string;
  name: string;
}
export interface CustomerUserInterface {
  name: string;
  _id: string;
}

export interface CompanyUserInterface {
  _id: string;
  name: string;
  customer_id?: CustomerUserInterface;
}

export interface CompanyUserLinkInterface {
  function: string | null | undefined;
  exp?: string;
  permissions?: string | UserTypeInterface;
  _id?: string;
  companie_id?: string | CompanyUserInterface;
  user_type_id?: string;
  active?: boolean;
  linked_at?: any;
}

export interface UserTypeInterface {
  _id: string;
  name: string;
}

export interface MainSpecialtyInterface {
  _id: string;
  name: string;
}

export interface UserListItems {
  companies_links: CompanyUserLinkInterface[];
  _id: string;
  name: string;
  email: string;
  profession_id: ProfessionUserInterface;
  main_specialty_id?: any;
  created_at: string;
  address: {
    postal_code: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    complement: string;
    geolocation?: { latitude: number; longitude: number };
  };
  specialties: SpecialtiesUserInterface[];
  active: boolean;
  fiscal_number: string;
}

export interface UserInterface {
  _id?: string;
  companies: CompanyUserInterface[];
  companies_links: CompanyUserLinkInterface[];
  customer_id?: string;
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
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    complement: string;
    geolocation?: { latitude: number; longitude: number };
  };
  email: string; // email
  phone: string;
  cellphone: string;
  user_type_id: string | UserTypeInterface;
  profession_id?: string | ProfessionUserInterface;
  main_specialty_id?: any;
  specialties: (SpecialtiesUserInterface | {})[];
  council_id?: {
    _id: string;
    company_id: { _id: string };
    name: string;
    describe?: string;
    initials?: string;
    active?: boolean;
  };
  council_state: string;
  council_number: string;
  verified: string;
  username?: string;
  password?: string;
  active: boolean; // active
  professions: ProfessionUserInterface[];
  user_types?: UserTypesInterface[];
}

export interface UserList {
  data: UserListItems[];
  limit: string;
  page: string;
  total: number;
  search?: string;
  profession_id?: string;
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

/**
 * State type
 */
export interface UserState {
  data: UserInterface;
  list: UserList;
  loading: boolean;
  error: boolean;
  success: boolean;
  successRecovery: boolean;
}

export type LoadRequestParams = Partial<Omit<UserList, "data">>;
