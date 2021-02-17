import { action } from "typesafe-actions";
import {
  ProfessionTypes,
  ProfessionInterface,
  LoadRequestParams,
} from "./types";

export const loadRequest = (params: LoadRequestParams = {}) =>
  action(ProfessionTypes.LOAD_REQUEST, { params });
export const loadSuccess = (data: ProfessionInterface) =>
  action(ProfessionTypes.LOAD_SUCCCES, { data });
export const loadFailure = (data?: ProfessionInterface) =>
  action(ProfessionTypes.LOAD_FAILURE, { data });
export const loadFailureCreateProfession = (data?: ProfessionInterface) =>
  action(ProfessionTypes.LOAD_FAILURE_CREATE_PROFESSION, { data });

export const createProfessionRequest = (data: ProfessionInterface) =>
  action(ProfessionTypes.CREATE_PROFESSION_REQUEST, { data });
export const createProfessionSuccess = (data: ProfessionInterface) =>
  action(ProfessionTypes.CREATE_PROFESSION_SUCCESS, { data });

export const updateProfessionRequest = (data: ProfessionInterface) =>
  action(ProfessionTypes.UPDATE_PROFESSION_REQUEST, { data });
export const updateProfessionSuccess = (data: ProfessionInterface) =>
  action(ProfessionTypes.UPDATE_PROFESSION_SUCCESS, { data });

export const searchRequest = (params: any) =>
  action(ProfessionTypes.SEARCH_REQUEST, { params });

export const setIfRegistrationCompleted = (value: boolean, id?: string) =>
  action(ProfessionTypes.REGISTRAION_COMPLETED, { value, id });
