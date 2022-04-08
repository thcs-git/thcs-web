export enum AttestTypes {
  LOAD_REQUEST = "@attest/LOAD_REQUEST",
  LOAD_SUCCESS = "@attest/LOAD_SUCCESS",
  LOAD_FAILURE = "@attest/LOAD_FAILURE",
}

export interface Attest {}
export interface AttestData {
  data: Attest[];
  total: number;
}

export interface AttestState {
  data: AttestData;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type LoadRequestParams = Partial<Omit<string, "data">>;
