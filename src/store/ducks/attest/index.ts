import { Reducer } from "redux";
import { AttestState, AttestTypes } from "./types";

export const INITIAL_STATE: AttestState = {
  data: {
    data: [],
    total: 0,
  },
  error: false,
  success: false,
  loading: false,
};

const reducer: Reducer<AttestState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AttestTypes.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AttestTypes.LOAD_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        success: true,
        error: false,
      };
    case AttestTypes.LOAD_FAILURE:
      return {
        data: INITIAL_STATE.data,
        loading: false,
        success: false,
        error: true,
      };

    default:
      return state;
  }
};
export default reducer;
