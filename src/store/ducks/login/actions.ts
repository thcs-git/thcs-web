import {action} from 'typesafe-actions';
import {LoginTypes, CredentialsInterface, EmailInterface} from './types';

// Login
export const loadRequest = (credentials: CredentialsInterface) =>
  action(LoginTypes.LOAD_REQUEST, {credentials});

export const loadSuccess = (credentials: CredentialsInterface) =>
  action(LoginTypes.LOAD_SUCCESS, {credentials});

export const loadFailure = () => action(LoginTypes.LOAD_FAILURE);

//Email
export const emailRequest = (credentials: CredentialsInterface) =>
  action(LoginTypes.EMAIL_REQUEST, {credentials});

export const emailSuccess = (data: EmailInterface) =>
  action(LoginTypes.EMAIL_SUCCESS, {data});

export const emailFailure = () => action(LoginTypes.EMAIL_FAILURE);

