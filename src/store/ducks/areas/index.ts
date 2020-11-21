import { Reducer } from 'redux';
import { AreaState, AreaTypes } from './types';

export const INITIAL_STATE: AreaState = {
  data: {
    id: '',
    description: '',
    supplyDay: 0,
    dayOfTheWeek: 0,
    users: [],
    neighborhoods: [],
    active: true,
  },
  error: false,
  loading: false,
};

const reducer: Reducer<AreaState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AreaTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case AreaTypes.LOAD_SUCCCES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case AreaTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    default:
      return state;
  }
}

export default reducer;
