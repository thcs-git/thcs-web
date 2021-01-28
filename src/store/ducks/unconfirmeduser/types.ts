/**
 * Action types
 */
export enum UnconfirmedUserTypes {
  LOAD_REQUEST = "@user/LOAD_REQUEST",
  LOAD_SUCCCES = "@user/LOAD_SUCCCES",
  LOAD_FAILURE = "@user/LOAD_FAILURE",

  CREATE_USER_REQUEST = "@user/CREATE_UNCONFIRMEDUSER_REQUEST",
  REGISTER_USER_REQUEST = "@user/REGISTER_UNCONFIRMEDUSER_REQUEST",
  CREATE_USER_SUCCESS = "@user/CREATE_UNCONFIRMEDUSER_SUCCESS",

  UPDATE_USER_REQUEST = "@user/UPDATE_UNCONFIRMEDUSER_REQUEST",
  UPDATE_USER_SUCCESS = "@user/UPDATE_UNCONFIRMEDUSER_SUCCESS",

  LOAD_REQUEST_ADDRESS = "@user/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@user/LOAD_RESPONSE_ADDRESS",

  LOAD_REQUEST_USER_BY_ID = "@user/LOAD_REQUEST_UNCONFIRMEDUSER_BY_ID",
  LOAD_SUCCCES_USER_BY_ID = "@user/LOAD_SUCCCES_UNCONFIRMEDUSER_BY_ID",

  SEARCH_REQUEST = "@user/SEARCH_REQUEST",
}

/**
 * Data types
 */

export interface SpecialtiesUnconfirmedUserInterface {
  id: string;
  name: string;
};

export interface UnconfirmedUserListItems {
  _id: string;
  name: string;
  email: string;
  active: boolean;
}

export interface UnconfirmedUserInterface {
  _id?: string;
	name: string; // name
	email: string; // email
	phone: string;
  user_type: string;
  specialties: SpecialtiesUnconfirmedUserInterface | {};
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
  unit_federative:string;
  active: boolean; // active
}


export interface UnconfirmedUserList {
  data: UnconfirmedUserListItems[];
  limit: string;
  page: string;
  total: number;
  search?: string;

}

/**
 * State type
 */
export interface UnconfirmedUserState {
  data: UnconfirmedUserInterface;
  list: UnconfirmedUserList;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<UnconfirmedUserList, 'data'>>
