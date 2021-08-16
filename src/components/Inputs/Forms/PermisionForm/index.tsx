import React, {useEffect, useState} from 'react';
import {makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {TabBody, TabBodyItem} from "../../../Tabs/styles";
import ButtonEdit from "../../../Button/ButtonEdit";
import TabTittle from "../../../Text/TabTittle";
import _ from "lodash";
import {Checkbox, CheckboxProps, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from "@material-ui/core";
import {FormLabelComponent} from "./styles"
import {SwitchComponent as Switch} from "../../../Button/ToggleActive/styles";
import {InputFiled as TextField} from "../IntegrationForm/styles";
import {loadCustomerById} from "../../../../store/ducks/customers/actions";

interface IComponent {
  state: any;
  setState: any;
  customerState: any;
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
  const {state, setState, customerState} = props;
  const classes = useStyles();

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

  const rows = [
    {
      legend: 'Cliente',
      name: 'client',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
    {
      legend: 'Empresas',
      name: 'company',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
    {
      legend: 'Meus Profissionais',
      name: 'user',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
    {
      legend: 'Banco de Talentos',
      name: 'userdesengaged',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
    {
      legend: 'Área',
      name: 'area',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
    {
      legend: 'Pacientes',
      name: 'patient',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
    {
      legend: 'Avaliação',
      name: 'avaliation',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
    {
      legend: 'Atendimento',
      name: 'care',
      rights: [
        {crud: 'view', label: 'Visualizar'},
        {crud: 'edit', label: 'Editar'},
        {crud: 'status', label: 'Desativar'},
        {crud: 'create', label: 'Criar'},
        {crud: 'history', label: 'Histórico'},
      ]
    },
  ]

  function handleChecked(name: string, crud: string) {
    return _.indexOf(state.rights, `${name}.${crud}`) > -1;
  }

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
  }, []);

  useEffect(() => {
    if (customerState.permissionLoad && mode != 'create') {
      const permission = _.find(customerState.data.usertypes, {permissions: customerState.permission._id})
      setState((prevState: any) => ({
        ...prevState,
        active: permission.active,
        name: permission.name,
        rights: customerState.permission.rights,
      }))
    }
  }, [customerState.permissionLoad]);

  return (
    <div className={classes.root}>
      {/*{console.log(customerState.permission)}*/}
      <TabPanel value={0} index={0}>
        <Grid container>
          <Grid item md={9} xs={12}>
            <TextField
              disabled={mode === 'create' || mode === 'view'}
              label="Nome"
              variant="outlined"
              size="small"
              value={state.name}
              onChange={(event) => {
                setState((prevState: any) => ({
                  ...prevState,
                  name: event.target.value
                }))
              }}
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

        {rows.map(({legend, name, rights}: rowsInterface, index) => (
          <FormControl component="fieldset" style={{marginBottom: '15px'}}>
            <FormLabel className={classes.formLabel}>{legend}</FormLabel>
            <FormGroup aria-label="position" row>
              {rights.map(({crud, label}: rightsInterface, index: number) => (
                <FormControlLabel
                  value={crud}
                  control={<CustomCheckbox checked={handleChecked(name, crud)}/>}
                  label={label}
                  labelPlacement="end"
                  disabled={mode === 'view'}
                  onChange={(event, value) => {
                    const rights = [...state.rights];
                    const right = `${name}.${crud}`

                    if (value) {
                      setState((prevState: any) => ({
                        ...prevState,
                        rights: [...prevState.rights, right]
                      }))
                    } else {
                      _.pull(rights, right);
                      setState((prevState: any) => ({
                        ...prevState,
                        rights: rights
                      }))
                    }
                  }}
                />
              ))}
            </FormGroup>
          </FormControl>
        ))}
      </TabPanel>
    </div>
  );
}

export default React.memo(PermissionForm);
