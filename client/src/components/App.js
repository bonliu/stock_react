import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import '../styles/App.css';

import Login from './Login';
import Register from './Register';
import Portfolio from './Portfolio';

function App() {
  return (
    <div>
      <h1>Stock Pro</h1>
      <a href="/login">Login</a>
      <br></br>
      <a href="/signup">Signup</a>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signup" component={Register}></Route>
          <Route path="/portfolio" component={Portfolio}></Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
