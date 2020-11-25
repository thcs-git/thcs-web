import { action } from 'typesafe-actions';
import { SpecialtyTypes, SpecialtyInterface } from './types';

export const loadRequest = () => action(SpecialtyTypes.LOAD_REQUEST);

export const loadSuccess = (data: SpecialtyInterface) => action(SpecialtyTypes.LOAD_SUCCCES, { data });

export const loadFailure = () => action(SpecialtyTypes.LOAD_FAILURE);
