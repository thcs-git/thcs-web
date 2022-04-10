import { action } from "typesafe-actions";
import { AntibioticTypes, Antibiotic } from "./types";

export const loadRequest = (data: string) =>
  action(AntibioticTypes.LOAD_REQUEST, data);
export const loadSuccess = (data: Antibiotic[]) =>
  action(AntibioticTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(AntibioticTypes.LOAD_FAILURE);
