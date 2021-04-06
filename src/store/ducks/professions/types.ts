/**
 * Action types
 */
export enum ProfessionTypes {
  LOAD_REQUEST = "@profession/LOAD_REQUEST",
  LOAD_SUCCCES = "@profession/LOAD_SUCCCES",
  LOAD_FAILURE = "@profession/LOAD_FAILURE",
  LOAD_FAILURE_CREATE_PROFESSION = "@profession/LOAD_FAILURE_CREATE_PROFESSION",

  CREATE_PROFESSION_REQUEST = "@profession/CREATE_PROFESSION_REQUEST",
  CREATE_PROFESSION_SUCCESS = "@profession/CREATE_PROFESSION_SUCCESS",

  UPDATE_PROFESSION_REQUEST = "@profession/UPDATE_PROFESSION_REQUEST",
  UPDATE_PROFESSION_SUCCESS = "@profession/UPDATE_PROFESSION_SUCCESS",

  LOAD_REQUEST_PROFESSION_BY_ID = "@profession/LOAD_REQUEST_PROFESSION_BY_ID",
  LOAD_SUCCCES_PROFESSION_BY_ID = "@profession/LOAD_SUCCCES_PROFESSION_BY_ID",

  SEARCH_REQUEST = "@profession/SEARCH_REQUEST",

  REGISTRAION_COMPLETED = "@profession/REGISTRAION_COMPLETED",
}

/**
 * Data types
 */

export interface ProfessionInterface {
  _id?: string;
  name: string;
  describe: string;
  active: boolean;
}

export interface ProfessionList {
  data: ProfessionDataItems[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

export interface ProfessionDataItems {
  _id: string;
  name: string;
  describe: string;
  created_at: string;
  active: boolean;
}

/**
 * State type
 */
export interface ProfessionState {
  data: ProfessionInterface;
  list: ProfessionList;
  loading: boolean;
  error: boolean;
  success: boolean;
  isRegistrationCompleted?: boolean;
}

export type LoadRequestParams = Partial<Omit<ProfessionList, "data">>;
