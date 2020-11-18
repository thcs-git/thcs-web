import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { LoginState } from './ducks/login/types';

import { InitialState } from './ducks/states';
import { combinedReducers } from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  login: LoginState;
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
