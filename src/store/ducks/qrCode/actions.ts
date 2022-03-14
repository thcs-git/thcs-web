import { action } from "typesafe-actions";
import { QrCodeTypes, qrCode, LoadRequestParams } from "./types";

export const loadRequest = (data: LoadRequestParams) =>
  action(QrCodeTypes.LOAD_REQUEST, data);
export const loadSuccess = (data: qrCode) =>
  action(QrCodeTypes.LOAD_SUCCESS, data);
export const loadFailure = () => action(QrCodeTypes.LOAD_FAILURE);

export const createQrCodeRequest = (data: LoadRequestParams) =>
  action(QrCodeTypes.CREATE_QRCODE_REQUEST, data);

export const updateQrCodeRequest = (data: qrCode) =>
  action(QrCodeTypes.UPDATE_QRCODE_REQUEST, { data });
export const updateQrCodeSuccess = (data: qrCode) =>
  action(QrCodeTypes.UPDATE_QRCODE_SUCCESS, { data });
