import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
const useStyles = makeStyles(theme => ({

    Modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ModalInside: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    Form : {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
    }
    ,'& .MuiButton-root':{
        margin: theme.spacing(1),
        width: 300,
    }
}
}));
const Majors = ['Computer Science','Earth Science']
const Degree = ['Masters','PhD']
export default function CustomModal(props){
    const {state} = props
    const classes = useStyles();
    const handleClose=()=>{
        state.setOpen(false)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value)
    }
return(
    <Modal
    className={classes.Modal}
    open={state.open}
    onClose = {handleClose}
  >
     <div className={classes.ModalInside}>
    <h2>{state.title}</h2>
    <form className={classes.Form} noValidate autoComplete="off">
            <TextField label="Name" variant="outlined" />
            <TextField label="Degree" value ={Degree[0]} select variant="outlined">
            {Degree.map((option,idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
                </TextField>
            <TextField label="Major" select variant="outlined">
            {Majors.map((option,idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
                </TextField>
            <TextField label="Skills" variant="outlined" />
            <Button variant="contained" onClick={handleSubmit}>ADD NEW RA</Button>
    </form>
    </div>
  </Modal>
);

}