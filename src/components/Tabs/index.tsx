import React, {useState, ReactNode} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {Badge, Divider, Grid} from "@material-ui/core";

import {TabBody, TabBodyItem, TabContent, TabNav, TabNavItem} from './styles';
import ClientFormHeader from "../Inputs/Forms/ClientName";
import _ from 'lodash';
import CepForm from "../Inputs/Forms/CepForm";
import ResponsibleForm from "../Inputs/Forms/ResponsibleForm";
import ToggleActive from "../Button/ToggleActive";
import TabList from "../List/TabList";
import IntegrationForm from "../Inputs/Forms/IntegrationForm";
import PermissionList from "../List/PermissionList";
import UserContactForm from "../Inputs/Forms/UserContactForm";
import UserProfessionForm from "../Inputs/Forms/UserProfessionForm";
import UserForm from "../Inputs/Forms/UserForm";
import UserCompanyForm from "../Inputs/Forms/UserCompanyForm";
import CheckListForm from "../Inputs/Forms/CheckListForm";
import CompanyForm from "../Inputs/Forms/CompanyForm";
import PatientForm from "../Inputs/Forms/patientForm";


interface ITabprops {
  navItems: INavItems[],
  children?: ReactNode;
  state?: any;
  setState?: Function;
  setValidations?: Function;
  fieldsValidation?: any;
  canEdit?: boolean;
  getAddress?: any;
  cepStatus?: any;
  user?: string;
  customerState?: any;
  tableCells?: any;
  mode?: string;
  initialTab: number;
  params: IPageParams;
  rowsPortal?: any;
  rowsApp?: any;
}

interface IPageParams {
  id?: string,
  mode?: string;
}

interface INavItems {
  name: string;
  components: any;
  badge?: number;
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
      <TabBodyItem>
        {children}
      </TabBodyItem>
    </TabBody>
  );
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    borderBottom: "2px solid var(--secondary)",
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  customBadge: {
    backgroundColor: "var(--secondary)",
    color: "white"
  }
}));


const TabForm = (props: ITabprops) => {
  const {
    navItems,
    state,
    setState,
    setValidations,
    fieldsValidation,
    canEdit,
    cepStatus,
    getAddress,
    user,
    customerState,
    mode,
    initialTab,
    params,
    rowsPortal,
    rowsApp,
  } = props;

  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [value, setValue] = useState(initialTab);

  function handleComponents(component: string, index: number) {
    switch (component) {
      case 'ClientFormHeader':
        return <ClientFormHeader
          index={index}
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          fieldsValidation={fieldsValidation}
          canEdit={canEdit ? canEdit : false}
          params={params}
        />
      case 'CepForm':
        return <CepForm
          index={index}
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          canEdit={canEdit ? canEdit : false}
          cepStatus={cepStatus}
          getAddress={getAddress}
          params={params}
        />
      case 'CompanyForm':
        return <CompanyForm
          index={index}
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          canEdit={canEdit ? canEdit : false}
          cepStatus={cepStatus}
          getAddress={getAddress}
          params={params}
        />
      case 'PatientForm':
        return <PatientForm
          index={index}
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          canEdit={canEdit ? canEdit : false}
          cepStatus={cepStatus}
          getAddress={getAddress}
          params={params}
        />
      case 'UserForm':
        return <UserForm
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          canEdit={canEdit ? canEdit : false}
          params={params}
        />
      case 'UserCompanyForm':
        return <UserCompanyForm
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          canEdit={canEdit ? canEdit : false}
          params={params}
        />
      case 'UserContactForm':
        return <UserContactForm
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          canEdit={canEdit ? canEdit : false}
          params={params}
        />
      case 'UserProfessionForm':
        return <UserProfessionForm
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          canEdit={canEdit ? canEdit : false}
          params={params}
        />
      case 'ResponsibleForm':
        return <ResponsibleForm
          index={index}
          state={state}
          setState={setState ? setState : () => false}
          setValidations={setValidations ? setValidations : () => false}
          fieldsValidation={fieldsValidation}
          canEdit={canEdit ? canEdit : false}
          user={user}
          params={params}
        />
      case 'PermissionList':
        return <PermissionList
          customerState={customerState}
          mode={mode ? mode : ''}
        />
      case 'CheckListFormPortal':
        return <CheckListForm
          state={state}
          setState={setState}
          rows={rowsPortal}
        />
      case 'CheckListFormApp':
        return <CheckListForm
          state={state}
          setState={setState}
          rows={rowsApp}
        />
      case 'ToggleActive':
        return <ToggleActive
          index={index}
          state={state}
          setState={setState ? setState : () => false}
          canEdit={canEdit ? canEdit : false}
        />
      case 'IntegrationForm':
        return <IntegrationForm
          index={index}
          state={state}
          setState={setState ? setState : () => false}
          canEdit={canEdit ? canEdit : false}
        />
      default:
        return <TabBodyItem>Not found!</TabBodyItem>
    }
  }

  return (
    <div className={classes.root}>
      <TabContent position="static">
        <TabNav value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                TabIndicatorProps={{className: classes.indicator}}
        >
          {navItems.map(({name, badge}: INavItems, index: number) => (
            <TabNavItem
              value={index}
              label={
                badge ? <Badge classes={{badge: classes.customBadge}} className={classes.padding} color="primary"
                               badgeContent={badge} max={99}>{name}</Badge> : name
              }
              wrapped
              className={value === index ? 'active' : ''}
              {...a11yProps({index})}
            >
            </TabNavItem>
          ))}
        </TabNav>
      </TabContent>
      {navItems.map(({name, components, badge}: INavItems, index: number) => {
        const last = _.findLastIndex(components)
        return (
          <TabPanel value={value} index={index}>
            {components.map((component: string, sub_index: number) => (
              <>
                {handleComponents(component, parseInt(`${index}${sub_index}`))}
                {sub_index != last && (
                  <Grid item md={12} xs={12}>
                    <Divider style={{marginBottom: 28, marginTop: 20}}/>
                  </Grid>
                )}
              </>
            ))}
          </TabPanel>
        )
      })}
    </div>
  );
}

export default React.memo(TabForm);
