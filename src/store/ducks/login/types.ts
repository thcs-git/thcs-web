/**
 * Action types
 */
export enum LoginTypes {
  EMAIL_REQUEST = "@email/LOAD_REQUEST",
  EMAIL_SUCCESS = "@email/LOAD_SUCCESS",
  EMAIL_FAILURE = "@email/LOAD_FAILURE",

  LOAD_REQUEST = "@login/LOAD_FAILURE",
  LOAD_SUCCESS = "@login/LOAD_FAILURE",
  LOAD_FAILURE = "@login/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface CredentialsInterface {
  payload?: Object;
  email: string;
  password?: string;
}

export interface EmailInterface {
  message: string;
  user: boolean;
  token: string;
  password: boolean;
}

/**
 * State type
 */
export interface LoginState {
  credentials: CredentialsInterface;
  email: EmailInterface;
  loading: boolean;
  error: boolean;
  signedIn: boolean;
}
