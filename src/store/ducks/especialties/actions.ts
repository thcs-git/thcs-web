import { action } from 'typesafe-actions';
import { EspecialtyTypes, EspecialtyInterface } from './types';

export const loadRequest = () => action(EspecialtyTypes.LOAD_REQUEST);

export const loadSuccess = (data: EspecialtyInterface) =>
  action(EspecialtyTypes.LOAD_SUCCCES, { ...data });

export const loadFailure = () => action(EspecialtyTypes.LOAD_FAILURE);
