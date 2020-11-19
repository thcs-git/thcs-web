import { action } from 'typesafe-actions';
import { CustomerTypes, CustomerInterface } from './types';

export const loadRequest = () => action(CustomerTypes.LOAD_REQUEST);

export const loadSuccess = (data: CustomerInterface) =>
  action(CustomerTypes.LOAD_SUCCCES, { ...data });

export const loadFailure = () => action(CustomerTypes.LOAD_FAILURE);
