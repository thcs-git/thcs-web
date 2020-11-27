/**
 * Action types
 */
export enum SpecialtyTypes {
  LOAD_REQUEST = "@specialty/LOAD_REQUEST",
  LOAD_SUCCCES = "@specialty/LOAD_SUCCCES",
  LOAD_FAILURE = "@specialty/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface SpecialtyInterface {
  _id?: string;
  council: string;
	name: string;
	describe: string;
	active: boolean;
}


/**
 * State type
 */
export interface SpecialtyState {
  data: SpecialtyInterface;
  list: SpecialtyInterface[];
  loading: boolean;
  error: boolean;
}
