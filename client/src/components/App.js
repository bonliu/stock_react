import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Portfolio from './Portfolio';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Register}></Route>
        <Route path="/portfolio" component={Portfolio}></Route>
      </Switch>
    </Router>
  );
}

export default App;
