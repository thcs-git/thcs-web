import { action } from "typesafe-actions";
import { ExamsTypes, ExamsItem } from "./types";

export const loadRequest = (data: string) =>
  action(ExamsTypes.LOAD_REQUEST, data);
export const loadSuccess = (exams: ExamsItem[]) =>
  action(ExamsTypes.LOAD_SUCCESS, exams);
export const loadFailure = () => action(ExamsTypes.LOAD_FAILURE);
