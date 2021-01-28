import { Reducer } from 'redux';
import { UnconfirmedUserState, UnconfirmedUserTypes } from './types';

export const INITIAL_STATE: UnconfirmedUserState = {
  data: {
    name: '',
    email: '',
    phone: '',
    user_type: '',
    specialties: '',
    council_number: '',
    unit_federative:'',
    active: true,
  },
  list: {
    data: [],
    limit: '10',
    page: '1',
    total: 0
  },
  success: false,
  error: false,
  loading: false,
};

const reducer: Reducer<UnconfirmedUserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UnconfirmedUserTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false, };
    case UnconfirmedUserTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    case UnconfirmedUserTypes.LOAD_REQUEST_USER_BY_ID:
      return {
        ...state, error: false, loading: true, success: false
      }
    case UnconfirmedUserTypes.LOAD_SUCCCES_USER_BY_ID:
      return {
        ...state,
        data: {...action.payload.data},
        loading: false,
        error: false,
        success: false,
      }
    case UnconfirmedUserTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case UnconfirmedUserTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
          phone: action.payload.data.phones[0]?.number,
          cellphone: action.payload.data.phones[1]?.number,
        },
        loading: false,
        error: false,
        success: true
      }
    case UnconfirmedUserTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, success: false,
      };
    case UnconfirmedUserTypes.CREATE_USER_REQUEST:
      return {
        ...state, loading: true, error: false, success: false,
      };
    case UnconfirmedUserTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
          phone: action.payload.data.phones[0].number,
          cellphone: action.payload.data.phones[1].number,
        },
        loading: false,
        error: false,
        success: true
      };
    case UnconfirmedUserTypes.REGISTER_USER_REQUEST:
      return {
        ...state, loading: true, error: false, success: false,
      };
    case UnconfirmedUserTypes.LOAD_RESPONSE_ADDRESS:
      return {
        ...state,
        data: {
          ...state.data,

        },
        loading: false,
        error: false,
        success: false,
      };
    case UnconfirmedUserTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    default:
      return state;
  }
}

export default reducer;
