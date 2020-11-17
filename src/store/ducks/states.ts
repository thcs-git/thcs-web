import { INITIAL_STATE } from './login'
import { LoginState } from './login/types'

/**
 * Initial state tree interface
 */
export interface IInitialState {
  login: Readonly<LoginState>
}

/**
 * Initial state tree
 */
export const InitialState: IInitialState = {
  login: INITIAL_STATE,
}
