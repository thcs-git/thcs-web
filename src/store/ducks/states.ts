import { INITIAL_STATE } from './login'
import { LoginState } from './login/types'

import { INITIAL_STATE as INITIAL_STATE_CUSTOMER } from './customers';
import { CustomerState } from './customers/types'

import { INITIAL_STATE as INITIAL_STATE_COMPANY } from './companies';
import { CompanyState } from './companies/types'

import { INITIAL_STATE as INITIAL_STATE_ESPECIALTY } from './especialties';
import { EspecialtyState } from './especialties/types'

/**
 * Initial state tree interface
 */
export interface IInitialState {
  login: Readonly<LoginState>;
  customers: Readonly<CustomerState>;
  companies: Readonly<CompanyState>;
  especialties: Readonly<EspecialtyState>;
}

/**
 * Initial state tree
 */
export const InitialState: IInitialState = {
  login: INITIAL_STATE,
  customers: INITIAL_STATE_CUSTOMER,
  companies: INITIAL_STATE_COMPANY,
  especialties: INITIAL_STATE_ESPECIALTY,
}
