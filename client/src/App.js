import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import ShortURL from './Components/ShortURL';

function App() {
  const API_URL = 'http://127.0.0.1:3000/api/shortit';
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
