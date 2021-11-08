import { Reducer } from 'redux';
import { CompanyState, CompanyTypes } from './types';

export const INITIAL_STATE: CompanyState = {
  data: {
    _id: '',
    customer_id: '',
    name: '',
    fantasy_name: '',
    fiscal_number: '',
    address: {
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
    },
    responsable_name: '',
    email: '',
    phone: '',
    cellphone: '',
    active: true,
    created_by: { _id: '' },
    phones: [{
      cellnumber: "",
      number: "",
      telegram: false,
      whatsapp: false,
    }],
    tipo: '',
  },
  list: {
    data: [],
    limit: '10',
    page: '1',
    total: 0
  },
  error: false,
  loading: false,
  success: false,
};

const reducer: Reducer<CompanyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CompanyTypes.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case CompanyTypes.LOAD_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case CompanyTypes.LOAD_FAILURE:
      return {
        ...state,
        list: INITIAL_STATE.list,
        loading: false,
        error: true,
        success: false,
        errorCep:true,
      };
    case CompanyTypes.LOAD_RESPONSE_ADDRESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: false,
        errorCep: false,
        data: {
          // ...state.data,
          address: {
            ...state.data.address,
            postal_code: action.payload.data.cep,
            street: action.payload.data.logradouro,
            number: '',
            district: action.payload.data.bairro,
            city: action.payload.data.localidade,
            state: action.payload.data.uf,
            complement: action.payload.data.complemento,
          }
        }
      };
    case CompanyTypes.LOAD_REQUEST_COMPANY_BY_ID:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CompanyTypes.LOAD_SUCCESS_COMPANY_BY_ID:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: false,
      };
    case CompanyTypes.CREATE_COMPANY_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: false
      };

    case CompanyTypes.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      };

    case CompanyTypes.UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case CompanyTypes.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case CompanyTypes.LOAD_REQUEST_CUSTOMER_BY_ID:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case CompanyTypes.LOAD_SUCCESS_CUSTOMER_BY_ID:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case CompanyTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };

    case CompanyTypes.CLEAN:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default reducer;
