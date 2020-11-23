/**
 * Action types
 */
export enum CouncilTypes {
  LOAD_REQUEST = "@customer/LOAD_REQUEST",
  LOAD_SUCCCES = "@customer/LOAD_SUCCCES",
  LOAD_FAILURE = "@customer/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface CouncilInterface {
  id?: string;
	description: string;
	initials: string;
	active: boolean;
}


/**
 * State type
 */
export interface CouncilState {
  data: CouncilInterface;
  loading: boolean;
  error: boolean;
}
