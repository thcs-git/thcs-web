import { action } from "typesafe-actions";
import { AttachmentTypes, LoadRequestParams, attachmentList } from "./types";

export const loadRequest = (data: LoadRequestParams) =>
  action(AttachmentTypes.LOAD_REQUEST, data);
export const loadSuccess = (data: attachmentList[]) =>
  action(AttachmentTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(AttachmentTypes.LOAD_FAILURE);
export const loadRequestFile = (nameFile: string) =>
  action(AttachmentTypes.LOAD_REQUEST_FILE, nameFile);
export const loadSuccessFile = () => action(AttachmentTypes.LOAD_SUCCESS_FILE);
