/**
 * action types
 */
export enum AllergiesTypes {
  LOAD_REQUEST = "@allergies/LOAD_REQUEST",
  LOAD_SUCCESS = "@allergies/LOAD_SUCCESS",
  LOAD_FAILURE = "@allergies/LOAD_FAILURE",
}
/**
 * data types
 */

export interface AllergiesItem {
  __v: number;
  _id: string;
  active: boolean;
  care_id: string;
  company: string;
  created_at: string;
  created_by: {
    _id: string;
    email: string;
    name: string;
  };
  deny: false;
  description: string;
  observations: string;
  pacient_id: string;
  patient_id: {
    _id: string;
    name: string;
  };
  severity: string;
  type: string;
}
export interface AllergiesInterface {
  allergy: AllergiesItem[];
  event: any;
}

/**
 * state type
 */
export interface AllergiesState {
  data: AllergiesInterface[];
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<any, "data">>;
