import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormClients from '../../modules/clients/formClients';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '5px inset #90caf9',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function ModalClients(props) {
    
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          {props.dataRow!== undefined ? <>{!props.isCreating ? <h2> {props.dataRow.surname} {props.dataRow.name}</h2>:<><h2 id="parent-modal-title">Informacion del cliente</h2></>}</> : <><h2 id="parent-modal-title">Informacion del cliente</h2></>}
          
          {
            props.dataRow!== undefined  ? <div>
               <h4>Alta del cliente: {props.dataRow.dateUp}</h4>
               {props.isCreating ? <></> :<h4>Ultima modificaicon : {props.dataRow.lastUpdate}</h4> }
               </div>
              :
               <h4>Alta del cliente:{new Date().toISOString().slice(0,10)} </h4>
          }  
          </div>
          
          <FormClients dataRow={props.dataRow} addClient={props.addClient} isCreating={props.isCreating}/>
        </Box>
      </Modal>
    </div>
  );
}