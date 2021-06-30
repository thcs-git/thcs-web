import React, { useState, useEffect, Props, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '../../store';

import { loadCompanyById } from '../../store/ducks/companies/actions';

import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Typography,
} from '@material-ui/core';

import { useHistory } from "react-router-dom";

/**
 * Icons
 */
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import LocationOncon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LocalHospital from '@material-ui/icons/LocalHospital';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Logo, UserContent } from './styles';
import LOCALSTORAGE from '../../helpers/constants/localStorage';

// Components
import ConfigComponent from '../Configuration';

const drawerWidth = 270;

const itemsMenu = [
  { title: 'Dashboard', route: '/', icon: <DashboardIcon style={{ color: '#fff' }} /> },
  { title: 'Clientes', route: '/customer', icon: <AssignmentIndIcon style={{ color: '#fff' }} /> },
  { title: 'Empresas', route: '/company', icon: <BusinessIcon style={{ color: '#fff' }} /> },
  { title: 'Meus Profissionais', route: "/user", icon: <PersonIcon style={{ color: '#fff' }} /> },
  { title: 'Banco de Talentos', route: "/userdesengaged", icon: <StarRateIcon style={{ color: '#fff' }} /> },
  { title: 'Área', route: '/area', icon: <LocationOncon style={{ color: '#fff' }} /> },
  { title: 'Pacientes', route: '/patient', icon: <GroupAddIcon style={{ color: '#fff' }} /> },
  { title: 'Avaliação', route: '/avaliation', icon: <FavoriteIcon style={{ color: '#fff' }} /> },
  { title: 'Atendimento', route: '/care', icon: <LocalHospital style={{ color: '#fff' }} />},
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      background: '#0899BA',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      background: '#0899BA',
      color: '#fff',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      background: '#0899BA',
      color: '#fff',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flex: 1,
      padding: theme.spacing(3),
      paddingBottom: 20
    },
    logOutButton: {
      cursor: 'pointer',
      marginLeft: 0,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sibebar = (props: Props<any>) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState<Boolean>(() => {
    let toggleSidebar = localStorage.getItem(LOCALSTORAGE.TOGGLE_SIDEBAR) || 'false';
    return JSON.parse(toggleSidebar)
  });
  const [username, setUsername] = useState(localStorage.getItem(LOCALSTORAGE.USERNAME) || '');
  const [company, setCompany] = useState({
    _id: localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || '',
    name: localStorage.getItem(LOCALSTORAGE.COMPANY_NAME) || '',
  });

  const [customer, setCustomer] = useState({
    _id: localStorage.getItem(LOCALSTORAGE.CUSTOMER) || '',
    name: localStorage.getItem(LOCALSTORAGE.CUSTOMER_NAME) || '',
  });

  const [openModalLogout, setOpenModalLogout] = useState(false);
  const [openModalConfig, setOpenModalConfig] = useState(false);

  const handleDrawerClose = useCallback(() => {
    setOpen(prev => {
      localStorage.setItem(LOCALSTORAGE.TOGGLE_SIDEBAR, JSON.stringify(!prev));
      return !prev
    });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('@sollar_token');
    localStorage.removeItem('@sollar_username');
    localStorage.removeItem('@sollar_user_id');
    localStorage.removeItem('@sollar_company_selected');
    localStorage.removeItem('@sollar_company_name');
    localStorage.removeItem('@sollar_customer');


    window.location.reload();
  }, []);

  const handleOpenModalLogout = useCallback(() => {
    setOpenModalLogout(true);
  }, []);

  const handleCloseModalLogout = useCallback(() => {
    setOpenModalLogout(false);
  }, []);

  const handleToggleModalConfig = useCallback(() => {
    setOpenModalConfig(!openModalConfig);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Logo />
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon style={{ color: '#fff' }} /> : <MenuIcon style={{ color: '#fff' }} />}
          </IconButton>
        </div>
        {/* <Divider /> */}

        <UserContent className={!open ? 'hide' : ''}>
          <AccountCircle />

          <div>
            <h3>{username}</h3>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
              <ListItem style={{ padding: 0 }} className={classes.logOutButton} onClick={() => setOpenModalConfig(true)}>
                <BusinessIcon />
                <ListItemText style={{color:"#ffff",cursor:"pointer"}}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                    <h4 style={{ color: '#ffffff', marginLeft: 10 }}>{customer.name}</h4>
                    <h4 style={{ color: '#ffffff', marginLeft: 10 }}>{company.name}</h4>
                  </div>
                </ListItemText>
                <EditIcon style={{ color: '#fff', fontSize: '14px', marginLeft: '10px' }} />
              </ListItem>
            </div>
          </div>
        </UserContent>
        <List>
          {itemsMenu.map((item,index)=>(
            <>

            {/* {item.subtitle?(

               <Accordion style={{backgroundColor:"transparent", boxShadow:"none"}}>
                  <AccordionSummary >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    { open && (<ListItemText primary={item.title} style={{color:"#ffff"}}  />) }

                  </AccordionSummary>

                  <AccordionDetails>
                    <List>
                      {item.subtitle.map((item, index)=>(
                      <ListItem key={index} component ="button" button onClick={() => history.push(item.route)}>
                        <ListItemText primary={item.title} style={{color:"#ffff",paddingLeft:'60px'}}></ListItemText>
                      </ListItem>
                    ))}
                    </List>

              </AccordionDetails>

            </Accordion>
           ):( */}
              <ListItem onClick={() => history.push(item.route)}>
                  <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} style={{color:"#ffff",cursor:"pointer"}}  />
              </ListItem>

            {/* )} */}
            </>

          ))}
          </List>
        <Divider />
        <List disablePadding={true}>
          <ListItem className={classes.logOutButton} onClick={() => history.push("/userconfiguration")}>
            <ListItemIcon>
              <SettingsIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItem>
          <ListItem className={classes.logOutButton} onClick={handleOpenModalLogout}>
            <ListItemIcon>
              <ExitToApp style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {props.children}
      </main>

      <Dialog
        open={openModalLogout}
        onClose={handleCloseModalLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Já vai?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja sair do Sollar?
					</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalLogout} color="primary">
            Não
					</Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Sim
					</Button>
        </DialogActions>
      </Dialog>

      <Dialog

        open={openModalConfig}
        // onClose={handleToggleModalConfig}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">Configurações</DialogTitle>
        <DialogContent>
          <ConfigComponent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenModalConfig(false)
            history.push(`/dashboard`);
           // location.reload()
          }}
            color="primary"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(Sibebar);
