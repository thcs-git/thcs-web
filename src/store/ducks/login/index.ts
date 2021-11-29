import {Reducer} from 'redux';
import {LoginState, LoginTypes} from './types';

export const INITIAL_STATE: LoginState = {
  credentials: {
    email: '',
    password: ''
  },
  email: {
    message: '',
    user: false,
    token: '',
    password: false,
  },
  // data: Object,
  error: false,
  loading: false,
  signedIn: false
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginTypes.LOAD_REQUEST:
      return {...state, loading: true, signedIn: false};
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
    case LoginTypes.EMAIL_REQUEST:
      return {
        ...state, loading: true, error: true, signedIn: false
      };
    case LoginTypes.EMAIL_SUCCESS:
      return {
        ...state, email: action.payload.data, loading: false, error: false, signedIn: true
      };
    case LoginTypes.EMAIL_FAILURE:
      return {
        ...state, loading: false, error: true, signedIn: false
      };
    default:
      return state;
  }
}

export default reducer;
