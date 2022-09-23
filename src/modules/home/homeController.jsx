

import React from 'react';
import { Box,Toolbar, Grid, Paper, Container } from '@mui/material';
import Header from './header';
import Menu from './sideMenu/menu';
import RouterController from './routerController';
import ControllerProvider from '../../controllers/modules/ControllerProvider';

export default function HomeController() {

    const [open, setOpen] = React.useState(true);
    const [user, setUser] = React.useState(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <ControllerProvider>
                <Header open={open} toggleDrawer={toggleDrawer} />
                <Menu user={user} open={open} toggleDrawer={toggleDrawer} />
                <Box component="main"sx={{flexGrow: 1,height: '100vh',overflow: 'auto',}}>
                    <Toolbar />
                    <Container className='container-home' maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>

                            {/* Recent Orders */}
                            <Grid item xs={12}>
                            <Paper className="paper-home" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <RouterController /> 
                            </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

            </ControllerProvider>
           
        </Box>
    )
}
