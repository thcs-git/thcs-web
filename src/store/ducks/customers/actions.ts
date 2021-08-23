import { action } from "typesafe-actions";
import {
  CustomerTypes,
  CustomerInterface,
  ViacepDataInterface,
  LoadRequestParams,
  PermissionInterface,
} from "./types";

export const loadRequest = (params: LoadRequestParams = {}) =>
  action(CustomerTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: CustomerInterface) =>
  action(CustomerTypes.LOAD_SUCCESS, { data });

export const getAddress = (postalCode: string) =>
  action(CustomerTypes.LOAD_REQUEST_ADDRESS, { postalCode });
export const successGetAddress = (data: ViacepDataInterface) =>
  action(CustomerTypes.LOAD_RESPONSE_ADDRESS, { data });

export const getPermission = (id: string) =>
  action(CustomerTypes.LOAD_REQUEST_PERMISSION, { id });
export const successGetPermission = (data: PermissionInterface) =>
  action(CustomerTypes.LOAD_RESPONSE_PERMISSION, { data });

export const createCustomerRequest = (data: CustomerInterface) =>
  action(CustomerTypes.CREATE_CUSTOMER_REQUEST, { data });
export const createCustomerSuccess = (data: CustomerInterface) =>
  action(CustomerTypes.CREATE_CUSTOMER_SUCCESS, { data });

export const updateCustomerRequest = (data: CustomerInterface) =>
  action(CustomerTypes.UPDATE_CUSTOMER_REQUEST, { data });
export const updateCustomerSuccess = (data: CustomerInterface) =>
  action(CustomerTypes.UPDATE_CUSTOMER_SUCCESS, { data });

export const loadCustomerById = (id: string) =>
  action(CustomerTypes.LOAD_REQUEST_BY_ID, { id });

export const loadSuccessCustomerById = (data: CustomerInterface) =>
  action(CustomerTypes.LOAD_SUCCESS_BY_ID, { data });

export const loadPermissionRequest = (id: string) =>
  action(CustomerTypes.LOAD_REQUEST_PERMISSION, { id });
export const loadPermissionSuccess = (data: PermissionInterface) =>
  action(CustomerTypes.LOAD_RESPONSE_PERMISSION, { data });
export const updatePermissionRequest = (data: PermissionInterface) =>
  action(CustomerTypes.UPDATE_PERMISSION_REQUEST, { data });
export const updatePermissionSuccess = (data: PermissionInterface) =>
  action(CustomerTypes.UPDATE_PERMISSION_SUCCESS, { data });
export const createPermissionRequest = (data: PermissionInterface) =>
  action(CustomerTypes.CREATE_PERMISSION_REQUEST, { data });
export const createPermissionSuccess = (data: PermissionInterface) =>
  action(CustomerTypes.CREATE_PERMISSION_SUCCESS, { data });

export const loadFailure = () => action(CustomerTypes.LOAD_FAILURE);
export const loadFailureCep = () => action(CustomerTypes.LOAD_FAILURE_CEP);

export const searchRequest = (value: string) =>
  action(CustomerTypes.SEARCH_REQUEST, { value });

export const cleanAction = () => action(CustomerTypes.CLEAN);
