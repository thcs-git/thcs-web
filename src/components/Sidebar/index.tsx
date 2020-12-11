import React, { useState, Props, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { useHistory } from "react-router-dom";

/**
 * Icons
 */
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import GavelIcon from '@material-ui/icons/Gavel';
import ExtensionIcon from '@material-ui/icons/Extension';
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LocalHospital from '@material-ui/icons/LocalHospital';

import { Link } from 'react-router-dom';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { AccordionMenu } from './styles';
import LOCALSTORAGE from '../../helpers/constants/localStorage';


const drawerWidth = 220;

const itemsMenu = [
  { title: 'Dashboard', route: '/', icon: <DashboardIcon style={{ color: '#fff' }} /> },
  { title: 'Clientes', route: '/customer', icon: <AssignmentIndIcon style={{ color: '#fff' }} /> },
  { title: 'Empresas', route: '/company', icon: <BusinessIcon style={{ color: '#fff' }} /> },
  { title: 'Especialidade', route: '/specialty', icon: <FolderSpecialIcon style={{ color: '#fff' }} /> },
  { title: 'Conselhos', route: '/council', icon: <GavelIcon style={{ color: '#fff' }} /> },
  { title: 'Área', route: '/area', icon: <ExtensionIcon style={{ color: '#fff' }} /> },
  { title: 'Usuários', route: '/user', icon: <PersonIcon style={{ color: '#fff' }} /> },
  { title: 'Pacientes', route: '/patient', icon: <GroupAddIcon style={{ color: '#fff' }} /> },
  { title: 'Atendimento', route: '/care', icon: <LocalHospital style={{ color: '#fff' }} /> },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
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
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    logOutButton: {
      cursor: 'pointer',
    },
  })
);


const Sibebar = (props: Props<any>) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState<Boolean>(() => {
    let toggleSidebar = localStorage.getItem(LOCALSTORAGE.TOGGLE_SIDEBAR) || 'false';
    return JSON.parse(toggleSidebar)
  });

  const [openModalLogout, setOpenModalLogout] = useState(false);

  const AccordionRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  // if (!open) AccordionRef.current?.removeAttribute('expanded')
  // else AccordionRef.current?.setAttribute('expanded', 'true');
  // }, [open]);

  const handleDrawerClose = useCallback(() => {
    setOpen(prev => {
      localStorage.setItem(LOCALSTORAGE.TOGGLE_SIDEBAR, JSON.stringify(!prev));
      return !prev
    });
  }, []);

  // const openDropDownAndMenu = () => {
  // };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('@sollar_token');
    window.location.reload();
  }, []);

  const handleOpenModalLogout = useCallback(() => {
    setOpenModalLogout(true);
  }, []);

  const handleCloseModalLogout = useCallback(() => {
    setOpenModalLogout(false);
  }, [])

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
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon style={{ color: '#fff' }} /> : <MenuIcon style={{ color: '#fff' }} />}
          </IconButton>
        </div>
        {/* <Divider /> */}
        <List disablePadding={true}>
          {itemsMenu.map((item, index) => (
            <ListItem key={index} component="button" button onClick={() => history.push(item.route)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
          {/* <AccordionMenu
            ref={AccordionRef}
            // onClick={openDropDownAndMenu}
            // {...(!open ? { expanded: true } : {})}
            expanded={false}
          >
            <AccordionSummary
              expandIcon={open && <ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography display="block"><SupervisorAccountIcon />{open && 'Administrador'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </AccordionMenu> */}
        </List>
        <Divider />
        <List disablePadding={true}>
          <ListItem style={{ marginLeft: 10 }} className={classes.logOutButton} onClick={handleOpenModalLogout}>
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
    </div>
  );
}

export default React.memo(Sibebar);
