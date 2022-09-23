import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import MoudleClients from '../clients/moduleClients';

export default function RouterController() {


    return (
        <Box sx={{width:'100%'}} className='container-body-parent'>
                <Routes>
                    <Route path="/" element={<MoudleClients />} />
                    <Route path="/clients" element={<MoudleClients />} />
                </Routes>
        </Box>
    )
}