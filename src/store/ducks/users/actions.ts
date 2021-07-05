import { action } from "typesafe-actions";
import {
  UserTypes,
  UserInterface,
  ViacepDataInterface,
  LoadRequestParams,
  UserRecoveryPassword,
} from "./types";

export const loadRequest = (params: LoadRequestParams = {}) =>
  action(UserTypes.LOAD_REQUEST, { params });
export const loadSuccess = (data: UserInterface) =>
  action(UserTypes.LOAD_SUCCESS, { data });

export const getAddress = (postalCode: string) =>
  action(UserTypes.LOAD_REQUEST_ADDRESS, { postalCode });
export const successGetAddress = (data: ViacepDataInterface) =>
  action(UserTypes.LOAD_RESPONSE_ADDRESS, { data });
export const errorGetAddress = () => action(UserTypes.ERROR_RESPONSE_ADDRESS);

export const loadProfessionsRequest = () =>
  action(UserTypes.LOAD_REQUEST_PROFESSION);
export const loadProfessionsSuccess = (data: any) =>
  action(UserTypes.LOAD_RESPONSE_PROFESSION, { data });

export const loadGetUserDisengaged = (params: LoadRequestParams = {}) =>
  action(UserTypes.LOAD_REQUEST_USER_DISENGAGED, { params });
export const loadSuccessGetUserDisengaged = (data: any) =>
  action(UserTypes.LOAD_RESPONSE_USER_DISENGAGED, { data });
export const loadSearchUserDisengaged = (data: any) =>
  action(UserTypes.SEARCH_REQUEST_USER_DISENGAGED, { data });

export const createUserRequest = (data: UserInterface) =>
  action(UserTypes.CREATE_USER_REQUEST, { data });
export const createUserSuccess = (data: UserInterface) =>
  action(UserTypes.CREATE_USER_SUCCESS, { data });

export const updateUserRequest = (data: UserInterface) =>
  action(UserTypes.UPDATE_USER_REQUEST, { data });

export const updateUserSuccess = (data: UserInterface) =>
  action(UserTypes.UPDATE_USER_SUCCESS, { data });

export const loadUserById = (id: string) =>
  action(UserTypes.LOAD_REQUEST_USER_BY_ID, { id });

export const loadUserByEmail = (email: string) =>
  action(UserTypes.LOAD_REQUEST_USER_BY_EMAIL, { email });

export const loadSuccessGetUserByEmail = (data: UserInterface) =>
  action(UserTypes.LOAD_SUCCESS_USER_BY_EMAIL, { data });

export const loadSuccessGetUserById = (data: UserInterface) =>
  action(UserTypes.LOAD_SUCCESS_USER_BY_ID, { data });

export const loadFailure = () => action(UserTypes.LOAD_FAILURE);

export const searchRequest = (data: any) =>
  action(UserTypes.SEARCH_REQUEST, { data });

export const loadUserTypesRequest = (value?: string) =>
  action(UserTypes.LOAD_REQUEST_USER_TYPES, { value });

export const loadUserTypesSuccess = (value: any) =>
  action(UserTypes.LOAD_RESPONSE_USER_TYPES, { ...value });

export const loadCheckEmail = (token: any) =>
  action(UserTypes.LOAD_REQUEST_CHECK_EMAIL, { token });

export const loadCheckSuccess = (data: UserInterface) =>
  action(UserTypes.LOAD_RESPONSE_CHECK_EMAIL, { data });

export const loadRecoveryPassword = (data: UserRecoveryPassword) =>
  action(UserTypes.LOAD_REQUEST_RECOVERY_PASSWORD, { data });

export const loadRecoveryPasswordiftoken = (data: UserRecoveryPassword) =>
  action(UserTypes.LOAD_REQUEST_RECOVERY_PASSWORD_TOKEN, { data });

export const loadRecoverySuccess = (data: UserRecoveryPassword) =>
  action(UserTypes.LOAD_SUCCESS_RECOVERY_PASSWORD, { data });

export const loadConfirmUser = (data: any) =>
  action(UserTypes.LOAD_CONFIRM_USER, { data });
export const loadSuccessConfirm = (data: any) =>
  action(UserTypes.LOAD_SUCCESS_CONFIRM, { data });
export const cleanAction = () => action(UserTypes.CLEAN);
