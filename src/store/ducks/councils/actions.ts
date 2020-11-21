import { action } from 'typesafe-actions';
import { CouncilTypes, CouncilInterface } from './types';

export const loadRequest = () => action(CouncilTypes.LOAD_REQUEST);

export const loadSuccess = (data: CouncilInterface) =>
  action(CouncilTypes.LOAD_SUCCCES, { ...data });

export const loadFailure = () => action(CouncilTypes.LOAD_FAILURE);
