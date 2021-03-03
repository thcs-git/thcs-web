import { Reducer } from 'redux';
import { SpecialtyState, SpecialtyTypes } from './types';

export const INITIAL_STATE: SpecialtyState = {
  data: {
    _id: '',
    council_id: { _id: '', name: '' },
    name: '',
    describe: '',
    active: true,
  },
  list: {
    data: [],
    limit: '10',
    page: '1',
    total: 0
  },
  error: false,
  loading: false,
  success: false,
};

const reducer: Reducer<SpecialtyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpecialtyTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case SpecialtyTypes.LOAD_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case SpecialtyTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, success: false,
        list: {
          data: [],
          limit: '10',
          page: '1',
          total: 0
        }
      };
    case SpecialtyTypes.LOAD_SUCCESS_SPECIALTY_BY_ID:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: false,
      };

    case SpecialtyTypes.UPDATE_SPECIALTY_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case SpecialtyTypes.UPDATE_SPECIALTY_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case SpecialtyTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    default:
      return state;
  }
}

export default reducer;
