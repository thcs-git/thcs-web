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
