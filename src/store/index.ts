import { ProfessionState } from "./ducks/professions/types";
import { PrescriptionState } from "./ducks/prescripition/types";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { AreaState } from "./ducks/areas/types";
import { CompanyState } from "./ducks/companies/types";
import { CareState } from "./ducks/cares/types";
import { CouncilState } from "./ducks/councils/types";
import { CustomerState } from "./ducks/customers/types";
import { DocumentState } from "./ducks/documents/types";
import { DocumentGroupState } from "./ducks/documentGroups/types";
import { SpecialtyState } from "./ducks/specialties/types";
import { LoginState } from "./ducks/login/types";
import { PatientState } from "./ducks/patients/types";
import { UserState } from "./ducks/users/types";
import { LayoutState } from "./ducks/layout/types";
import { MessageState } from "./ducks/message/types";

import { InitialState } from "./ducks/states";
import combinedReducers from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";

export interface ApplicationState {
  areas: AreaState;
  login: LoginState;
  cares: CareState;
  companies: CompanyState;
  customers: CustomerState;
  councils: CouncilState;
  documents: DocumentState;
  documentGroups: DocumentGroupState;
  patients: PatientState;
  specialties: SpecialtyState;
  prescription: PrescriptionState;
  users: UserState;
  profession: ProfessionState;
  layout: LayoutState;
  message: MessageState;
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
