/**
 * Action types
 */
export enum AreaTypes {
  LOAD_REQUEST = "@area/LOAD_REQUEST",
  LOAD_SUCCESS = "@area/LOAD_SUCCESS",
  LOAD_FAILURE = "@area/LOAD_FAILURE",

  CREATE_AREA_REQUEST = "@area/CREATE_AREA_REQUEST",
  CREATE_AREA_SUCCESS = "@area/CREATE_AREA_SUCCESS",

  UPDATE_AREA_REQUEST = "@area/UPDATE_AREA_REQUEST",
  UPDATE_AREA_SUCCESS = "@area/UPDATE_AREA_SUCCESS",

  LOAD_REQUEST_AREA_BY_ID = "@area/LOAD_REQUEST_AREA_BY_ID",
  LOAD_SUCCESS_AREA_BY_ID = "@area/LOAD_SUCCESS_AREA_BY_ID",

  LOAD_GET_DISTRICTS = "@area/LOAD_GET_DISTRICTS",
  LOAD_GET_DISTRICTS_ = "@area/LOAD_GET_DISTRICTS_",
  LOAD_GET_CITYS = "@area/LOAD_GET_CITYS",
  LOAD_SUCCCES_GET_CITYS = "@area/LOAD_SUCCCES_GET_CITYS",

  LOAD_SUCCCES_GET_DISTRICTS = "@area/LOAD_SUCCCES_GET_DISTRICTS",
  LOAD_SUCCESS_GET_DISTRICTS = "@area/LOAD_SUCCESS_GET_DISTRICTS",

  LOAD_SUCCCES_GET_DISTRICTS_ = "@area/LOAD_SUCCCES_GET_DISTRICTS_",

  LOAD_POINTS_AREA = "@area/LOAD_POINTS_AREA",
  LOAD_POINTS_SUCCESS = "@area/LOAD_POINTS_SUCCESS",
  SEARCH_REQUEST = "@area/SEARCH_REQUEST",
  CLEAN = "@area/CLEAN",
}

/**
 * Data types
 */

export interface UserAreaInterface {
  _id: string;
  name: string;
  profession: string;
}
export interface ProfessionAreaInterface {
  profession: string;
  users: UserAreaInterface[];
}
export interface DistricAreaInterface {
  _id: string;
  location_id: string;
  name: string;
  city: string;
  state: string;
}
export interface NeighborhoodAreaInterface {
  _id: string;
  name: string;
  city: string;
  state: string;
}

export interface CityAreaInterface {
  _id: string;
  name: string;
  sigla: string;
}

export interface AreaInterface {
  _id?: any;
  name: any;
  describe?: string;
  supply_days: number;
  week_day: number;
  users: UserAreaInterface[];
  neighborhoods: NeighborhoodAreaInterface[];
  created_by?: { _id: any };
  created_at: string;
  active: boolean;
  profession_users: ProfessionAreaInterface[];
}

export interface AreaPoints {
  name: string;
  geolocation: {
    latitude: string;
    longitude: string;
  };
  portal_code: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
}

export interface AreaList {
  data: AreaInterface[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

/**
 * State type
 */
export interface AreaState {
  //areaState: AreaState;
  data: AreaInterface;
  list: AreaList;
  districts: NeighborhoodAreaInterface[];
  citys: any[];
  districts_: any[];
  profession: ProfessionAreaInterface[];
  points: AreaPoints[];
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<AreaList, "data">>;
