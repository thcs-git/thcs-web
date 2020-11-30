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
  list: [],
  error: false,
  loading: false,
  success: false,
};

const reducer: Reducer<SpecialtyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpecialtyTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case SpecialtyTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case SpecialtyTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true, success: false
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
    default:
      return state;
  }
}

export default reducer;
