import React from 'react';
import { Router, Route, HashRouter } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Profile from '../components/Profile';

export default (
  <HashRouter>
    <Route path="/" component={MainLayout}>
      <Route component={Home} />
      <Route path="/profile" component={Profile} />
    </Route>
  </HashRouter>
);
