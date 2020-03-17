import React from 'react'
import Header from '../components/student_header'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector, useDispatch } from 'react-redux';
import { selectInfo } from '../slices/infoSlice'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import {Degree,Majors} from './professor';
import {getProfNameNoThunk} from '../actions/settings';
import {getTaskListThunkStudent,studentUpdateCompletion} from '../actions/task';
import {updateStatus} from '../actions/ra';
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
    Button:{
      marginLeft: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    Button2:{
      marginTop:theme.spacing(2),
    },
    Divider:{
      marginRight:theme.spacing(3),
    },
    Slider:{
      marginTop:theme.spacing(2),
    }
}));


export default function StudentHome(){
const dispatch = useDispatch();
const classes = useStyles();
const {uid} = useParams();
const info = useSelector(selectInfo);
const taskList = useSelector(selectTaskList);
const [profInfo,setProfInfo] = React.useState({name:''});
const [sliderVal, setSliderVal] =React.useState([]);
const [status,setStatus] = React.useState('');
const loadProfInfo = async ()=>{
  const pinfo = await getProfNameNoThunk(info.created_by);
  setProfInfo(pinfo[0]);
}
React.useEffect(()=>{
  dispatch(getTaskListThunkStudent(uid));
  updateCompletion();
  if(info.created_by){
    loadProfInfo();
    setStatus(info.status);
  }
},[info.name,taskList.length]);
const handleSliderChange = name => (e, value) => {
  setSliderVal({ ...sliderVal,
    [name]: value
  });
}
const updateCompletion= ()=>{
  const l={};
  taskList.map((row)=>{
    l[row.id]=row.completion; 
  })
  setSliderVal(l);
}
const update =async ()=>{
  try{
  await studentUpdateCompletion(sliderVal);
  alert("Update Success!")
}
  catch(err){
    console.log(err)
      alert("Update Failed!")
  }
}
const onChangedStatus=(e)=>{
  setStatus(e.target.value);
}
const updateStatusClick =async()=>{
  try{
    await updateStatus({id:uid,status:status});
    alert("Update Success!")
    
  }
  catch(err){
    console.log(err)
    alert("Update Failed!");
  }
}
return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
        <Header/>
        <Paper className = {classes.Paper}>
        <Typography variant="h4" color= "primary" component="h4">
        {info.name}
        </Typography>
        <Grid container justify="space-between">
        <Grid item xs>
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
         </Grid>
         <Divider className={classes.Divider} orientation="vertical" flexItem />
         <Grid item xs>
        <TextField name="status" multiline rows="3" label="Status" onChange={onChangedStatus} value={status} fullWidth variant="outlined"/>
        <Button variant="contained" className={classes.Button2} onClick={updateStatusClick}>Update Status</Button>
           </Grid>
         </Grid>
        </Paper>
        {taskList.map((row)=>(
        <Paper className = {classes.Paper} key={row.id}>
      <Grid container alignItems="center">
          <Grid item xs>
            <Typography color="primary" gutterBottom variant="h5">
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
        <Slider
        className={classes.Slider}
        defaultValue={0}
        id = {row.id}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={5}
        value={sliderVal[row.id] ? sliderVal[row.id] : 0}
        marks
        min={0}
        onChange={handleSliderChange(row.id)}
        max={100}
      />
          <Typography variant="h6" gutterBottom>
            {sliderVal[row.id]?sliderVal[row.id]:0}% completed
        </Typography>
            </Paper>
        ))}
        <Button variant="contained" className={classes.Button} onClick={update}>Update Progress</Button>


    </Container>
    </React.Fragment>
);

}