import { Reducer } from "redux";
import { AntibioticState, AntibioticTypes } from "./types";

export const INITIAL_STATE: AntibioticState = {
  data: "",
  error: false,
  loading: false,
  success: false,
};

const reducer: Reducer<AntibioticState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AntibioticTypes.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AntibioticTypes.LOAD_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        data: action.payload,
      };
    case AntibioticTypes.LOAD_FAILURE:
      return {
        ...state,
        data: INITIAL_STATE.data,
        loading: false,
        error: true,
        success: false,
      };

    case AntibioticTypes.LOAD_REQUEST_REPORT_UNIQUE:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case AntibioticTypes.LOAD_SUCCESS_REPORT_UNIQUE:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case AntibioticTypes.LOAD_FAILURE_REPORT_UNIQUE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    default:
      return state;
  }
};

export default reducer;
