import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Profile from '../components/Profile';
import SignIn from '../views/SignIn';
import AdminSignIn from '../views/AdminSignIn';
import AdminDashboard from '../components/AdminDashboard';
import SignUpPersonalData from '../views/SignUpPersonalData';
import SignUpCompanyData from '../views/SignUpCompanyData';
import NotFound from '../components/NotFound';
import '../styles/Index.css';


const createRoutes = (props) => {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/admin_dashboard" component={AdminDashboard} />
        <Route path="/signin" component={SignIn} />
        <Route path="/admin_signin" component={AdminSignIn} />
        <Route path="/signup/personal_data" component={SignUpPersonalData} />
        <Route path="/signup/company_data" component={SignUpCompanyData} />
        <Route path="/:fullname" component={Profile} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

export default createRoutes;
