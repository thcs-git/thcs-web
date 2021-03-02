import { action } from 'typesafe-actions';
import { LoginTypes, CredentialsInterface } from './types';

export const loadRequest = (credentials: CredentialsInterface) => action(LoginTypes.LOAD_REQUEST, { credentials });

export const loadSuccess = (credentials: CredentialsInterface) =>
  action(LoginTypes.LOAD_SUCCESS, { credentials });

export const loadFailure = () => action(LoginTypes.LOAD_FAILURE);
