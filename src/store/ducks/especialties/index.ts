import { Reducer } from 'redux';
import { EspecialtyState, EspecialtyTypes } from './types';

export const INITIAL_STATE: EspecialtyState = {
  data: {
    id: '',
    councilId: '',
    description: '',
    active: true,
  },
  error: false,
  loading: false,
};

const reducer: Reducer<EspecialtyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EspecialtyTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case EspecialtyTypes.LOAD_SUCCCES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case EspecialtyTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    default:
      return state;
  }
}

export default reducer;
