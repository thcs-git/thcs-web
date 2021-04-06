import { UnconfirmedUserInterface } from "./unconfirmeduser/types";
import { INITIAL_STATE } from "./login";
import { LoginState } from "./login/types";

import { INITIAL_STATE as INITIAL_STATE_CARE } from "./cares";
import { CareState } from "./cares/types";

import { INITIAL_STATE as INITIAL_STATE_CUSTOMER } from "./customers";
import { CustomerState } from "./customers/types";

import { INITIAL_STATE as INITIAL_STATE_COMPANY } from "./companies";
import { CompanyState } from "./companies/types";

import { INITIAL_STATE as INITIAL_STATE_SPECIALTY } from "./specialties";
import { SpecialtyState } from "./specialties/types";

import { INITIAL_STATE as INITIAL_STATE_COUNCIL } from "./councils";
import { CouncilState } from "./councils/types";

import { INITIAL_STATE as INITIAL_STATE_DOCUMENT } from "./documents";
import { DocumentState } from "./documents/types";

import { INITIAL_STATE as INITIAL_STATE_DOCUMENT_GROUP } from "./documentGroups";
import { DocumentGroupState } from "./documentGroups/types";

import { INITIAL_STATE as INITIAL_STATE_AREA } from "./areas";
import { AreaState } from "./areas/types";

import { INITIAL_STATE as INITIAL_STATE_PATIENT } from "./patients";
import { PatientState } from "./patients/types";

import { INITIAL_STATE as INITIAL_STATE_USER } from "./users";
import { UserState } from "./users/types";

import { INITIAL_STATE as INITIAL_STATE_PROFESSION } from "./professions";
import { ProfessionState, ProfessionTypes } from "./professions/types";

import { INITIAL_STATE as INITIAL_STATE_UNCONFIRMEDUSER } from "./unconfirmeduser";
import { UnconfirmedUserState } from "./unconfirmeduser/types";

/**
 * Initial state tree interface
 */
export interface IInitialState {
  areas: Readonly<AreaState>;
  login: Readonly<LoginState>;
  cares: Readonly<CareState>;
  companies: Readonly<CompanyState>;
  customers: Readonly<CustomerState>;
  specialties: Readonly<SpecialtyState>;
  councils: Readonly<CouncilState>;
  documents: Readonly<DocumentState>;
  documentGroups: Readonly<DocumentGroupState>;
  patients: Readonly<PatientState>;
  users: Readonly<UserState>;
  profession: Readonly<ProfessionState>;
}

/**
 * Initial state tree
 */
export const InitialState: IInitialState = {
  areas: INITIAL_STATE_AREA,
  login: INITIAL_STATE,
  cares: INITIAL_STATE_CARE,
  companies: INITIAL_STATE_COMPANY,
  customers: INITIAL_STATE_CUSTOMER,
  specialties: INITIAL_STATE_SPECIALTY,
  councils: INITIAL_STATE_COUNCIL,
  documents: INITIAL_STATE_DOCUMENT,
  documentGroups: INITIAL_STATE_DOCUMENT_GROUP,
  patients: INITIAL_STATE_PATIENT,
  users: INITIAL_STATE_USER,
  profession: INITIAL_STATE_PROFESSION,
};
