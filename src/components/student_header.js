import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { selectInfo } from '.././slices/infoSlice'; 
import { useSelector, useDispatch } from 'react-redux';
import {getStudentName} from '../actions/settings'
import {useParams} from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    overflowX: 'auto',
    marginBottom: theme.spacing(3),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Tasks List', url: '/tasks' },]
export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {uid} = useParams();
  const pinfo = useSelector(selectInfo);
  

  React.useEffect(()=>{
    dispatch(getStudentName(uid));
  },[]);
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small"><Link color="inherit" href='/professor/login'>Professor's Portal</Link></Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Student Dashboard
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          {pinfo.name}
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={`/student/${uid}${section.url}`}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};