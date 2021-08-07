import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InputMask, {Props} from 'react-input-mask';
import {ApplicationState} from '../../../store';
import {
  loadCustomerById,
  getAddress as getAddressAction,
  updateCustomerRequest,
  createCustomerRequest,
  cleanAction
} from '../../../store/ducks/customers/actions';
import {CustomerInterface} from '../../../store/ducks/customers/types';
import {createUserRequest as createUserAction} from '../../../store/ducks/users/actions';
import {UserInterface} from '../../../store/ducks/users/types';
import {SearchOutlined, Edit, CodeOutlined, TrackChangesTwoTone} from '@material-ui/icons';
import {useHistory, RouteComponentProps} from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Container,
  Divider,
  FormControlLabel,
  makeStyles,

} from '@material-ui/core';
import {SwitchComponent as Switch} from '../../../styles/components/Switch';
import Sidebar from '../../../components/Sidebar';
import {FormTitle} from '../../../styles/components/Form';
import ButtonComponent from '../../../styles/components/Button';

import {
  ButtonsContent,
  ButtonDefeault,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection,
  BoxCustom
} from './styles';
import mask from '../../../utils/mask';
import Loading from '../../../components/Loading';
import {validateCNPJ as validateCNPJHelper} from '../../../helpers/validateCNPJ';
import _ from 'lodash';
import FeedbackComponent from '../../../components/Feedback';
import validator from 'validator';
import {Autocomplete} from '@material-ui/lab';
import {toast} from 'react-toastify';
import TabForm from "../../../components/Tabs";


interface IFormFields extends CustomerInterface {
  form?: {
    uf: { id: number, name: string, sigla: string } | null,
  }
}

interface IPageParams {
  id?: string,
  mode?: string;
}

export default function ClientForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    cancel: {
      textTransform: 'capitalize',
      fontSize: '18px',
      '&:hover': {
        backgroundColor: 'var(--danger-hover)',
        color: 'var(--danger)',
        borderColor: 'var(--danger-hover)',

      },
      maxHeight: '38px',
      borderColor: 'var(--danger-hover)',
      color: 'var(--danger-hover)',
      contrastText: "#fff"
    },

  }))

  const classes = useStyles();
  const customerState = useSelector((state: ApplicationState) => state.customers);
  const userState = useSelector((state: ApplicationState) => state.users);
  const [inputUf, setInputUf] = useState({index: 0});
  const [inputPhone, setInputPhone] = useState({value: "", error: false});
  const [inputCellPhone, setInputCellPhone] = useState({value: "", error: false});
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const {params} = props.match;

  const [canEdit, setCanEdit] = useState(true);
  const [fieldsValidation, setFieldValidations] = useState<any>({
    name: false,
    social_name: false,
    fiscal_number: false,
    responsible_user: false,
    postal_code: false,
    street: false,
    number: false,
    district: false,
    city: false,
    state: false,
    email: false,
  });
  const States = [
    {id: 1, name: "São Paulo", sigla: 'SP'},
    {id: 2, name: 'Paraná', sigla: 'PR'},
    {id: 3, name: 'Santa Catarina', sigla: 'SC'},
    {id: 4, name: 'Rio Garnde do Sul', sigla: 'RS'},
    {id: 5, name: 'Mato Grosso do Sul', sigla: 'MS'},
    {id: 6, name: 'Rondônia', sigla: 'RO'},
    {id: 7, name: 'Acre', sigla: 'AC'},
    {id: 8, name: 'Amazonas', sigla: 'AM'},
    {id: 9, name: 'Roraima', sigla: 'RR'},
    {id: 10, name: 'Pará', sigla: 'PA'},
    {id: 11, name: 'Amapá', sigla: 'AP'},
    {id: 12, name: 'Tocantins', sigla: 'TO'},
    {id: 13, name: 'Maranhão', sigla: 'MA'},
    {id: 14, name: 'Rio Grande do Norte', sigla: 'RN'},
    {id: 15, name: 'Paraíba', sigla: 'PB'},
    {id: 16, name: 'Pernambuco', sigla: 'PE'},
    {id: 17, name: 'Alagoas', sigla: 'AL'},
    {id: 18, name: 'Sergipe', sigla: 'SE'},
    {id: 19, name: 'Bahia', sigla: 'BA'},
    {id: 20, name: 'Minas Gerais', sigla: 'MG'},
    {id: 21, name: 'Rio de Janeiro', sigla: 'RJ'},
    {id: 22, name: 'Mato Grosso', sigla: 'MT'},
    {id: 23, name: 'Goiás', sigla: 'GO'},
    {id: 24, name: 'Distrito Federal', sigla: 'DF'},
    {id: 25, name: 'Piauí', sigla: 'PI'},
    {id: 26, name: 'Ceará', sigla: 'CE'},
    {id: 27, name: 'Espírito Santo', sigla: 'ES'}
  ];
  const [state, setState] = useState<IFormFields>({
    name: '',
    social_name: '',
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
    phones: [{
      cellphone: '',
      phone: '',
      telegram: false,
      whatsapp: false,
    }],
    // cellphone: '',
    // phone:'',
    responsible_user: '',
    active: true,

  });

  var isValidPhoneNumber: any;
  var isValidCellPhoneNumber: any;
  var formValid: any;
  useEffect(() => {
    dispatch(cleanAction());
  }, []);

  useEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        address: {
          ...prevState.address,
          ...customerState.data.address
        }
      }
    });
  }, [customerState.data.address]);

  useEffect(() => {
    if (params.id) {
      if (params.mode === "view") {
        setCanEdit(false)
      }

      const uf = States.find(uf => uf.sigla === customerState.data.address.state) || null;

      setState(prevState => ({
        ...prevState,
        form: {uf: uf}
      }));
      setState(prevState => {
        return {
          ...prevState,
          ...customerState.data
        }
      });
      setInputPhone(prev => ({
        ...prev,
        value: customerState.data.phones[0]?.phone || ''
      }));
      setInputCellPhone(prev => ({
        ...prev,
        value: customerState.data.phones[0]?.cellphone || ''
      }));

      // setFieldValidations({
      //   name: true,
      //   social_name: true,
      //   fiscal_number: true,
      //   responsible_user: true,
      //   postal_code: true,
      //   street: true,
      //   district: true,
      //   city: true,
      //   state: true,
      //   email: true,
      //   // phone:true,
      //   // cellphone: true,
      // })

    }
  }, [customerState, params.id]);

  useEffect(() => {
    if (customerState.error) {
      setState(prev => ({
        ...prev,
        address: {
          ...prev.address,
          street: '',
          district: '',
          city: '',
          state: '',
          complement: '',
        },
      }))
    }

    setState(prevState => {
      return {
        ...prevState,
        address: {
          ...customerState.data.address,

        }
      }
    });
    setFieldValidations((prevState: any) => ({
      ...prevState,
      postal_code: !validator.isEmpty(customerState.data.address.postal_code),
      street: !validator.isEmpty(customerState.data.address.street),
      district: !validator.isEmpty(customerState.data.address.district),
      city: !validator.isEmpty(customerState.data.address.city),
      state: !validator.isEmpty(customerState.data.address.state),
      complement: !validator.isEmpty(customerState.data.address.complement),
    }));
  }, [customerState.data?.address]);

  useEffect(() => {
    if (customerState.success && customerState.data?._id && !customerState.isRegistrationCompleted) history.push('/customer');
  }, [customerState.success])


  useEffect(() => {
    if (params.id) {
      dispatch(loadCustomerById(params.id))

    }
  }, [dispatch, params]);


  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;
    for (let key of Object.keys(fieldsValidation)) {
      if (fieldsValidation[key]) {
        isValid = false;
      }
    }
    return isValid;

  }, [fieldsValidation, state]);


  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';
    console.log(customerState.errorCep);


    customerState.errorCep && setState(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        city: '',
        complement: '',
        district: '',
        state: '',
        street: ''
      }
    }));

    document.getElementById('input-social-client')?.focus();
  }, [customerState.errorCep]);

  const handleSaveFormCustomer = useCallback(() => {
    console.log(fieldsValidation);

    // if (!fieldsValidation.name || !fieldsValidation.social_name  || !fieldsValidation.fiscal_number || !fieldsValidation.responsible_user ||
    //   !fieldsValidation.phone || !fieldsValidation.email || !fieldsValidation.phone || !fieldsValidation.postal_code  || !fieldsValidation.street ) {
    //   toast.error('Existem campos que precisam ser preenchidos para continuar');
    //   return;
    // }
    // else if (params.id && ModifiCondition() ) {
    //
    //   dispatch(updateCustomerRequest(state));
    //
    // }else{
    //   dispatch(createCustomerRequest(state));
    //
    // }
    if (params.id && ModifiCondition()) {

      dispatch(updateCustomerRequest(state));

    } else {
      dispatch(createCustomerRequest(state));

    }
  }, [state]);

  /////////////// Handler ////////////

  const handlerState = useCallback((event: any, newValue: any) => {
    if (newValue) {
      setState(prev => ({
        ...prev,
        form: {
          ...prev.form,
          uf: newValue
        }
      }));
      setState(prevState => ({
        ...prevState,
        address: {...state.address, state: newValue.sigla}
      }))
    }
  }, [state])


  ///////// Validação ////////////////

  const validatePhone = () => {

    if (state.phones[0]?.phone) {
      const landline = state.phones[0]?.phone.replace('(', '').replace(')', '9').replace(' ', '').replace(' ', '').replace('-', '');

      isValidPhoneNumber = validator.isMobilePhone(landline, 'pt-BR');

      return (isValidPhoneNumber)

    }
  }
  const validateCellPhone = () => {
    if (state.cellphone) {
      var cellphone = state.cellphone.replace('(', '').replace(')', '').replace(' ', '').replace(' ', '').replace('-', '');
      isValidCellPhoneNumber = validator.isMobilePhone(cellphone, 'pt-BR');

      return (isValidCellPhoneNumber)
    }
  }

  const validateCNPJField = useCallback((element) => {

    const isValidField = validateCNPJHelper(element.target.value) || false;
    setFieldValidations((prevState: any) => ({
      ...prevState,
      fiscal_number: isValidField
    }));
  }, []);

  const validationCellPhoneField = useCallback((element) => {
    const isValidField = validator.isEmpty(element.target.value);
    setInputCellPhone(prevState => ({
      ...prevState,
      error: isValidField
    }));
    if (!isValidField) {
      setState(prevState => ({
        ...prevState,
        cellphone: element.target.value
      }));
    }
  }, []);


/////////////// Validação /////////////////////

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

  function isEquals() {

    return _.isEqual(state, customerState.data);
  }


  function ModifiCondition() {
    if (!isEquals()) {
      return true;
    } else {
      return false;
    }
  }

  function handleOpenModalCancel() {

    if (ModifiCondition() && canEdit) {
      setOpenModalCancel(true);
    } else {
      handleCancelForm();
    }
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    dispatch(cleanAction());
    setOpenModalCancel(false);
    history.push('/customer');
  }

  if (validatePhone() == true && validateCellPhone() == true) {

    formValid = true;
  }

  const NavItems = [
    {
      name: "DADOS DO CLIENTE",
      components: ['ClientFormHeader', 'ClientFormHeader'],
    },
    {
      name: "CONFIGURAÇÕES DE PERMISSÕES",
      components: ['ClientFormHeader'],
    }
  ]

  return (
    <Sidebar>
      {customerState.loading && <Loading/>}
      <TabForm
        NavItems={NavItems}
        state={state}
        setState={setState}
        setValidations={setFieldValidations}
        fieldsValidation={fieldsValidation}
        canEdit={true}>
      </TabForm>
    </Sidebar>
  );
}
