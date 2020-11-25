
import { combineReducers } from 'redux';

import { IInitialState } from './states';

/** Reducers  */
import areas from './areas';
import login from './login';
import customers from './customers';
import companies from './companies';
import councils from './councils';
import specialties from './specialties';
import users from './users';

export default combineReducers<IInitialState>({
  areas,
  login,
  customers,
  companies,
  specialties,
  councils,
  users,
});
