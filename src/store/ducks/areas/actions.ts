import { action } from "typesafe-actions";
import { AreaTypes, AreaInterface, LoadRequestParams } from "./types";

export const loadRequest = (params: LoadRequestParams = {}) =>
  action(AreaTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: AreaInterface) =>
  action(AreaTypes.LOAD_SUCCESS, { data });

export const loadFailure = () => action(AreaTypes.LOAD_FAILURE);

export const createAreaRequest = (data: AreaInterface) =>
  action(AreaTypes.CREATE_AREA_REQUEST, { data });
export const createAreaSuccess = (data: AreaInterface) =>
  action(AreaTypes.CREATE_AREA_SUCCESS, { data });

export const updateAreaRequest = (data: AreaInterface) =>
  action(AreaTypes.UPDATE_AREA_REQUEST, { data });
export const updateAreaSuccess = (data: AreaInterface) =>
  action(AreaTypes.UPDATE_AREA_SUCCESS, { data });

export const loadAreaById = (id: string) =>
  action(AreaTypes.LOAD_REQUEST_AREA_BY_ID, { id });
export const loadSuccessGetAreaById = (data: AreaInterface) =>
  action(AreaTypes.LOAD_SUCCESS_AREA_BY_ID, { data });

export const loadGetDistricts = () => action(AreaTypes.LOAD_GET_DISTRICTS);
export const loadGetCitys = (value: string) =>
  action(AreaTypes.LOAD_GET_CITYS, { value });

export const loadGetDistricts_ = (value: any) =>
  action(AreaTypes.LOAD_GET_DISTRICTS_, { value });
export const loadSuccessGetDistricts = (data: any) =>
  action(AreaTypes.LOAD_SUCCCES_GET_DISTRICTS_, { data });
export const loadSuccessGetCitys = (data: any) =>
  action(AreaTypes.LOAD_SUCCCES_GET_CITYS, { data });

export const searchRequest = (value: any) =>
  action(AreaTypes.SEARCH_REQUEST, { value });

export const loadPointsArea = (value: any) =>
  action(AreaTypes.LOAD_POINTS_AREA, { value });

export const loadPointSuccess = (data: any) =>
  action(AreaTypes.LOAD_POINTS_SUCCESS, { data });

export const cleanAction = () => action(AreaTypes.CLEAN);
