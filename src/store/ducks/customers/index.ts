import { Reducer } from 'redux';
import { CustomerState, CustomerTypes } from './types';

export const INITIAL_STATE: CustomerState = {
  data: {
    _id: '',
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
    email: '',
    phones: {
      number: '',
      telegram: false,
      whatsapp: false,
    },
    cellphone: ''
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

const reducer: Reducer<CustomerState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CustomerTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: true,
      };
    case CustomerTypes.LOAD_SUCCESS_BY_ID:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        success: false
      };
    case CustomerTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, success: false,
        list: {
          data: [],
          limit: '10',
          page: '1',
          total: 0
        }
      };
    case CustomerTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case CustomerTypes.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case CustomerTypes.LOAD_RESPONSE_ADDRESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
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
    case CustomerTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    default:
      return state;
  }
}

export default reducer;
