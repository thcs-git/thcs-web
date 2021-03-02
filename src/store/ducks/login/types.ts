/**
 * Action types
 */
export enum LoginTypes {
  LOAD_REQUEST = "@login/LOAD_REQUEST",
  LOAD_SUCCESS = "@login/LOAD_SUCCESS",
  LOAD_FAILURE = "@login/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface CredentialsInterface {
  payload?: Object;
  email: string;
  password: string;
}


/**
 * State type
 */
export interface LoginState {
  credentials: CredentialsInterface;
  loading: boolean;
  error: boolean;
  signedIn: boolean;
}
