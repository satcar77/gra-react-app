import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid,Typography,Box,Chip,Divider,LinearProgress } from '@material-ui/core';
import {Degree,Majors} from '../routes/professor';
import FaceIcon from '@material-ui/icons/Face';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SchoolIcon from '@material-ui/icons/School';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
export default function studentProfile(props){
    const {classes,selection,taskList} = props;
    return(
        <React.Fragment>
        <Paper className={classes.Paper}>
         <Typography variant="h4" color= "primary" component="h4">
        {selection.name}
        </Typography>
        <Grid container justify="space-between">
        <Grid item xs>
        <Box>
        <Chip icon={<FaceIcon/>} color="primary" className={classes.Chip} variant= "outlined" label={selection.skills}/>
        <Chip icon={<SchoolIcon/>} className={classes.Chip} variant= "outlined" label= {Degree[selection.degree]}/>
        <Chip icon={<AssessmentIcon/>} className={classes.Chip} variant= "outlined" label={Majors[selection.major]}/>
        </Box>
        <Box>
        </Box>
         </Grid>
         <Divider className={classes.Divider} orientation="vertical" flexItem />
         <Grid item xs>
        
         <Typography variant="h6" color= "primary">
            Student Status
        </Typography>
         <Typography variant="body2" color= "textSecondary">
        {selection.status}
        </Typography>
           </Grid>
         </Grid>
         <Divider className={classes.Divider}/>
         <Table className={classes.Table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Completion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList.map((row,idx) => (
                <TableRow hover={true} key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.deadline.split('T')[0]}</TableCell>
                  <TableCell>{row.details}</TableCell>
              <TableCell><LinearProgress variant="determinate" value={row.completion}/><Box textAlign="right" m={1}>{row.completion}%</Box></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>   
        </Paper>
        </React.Fragment>
    );
}
