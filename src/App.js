import React from 'react';
import Login from './routes/login';
import Professor from './routes/professor';
import TaskView from './routes/taskView';
import SettingsProfessor from './routes/settingsProfessor'
import StudentHome from './routes/studentHome'
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Switch>
    <Route exact path="/professor/:uid/home" component={Professor}/>
    <Route exact path= "/professor/:uid/tasks" component= {TaskView}/>
    <Route exact path= "/professor/:uid/settings" component= {SettingsProfessor}/>
    <Route exact path= "/student/:uid" component= {StudentHome}/>
    <Route exact path="/login" component={Login}/>
    </Switch>  
  );
}

export default App;
