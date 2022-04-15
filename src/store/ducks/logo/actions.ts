import { action } from "typesafe-actions";
import { LogoTypes, Logo } from "./types";

export const loadRequest = () => action(LogoTypes.LOAD_REQUEST);
export const loadSuccess = (data: Logo) => action(LogoTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(LogoTypes.LOAD_FAILURE);
