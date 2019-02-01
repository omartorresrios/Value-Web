import React from 'react';
import { Router, Route, HashRouter } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import App from '../components/App';
import Profile from '../components/Profile';

export default (
  <HashRouter>
    <Route path="/" component={MainLayout}>
      <Route component={App} />
      <Route path="/profile" component={Profile} />
    </Route>
  </HashRouter>
);
