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
import {getProfName} from '../actions/settings'
import {useParams,useRouteMatch} from 'react-router-dom';

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
  { title: 'Research Assistants', url: '/home' },
  { title: 'Tasks', url: '/tasks' },
  { title: 'Settings', url: '/settings' },]
export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const dispatch = useDispatch();
  const {uid} = useParams();
  const pinfo = useSelector(selectInfo);
  const match = useRouteMatch();

  React.useEffect(()=>{
    dispatch(getProfName(uid));
  },[]);
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small"><Link color="inherit" href='/student/login'>Student's Portal</Link></Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Professor Dashboard
        </Typography>
        <Button variant="outlined" size="small">
          { pinfo.name }
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={`/professor/${uid}${section.url}`}
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