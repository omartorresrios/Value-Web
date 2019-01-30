import React from 'react';
import { Route, BrowserRouter, browserHistory } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import App from '../components/App';
import Profile from '../components/Profile';

export default (
  <BrowserRouter history={browserHistory}>
    <div>
      <MainLayout>
        <Route exact component={App}/>
        <Route path="/profile" component={Profile}/>
      </MainLayout>
    </div>
  </BrowserRouter>
);
