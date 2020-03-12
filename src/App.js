import React from 'react';
import Login from './routes/login';
import Professor from './routes/professor'
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Switch>
    <Route path="/professor" component={Professor}/>
    <Route path="/login" component={Login}/>
    </Switch>  
  );
}

export default App;
