import { action } from "typesafe-actions";
import {
  Telemedicine,
  TelemedicineState,
  LoadRequestParams,
  TelemedicineTypes,
} from "./types";

type params = { external_attendance_id: string; type: string | undefined };

export const loadRequest = (data: any) =>
  action(TelemedicineTypes.LOAD_REQUEST, data);
export const loadSuccess = (data: Telemedicine) =>
  action(TelemedicineTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(TelemedicineTypes.LOAD_FAILURE);

export const loadRequestReportUnique = (data: any) =>
  action(TelemedicineTypes.LOAD_REQUEST_REPORT_UNIQUE, data);
export const loadSuccessReportUnique = () =>
  action(TelemedicineTypes.LOAD_SUCCESS_REPORT_UNIQUE);

export const loadRequestReportByDay = (data: any) =>
  action(TelemedicineTypes.LOAD_REQUEST_REPORT_BY_DAY, data);
export const loadSuccessReportByDay = () =>
  action(TelemedicineTypes.LOAD_SUCCESS_REPORT_BY_DAY);

export const loadRequestReportFilter = (data: any) =>
  action(TelemedicineTypes.LOAD_REQUEST_REPORT_FILTER, data);
export const loadSuccessReportFilter = () =>
  action(TelemedicineTypes.LOAD_SUCCESS_REPORT_FILTER);
