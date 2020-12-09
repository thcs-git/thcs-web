/**
 * Action types
 */
export enum AreaTypes {
  LOAD_REQUEST = "@area/LOAD_REQUEST",
  LOAD_SUCCCES = "@area/LOAD_SUCCCES",
  LOAD_FAILURE = "@area/LOAD_FAILURE",

  CREATE_AREA_REQUEST = "@area/CREATE_AREA_REQUEST",
  CREATE_AREA_SUCCESS = "@area/CREATE_AREA_SUCCESS",

  UPDATE_AREA_REQUEST = "@area/UPDATE_AREA_REQUEST",
  UPDATE_AREA_SUCCESS = "@area/UPDATE_AREA_SUCCESS",

  LOAD_REQUEST_AREA_BY_ID = "@area/LOAD_REQUEST_AREA_BY_ID",
  LOAD_SUCCCES_AREA_BY_ID = "@area/LOAD_SUCCCES_AREA_BY_ID",

  LOAD_GET_DISTRICTS = "@area/LOAD_GET_DISTRICTS",
  LOAD_SUCCCES_GET_DISTRICTS = "@area/LOAD_SUCCCES_GET_DISTRICTS",
}

/**
 * Data types
 */

export interface UserAreaInterface {
  _id: string;
  name: string;
}

export interface NeighborhoodAreaInterface {
  _id: string;
  name: string;
}

export interface AreaInterface {
  _id?: string;
	name: string;
	describe?: string;
	supply_days: number;
  week_day: number;
  users: (UserAreaInterface | {})[],
  neighborhoods: (NeighborhoodAreaInterface | {})[],
	created_by?: { _id: string };
	active: boolean;
}

export interface AreaList {
  data: AreaInterface[];
  limit: string;
  page: string;
  total: number;
}

/**
 * State type
 */
export interface AreaState {
  data: AreaInterface;
  list: AreaList;
  districts: any[];
  loading: boolean;
  error: boolean;
}

export type LoadRequestParams = Partial<Omit<AreaList, 'data'>>
