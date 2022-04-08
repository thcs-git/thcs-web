import { action } from "typesafe-actions";
import { AttestData, AttestTypes } from "./types";

export const loadRequest = (data: any) =>
  action(AttestTypes.LOAD_REQUEST, data);
export const loadSuccess = (attest: AttestData) =>
  action(AttestTypes.LOAD_SUCCESS, attest);
export const loadFailure = () => action(AttestTypes.LOAD_FAILURE);
