import { action } from "typesafe-actions";
import {
  MessageTypes,
  MessageInterface,
  LoadRequestParams
} from "./types"

export const loadRequest = (params: LoadRequestParams = {}) =>
  action(MessageTypes.LOAD_REQUEST, {params} );
export const loadSuccess = (data: MessageInterface) =>
  action(MessageTypes.LOAD_SUCCESS, { data });
export const loadFailure = () =>
  action(MessageTypes.LOAD_FAILURE );

export const loadMessageById = (id: string) =>
  action(MessageTypes.LOAD_REQUEST_MESSAGE_BY_ID, { id });
export const loadSuccessGetMessageById = (data: MessageInterface) =>
  action(MessageTypes.LOAD_SUCCESS_MESSAGE_BY_ID, { data });

export const cleanAction = () => action(MessageTypes.CLEAN);
