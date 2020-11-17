
import { combineReducers } from 'redux';

import { IInitialState } from './states';

/** Reducers  */
import login from './login';

import { CredentialsInterface } from './login/types';

export interface ApplicationState {
  login: CredentialsInterface;
}

export const combinedReducers = combineReducers<IInitialState>({
  login
});
