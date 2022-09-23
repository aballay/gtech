import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MenuItems } from './itemsMenu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Theme from '../../../shared/utilities/material-ui/theme';
// import PopUp from '../body/bodyTypes/Tools/pop-ups/popUps';
// import { appfb } from '../../../fb';

import "../../../lib/css/menu.scss";

function CloseSessionButton() {
    
 
  const cleanBranchLocalStorage = () => {
      // localStorage.setItem('branch',"")

  }
  const closeSession = () => {
      // appfb.auth().signOut();

    }
  const handleCloseSession = () => {
    
      // PopUp.conditional('¿Esta seguro que desea cerrar la sesion?',"").then((accept) => {
      //   if(accept){
      //     cleanBranchLocalStorage();
      //     closeSession();
      //   }
      // })
      
  }
  return (
          <ListItemButton onClick={handleCloseSession} className="listItem-container " >

              <ListItemIcon className="bg-inherit">
                  <LogoutIcon className="iconDrawer" />
              </ListItemIcon>
              <ListItemText className="bg-inherit" primary="Cerrar sesion" />

          </ListItemButton>
  )
}

// Ancho del Drawer (Slide Menu)
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Menu(props) {
  return (
      <Drawer className="drawer-container"  style={{ backgroundColor: 'aquamarine' }} variant="permanent" open={props.open}>
        <Toolbar
          className="toolbar-container" sx={{display: 'flex',alignItems: 'center', justifyContent: 'flex-end', px: [1],}}>
          Menu
          <IconButton onClick={props.toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Stack  direction="column" spacing={4}  >
          <List component="nav">
            {<MenuItems />}
          </List>
          {/* props.user ? <List ..- */}
          {true ?
          <List  component="nav">
            <CloseSessionButton  />
          </List>
          :
          <></>} 
          
        </Stack>

    </Drawer>
    
  );
}