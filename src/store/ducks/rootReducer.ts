
import { combineReducers } from 'redux';

import { IInitialState } from './states';

/** Reducers  */
import login from './login';
import customers from './customers';

export const combinedReducers = combineReducers<IInitialState>({
  login,
  customers,
});
