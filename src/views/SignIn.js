import React from 'react';
import SignInForm from '../containers/SignInForm';
import FormDivider from '../components/FormDivider';
import '../styles/SignIn.css';

const SignIn = (props) => (
  <div className="sign-in__root container">
    <div className="row">
      <div className="six columns offset-by-three">
        <div className="SignIn__form-wrapper">
          <SignInForm />
          <FormDivider />
        </div>
      </div>
    </div>
  </div>
);

export default SignIn;
