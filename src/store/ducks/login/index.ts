import { Reducer } from 'redux';
import { LoginState, LoginTypes } from './types';

export const INITIAL_STATE: LoginState = {
  credentials: {
    email: '',
    password: ''
  },
  // data: Object,
  error: false,
  loading: false,
  signedIn: false
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginTypes.LOAD_REQUEST:
      return { ...state, loading: true, signedIn: false };
    case LoginTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        signedIn: true,
      };
    case LoginTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, signedIn: false
      };
    default:
      return state;
  }
}

export default reducer;
