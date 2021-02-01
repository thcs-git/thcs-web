import { action } from 'typesafe-actions';
import { UnconfirmedUserTypes, UnconfirmedUserInterface,  LoadRequestParams } from './types';

export const loadRequest = (params: LoadRequestParams = {}) => action(UnconfirmedUserTypes.LOAD_REQUEST, { params });
export const loadSuccess = (data: UnconfirmedUserInterface) => action(UnconfirmedUserTypes.LOAD_SUCCCES, { data });

export const getAddress = (postalCode: string) => action(UnconfirmedUserTypes.LOAD_REQUEST_ADDRESS, { postalCode });




export const createUnconfirmedUserRequest = (data: UnconfirmedUserInterface) => action(UnconfirmedUserTypes.CREATE_UNCONFIRMEDUSER_REQUEST, { data });
export const registerUnconfirmedUserRequest = (data: UnconfirmedUserInterface) => action(UnconfirmedUserTypes.REGISTER_UNCONFIRMEDUSER_REQUEST, { data });
export const createUnconfirmedUserSuccess = (data: UnconfirmedUserInterface) => action(UnconfirmedUserTypes.CREATE_UNCONFIRMEDUSER_SUCCESS, { data });

export const updateUnconfirmedUserRequest = (data: UnconfirmedUserInterface) => action(UnconfirmedUserTypes.UPDATE_UNCONFIRMEDUSER_REQUEST, { data });
export const updateUnconfirmedUserSuccess = (data: UnconfirmedUserInterface) => action(UnconfirmedUserTypes.UPDATE_UNCONFIRMEDUSER_SUCCESS, { data });

export const loadUnconfirmedUserById = (id: string) => action(UnconfirmedUserTypes.LOAD_REQUEST_USER_BY_ID, { id });
export const loadSuccessGetUnconfirmedUserById = (data: UnconfirmedUserInterface) => action(UnconfirmedUserTypes.LOAD_SUCCCES_USER_BY_ID, { data });

export const loadFailure = () => action(UnconfirmedUserTypes.LOAD_FAILURE);

export const searchRequest = (value: string) => action(UnconfirmedUserTypes.SEARCH_REQUEST, { value });
