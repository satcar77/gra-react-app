import React from 'react'
import Header from '.././components/header'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import { selectGAList } from '.././slices/graSlice'; 
import {getGraListThunk, addGra, deleteGra, editGra} from '../actions/ra'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  Modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  Typography: {
      marginTop: theme.spacing(2),
      flex:1,
    },
    Paper:{
        padding: theme.spacing(5),
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

export const Majors = ['Computer Science','Earth Science']
export const Degree = ['Masters','PhD']

const sections = [
    { title: 'Research Assistants', url: '#' },
    { title: 'Tasks', url: '#' },
    { title: 'Settings', url: '#' },]

export default function Professor(){
const dispatch = useDispatch();
const gaList = useSelector(selectGAList);
const [open,setOpen] = React.useState(false);
const [selection, setSelection] = React.useState({});
const classes = useStyles();
const {uid} = useParams();
React.useEffect(()=>{
  dispatch(getGraListThunk(uid));
},[]);

const handleOpen=()=>{
  setOpen(true);
}
const handleClose=()=>{
  setOpen(false);
}

const handleEditClick=(idx)=>{
    setSelection(gaList[idx]);
    handleOpen();
}
const handleAddNew=()=>{
  setSelection({name:'',major:0,degree:0,skills:0,profid:uid});
  handleOpen();
}
const handleChange=(event)=>{
  setSelection({...selection,[event.target.name]: event.target.value});
}
const handleSubmit= async(e)=>{
  e.preventDefault();
  if (selection.id === undefined)
    await addGra(selection);
  else
    await editGra(selection);
  handleClose();
  dispatch(getGraListThunk(uid));
}
const handleDelete= async(idx)=>{
  await deleteGra(gaList[idx].id);
  dispatch(getGraListThunk(uid));
}
return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
        <Header title="Title" sections={sections}/>
        <Paper className = {classes.Paper}>
          <Toolbar>
        <Typography component="h2" variant="h5" color="primary" gutterBottom className={classes.Typography}>
            GRA List
        </Typography>
        <Button className= {classes.addRAButton} variant="contained" onClick={handleAddNew}>ADD NEW RA</Button>
        </Toolbar>  
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Major</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gaList.map((row,idx) => (
            <TableRow hover={true} key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{Degree[row.degree]}</TableCell>
              <TableCell>{Majors[row.major]}</TableCell>
              <TableCell>{row.skills}</TableCell>
              <TableCell align="right">
                <IconButton onClick={()=>handleEditClick(idx)}>
                <EditOutlinedIcon/>
                </IconButton>
                <IconButton onClick={()=>handleDelete(idx)}>
                <DeleteOutlineOutlinedIcon/>
                </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <Modal
      className={classes.Modal}
      open={open}
      onClose = {handleClose}
    >
             <div className={classes.ModalInside}>
    <h2>{selection.id === undefined ? "Add New RA" : "Edit RA"}</h2>
    <form className={classes.Form} noValidate autoComplete="off">
            <TextField name= "name" label="Name" value ={selection.name || ''} onChange={handleChange} variant="outlined" />
            <TextField name="degree" label="Degree" value ={selection.degree } onChange={handleChange} select variant="outlined">
            {Degree.map((option,idx) => (
            <MenuItem key={idx} value={idx}>
              {option}
            </MenuItem>
          ))}
                </TextField>
            <TextField name="major" label="Major" value ={selection.major} onChange={handleChange} select variant="outlined">
            {Majors.map((option,idx) => (
            <MenuItem key={idx} value={idx}>
              {option}
            </MenuItem>
          ))}
                </TextField>
            <TextField name="skills" label="Skills" value={selection.skills || ''} onChange={handleChange} variant="outlined" />
            <Button variant="contained" onClick={handleSubmit}>{selection.id === undefined ? "Add" : "Update"}</Button>
    </form>
    </div>
          </Modal>
      </Paper>
    </Container>
    </React.Fragment>
);

}