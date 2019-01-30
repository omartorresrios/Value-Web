import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import SignUp from '../views/SignUp';
import SignIn from '../views/SignIn';

import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Profile from '../components/Profile';

export default (
  <BrowserRouter>
    <div>
      <MainLayout>
        <Route exact component={Home}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/profile" component={Profile}/>
      </MainLayout>
    </div>
  </BrowserRouter>
);
