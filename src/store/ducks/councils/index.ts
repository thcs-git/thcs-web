import { Reducer } from 'redux';
import { CouncilState, CouncilTypes } from './types';

export const INITIAL_STATE: CouncilState = {
  data: {
    _id: '',
    name: '',
    describe: '',
    initials: '',
    active: true,
  },
  list: [],
  error: false,
  loading: false,
};

const reducer: Reducer<CouncilState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CouncilTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CouncilTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case CouncilTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    default:
      return state;
  }
}

export default reducer;
