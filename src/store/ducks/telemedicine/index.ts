import { Reducer } from "redux";
import Loading from "../../../components/Loading";
import { TelemedicineState, TelemedicineTypes } from "./types";

export const INITIAL_STATE: TelemedicineState = {
  data: [],
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<TelemedicineState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TelemedicineTypes.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case TelemedicineTypes.LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        success: true,
      };
    case TelemedicineTypes.LOAD_FAILURE:
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
