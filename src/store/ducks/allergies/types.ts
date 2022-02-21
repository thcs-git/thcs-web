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
export interface AllergiesInterface {
  _id: string;
  type: string;
  description: string;
  severity: string;
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
