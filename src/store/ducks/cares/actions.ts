import { action } from 'typesafe-actions';
import { CareTypes, CareInterface, LoadRequestParams } from './types';

export const loadRequest = (params: LoadRequestParams = {}) => action(CareTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: CareInterface) => action(CareTypes.LOAD_SUCCCES, { data });

export const loadFailure = () => action(CareTypes.LOAD_FAILURE);

export const createCareRequest = (data: CareInterface) => action(CareTypes.CREATE_CARE_REQUEST, { data });
export const createCareSuccess = (data: CareInterface) => action(CareTypes.CREATE_CARE_SUCCESS, { data });

export const updateCareRequest = (data: CareInterface) => action(CareTypes.UPDATE_CARE_REQUEST, { data });
export const updateCareSuccess = (data: CareInterface) => action(CareTypes.UPDATE_CARE_SUCCESS, { data });

export const loadCareById = (id: string) => action(CareTypes.LOAD_REQUEST_CARE_BY_ID, { id });
export const loadSuccessGetCareById = (data: CareInterface) => action(CareTypes.LOAD_SUCCCES_CARE_BY_ID, { data });

export const searchCareRequest = (params: any) => action(CareTypes.SEARCH_CARE_REQUEST, { params });
export const searchCareSuccess = (data: CareInterface) => action(CareTypes.SEARCH_CARE_SUCCESS, { data });
