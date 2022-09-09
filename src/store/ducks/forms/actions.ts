import { action } from "typesafe-actions";
import { FormTypes, FormsData } from "./types";

export const loadRequest = (data: string) =>
  action(FormTypes.LOAD_REQUEST, data);
export const loadSuccess = (forms: FormsData) =>
  action(FormTypes.LOAD_SUCCESS, forms);
export const loadFailure = () => action(FormTypes.LOAD_FAILURE);
