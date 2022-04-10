import { action } from "typesafe-actions";
import { ExamsTypes, ExamsData } from "./types";

export const loadRequest = (data: string) =>
  action(ExamsTypes.LOAD_REQUEST, data);
export const loadSuccess = (exams: ExamsData) =>
  action(ExamsTypes.LOAD_SUCCESS, exams);
export const loadFailure = () => action(ExamsTypes.LOAD_FAILURE);
