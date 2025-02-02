import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { brown } from '@mui/material/colors';
import PersonPinIcon from '@mui/icons-material/Person';
import RedeemIcon from '@mui/icons-material/Redeem';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import MaterialTable from 'material-table';

import axios from "axios";
import AdminClients from './Admin/AdminClients';
import AdminProviders from './Admin/AdminProviders';
import AdminPacks from './Admin/AdminPacks';
import AdminOrdenes from './Admin/AdminOrdenes'
import { getProviders, getPacks, getAllClients, getOrder } from '../actions'
import { useState, useEffect } from 'react';
import { LogoutButton } from './LogoutButton'
import { useDispatch, useSelector } from 'react-redux'



import CardProveedor from './CardProveedor'
import { useSelect } from '@mui/base';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.allProviders)
  console.log(providers, 'providers')
  const packs = useSelector((state) => state.allPacks)
  console.log(packs, 'packs')
  const clients = useSelector((state) => state.allClients)
  console.log(clients, 'clients')
  const order = useSelector((state) => state.ordercita)
  console.log(providers, 'order')

  const [buttonCliente, setButtonCliente] = useState(false);
  console.log(buttonCliente, 'btn cliente')
  const [buttonProveedor, setButtonProveedor] = useState(false);
  console.log(buttonProveedor, 'btn prov')
  const [buttonPaquetes, setButtonPaquetes] = useState(false);
  console.log(buttonPaquetes, 'btn paquete')
  const [buttonOrder, setButtonOrder] = useState(false);
  console.log(buttonPaquetes, 'btn order')
  

  useEffect(() => {
    dispatch(getProviders())
    dispatch(getAllClients())
    dispatch(getPacks())
    dispatch(getOrder())
   
  }, [dispatch])

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleButtonCliente = ()=>{
    if(buttonCliente === false){
      setButtonCliente(true)
    } else{
      setButtonCliente(false)
    }
  }
  const handleButtonProveedor = ()=>{
    if(buttonProveedor === false){
      setButtonProveedor(true)
    } else{
      setButtonProveedor(false)
    }
  }
  const handleButtonPaquete = ()=>{
    if(buttonPaquetes === false){
      setButtonPaquetes(true)
    } else{
      setButtonPaquetes(false)
    }
  }
  const handleButtonOrden = ()=>{
    if(buttonOrder === false){
      setButtonOrder(true)
    } else{
      setButtonOrder(false)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Freevents
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List onClick={handleButtonCliente} >
          {['Cliente'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <PersonPinIcon
                color= 'action'
                  sx={{
                    minWidth: 0,
                    mr: open ? 4 : 'auto',
                    justifyContent: 'center',
                  }}
                />
                  
                
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List onClick={handleButtonOrden}>
          {['Ordenes'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <RoomServiceIcon
                color = "action"
                  sx={{
                    minWidth: 0,
                    mr: open ? 4 : 'auto',
                    justifyContent: 'center',
                  }}
                />
                  
                
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List onClick={handleButtonProveedor}>
          {['Proveedor'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <WorkOutlineIcon
                color = "action"
                  sx={{
                    minWidth: 0,
                    mr: open ? 4 : 'auto',
                    justifyContent: 'center',
                  }}
                />
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

       
        <List onClick={handleButtonPaquete}>

          {['Paquetes'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <RedeemIcon
                color = "action"
                  sx={{
                    minWidth: 0,
                    mr: open ? 4 : 'auto',
                    justifyContent: 'center',
                  }}
                />
                  
                
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className='proveedores'>
          {buttonCliente === true ? <AdminClients/> : null}
          {buttonProveedor === true ? <AdminProviders/> : null}
          {buttonPaquetes === true ? <AdminPacks/> : null}
          {buttonOrder === true ? <AdminOrdenes/> : null}
        </div>
        <div>


        </div>

        

      </Box>
    </Box>
  );
}





