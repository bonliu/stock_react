import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import '../styles/App.css';

import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/signup" component={Register}></Route>
      </Switch>
    </Router>
  );
}

export default App;
