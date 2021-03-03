import { action } from 'typesafe-actions';
import { CouncilTypes, CouncilInterface, LoadRequestParams } from './types';

export const loadRequest = (params: LoadRequestParams = {}) => action(CouncilTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: CouncilInterface) => action(CouncilTypes.LOAD_SUCCESS, { data });

export const loadFailure = () => action(CouncilTypes.LOAD_FAILURE);

export const createCouncilRequest = (data: CouncilInterface) => action(CouncilTypes.CREATE_COUNCIL_REQUEST, { data });
export const createCouncilSuccess = (data: CouncilInterface) => action(CouncilTypes.CREATE_COUNCIL_SUCCESS, { data });

export const updateCouncilRequest = (data: CouncilInterface) => action(CouncilTypes.UPDATE_COUNCIL_REQUEST, { data });
export const updateCouncilSuccess = (data: CouncilInterface) => action(CouncilTypes.UPDATE_COUNCIL_SUCCESS, { data });

export const loadCouncilById = (id: string) => action(CouncilTypes.LOAD_REQUEST_COUNCIL_BY_ID, { id });
export const loadSuccessGetCouncilById = (data: CouncilInterface) => action(CouncilTypes.LOAD_SUCCESS_COUNCIL_BY_ID, { data });

export const searchRequest = (value: string) => action(CouncilTypes.SEARCH_REQUEST, { value });
