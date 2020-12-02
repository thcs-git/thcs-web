import { action } from 'typesafe-actions';
import { UserTypes, UserInterface, ViacepDataInterface } from './types';

export const loadRequest = () => action(UserTypes.LOAD_REQUEST);
export const loadSuccess = (data: UserInterface) => action(UserTypes.LOAD_SUCCCES, { data });

export const getAddress = (postalCode: string) => action(UserTypes.LOAD_REQUEST_ADDRESS, { postalCode });

export const successGetAddress = (data: ViacepDataInterface) => action(UserTypes.LOAD_RESPONSE_ADDRESS, { data });


export const createUserRequest = (data: UserInterface) => action(UserTypes.CREATE_USER_REQUEST, { data });
export const createUserSuccess = (data: UserInterface) => action(UserTypes.CREATE_USER_SUCCESS, { data });

export const updateUserRequest = (data: UserInterface) => action(UserTypes.UPDATE_USER_REQUEST, { data });
export const updateUserSuccess = (data: UserInterface) => action(UserTypes.UPDATE_USER_SUCCESS, { data });

export const loadUserById = (id: string) => action(UserTypes.LOAD_REQUEST_USER_BY_ID, { id });
export const loadSuccessGetUserById = (data: UserInterface) => action(UserTypes.LOAD_SUCCCES_USER_BY_ID, { data });

export const loadFailure = () => action(UserTypes.LOAD_FAILURE);
