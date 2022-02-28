/**
 * action types
 */
export enum MeasurementsTypes {
  LOAD_REQUEST = "@measurements/LOAD_REQUEST",
  LOAD_SUCCESS = "@measurements/LOAD_SUCCESS",
  LOAD_FAILURE = "@measurements/LOAD_FAILURE",
}
/**
 * data types
 */
export interface MeasurementItem {
  _id: string;
  name: string;
  reference: any; //tipar depois
  type: string;
  unit_id: any; //tipar depois
  value: string;
}
export interface MeasurementsInfo {
  _id: string;
  attendance_id: string;
  canceled: boolean;
  company_id: string;
  created_at: string;
  created_by: [
    {
      _id: string;
      companies_links: [
        {
          _id: string;
          active: boolean;
          companie_id: string;
          customer_id: string;
          exp: string;
          function: string;
          id_integration: string;
          linked_at: string;
        }
      ];
      name: string;
    }
  ];
  itens: MeasurementItem[];
  patient_id: string;
}
export interface Measurements {
  _id: string; //data
  list: MeasurementsInfo[];
}
/**
 * state type
 */
export interface MeasurementsState {
  data: Measurements[];
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type LoadRequestParams = Partial<Omit<any, "data">>;
