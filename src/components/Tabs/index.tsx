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


interface ITabrops {
  navItems: INavItems[],
  children?: ReactNode;
  state: any;
  setState: Function;
  setValidations: Function;
  fieldsValidation: any;
  canEdit: boolean;
  getAddress: any;
  cepStatus: any;
  user?: string;
  customerState?: any;
  tableCells: any;
  mode: string;
  initialTab: number;
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


const TabForm = (props: ITabrops) => {
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
          setState={setState}
          setValidations={setValidations}
          fieldsValidation={fieldsValidation}
          canEdit={canEdit}
        />
      case 'CepForm':
        return <CepForm
          index={index}
          state={state}
          setState={setState}
          setValidations={setValidations}
          canEdit={canEdit}
          cepStatus={cepStatus}
          getAddress={getAddress}
        />
      case 'ResponsibleForm':
        return <ResponsibleForm
          index={index}
          state={state}
          setState={setState}
          setValidations={setValidations}
          fieldsValidation={fieldsValidation}
          canEdit={canEdit}
          user={user}
        />
      case 'PermissionList':
        return <PermissionList
          customerState={customerState}
          mode={mode}
        />
      case 'ToggleActive':
        return <ToggleActive
          index={index}
          state={state}
          setState={setState}
          canEdit={canEdit}
        />
      case 'IntegrationForm':
        return <IntegrationForm
          index={index}
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
