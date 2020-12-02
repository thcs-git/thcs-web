import { INITIAL_STATE } from './login'
import { LoginState } from './login/types'

import { INITIAL_STATE as INITIAL_STATE_CUSTOMER } from './customers';
import { CustomerState } from './customers/types';

import { INITIAL_STATE as INITIAL_STATE_COMPANY } from './companies';
import { CompanyState } from './companies/types';

import { INITIAL_STATE as INITIAL_STATE_SPECIALTY } from './specialties';
import { SpecialtyState } from './specialties/types'

import { INITIAL_STATE as INITIAL_STATE_COUNCIL } from './councils';
import { CouncilState } from './councils/types';

import { INITIAL_STATE as INITIAL_STATE_AREA } from './areas';
import { AreaState } from './areas/types';

import { INITIAL_STATE as INITIAL_STATE_PATIENT } from './patients';
import { PatientState } from './patients/types';

import { INITIAL_STATE as INITIAL_STATE_USER } from './users';
import { UserState } from './users/types';

/**
 * Initial state tree interface
 */
export interface IInitialState {
  areas: Readonly<AreaState>;
  login: Readonly<LoginState>;
  customers: Readonly<CustomerState>;
  companies: Readonly<CompanyState>;
  specialties: Readonly<SpecialtyState>;
  councils: Readonly<CouncilState>;
  patients: Readonly<PatientState>;
  users: Readonly<UserState>;
}

/**
 * Initial state tree
 */
export const InitialState: IInitialState = {
  areas: INITIAL_STATE_AREA,
  login: INITIAL_STATE,
  customers: INITIAL_STATE_CUSTOMER,
  companies: INITIAL_STATE_COMPANY,
  specialties: INITIAL_STATE_SPECIALTY,
  councils: INITIAL_STATE_COUNCIL,
  patients: INITIAL_STATE_PATIENT,
  users: INITIAL_STATE_USER,
}
