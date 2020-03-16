import React from 'react';
import ProfLogin from './routes/profLogin';
import Professor from './routes/professor';
import TaskView from './routes/taskView';
import SettingsProfessor from './routes/settingsProfessor'
import StudentHome from './routes/studentHome'
import StudentTaskView from './routes/studentTaskView'
import Register from './routes/register'
import StudentLogin from './routes/studentLogin';
import {Switch, Route,Redirect} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Switch>
    <Route exact path="/professor/:uid/home" component={Professor}/>
    <Route exact path= "/professor/:uid/tasks" component= {TaskView}/>
    <Route exact path= "/professor/:uid/settings" component= {SettingsProfessor}/>
    <Route exact path= "/student/:uid/home" component= {StudentHome}/>
    <Route exact path= "/student/:uid/tasks" component= {StudentTaskView}/>
    <Route exact path="/professor/login" component={ProfLogin}/>
    <Route exact path="/professor/register" component={Register}/>
    <Route exact path="/student/login" component={StudentLogin}/>
    <Redirect from="/" to="/professor/login" />


    </Switch>  
  );
}

export default App;
