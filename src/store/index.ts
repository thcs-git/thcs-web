import { ProfessionState } from "./ducks/professions/types";
import { PrescriptionState } from "./ducks/prescripition/types";
import { createStore, applyMiddleware, compose, Store } from "redux";
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
import { AllergiesState } from "./ducks/allergies/types";
import { MeasurementsState } from "./ducks/measurements/types";
import { QrCodeState } from "./ducks/qrCode/types";
import { AntibioticState } from "./ducks/antibiotic/types";
import { ExamsState } from "./ducks/exams/types";
import { AttestState } from "./ducks/attest/types";
import { LogoState } from "./ducks/logo/types";
import { AttachmentState } from "./ducks/attachment/types";

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
  allergies: AllergiesState;
  measurements: MeasurementsState;
  qrCode: QrCodeState;
  antibiotic: AntibioticState;
  exams: ExamsState;
  attest: AttestState;
  logo: LogoState;
  attachments: AttachmentState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store: Store = createStore(
  combinedReducers,
  InitialState,
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
