import { INITIAL_STATE } from './login'
import { LoginState } from './login/types'

import { INITIAL_STATE as INITIAL_STATE_CUSTOMER } from './customers';
import { CustomerState } from './customers/types'

/**
 * Initial state tree interface
 */
export interface IInitialState {
  login: Readonly<LoginState>;
  customers: Readonly<CustomerState>;
}

/**
 * Initial state tree
 */
export const InitialState: IInitialState = {
  login: INITIAL_STATE,
  customers: INITIAL_STATE_CUSTOMER
}
