export enum FormTypes {
  LOAD_REQUEST = "@forms/LOAD_REQUEST",
  LOAD_SUCCESS = "@forms/LOAD_SUCCESS",
  LOAD_FAILURE = "@forms/LOAD_FAILURE",
}

export interface FormsExternalData {
  external_patient_id: number;
  _id: string;
  name: string;
  external_attendance_id: number;
}
export interface FormField {
  feilds: null;
  _id: string;
  external_id: string;
  type: string;
  label: string;
  value: string;
}
export interface FormsData {
  _id: string;
  document_id: string;
  name: string;
  system_id: string;
  company_id: string;
  external_data: FormsExternalData;
  fields: FormField[];
  status: string;
  created_by: { name: string };
  created_at: string;
  __v: number;
}

export interface FormGroup {
  _id: string;
  list: FormsData[];
}
export interface FormState {
  data: FormGroup[];
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type LoadRequestParams = {
  company_id: string;
  external_attendance_id: string;
};
