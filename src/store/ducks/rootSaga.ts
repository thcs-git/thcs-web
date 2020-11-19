import { all, takeLatest } from "redux-saga/effects";

import { LoginTypes } from "./login/types";
import { doLogin } from "./login/sagas";

import { CustomerTypes } from './customers/types';
import { get } from './customers/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(LoginTypes.LOAD_REQUEST, doLogin),
    takeLatest(CustomerTypes.LOAD_REQUEST, get),
  ]);
}
