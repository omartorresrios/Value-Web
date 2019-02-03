import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Profile from '../components/Profile';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import NotFound from '../components/NotFound';

const createRoutes = (props) => {
  return (
    <Router>
      <MainLayout>
        <Route exact path="/" component={Home}/>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
      </MainLayout>
    </Router>
  );
};

export default createRoutes;
