import { Reducer } from "redux";
import Loading from "../../../components/Loading";
import { QrCodeTypes, QrCodeState } from "./types";

export const INITIAL_STATE: QrCodeState = {
  data: {
    _id: "",
    attendance_id: "",
    external_attendance_id: "",
    qr_code: "",
    created_at: "",
    created_by: "",
    active: false,
  },
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<QrCodeState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QrCodeTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case QrCodeTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        data: action.payload,
      };
    case QrCodeTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        data: INITIAL_STATE.data,
      };

    case QrCodeTypes.CREATE_QRCODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case QrCodeTypes.UPDATE_QRCODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case QrCodeTypes.UPDATE_QRCODE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };

    default:
      return state;
  }
};

export default reducer;
