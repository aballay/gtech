import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from '../../shared/utilities/UtilsComponents';
import { Combobox,InputLarge,ButtonTextDefault } from '../../shared/utilities/UtilsComponents';
import {Client} from '../../lib/js/modules/Client';

export default function FormClients(props) {
    
    const [errors, setError] = React.useState("");
    const [surnames,setSurnames] = React.useState("");
    const [names,setNames] = React.useState("");
    const [dni,setDni] = React.useState("");
    const [adress,setAdress] = React.useState("");
    const [componentRegister,setComponentRegister] = React.useState("");
    const [phone,setPhone] = React.useState("");
    const [notes,setNotes] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [enabledInput,setEnableInput] = React.useState(true); 
    const [score,setScore] = React.useState(Client.getScoreData().defectValue);

    
    React.useEffect(() => {
      if(!props.isCreating){
        setInputsWithClientData(props.dataRow);
      }
    },[])
    
    function handleDisabledInputs(){
        setEnableInput(false);
    }

    function CleanInputs(){
        setSurnames("");
        setNames("")
        setDni("")
        setAdress("");
        setComponentRegister("");
        setPhone("");
        setNotes("");
        setEmail("");
        setScore("");
    }

    function setInputsWithClientData(client){
        setSurnames(client.surname);
        setNames(client.name)
        setDni(client.dni)
        setAdress(client.adress);
        setComponentRegister(client.componentRegister);
        setPhone(client.phone);
        setNotes(client.notes);
        setEmail(client.email);
        setScore(client.score);
    }

    // Agrega un cliente y ejecuta handleAddClient
    // function setAndAddClient(dateUp){
    //     props.addClient(
    //         new Client(surnames,names,dni,adress,notes,phone,email,dateUp,new Date().toISOString().slice(0,10)),score);
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        // if(!surnames || !names || !dni){
        //     setError("Estos campos son obligatorios")
        // }else{
        //     handleDisabledInputs();
        //      let dateUp = new Date().toISOString().slice(0, 10);
        //     if(!props.isCreating){
        //         dateUp = props.dataRow.dateUp;
        //     }
        //     //Setea info cliente
        //     setAndAddClient(dateUp);
        // }
    };

    return (
            <Container component="main" maxWidth="xl">
                <Typography >
                   {props.isCreating ? "Aqui deberas cargar la informacion del cliente. Los campos con ( * ) son obligatorios." :" Aqui podras ver la informacion completa del cliente y tambien podras hacer cambios en ella."} 
                </Typography>
                <CssBaseline />
                <Box
                    sx={{marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: ''}}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container>
                            <Grid item xs sx={{ mr: 1 }}>
                                <Input required={true} disabled={!enabledInput} id="surnames" label="Apellidos" autoFocus={true} error={errors} value={surnames} setValue={setSurnames} inputProps={{ style: { textTransform: "capitalize" } }} />
                            </Grid>
                            <Grid item xs sx={{ mr: 1 }}>
                                <Input required={true} disabled={!enabledInput} id="names" label="Nombres" autoFocus={false} error={errors} value={names} setValue={setNames} inputProps={{ style: { textTransform: "capitalize" } }}/>
                            </Grid>
                            <Grid item xs sx={{ mr: 1 }}>
                                <Input required={true} disabled={!props.isCreating} id="DNI" label="DNI" autoFocus={false} error={errors} value={dni} setValue={setDni} type="number" />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Input type="email" value={email} setValue={setEmail} label="Email" id="email" disabled={!enabledInput} />
                            </Grid>
                            <Grid item xs sx={{ ml: 1, mr: 1 }}>
                                <Input disabled={!enabledInput} id="adress" label="Dirección" type="text" value={adress} setValue={setAdress} inputProps={{ style: { textTransform: "capitalize" } }} />
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Input   id="phone" label="Teléfono" value={phone} setValue={setPhone} type="tel"  disabled={!enabledInput} />
                                <Combobox  options={Client.getScoreData().data} id="score" value={score} setValue={setScore} sx={{ width: '49.1%' }} label="Puntaje" />
                            </Grid>
                            <Grid item xs sx={{ ml: 1, mr: 1 }}>
                                <InputLarge disabled={!enabledInput} id="notes" label="Notas" value={notes} setValue={setNotes} />
                            </Grid>
                        </Grid>

                        {props.isCreating ? 
                            <ButtonTextDefault type="submit" text="Confirmar" /> 
                        :
                            <ButtonTextDefault type="submit" text="Modificar Datos" /> 
                       }
                    </Box>
                </Box>
            </Container>
    );
}
