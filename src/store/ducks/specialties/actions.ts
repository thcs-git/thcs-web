import { action } from 'typesafe-actions';
import { SpecialtyTypes, SpecialtyInterface } from './types';

export const loadRequest = () => action(SpecialtyTypes.LOAD_REQUEST);

export const loadSuccess = (data: SpecialtyInterface) => action(SpecialtyTypes.LOAD_SUCCCES, { data });

export const createSpecialtyRequest = (data: SpecialtyInterface) => action(SpecialtyTypes.CREATE_SPECIALTY_REQUEST, { data });
export const createSpecialtySuccess = (data: SpecialtyInterface) => action(SpecialtyTypes.CREATE_SPECIALTY_SUCCESS, { data });

export const updateSpecialtyRequest = (data: SpecialtyInterface) => action(SpecialtyTypes.UPDATE_SPECIALTY_REQUEST, { data });
export const updateSpecialtySuccess = (data: SpecialtyInterface) => action(SpecialtyTypes.UPDATE_SPECIALTY_SUCCESS, { data });

export const loadSpecialtyById = (id: string) => action(SpecialtyTypes.LOAD_REQUEST_SPECIALTY_BY_ID, { id });
export const loadSuccessGetSpecialtyById = (data: SpecialtyInterface) => action(SpecialtyTypes.LOAD_SUCCESS_SPECIALTY_BY_ID, { data });

export const loadFailure = () => action(SpecialtyTypes.LOAD_FAILURE);