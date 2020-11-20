
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import history from '../../routes/history';

import { IInitialState } from './states';

/** Reducers  */
import login from './login';
import customers from './customers';
import companies from './companies';

export default (history: History) => combineReducers<IInitialState>({
  login,
  customers,
  companies,
  router: connectRouter(history),
});
