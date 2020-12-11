import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { AreaState } from './ducks/areas/types';
import { CompanyState } from './ducks/companies/types';
import { CareState } from './ducks/cares/types';
import { CouncilState } from './ducks/councils/types';
import { CustomerState } from './ducks/customers/types';
import { SpecialtyState } from './ducks/specialties/types';
import { LoginState } from './ducks/login/types';
import { PatientState } from './ducks/patients/types';
import { UserState } from './ducks/users/types';

import { InitialState } from './ducks/states';
import combinedReducers from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  areas: AreaState;
  login: LoginState;
  cares: CareState;
  companies: CompanyState;
  customers: CustomerState;
  specialties: SpecialtyState;
  councils: CouncilState;
  users: UserState;
  patients: PatientState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  combinedReducers,
  InitialState,
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
