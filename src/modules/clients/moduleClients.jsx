import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import DataTable from '../../shared/modules/dataTable';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Glass from '../../shared/modules/Glass';
import { Box, Stack, Tooltip } from '@mui/material';
import { AppContext } from '../../controllers/modules/ControllerProvider';
import { useContext } from 'react';
import UtilitiesShared from '../../shared/utilities/UtilitiesShared';
import ModalClients from '../../shared/modules/modalClients';




export default function MoudleClients() {

    const [dataRow, setDataRow] = useState(null);
    const [clients, setClients] = useState([]);
    const [rows, setRows] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openGlass, setOpenGlass] = React.useState(false);
    const [reloadDataTable, setReloadDataTable] = React.useState(false);
    const [openModal,setOpenModal] = useState(false);

    //Define Controller Provider
    const CONTEXT_PROVIDER = useContext(AppContext);

    // Mostrar vidrio
    const handleCloseGlass = () => {
        setOpenGlass(false);
    };
    const handleToggleGlass = () => {
        setOpenGlass(!openGlass);
    };
    
    const getClients = async () => {
        let listClients = await CONTEXT_PROVIDER.getClients();
        setRows(UtilitiesShared.serializeToDataTable(listClients));
        setIsLoading(true);
    }

    

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    React.useEffect(() => {
        getClients();
    }, [])


    return (
        <Container maxWidth="xl">
            <h2>Clientes</h2>
            {isLoading ?
                <>
                    <DataTable reload={reloadDataTable} type={"client"} paging={true} setDataRow={setDataRow} data={rows}  />
                    <Stack  direction="row" justifyContent="center" alignItems="center"  spacing={4}>
                        <Tooltip title="Ver/editar cliente">
                            <Button className="" variant="contained" color="warning"><EditIcon /></Button>
                        </Tooltip>

                        <Tooltip title="Agregar cliente">
                            <Button sx={{ mr: 5, ml: 5 }} variant="contained" color="primary"  onClick={handleOpenModal} ><AddIcon /></Button>
                        </Tooltip>

                    </Stack>
                        
                </>
                :
                <CircularProgress color="primary" />}

            <ModalClients open={openModal} handleClose={handleCloseModal} isCreating={true}  />
            <Glass open={openGlass} />
        </Container>


    )
}
