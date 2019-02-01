import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/MainLayout';
import App from './components/App';
import Profile from './components/Profile';

import './styles/index.css';

import { Router, Route, HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={MainLayout}>
      <Route component={App} />
      <Route path="/profile" component={Profile} />
    </Route>


  </HashRouter>,
  document.getElementById('root')
);
