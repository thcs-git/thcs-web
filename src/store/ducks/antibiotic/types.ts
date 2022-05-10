export enum AntibioticTypes {
  LOAD_REQUEST = "@antibiotic/LOAD_REQUEST",
  LOAD_SUCCESS = "@antibiotic/LOAD_SUCCESS",
  LOAD_FAILURE = "@antibiotic/LOAD_FAILURE",

  LOAD_REQUEST_REPORT_UNIQUE = "@antibiotic/LOAD_REQUEST_REPORT_UNIQUE",
  LOAD_SUCCESS_REPORT_UNIQUE = "@antibiotic/LOAD_SUCCESS_REPORT_UNIQUE",
  LOAD_FAILURE_REPORT_UNIQUE = "@antibiotic/LOAD_FAILURE_REPORT_UNIQUE",
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
