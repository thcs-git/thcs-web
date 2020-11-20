import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import { CompanyState } from './ducks/companies/types';
import { CustomerState } from './ducks/customers/types';
import { LoginState } from './ducks/login/types';

import { InitialState } from './ducks/states';
import combinedReducers from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

import history from '../routes/history';

export interface ApplicationState {
  login: LoginState;
  customers: CustomerState;
  companies: CompanyState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const store = createStore(
  combinedReducers(history),
  InitialState,
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
