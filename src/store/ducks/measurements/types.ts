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
  active: boolean;
  measurement_item_id: string;
  value: string;
}
export interface MeasurementsInfo {
  _id: string;
  attendance_id: string;
  canceled: boolean;
  company_id: string;
  created_at: string;
  created_by: string;
  measurements: MeasurementItem[];
  user: [
    {
      __v: number;
      _id: string;
      active: boolean;
      address: string;
      birthdate: any;
      cellphone: string;
      companies: [];
      companies_links: [
        {
          _id: string;
          active: string;
          companie_id: string;
          customer_id: string;
          exp: string;
          function: string;
          id_integration: string;
          linked_at: string;
        }
      ];
      council_id: string;
      council_number: string;
      council_state: string;
      created_at: string;
      customer_id: string;
      email: string;
      fiscal_number: string;
      gender: string;
      issuing_organ: string;
      main_specialty_id: string;
      mother_name: string;
      name: string;
      national_id: string;
      nationality: string;
      password: string;
      phone: string;
      phones: [
        {
          _id: string;
          number: string;
          telegram: boolean;
          whatsapp: boolean;
        }
      ];
      profession_id: string;
      specialties: [];
      type_user: string;
      user_type: string;
      user_type_id: null;
      username: string;
      verified: false;
    }
  ];
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
