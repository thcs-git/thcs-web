import React, {useState, ReactNode} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {Badge, Divider, Grid} from "@material-ui/core";

import {TabBody, TabBodyItem, TabContent, TabNav, TabNavItem} from './styles';
import ClientFormHeader from "../Inputs/Forms/ClientName";
import _ from 'lodash';

interface ITabrops {
  NavItems: INavItems[],
  children: ReactNode;
  state: any;
  setState: Function;
  setValidations: Function;
  fieldsValidation: any;
  canEdit: boolean;
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
  const {NavItems, state, setState, setValidations, fieldsValidation, canEdit} = props;
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [value, setValue] = useState(0);

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
      default:
        return <TabBodyItem></TabBodyItem>
    }
  }

  return (
    <div className={classes.root}>
      <TabContent position="static">
        <TabNav value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs"
                TabIndicatorProps={{className: classes.indicator}}
        >
          {NavItems.map(({name, badge}: INavItems, index: number) => (
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
      {NavItems.map(({name, components, badge}: INavItems, index: number) => {
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
