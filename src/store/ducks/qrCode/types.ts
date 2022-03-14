/**
 * action types
 */
export enum QrCodeTypes {
  LOAD_REQUEST = "@qrCode/LOAD_REQUEST",
  LOAD_SUCCESS = "@qrCode/LOAD_SUCCESS",
  LOAD_FAILURE = "@qrCode/LOAD_FAILURE",

  CREATE_QRCODE_REQUEST = "@qrCode/CREATE_QRCODE_REQUEST",

  UPDATE_QRCODE_REQUEST = "@qrCode/UPDATE_QRCODE_REQUEST",
  UPDATE_QRCODE_SUCCESS = "@qrCode/UPDATE_QRCODE_SUCCESS",
}

/**
 * data types
 */

export interface qrCode {
  _id?: string;
  attendance_id?: string;
  external_attendance_id?: string;
  qr_code: string;
  created_at?: string;
  created_by?: any;
  active: boolean;
}

export interface QrCodeState {
  data: qrCode;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type LoadRequestParams = Partial<Omit<string | qrCode, "data">>;
