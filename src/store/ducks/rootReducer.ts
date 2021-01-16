
import { combineReducers } from 'redux';

import { IInitialState } from './states';

/** Reducers  */
import areas from './areas';
import login from './login';
import cares from './cares';
import companies from './companies';
import customers from './customers';
import councils from './councils';
import documents from './documents';
import documentGroups from './documentGroups';
import specialties from './specialties';
import patients from './patients';
import users from './users';

export default combineReducers<IInitialState>({
  areas,
  login,
  cares,
  companies,
  customers,
  specialties,
  councils,
  documents,
  documentGroups,
  patients,
  users,
});
