import { action } from "typesafe-actions";
import { CustomerLogsTypes } from "./types";

export const loadRequest = () => action(CustomerLogsTypes.LOAD_REQUEST);
export const loadSuccess = (data: any) =>
  action(CustomerLogsTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(CustomerLogsTypes.LOAD_FAILURE);
