import { action } from 'typesafe-actions';
import { CustomerTypes, CustomerInterface, ViacepDataInterface } from './types';

export const loadRequest = () => action(CustomerTypes.LOAD_REQUEST);

export const loadSuccess = (data: CustomerInterface) =>
  action(CustomerTypes.LOAD_SUCCCES, { data });

export const getAddress = (postalCode: string) => action(CustomerTypes.LOAD_REQUEST_ADDRESS, { postalCode });
export const successGetAddress = (data: ViacepDataInterface) => action(CustomerTypes.LOAD_RESPONSE_ADDRESS, { data });

export const createCustomerRequest = (data: CustomerInterface) => action(CustomerTypes.CREATE_CUSTOMER_REQUEST, { data });
export const createCustomerSuccess = (data: CustomerInterface) => action(CustomerTypes.UPDATE_CUSTOMER_REQUEST, { data });

export const updateCompanyRequest = (data: CustomerInterface) => action(CustomerTypes.UPDATE_CUSTOMER_REQUEST, { data });

export const loadCustomerById = (id: string) => action(CustomerTypes.LOAD_REQUEST_BY_ID, { id });

export const loadSuccessCustomerById = (data: CustomerInterface) => action(CustomerTypes.LOAD_SUCCESS_BY_ID, { data });

export const loadFailure = () => action(CustomerTypes.LOAD_FAILURE);
