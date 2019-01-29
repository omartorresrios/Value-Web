import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={App}/>
      <Route path="/profile" component={Profile}/>
    </div>
  </Router>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
