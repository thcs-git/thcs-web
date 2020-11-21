
import { combineReducers } from 'redux';

import { IInitialState } from './states';

/** Reducers  */
import login from './login';
import customers from './customers';
import companies from './companies';
import councils from './councils';
import especialties from './especialties';

export const combinedReducers = combineReducers<IInitialState>({
  login,
  customers,
  companies,
  especialties,
  councils,
});
