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
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import { selectInfo } from '../slices/infoSlice'; 
import {getGraListThunk, addGra, deleteGra, editGra} from '../actions/ra'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import {useParams} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import {Degree,Majors} from './professor';
import {getProfNameNoThunk} from '../actions/settings';
import {getTaskListThunkStudent} from '../actions/task';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { selectTaskList } from '../slices/taskSlice';
const useStyles = makeStyles(theme => ({
    Typography:{
      marginTop:theme.spacing(1),
    },
    Chip:{
      margin:theme.spacing(1)
    },
    Paper:{
        padding: theme.spacing(5),
        margin: theme.spacing(4),
    },
}));


const sections = [
    { title: 'Research Assistants', url: '#' },
    { title: 'Tasks', url: '#' },
    { title: 'Settings', url: '#' },]

export default function StudentHome(){
const dispatch = useDispatch();
const classes = useStyles();
const {uid} = useParams();
const info = useSelector(selectInfo);
const taskList = useSelector(selectTaskList);
const [profInfo,setProfInfo] = React.useState({name:''});
const [sliderVal, setSliderVal] =React.useState([]);
const loadProfInfo = async ()=>{
  const pinfo = await getProfNameNoThunk(info.created_by);
  setProfInfo(pinfo[0]);
}
React.useEffect(()=>{
  dispatch(getTaskListThunkStudent(uid));
  if(info.created_by)
  loadProfInfo();
},[info.name]);
const handleSliderChange = name => (e, value) => {
  setSliderVal({ ...sliderVal,
    [name]: value
  });
}
const update =()=>{
  console.log(sliderVal);
}
return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
        <Header title="Student Dashboard" sections={sections}/>
        <Paper className = {classes.Paper}>
        <Typography variant="h4" color= "primary" component="h4">
        {info.name}
     
        </Typography>
        <Box>
        <Chip icon={<FaceIcon/>} color="primary" className={classes.Chip} variant= "outlined" label={info.skills}/>
        </Box>
        <Box>
        <Chip icon={<SchoolIcon/>} className={classes.Chip} variant= "outlined" label= {Degree[info.degree]}/>
        <Chip icon={<AssessmentIcon/>} className={classes.Chip} variant= "outlined" label={Majors[info.major]}/>
        </Box>
       <Box>
       <Chip icon={<PersonIcon/>} className={classes.Chip} variant= "outlined" label= {"Professor : "+ profInfo.name}/>
         </Box>
        </Paper>
        <Button variant="contained" onClick={update}>Update</Button>
        {taskList.map((row)=>(
        <Paper className = {classes.Paper} key={row.id}>
      <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5">
              {row.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {"Deadline : "+row.deadline.split('T')[0]}
            </Typography>
          </Grid>
        </Grid>
          <Divider/>
          <Typography className={classes.Typography} color="textSecondary" variant="body2">
            {row.details}
        </Typography>
        <Divider/>
        <Typography gutterBottom>
            {"Percentage Completion: " }
        </Typography>
        <Slider
        defaultValue={30}
        id = {row.id}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        onChange={handleSliderChange(row.id)}
        max={100}
      />
            </Paper>
        ))}

    </Container>
    </React.Fragment>
);

}