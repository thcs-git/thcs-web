import { action } from 'typesafe-actions';
import { SpecialtyTypes, SpecialtyInterface, LoadRequestParams } from './types';

export const loadRequest = (params: LoadRequestParams = {}) => action(SpecialtyTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: SpecialtyInterface) => action(SpecialtyTypes.LOAD_SUCCESS, { data });

export const createSpecialtyRequest = (data: SpecialtyInterface) => action(SpecialtyTypes.CREATE_SPECIALTY_REQUEST, { data });
export const createSpecialtySuccess = (data: SpecialtyInterface) => action(SpecialtyTypes.CREATE_SPECIALTY_SUCCESS, { data });

export const updateSpecialtyRequest = (data: SpecialtyInterface) => action(SpecialtyTypes.UPDATE_SPECIALTY_REQUEST, { data });
export const updateSpecialtySuccess = (data: SpecialtyInterface) => action(SpecialtyTypes.UPDATE_SPECIALTY_SUCCESS, { data });

export const loadSpecialtyById = (id: string) => action(SpecialtyTypes.LOAD_REQUEST_SPECIALTY_BY_ID, { id });
export const loadSuccessGetSpecialtyById = (data: SpecialtyInterface) => action(SpecialtyTypes.LOAD_SUCCESS_SPECIALTY_BY_ID, { data });

export const loadFailure = () => action(SpecialtyTypes.LOAD_FAILURE);

export const searchRequest = (value: string) => action(SpecialtyTypes.SEARCH_REQUEST, { value });
