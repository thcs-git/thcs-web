export enum AntibioticTypes {
  LOAD_REQUEST = "@antibiotic/LOAD_REQUEST",
  LOAD_SUCCESS = "@antibiotic/LOAD_SUCCESS",
  LOAD_FAILURE = "@antibiotic/LOAD_FAILURE",
}

export interface Antibiotic {
  item: any;
}

export interface AntibioticState {
  data: any;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<string, "data">>;
