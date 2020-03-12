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
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import CustomModal from '.././components/modal'
import { ADDRGETNETWORKPARAMS } from 'dns';
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }
const rows = [
createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];
const useStyles = makeStyles(theme => ({
    Typography: {
      marginTop: theme.spacing(2),
      flex:1,
    },
    Paper:{
        padding: theme.spacing(5),
    },
  }));
export default function Professor(){
  const [open, setOpen] = React.useState(false);
    const classes = useStyles();
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
const handleOpen=()=>{
  setOpen(true);
}
const state = {
  'open' : open,
  'setOpen':setOpen,
  'title': "Add new RA",
  'data': rows[0],
  'buttonText': "Add"
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
        <Button className= {classes.addRAButton} variant="contained" onClick={handleOpen}>ADD NEW RA</Button>
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
          {rows.map(row => (
            <TableRow hover={true} key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">
                <EditOutlinedIcon/>
                <DeleteOutlineOutlinedIcon />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          <CustomModal state = {state}/>
      </Paper>
    </Container>
    </React.Fragment>
);

}