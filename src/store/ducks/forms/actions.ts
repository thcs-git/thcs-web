import { action } from "typesafe-actions";
import { FormTypes, FormsData } from "./types";

export const loadRequest = (data: string) =>
  action(FormTypes.LOAD_REQUEST, data);
export const loadSuccess = (forms: FormsData) =>
  action(FormTypes.LOAD_SUCCESS, forms);
export const loadFailure = () => action(FormTypes.LOAD_FAILURE);
export const loadFormsFilterRequest = (data:any) =>
  action(FormTypes.LOAD_FORMS_FILTER_REQUEST, data);
export const loadFormsFilterSuccess = (data:any) =>
  action(FormTypes.LOAD_FORMS_FILTER_SUCCESS, data);
export const loadFormsFilterError = () =>
  action(FormTypes.LOAD_FAILURE);
export const loadFormsGroupByDateRequest = (data: any) =>
  action(FormTypes.LOAD_FORMS_GROUP_BY_DATE_REQUEST, data);
export const loadFormsGroupByDateRequestSuccess = (data: any) =>
  action(FormTypes.LOAD_FORMS_GROUP_BY_DATE_REQUEST_SUCCESS, data);
export const loadFormsGroupRequestError = () =>
  action(FormTypes.LOAD_FAILURE);
