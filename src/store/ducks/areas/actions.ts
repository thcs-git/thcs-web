import { action } from 'typesafe-actions';
import { AreaTypes, AreaInterface } from './types';

export const loadRequest = () => action(AreaTypes.LOAD_REQUEST);

export const loadSuccess = (data: AreaInterface) =>
  action(AreaTypes.LOAD_SUCCCES, { ...data });

export const loadFailure = () => action(AreaTypes.LOAD_FAILURE);
