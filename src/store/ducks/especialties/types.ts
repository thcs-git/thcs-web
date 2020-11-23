/**
 * Action types
 */
export enum EspecialtyTypes {
  LOAD_REQUEST = "@customer/LOAD_REQUEST",
  LOAD_SUCCCES = "@customer/LOAD_SUCCCES",
  LOAD_FAILURE = "@customer/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface EspecialtyInterface {
  id?: string;
  councilId: string;
	description: string;
	active: boolean;
}


/**
 * State type
 */
export interface EspecialtyState {
  data: EspecialtyInterface;
  loading: boolean;
  error: boolean;
}
