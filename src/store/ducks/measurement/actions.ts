import { loadSuccess } from "./../unconfirmeduser/actions";
import { action } from "typesafe-actions";
import {
  MeasurementInterface,
  MeasurementItem,
  MeasurementUnit,
  LoadRequestParams,
  MeasurementTypes,
} from "./types";

export const loadFailure = (data?: MeasurementInterface) =>
  action(MeasurementTypes.LOAD_FAILURE, { data });

export const loadRequestMeasurement = (params: LoadRequestParams = {}) =>
  action(MeasurementTypes.LOAD_REQUEST_MEASUREMENT, { params });

export const loadSuccessMeasurement = (data: MeasurementInterface) =>
  action(MeasurementTypes.LOAD_SUCCESS_MEASUREMENT, { data });
