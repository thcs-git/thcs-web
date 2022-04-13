import { Reducer } from "redux";
import { LogoState, LogoTypes } from "./types";

export const INITIAL_STATE: LogoState = {
  data: {
    name: "",
    logo: {
      type: "",
      data: [],
    },
  },
  loading: false,
  error: false,
  success: false,
};

export const reducer: Reducer<LogoState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LogoTypes.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case LogoTypes.LOAD_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: false,
        success: false,
      };
    case LogoTypes.LOAD_FAILURE:
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
