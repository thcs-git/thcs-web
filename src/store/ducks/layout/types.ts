/**
 * Action types
 */
export enum LayoutTypes {
  LOAD_REQUEST = "@layout/LOAD_REQUEST",
  LOAD_SUCCESS = "@layout/LOAD_SUCCESS",
  LOAD_FAILURE = "@layout/LOAD_FAILURE",

  CLEAN = "@layout/CLEAN",
}

/**
 * Data types
 */
export interface MenuInterface {
  icon: string;
  id: number;
  name: string;
  slug?: string;
  color: string;
  modal?: any;
}

export interface LayoutInterface {
  token: string;
  menu?: MenuInterface[];
  rights?: string[];
  integration?: string | null;
  integration_name?: string | null;
}

/**
 * State type
 */
export interface LayoutState {
  data: LayoutInterface;
  loading: boolean;
  error: boolean;
  success: boolean;
}
