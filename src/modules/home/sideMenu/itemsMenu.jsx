import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import DevicesIcon from '@mui/icons-material/Devices';
// import SettingsIcon from '@mui/icons-material/Settings';


const MENU_ITEMS = [
    { path: "/components", description: "Componentes", icon: <DevicesIcon className="iconDrawer bg-inherit"/> },
    { path: "/clients", description: "Clientes", icon: <PersonIcon className="iconDrawer bg-inherit"/> }
]

function LinkTo({children,path}){
    
    return (
        <>
            <Link to={path} >
                {children}
            </Link>
        </>
    )
}

function MenuItem({path,description,icon}){
    return(
        <LinkTo path={path} >
            <ListItemButton className="listItem-container " sx={{ mt: 2 }}>
                <ListItemIcon  className="bg-inherit">
                    {icon}
                </ListItemIcon>
                <ListItemText className="bg-inherit" primary={description} />
            </ListItemButton>
        </LinkTo>
    )
}



export const MenuItems = () => {

  return(
  <React.Fragment>
    {
        MENU_ITEMS.map((item) => 
          <MenuItem key={item.path}path={item.path} description={item.description} icon={item.icon} />
        )
    }

  </React.Fragment>
  )
  
};

