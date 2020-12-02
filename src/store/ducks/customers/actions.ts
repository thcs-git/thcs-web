import { action } from 'typesafe-actions';
import { CustomerTypes, CustomerInterface } from './types';

export const loadRequest = () => action(CustomerTypes.LOAD_REQUEST);

export const loadSuccess = (data: CustomerInterface) =>
  action(CustomerTypes.LOAD_SUCCCES, { data });

export const loadCustomerById = (id: string) => action(CustomerTypes.LOAD_REQUEST_BY_ID, { id });

export const loadSuccessCustomerById = (data: CustomerInterface) => action(CustomerTypes.LOAD_SUCCESS_BY_ID, { data });

export const loadFailure = () => action(CustomerTypes.LOAD_FAILURE);
