
import { combineReducers } from 'redux';

import { IInitialState } from './states';

/** Reducers  */
import login from './login';
import customers from './customers';
import companies from './companies';

export default combineReducers<IInitialState>({
  login,
  customers,
  companies,
});
