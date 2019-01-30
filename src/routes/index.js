import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Profile from '../components/Profile';

const createRoutes = (store) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)
  return (
    <BrowserRouter history={browserHistory}>
      <div>
        <MainLayout>
          <Route exact component={Home}/>
          <Route path="/profile" component={Profile}/>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
};

export default createRoutes;
