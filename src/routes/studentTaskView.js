import React from 'react'
import Header from '../components/student_header'
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
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import {getAllTaskListThunkStudent} from '../actions/task'
import { selectTaskList } from '../slices/taskSlice';
import {useParams} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box'
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
        Typography: {
            marginTop: theme.spacing(2),
            flex:1,
          },
          Paper:{
              padding: theme.spacing(5),
          },
          
        }));

export default function StudentTaskView(){
    const dispatch = useDispatch();
    const taskList = useSelector(selectTaskList)
    const {uid} = useParams();
    const classes = useStyles();
    React.useEffect(()=>{
            dispatch(getAllTaskListThunkStudent(uid));
      },[]);
      
    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="Task List" sections={sections}/>
            <Paper className = {classes.Paper}>
              <Toolbar>
            <Typography component="h2" variant="h5" color="primary" gutterBottom className={classes.Typography}>
                Task list from the professor
            </Typography>
            </Toolbar>  
            <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Completion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList.map((row,idx) => (
                <TableRow hover={true} key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.deadline.split('T')[0]}</TableCell>
                  <TableCell>{row.details}</TableCell>
                  <TableCell>{row.assigned_to?row.assigned_to:'-'}</TableCell>
              <TableCell><LinearProgress variant="determinate" value={row.completion}/><Box textAlign="right" m={1}>{row.completion}%</Box></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           
          </Paper>
        </Container>
        </React.Fragment>
    
    )
}