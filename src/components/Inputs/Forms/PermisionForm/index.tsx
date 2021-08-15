import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {TabBody, TabBodyItem} from "../../../Tabs/styles";
import ButtonEdit from "../../../Button/ButtonEdit";
import TabTittle from "../../../Text/TabTittle";


interface IComponent {

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const PermissionForm = (props: any) => {
  const {} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TabPanel value={0} index={0}>
        <p>a</p>
      </TabPanel>
    </div>
  );
}

export default React.memo(PermissionForm);
