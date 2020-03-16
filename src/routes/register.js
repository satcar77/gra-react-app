import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import { selectInfo } from '.././slices/infoSlice'; 
import { useSelector, useDispatch } from 'react-redux';
import {addNewProfessor} from '../actions/settings';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://satkardhakal.com.np">
        Satkar Dhakal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const history= useHistory();
  const [id,setId] = useState('Enter your professor id');
  const onLoginClicked=async(e)=>{
    e.preventDefault();
    const res =  await addNewProfessor(id);
    alert(`Your account has been created. Your ID is ${res.id}`);
    history.push(`/professor/${res.id}/home`);
  }
  const onTextChanged=(e)=>{
    setId(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Professor Access Portal
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="Enter your full name"
            name="id"
            autoFocus
            onChange =  {onTextChanged}
          />
    
         
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {onLoginClicked}
          >
           Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            <Link href="/professor/login" variant="body2">
                {"Already have an id? Go back to login"}
              </Link>
            </Grid>
          </Grid>
        
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}