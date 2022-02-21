import { PatientState } from "./../patients/types";
import { action } from "typesafe-actions";
import { AllergiesTypes, AllergiesInterface } from "./types";

export const loadRequest = (data: string) =>
  action(AllergiesTypes.LOAD_REQUEST, data);
export const loadSuccess = (data: AllergiesInterface[]) =>
  action(AllergiesTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(AllergiesTypes.LOAD_FAILURE);
