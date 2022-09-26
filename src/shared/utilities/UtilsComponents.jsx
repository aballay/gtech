import { Autocomplete,TextField,Button } from '@mui/material';
export default function Input({id,label,autoFocus,error,value,setValue,inputProps,required,disabled,type,rows,multiline}){
    return(
    <TextField 
        margin="normal"
        disabled={disabled}
        required={required}
        fullWidth
        id={id}
        label={label}
        name={id}
        autoComplete={label}
        autoFocus={autoFocus}
        error={Boolean(error)}
        helperText={error}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        inputProps={inputProps}
        type={type}
        rows={rows}
        multiline={multiline}
        placeholder={label}
        />
    )
} 

export function Combobox({id,value,setValue,options,sx,label,required}){
    return(
        <Autocomplete
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        disablePortal
        id={id}
        options={options}
        sx={sx}
        renderInput={(params) => <TextField {...params} autoFocus required={required} label={label} />}
        getOptionLabel={(value) => String(value)}
        />
    )
}

export function InputLarge({id,label,autoFocus,error,value,setValue,inputProps,required,disabled,type}){
    return(<Input id={id} label={label}  autoFocus={autoFocus} error={error} value={value} setValue={setValue} inputProps={inputProps} required={required} disabled={disabled} type={type} rows={4.5} multiline={true} />)

}

export function ButtonTextDefault({type,text}){
    
    return( <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        type={type}
        color="primary"
    >
       {text}
    </Button>)
    
}