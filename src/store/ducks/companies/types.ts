/**
 * Action types
 */
export enum CompanyTypes {
  LOAD_REQUEST = "@company/LOAD_REQUEST",
  LOAD_SUCCESS = "@company/LOAD_SUCCESS",
  LOAD_FAILURE = "@company/LOAD_FAILURE",

  LOAD_REQUEST_ADDRESS = "@company/LOAD_REQUEST_ADDRESS",
  LOAD_RESPONSE_ADDRESS = "@company/LOAD_RESPONSE_ADDRESS",

  CREATE_COMPANY_REQUEST = "@company/CREATE_COMPANY_REQUEST",
  CREATE_COMPANY_SUCCESS = "@company/CREATE_COMPANY_SUCCESS",

  LOAD_REQUEST_COMPANY_BY_ID = "@council/LOAD_REQUEST_COMPANY_BY_ID",
  LOAD_SUCCESS_COMPANY_BY_ID = "@council/LOAD_SUCCESS_COMPANY_BY_ID",

  LOAD_REQUEST_CUSTOMER_BY_ID = "@council/LOAD_REQUEST_CUSTOMER_BY_ID",
  LOAD_SUCCESS_CUSTOMER_BY_ID = "@council/LOAD_SUCCESS_CUSTOMER_BY_ID",

  UPDATE_COMPANY_REQUEST = "@company/UPDATE_COMPANY_REQUEST",
  UPDATE_COMPANY_SUCCESS = "@company/UPDATE_COMPANY_SUCCESS",

  SEARCH_REQUEST = "@company/SEARCH_REQUEST",

  CLEAN = "@company/CLEAN",
}

/**
 * Data types
 */

export interface CompanyInterface {
  tipo: string;
  _id?: string;
  customer_id: string;
  name: string;
  fantasy_name: string;
  fiscal_number: string;
  address: {
    postal_code: string;
    street: string,
    number: string,
    district: string;
    city: string;
    state: string;
    complement: string;
  };
  responsable_name: string;
  email: string;
  phone: string;
  cellphone: string;
  settings?: {
    document?: [
      {
        specialty: string,
        document_group: string,
        order: Number,
        created_at: string,
        created_by: string,
      }
    ],
    complexity?: [
      {
        title: string,
        description: string,
        color: string,
        severity: string,
        recommendation: [
          {
            profession_id: string | IProfession,
            description: string,
            amount: string,
            interval: string,
            frequency: string,
          }
        ],
      }
    ],
  },
  active: boolean;
  created_by: { _id: string };
  created_at?: string;
  phones: [{
    cellnumber?: string;
    number?: string;
    telegram: boolean;
    whatsapp: boolean;
  }];
}

export interface ViacepDataInterface {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  erro?: boolean,
}

export interface CompanyList {
  data: CompanyInterface[];
  limit: string;
  page: string;
  total: number;
  search?: string;
}

/**
 * State type
 */
export interface CompanyState {
  data: CompanyInterface;
  list: CompanyList;
  loading: boolean;
  error: boolean;
  errorCep?: boolean;
  success: boolean;
}

export interface IProfession {
  active: boolean,
  created_at: string;
  describe: string;
  name: string;
  _id: string;
}

export type LoadRequestParams = Partial<Omit<CompanyList, 'data'>>
