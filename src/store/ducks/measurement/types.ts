export enum MeasurementTypes {
  LOAD_REQUEST_MEASUREMENT = "@measurement/LOAD_REQUEST_MEASUREMENT",
  LOAD_SUCCESS_MEASUREMENT = "@measurement/LOAD_SUCCESS_MEASUREMENT",
  LOAD_FAILURE = "@measurement/LOAD_FAILURE",
}
export interface MeasurementUnit {
  _id: string;
  name: string;
  short_name: string;
}

export interface MeasurementItem {
  _id: string;
  name: string;
  reference: string;
  step_interval: string;
  unit: MeasurementUnit;
}
export interface MeasurementInterface {
  _id: string;
  measurement_item: MeasurementItem;
  value: string;
  created_at: string;
}

export interface MeasurementList {
  data: MeasurementInterface[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

export interface MeasurementState {
  data: MeasurementInterface;
  list: MeasurementList;
  loading: boolean;
  error: boolean;
  success: boolean;
}
export type LoadRequestParams = Partial<Omit<MeasurementList, "data">>;
