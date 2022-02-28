import { action } from "typesafe-actions";
import { MeasurementsTypes, Measurements } from "./types";

export const loadRequest = (data: string) =>
  action(MeasurementsTypes.LOAD_REQUEST, data);
export const loadSuccess = (data: Measurements[]) =>
  action(MeasurementsTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(MeasurementsTypes.LOAD_FAILURE);
