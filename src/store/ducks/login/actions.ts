import { action } from 'typesafe-actions';
import { LoginTypes, CredentialsInterface } from './types';

export const loadRequest = () => action(LoginTypes.LOAD_REQUEST);

export const loadSuccess = (credentials: CredentialsInterface) =>
  action(LoginTypes.LOAD_SUCCCES, { credentials });

export const loadFailure = () => action(LoginTypes.LOAD_FAILURE);
