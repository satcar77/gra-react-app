import React from 'react'
import Header from '.././components/header'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {selectInfo,dataUpdated} from '../slices/infoSlice';
import {editProfName} from '../actions/settings';
import {useParams} from 'react-router-dom';
const useStyles = makeStyles(theme => ({

  Typography: {
      marginTop: theme.spacing(2),
    },
    Paper:{
        padding: theme.spacing(5),
    },
    Button:{
        marginTop: theme.spacing(2),
    }
  }));



export default function SettingsProfessor(){
    const classes = useStyles();
    const [name,setName] = React.useState('');
    const pinfo = useSelector(selectInfo);
    const dispatch = useDispatch();
    const {uid} = useParams();
    const handleSubmit = async ()=>{
        const data = {id : uid , name : name };
        if (pinfo.name != name)
        try{
        await editProfName(data);
        }catch(e){
            console.log(e);
            alert("Update Failed!")
            return
        }
        dispatch(dataUpdated(data));
    }
    const handleChange = (e)=>{
        setName(e.target.value);
    }
    React.useEffect(()=>{
           setName(pinfo.name);
      },[pinfo.name]);
return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
        <Header/>
        <Paper className = {classes.Paper}>
        <Typography component="h2" variant="h5" color="primary" gutterBottom className={classes.Typography}>Personal Settings</Typography>  
<Typography component="h6" variant="h6" gutterBottom className={classes.Typography}>Your professor ID is {uid}</Typography>  
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Full Name"
            name="name"
            value = {name}
            onChange = {handleChange}
            autoFocus
          />
    <Button variant="contained" disabled= {name.length == 0} className={classes.Button} onClick={handleSubmit}>Update</Button>
      </Paper>
    </Container>
    </React.Fragment>
);

}