import { action } from 'typesafe-actions';
import { CompanyTypes, CompanyInterface } from './types';

export const loadRequest = () => action(CompanyTypes.LOAD_REQUEST);

export const loadSuccess = (data: CompanyInterface) =>
  action(CompanyTypes.LOAD_SUCCCES, { ...data });

export const loadFailure = () => action(CompanyTypes.LOAD_FAILURE);
