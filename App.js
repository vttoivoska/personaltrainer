import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Calendarlist from './components/Calendarlist';



function App() {


  return (
    <div className="App">
    <BrowserRouter>
    <Tabs
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Customers" to="/" component={Link} />
        <Tab label="Trainings" to="/trainings" component={Link} />
        <Tab label="Calendar" to="/calendar" component={Link} />
      </Tabs>
      <div>
        <Switch>
          <Route exact path="/" render={() => <Customerlist /> } />
          <Route path="/trainings" render={() => <Traininglist /> } />
          <Route path="/calendar" render={() => <Calendarlist />} />
        </Switch>
      </div>
      </BrowserRouter>     
    </div>

  );
}

export default App;
