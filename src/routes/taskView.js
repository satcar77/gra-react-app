import React from 'react'
import 'date-fns';
import Header from '../components/header'
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import {getGraListThunk} from '../actions/ra'
import {getTaskListThunk, addTask,editTask,deleteTask} from '../actions/task';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { selectGAList } from '../slices/graSlice';
import { selectTaskList } from '../slices/taskSlice';
import {useParams} from 'react-router-dom';
const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },]
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

export default function TaskView(){
    const dispatch = useDispatch();
    const gaList = useSelector(selectGAList)
    const taskList = useSelector(selectTaskList)
    const [open,setOpen] = React.useState(false);
    const {uid} = useParams();
    const [selection, setSelection] = React.useState({name:'',details:'',deadline:new Date()});
    const classes = useStyles();
    React.useEffect(()=>{
        dispatch(getGraListThunk(uid));
        dispatch(getTaskListThunk(uid));
      },[]);
      
    const handleAddNew= ()=>{
        setSelection({name:'',details:'',deadline:new Date(),profid:uid});
        setOpen(true);

    };
    const handleEditClick =(idx)=>{
      setSelection(taskList[idx]);
      setOpen(true);
    };
    const handleChange= (event)=>{
      setSelection({...selection,[event.target.name]: event.target.value});
    };
    const handleDelete= async(idx)=>{
      await deleteTask(taskList[idx].id);
      dispatch(getTaskListThunk(uid));
    };
    const handleSubmit = async ()=>{
      if(selection.id === undefined)
        await addTask(selection);
      else
        await editTask(selection);
        handleClose();
       dispatch(getTaskListThunk(uid));
    };
    const handleClose =()=>{
        setOpen(false)
    };
    const handleDateChange = (date)=>{
        setSelection({...selection,deadline: date});

    }
    const mapIdtoName= (id)=>{
      const search = gaList.find((a)=>a.id == id);
      return search === undefined ? '-': search.name;
    }
    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="Professor Dashboard" sections={sections}/>
            <Paper className = {classes.Paper}>
              <Toolbar>
            <Typography component="h2" variant="h5" color="primary" gutterBottom className={classes.Typography}>
                Task List
            </Typography>
            <Button className= {classes.addRAButton} variant="contained" onClick={handleAddNew}>ADD NEW TASK</Button>
            </Toolbar>  
            <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList.map((row,idx) => (
                <TableRow hover={true} key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.deadline.split('T')[0]}</TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{mapIdtoName(row.assigned_to)}</TableCell>
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
        <h2>{selection.id === undefined ? "Add New Task" : "Edit Task"}</h2>
        <form className={classes.Form} noValidate autoComplete="off">
                <TextField name= "name" label="Name" value ={selection.name || ''} onChange={handleChange} variant="outlined" />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                name = "deadline"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="deadline"
                value={new Date(selection.deadline)}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                </MuiPickersUtilsProvider>
                <TextField name="details" multiline rows ="4"fullWidth label="Details" value ={selection.details } onChange={handleChange} variant="outlined" />
                <TextField name="assigned_to" label="Assigned To" value ={selection.assigned_to || ''} onChange={handleChange} select variant="outlined">
            {gaList.map((row,idx) => (
            <MenuItem key={row.id} value={row.id}>
              {row.name}
            </MenuItem>
          ))}
                </TextField>
                <Button variant="contained" onClick={handleSubmit}>{selection.id === undefined ? "Add" : "Update"}</Button>
        </form>
        </div>
              </Modal>
          </Paper>
        </Container>
        </React.Fragment>
    
    )
}