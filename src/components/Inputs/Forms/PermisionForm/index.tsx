import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {TabBody, TabBodyItem} from "../../../Tabs/styles";
import ButtonEdit from "../../../Button/ButtonEdit";
import TabTittle from "../../../Text/TabTittle";
import _ from "lodash";
import {Checkbox, CheckboxProps, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from "@material-ui/core";
import {FormLabelComponent} from "./styles"
import {SwitchComponent as Switch} from "../../../Button/ToggleActive/styles";
import {InputFiled as TextField} from "../IntegrationForm/styles";
import {cleanPermission, loadCustomerById, loadPermissionRequest} from "../../../../store/ducks/customers/actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {loadProfessionsRequest as getProfessionsAction} from "../../../../store/ducks/users/actions";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../../store";
import {ProfessionUserInterface} from "../../../../store/ducks/users/types";
import TabForm from "../../../Tabs";
import {RouteComponentProps} from "react-router-dom";

interface IComponent {
  state: any;
  setState: any;
  customerState: any;
  userState: any;
  params: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <TabBody
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <TabBodyItem style={{display: 'grid', justifyContent: 'center'}}>
        {children}
      </TabBodyItem>
    </TabBody>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  formLabel: {
    color: 'var(--primary)',
    '&.Mui-disabled': {
      color: 'var(--gray-dark)',
    },
    '&.Mui-focused': {
      color: 'var(--primary)',
    },
    // '&.Mui-disabled:hover': { background:theme.palette.secondary.main },
  }
}));

const CustomCheckbox = withStyles({
  root: {
    color: 'var(--primary)',
    '&$checked': {
      color: 'var(--secondary)',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const PermissionForm = (props: IComponent) => {
  const {state, setState, customerState, userState, params} = props;
  // const userState = useSelector((state: ApplicationState) => state.users);
  const classes = useStyles();
  const dispatch = useDispatch();

  interface rightsInterface {
    crud: string;
    label: string;
  }

  interface rowsInterface {
    legend: string;
    name: string;
    rights: rightsInterface[];
  }

  const mode = _.split(window.location.pathname, '/').slice(-2)[0]
  const _id = _.split(window.location.pathname, '/').slice(-3)[0]
  const customer_id = _.split(window.location.pathname, '/').slice(-5)[0]

  const rowsPortal = [
    {
      legend: 'Cliente',
      name: 'client',
      rights: [
        {crud: 'view', label: 'Visualizar'},
      ]
    },
    {
      legend: 'Permissões',
      name: 'permissions',
      rights: [
        {crud: 'edit', label: 'Criar/Editar'},
      ]
    },
    {
      legend: 'Integração',
      name: 'integration',
      rights: [
        {crud: 'edit', label: 'Criar/Editar'},
      ]
    },
    {
      legend: 'Empresas',
      name: 'company',
      rights: [
        {crud: 'view', label: 'Visualizar'},
      ]
    },
    {
      legend: 'Todos Profissionais',
      name: 'userclient',
      rights: [
        {crud: 'view', label: 'Visualizar'},
      ]
    },
    {
      legend: 'Meus Profissionais',
      name: 'user',
      rights: [
        {crud: 'view', label: 'Visualizar'},
      ]
    },
    // {
    //   legend: 'Banco de Talentos',
    //   name: 'userdesengaged',
    //   rights: [
    //     {crud: 'view', label: 'Visualizar'},
    //     {crud: 'status', label: 'Desativar'},
    //     {crud: 'create', label: 'Criar'},
    //     {crud: 'history', label: 'Histórico'},
    //   ]
    // },
    // {
    //   legend: 'Área',
    //   name: 'area',
    //   rights: [
    //     {crud: 'view', label: 'Visualizar'},
    //     {crud: 'status', label: 'Desativar'},
    //     {crud: 'create', label: 'Criar'},
    //     {crud: 'history', label: 'Histórico'},
    //   ]
    // },
    {
      legend: 'Pacientes',
      name: 'patient',
      rights: [
        {crud: 'view.mine', label: 'Visualizar Meus Pacientes'},
        {crud: 'view.all', label: 'Visualizar Todos Pacientes'},
      ]
    },
    // {
    //   legend: 'Avaliação',
    //   name: 'avaliation',
    //   rights: [
    //     {crud: 'view', label: 'Visualizar'},
    //     {crud: 'status', label: 'Desativar'},
    //     {crud: 'create', label: 'Criar'},
    //     {crud: 'history', label: 'Histórico'},
    //   ]
    // },
    {
      legend: 'Atendimento',
      name: 'care',
      rights: [
        {crud: 'view.mine', label: 'Visualizar Meus Atendimento'},
        {crud: 'view.all', label: 'Visualizar Todos Atendimento'},
      ]
    },
    {
      legend: 'QR Code',
      name: 'qrcode',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'create', label: 'Gerar'},
      ]
    },
    {
      legend: 'Agenda',
      name: 'schedule',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Criar Evento'},
      ]
    },
  ]

  const rowsApp = [
    {
      legend: '',
      name: 'app',
      rights: [
        {crud: 'check.create', label: 'Checagem'},
        {crud: 'admeasurement.create', label: 'Aferição'},
        {crud: 'evolution.create', label: 'Evolução'},
        {crud: 'prescription.create', label: 'Receituários'},
        {crud: 'certificate.create', label: 'Atestado'},
        {crud: 'exam.create', label: 'Exames'},
      ]
    },
  ]

  function handleChecked(name: string, crud: string) {
    return _.indexOf(state.rights, `${name}.${crud}`) > -1;
  }

  function handleSelectProfession(value: ProfessionUserInterface) {
    setState((prevState: any) => ({
      ...prevState,
      name: value.name,
    }));
  }

  const selectProfession = useCallback(() => {
    if (userState.data.professions) {
      const selected = userState.data.professions.filter((item: any) => {
        return item.name === state.name;
      });
      return selected[0] ? selected[0] : {_id: "0", name: ""};
    }

  }, [state, state.name, userState.data.professions]);

  const handleProfessionList = useCallback(() => {
    const list = [...userState.data.professions]
    if (userState.data.professions.length > 0 && customerState.data.usertypes) {
      const selected = userState.data.professions.filter((item: any) => {
        return item.name === state.name;
      });

      customerState.data.usertypes.map((item: any, index: number) => {
        _.remove(list, {name: item.name})
      })

      if (selected.length > 0) {
        list.push(selected[0])
      }
      return list
    }

    return userState.data.professions
  }, [userState.data.professions, customerState.data.usertypes, state])

  useEffect(() => {
    if (mode === 'create') {
      setState((prevState: any) => ({
        ...prevState,
        active: true,
        mode: mode,
        _id: _id,
        customer_id: customerState.data._id,
      }))
    } else {
      setState((prevState: any) => ({
        ...prevState,
        mode: mode,
        _id: _id,
        customer_id: customerState.data._id,
      }))
    }

    // if (mode ==='create') {
    //   setState(() => ({
    //     active: true,
    //     name: "",
    //     rights: [],
    //     mode: "",
    //     _id: "",
    //     customer_id: "",
    //   }))
    // }

    if (!customerState.data.usertypes && mode != 'create') {
      dispatch(loadCustomerById(customer_id))
    }
    if (userState.data.professions.length <= 0) {
      dispatch(getProfessionsAction());
    }
  }, []);

  useEffect(() => {
    if (customerState.permissionLoad && mode != 'create') {
      const permission = _.find(customerState.data.usertypes, {permissions: customerState.permission._id})

      if (permission) {
        setState((prevState: any) => ({
          ...prevState,
          active: permission.active,
          name: permission.name,
          rights: customerState.permission.rights,
        }))
      }
    }
  }, [customerState]);

  const NavItems = [
    {
      name: "PORTAL",
      components: ['CheckListFormPortal'],
    },
    {
      name: "APLICATIVO",
      components: ['CheckListFormApp'],
    },
  ]

  return (
    <div className={classes.root}>
      <TabPanel value={0} index={0}>
        <Grid container>
          <Grid item md={9} xs={12}>
            {/*<TextField*/}
            {/*  // disabled={mode === 'create' || mode === 'view'}*/}
            {/*  disabled={true}*/}
            {/*  label="Nome"*/}
            {/*  variant="outlined"*/}
            {/*  size="small"*/}
            {/*  value={state.name}*/}
            {/*  onChange={(event) => {*/}
            {/*    setState((prevState: any) => ({*/}
            {/*      ...prevState,*/}
            {/*      name: event.target.value*/}
            {/*    }))*/}
            {/*  }}*/}
            {/*  fullWidth*/}
            {/*/>*/}

            <Autocomplete
              id="combo-box-profession"
              disabled={mode === 'view'}
              options={handleProfessionList()}
              getOptionLabel={(option) => option.name}
              renderInput={(params) =>
                <TextField {...params} label="Função" variant="outlined"/>}
              getOptionSelected={(option, value) =>
                option._id ==
                userState.data.professions[0]._id
              }
              // defaultValue={selectProfession()}
              value={selectProfession()}
              onChange={(event, value) => {
                if (value) {
                  handleSelectProfession(value);
                }
              }}
              size="small"
              fullWidth
            />

          </Grid>
          <Grid item md={3} xs={12}>
            <FormControlLabel
              control={(
                <Switch
                  disabled={mode === 'create' || mode === 'view'}
                  checked={state.active}
                  onChange={(event) => {
                    setState((prevState: any) => ({
                      ...prevState,
                      active: event.target.checked
                    }))
                  }}
                />
              )}
              label={state.active ? "Ativo" : "Inativo"}
              labelPlacement="start"
            />
          </Grid>
        </Grid>

        <TabForm
          navItems={NavItems}
          state={state}
          setState={setState}
          initialTab={0}
          params={params}
          rowsPortal={rowsPortal}
          rowsApp={rowsApp}
        />

        {/*{rows.map(({legend, name, rights}: rowsInterface, index) => (*/}
        {/*  <FormControl component="fieldset" style={{marginBottom: '15px'}}>*/}
        {/*    <FormLabel className={classes.formLabel}>{legend}</FormLabel>*/}
        {/*    <FormGroup aria-label="position" row>*/}
        {/*      {rights.map(({crud, label}: rightsInterface, index: number) => (*/}
        {/*        <FormControlLabel*/}
        {/*          value={crud}*/}
        {/*          control={<CustomCheckbox checked={handleChecked(name, crud)}/>}*/}
        {/*          label={label}*/}
        {/*          labelPlacement="end"*/}
        {/*          disabled={mode === 'view'}*/}
        {/*          onChange={(event, value) => {*/}
        {/*            const rights = [...state.rights];*/}
        {/*            const right = `${name}.${crud}`*/}

        {/*            if (value) {*/}
        {/*              setState((prevState: any) => ({*/}
        {/*                ...prevState,*/}
        {/*                rights: [...prevState.rights, right]*/}
        {/*              }))*/}
        {/*            } else {*/}
        {/*              _.pull(rights, right);*/}
        {/*              setState((prevState: any) => ({*/}
        {/*                ...prevState,*/}
        {/*                rights: rights*/}
        {/*              }))*/}
        {/*            }*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      ))}*/}
        {/*    </FormGroup>*/}
        {/*  </FormControl>*/}
        {/*))}*/}
      </TabPanel>
    </div>
  );
}

export default React.memo(PermissionForm);
