/**
 * Action types
 */
export enum AreaTypes {
  LOAD_REQUEST = "@area/LOAD_REQUEST",
  LOAD_SUCCCES = "@area/LOAD_SUCCCES",
  LOAD_FAILURE = "@area/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface UserAreaInterface {
  id: string;
  name: string;
}

export interface NeighborhoodAreaInterface {
  id: string;
  name: string;
}

export interface AreaInterface {
  id?: string;
	description: string;
	supplyDay: number;
  dayOfTheWeek: number;
  users: (UserAreaInterface | {})[],
  neighborhoods: (NeighborhoodAreaInterface | {})[],
	active: boolean;
}


/**
 * State type
 */
export interface AreaState {
  data: AreaInterface;
  loading: boolean;
  error: boolean;
}
