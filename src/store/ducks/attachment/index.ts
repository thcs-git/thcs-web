import { Reducer } from "redux";
import Loading from "../../../components/Loading";
import { AttachmentTypes, AttachmentState } from "./types";

export const INITIAL_STATE: AttachmentState = {
  data: [],
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<AttachmentState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AttachmentTypes.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case AttachmentTypes.LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        success: true,
      };
    case AttachmentTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case AttachmentTypes.LOAD_REQUEST_FILE:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case AttachmentTypes.LOAD_SUCCESS_FILE:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };

    default:
      return state;
  }
};

export default reducer;
