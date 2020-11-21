import { INITIAL_STATE } from './login'
import { LoginState } from './login/types'

import { INITIAL_STATE as INITIAL_STATE_CUSTOMER } from './customers';
import { CustomerState } from './customers/types'

import { INITIAL_STATE as INITIAL_STATE_COMPANY } from './companies';
import { CompanyState } from './companies/types'

import { INITIAL_STATE as INITIAL_STATE_ESPECIALTY } from './especialties';
import { EspecialtyState } from './especialties/types'

import { INITIAL_STATE as INITIAL_STATE_COUNCIL } from './councils';
import { CouncilState } from './councils/types'

import { INITIAL_STATE as INITIAL_STATE_AREA } from './areas';
import { AreaState } from './areas/types'

/**
 * Initial state tree interface
 */
export interface IInitialState {
  areas: Readonly<AreaState>;
  login: Readonly<LoginState>;
  customers: Readonly<CustomerState>;
  companies: Readonly<CompanyState>;
  especialties: Readonly<EspecialtyState>;
  councils: Readonly<CouncilState>;
}

/**
 * Initial state tree
 */
export const InitialState: IInitialState = {
  areas: INITIAL_STATE_AREA,
  login: INITIAL_STATE,
  customers: INITIAL_STATE_CUSTOMER,
  companies: INITIAL_STATE_COMPANY,
  especialties: INITIAL_STATE_ESPECIALTY,
  councils: INITIAL_STATE_COUNCIL,
}
