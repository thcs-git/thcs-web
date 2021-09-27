/**
 * Action types
 */

import {UserList} from "../users/types";

export enum MessageTypes {
  LOAD_REQUEST = "@message/LOAD_REQUEST",
  LOAD_SUCCESS = "@message/LOAD_SUCCESS",
  LOAD_FAILURE = "@message/LOAD_FAILURE",

  LOAD_REQUEST_MESSAGE_BY_ID = "@message/LOAD_REQUEST_MESSAGE_BY_ID",
  LOAD_SUCCESS_MESSAGE_BY_ID = "@message/LOAD_SUCCESS_MESSAGE_BY_ID",

  CLEAN = "@message/CLEAN",
}

/**
 * Data types
 */
export interface UserInterface {
  name: string;
}

export interface MessageInterface {
  subject: string;
  to: UserInterface;
  from: UserInterface;
  message: string;
  created_at: string;
  viewed: boolean;
  active: boolean;
  _id: string;
}

export interface MessageList {
  data: MessageInterface[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

/**
 * State type
 */
export interface MessageState {
  data: MessageInterface;
  list: MessageList;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<MessageList, "data">>;
