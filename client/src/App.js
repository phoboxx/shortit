import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import ShortURL from './Components/ShortURL';

function App() {
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <Router>
      <Switch>
        <Route path='/' exact children={<Home api={API_URL} />} />
        <Route path='/' children={<ShortURL api={API_URL} />} />
      </Switch>
    </Router>
  );
}

export default App;
