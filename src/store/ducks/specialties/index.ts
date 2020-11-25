import { Reducer } from 'redux';
import { SpecialtyState, SpecialtyTypes } from './types';

export const INITIAL_STATE: SpecialtyState = {
  data: {
    _id: '',
    council: '',
    name: '',
    describe: '',
    active: true,
  },
  list: [],
  error: false,
  loading: false,
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
      ...state, loading: false, error: true
      };
    default:
      return state;
  }
}

export default reducer;
