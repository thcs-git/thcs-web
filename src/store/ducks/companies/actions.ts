import { action } from 'typesafe-actions';
import { CompanyTypes, CompanyInterface, ViacepDataInterface } from './types';

export const loadRequest = () => action(CompanyTypes.LOAD_REQUEST);

export const loadSuccess = (data: CompanyInterface) =>
  action(CompanyTypes.LOAD_SUCCCES, { ...data });

export const getAddress = (postalCode: string) => action(CompanyTypes.LOAD_REQUEST_ADDRESS, { postalCode });

export const successGetAddress = (data: ViacepDataInterface) => action(CompanyTypes.LOAD_RESPONSE_ADDRESS, { data });

export const createCompanyRequest = (data: CompanyInterface) => action(CompanyTypes.CREATE_COMPANY_REQUEST, { data });

export const loadFailure = () => action(CompanyTypes.LOAD_FAILURE);
