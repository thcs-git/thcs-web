/**
 * Action types
 */
export enum CouncilTypes {
  LOAD_REQUEST = "@council/LOAD_REQUEST",
  LOAD_SUCCCES = "@council/LOAD_SUCCCES",
  LOAD_FAILURE = "@council/LOAD_FAILURE",

  CREATE_COUNCIL_REQUEST = "@council/CREATE_COUNCIL_REQUEST",
  CREATE_COUNCIL_SUCCESS = "@council/CREATE_COUNCIL_SUCCESS",

  LOAD_REQUEST_COUNCIL_BY_ID = "@council/LOAD_REQUEST_COUNCIL_BY_ID",
  LOAD_SUCCESS_COUNCIL_BY_ID = "@council/LOAD_SUCCESS_COUNCIL_BY_ID",

  UPDATE_COUNCIL_REQUEST = "@council/UPDATE_COUNCIL_REQUEST",
  UPDATE_COUNCIL_SUCCESS = "@council/UPDATE_COUNCIL_SUCCESS",
}

/**
 * Data types
 */

export interface CouncilInterface {
  _id?: string;
  company_id: { _id: string; };
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
  success: boolean;
}
