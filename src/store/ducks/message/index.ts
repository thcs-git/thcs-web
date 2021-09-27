import {Reducer} from "redux";
import {MessageState, MessageTypes, UserInterface} from "./types"


export const INITIAL_STATE: MessageState = {
  data: {
    _id: '',
    to: {
      name: '',
    },
    from: {
      name: '',
    },
    message: '',
    subject: '',
    created_at: '',
    viewed: false,
    active: true,
  },
  list: {
    data: [],
    limit: "10",
    page: "1",
    total: 0,
  },
  success: false,
  error: false,
  loading: false,
};

const reducer: Reducer<MessageState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MessageTypes.LOAD_REQUEST:
      return {...state, loading: true, success: false};
    case MessageTypes.LOAD_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: true,
        error: false,
      };
    case MessageTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: true,
      };
    case MessageTypes.LOAD_REQUEST_MESSAGE_BY_ID:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case MessageTypes.LOAD_SUCCESS_MESSAGE_BY_ID:
      return {
        ...state,
        data: { ...action.payload.data },
        loading: false,
        error: false,
        success: false,
      };
    case MessageTypes.CLEAN:
      return INITIAL_STATE;
    default:
      return state;
  }
}
export default reducer;
