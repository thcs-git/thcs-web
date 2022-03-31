import { action } from "typesafe-actions";
import {
  PrescriptionTypes,
  PrescriptionInterface,
  LoadRequestParams,
} from "./types";

export const loadRequest = (params: LoadRequestParams = {}) =>
  action(PrescriptionTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: PrescriptionInterface) =>
  action(PrescriptionTypes.LOAD_SUCCCES, { data });

export const createPrescriptionRequest = (data: PrescriptionInterface) =>
  action(PrescriptionTypes.CREATE_PRESCRIPTION_REQUEST, { data });
export const createPrescriptionSuccess = (data: PrescriptionInterface) =>
  action(PrescriptionTypes.CREATE_PRESCRIPTION_SUCCESS, { data });

export const updatePrescriptionRequest = (data: PrescriptionInterface) =>
  action(PrescriptionTypes.UPDATE_PRESCRIPTION_REQUEST, { data });
export const updatePrescriptionSuccess = (data: PrescriptionInterface) =>
  action(PrescriptionTypes.UPDATE_PRESCRIPTION_SUCCESS, { data });

export const loadPrescriptionById = (id: string) =>
  action(PrescriptionTypes.LOAD_REQUEST_PRESCRIPTION_BY_ID, { id });
export const loadSuccessGetPrescriptionById = (data: PrescriptionInterface) =>
  action(PrescriptionTypes.LOAD_SUCCCES_PRESCRIPTION_BY_ID, { data });

export const loadFailure = () => action(PrescriptionTypes.LOAD_FAILURE);

export const searchRequest = (value: string) =>
  action(PrescriptionTypes.SEARCH_REQUEST, { value });

export const loadRequestByCareId = (data: {}) =>
  action(PrescriptionTypes.LOAD_REQUEST_PRESCRIPTION_BY_CARE_ID, { data });
export const loadSuccessByCareId = (data: any) =>
  action(PrescriptionTypes.LOAD_SUCCESS_PRESCRIPTION_BY_CARE_ID, { data });
export const loadFailureByCareId = () =>
  action(PrescriptionTypes.LOAD_FAILURE_PRESCRIPTION_BY_CARE_ID);
