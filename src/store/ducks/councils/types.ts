/**
 * Action types
 */
export enum CouncilTypes {
  LOAD_REQUEST = "@council/LOAD_REQUEST",
  LOAD_SUCCCES = "@council/LOAD_SUCCCES",
  LOAD_FAILURE = "@council/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface CouncilInterface {
  _id?: string;
	name: string;
	describe?: string;
	initials?: string;
	active?: boolean;
}


/**
 * State type
 */
export interface CouncilState {
  data: CouncilInterface;
  list: CouncilInterface[];
  loading: boolean;
  error: boolean;
}
