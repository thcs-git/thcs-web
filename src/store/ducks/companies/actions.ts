import { action } from 'typesafe-actions';
import { CompanyTypes, CompanyInterface, ViacepDataInterface, LoadRequestParams } from './types';

export const loadRequest = (params: LoadRequestParams = {}) => action(CompanyTypes.LOAD_REQUEST, { params });
export const loadSuccess = (data: CompanyInterface) => action(CompanyTypes.LOAD_SUCCCES, { data });
export const loadFailure = () => action(CompanyTypes.LOAD_FAILURE);

export const getAddress = (postalCode: string) => action(CompanyTypes.LOAD_REQUEST_ADDRESS, { postalCode });
export const successGetAddress = (data: ViacepDataInterface) => action(CompanyTypes.LOAD_RESPONSE_ADDRESS, { data });

export const createCompanyRequest = (data: CompanyInterface) => action(CompanyTypes.CREATE_COMPANY_REQUEST, { data });
export const createCompanySuccess = (data: CompanyInterface) => action(CompanyTypes.UPDATE_COMPANY_SUCCESS, { data });

export const updateCompanyRequest = (data: CompanyInterface) => action(CompanyTypes.UPDATE_COMPANY_REQUEST, { data });
export const updateCompanySuccess = (data: CompanyInterface) => action(CompanyTypes.UPDATE_COMPANY_SUCCESS, { data });

export const loadCompanyById = (id: string) => action(CompanyTypes.LOAD_REQUEST_COMPANY_BY_ID, { id });
export const loadSuccessGetCompanyById = (data: CompanyInterface) => action(CompanyTypes.LOAD_SUCCESS_COMPANY_BY_ID, { data });
