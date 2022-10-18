import { Reducer } from "redux";
import {
  AttachmentsIntegrationState,
  AttachmentsIntegrationTypes,
} from "./types";

export const INITIAL_STATE: AttachmentsIntegrationState = {
  data: "",
  error: false,
  loading: false,
  success: false,
};

const reducer: Reducer<AttachmentsIntegrationState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AttachmentsIntegrationTypes.DISPATCH_DOCS:
      return { ...state, loading: true };
    case AttachmentsIntegrationTypes.DISPATCH_DOCS_SUCCESS:
      return {
        ...state,
        loading: action.payload.status === 200 ? false : true,
        error: false,
        success: true,
      };
    case AttachmentsIntegrationTypes.DISPATCH_DOCS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: INITIAL_STATE.data,
      };
    case AttachmentsIntegrationTypes.VERIFY_STATUS_DOCS:
      return {
        ...state,
        loading: true,
      };
    case AttachmentsIntegrationTypes.VERIFY_STATUS_DOCS_SUCCESS:
      return {
        ...state,
        loading: action.payload.beingIntegrated,
        error: false,
        success: true,
      };

    case AttachmentsIntegrationTypes.VERIFY_STATUS_DOCS_FAILURE:
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
