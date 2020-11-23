import { action } from 'typesafe-actions';
import { UserTypes, UserInterface } from './types';

export const loadRequest = () => action(UserTypes.LOAD_REQUEST);

export const loadSuccess = (data: UserInterface) =>
  action(UserTypes.LOAD_SUCCCES, { ...data });

export const loadFailure = () => action(UserTypes.LOAD_FAILURE);
