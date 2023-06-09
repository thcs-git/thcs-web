/**
 * Action types
 */
export enum SpecialtyTypes {
  LOAD_REQUEST = "@specialty/LOAD_REQUEST",
  LOAD_SUCCESS = "@specialty/LOAD_SUCCESS",
  LOAD_FAILURE = "@specialty/LOAD_FAILURE",

  CREATE_SPECIALTY_REQUEST = "@specialty/CREATE_SPECIALTY_REQUEST",
  CREATE_SPECIALTY_SUCCESS = "@specialty/CREATE_SPECIALTY_SUCCESS",

  LOAD_REQUEST_SPECIALTY_BY_ID = "@specialty/LOAD_REQUEST_SPECIALTY_BY_ID",
  LOAD_SUCCESS_SPECIALTY_BY_ID = "@specialty/LOAD_SUCCESS_SPECIALTY_BY_ID",

  UPDATE_SPECIALTY_REQUEST = "@specialty/UPDATE_SPECIALTY_REQUEST",
  UPDATE_SPECIALTY_SUCCESS = "@specialty/UPDATE_SPECIALTY_SUCCESS",

  SEARCH_REQUEST = "@specialty/SEARCH_REQUEST",

}

/**
 * Data types
 */

export interface SpecialtyInterface {
  _id?: string;
  council_id: { _id: string, name: string, };
  name: string;
  describe: string;
  active: boolean;
}


export interface SpecialtyList {
  data: SpecialtyInterface[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}


/**
 * State type
 */
export interface SpecialtyState {
  data: SpecialtyInterface;
  list: SpecialtyList;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<SpecialtyList, 'data'>>
