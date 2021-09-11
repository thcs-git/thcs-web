import { action } from "typesafe-actions";
import {
  LayoutTypes,
  LayoutInterface,
} from "./types"

export const loadRequest = () =>
  action(LayoutTypes.LOAD_REQUEST );
export const loadSuccess = (data: LayoutInterface) =>
  action(LayoutTypes.LOAD_SUCCESS, { data });
export const loadFailure = (data: LayoutInterface) =>
  action(LayoutTypes.LOAD_FAILURE, { data });

export const cleanAction = () => action(LayoutTypes.CLEAN);
