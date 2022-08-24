export enum TelemedicineTypes {
  LOAD_REQUEST = "@telemedicine/LOAD_REQUEST",
  LOAD_SUCCESS = "@telemedicine/LOAD_SUCCESS",
  LOAD_FAILURE = "@telemedicine/LOAD_FAILURE",
}
export interface Telemedicine {
  _id: any;
  reason: string;
  created_at: Date;
  start_at: Date;
  finished_at: Date;
  active: boolean;
  external_company_id: string;
  external_attendance_id: string;
  external_patient_id: number;
  priority: string;
  chatbot_id: string;
  link: string;
  link_timestamp: Date;
  link_click_timestamp: Date;
  patient_canceled_at: Date;
  provider_canceled_at: Date;
  attending_provider_id: {};
  evolution_id: string;
}

export interface TelemedicineState {
  data: Telemedicine[];
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type LoadRequestParams = Partial<Omit<string | Telemedicine, "data">>;
