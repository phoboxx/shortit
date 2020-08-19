import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import ShortURL from './Components/ShortURL';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/' component={ShortURL} />
      </Switch>
    </Router>
  );
}

export default App;
