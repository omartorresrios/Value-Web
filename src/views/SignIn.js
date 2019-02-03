import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css';

class SignIn extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false
    };
    this.signin = this.signin.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  signin() {
    console.log("data: " + JSON.stringify(this.state));

    if (this.state.email && this.state.password) {
      axios.post('http://localhost:3000/api/users/signin', {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        if (response.data) {
          sessionStorage.setItem('userData', response);
          this.setState({redirect: true});
        } else {
          console.log("SignUp error");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/'}/>)
    }

    if (sessionStorage.getItem("userData")) {
      return (<Redirect to={'/'}/>)
    }
    return (
      <div className="sign-in__root container">
        <div className="row">
          <div className="six columns offset-by-three">
            <div className="SignIn__form-wrapper">
              <h2>SignIn</h2>

              <input name="email" placeholder="email" onChange={this.onChange}/>
              <input name="password" placeholder="password" onChange={this.onChange}/>
              <button onClick={this.signin}>SignIn</button>
              <Link to="/signup">Go to SignUp</Link>
            </div>
          </div>
        </div>
      </div>
    );

  };
};

export default SignIn;
