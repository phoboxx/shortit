import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

const Home = () => {
  return (
    <Fragment>
      <h1>This is home</h1>
    </Fragment>
  );
};

const ShortURL = () => {
  return (
    <Fragment>
      <h1>This is ShortURL</h1>
    </Fragment>
  );
};

export default App;
