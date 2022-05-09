import { action } from "typesafe-actions";
import { AntibioticTypes, Antibiotic } from "./types";

export const loadRequest = (data: string) =>
  action(AntibioticTypes.LOAD_REQUEST, data);
export const loadSuccess = (data: Antibiotic[]) =>
  action(AntibioticTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(AntibioticTypes.LOAD_FAILURE);

export const loadRequestReportUnique = (data: any) =>
  action(AntibioticTypes.LOAD_REQUEST_REPORT_UNIQUE, data);
export const loadSucessReportUnique = (data: any) =>
  action(AntibioticTypes.LOAD_SUCCESS_REPORT_UNIQUE, data);
export const loadFailureReportUnique = () =>
  action(AntibioticTypes.LOAD_FAILURE_REPORT_UNIQUE);
