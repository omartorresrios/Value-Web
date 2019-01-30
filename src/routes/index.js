import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Profile from '../components/Profile';

export default (
  <BrowserRouter history={browserHistory}>
    <div>
      <MainLayout>
        <Route exact component={Home}/>
        <Route path="/profile" component={Profile}/>
      </MainLayout>
    </div>
  </BrowserRouter>
);
