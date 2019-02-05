import React from 'react';
import { PostData } from '../components/PostData';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class SignUp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      fullname: '',
      department_id: '',
      company_id: '',
      redirect: false
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  signup() {
    console.log("data: " + JSON.stringify(this.state));

    if (this.state.email && this.state.password && this.state.fullname && this.state.department_id && this.state.company_id) {
      axios.post('http://localhost:3000/api/users/signup', {
        email: this.state.email,
        password: this.state.password,
        fullname: this.state.fullname,
        department_id: this.state.department_id,
        company_id: this.state.company_id
      })
      .then((response) => {
        if (response.data) {
          sessionStorage.setItem('userData', JSON.stringify(response));
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

    if (this.state.redirect || sessionStorage.getItem("userData")) {
      return (<Redirect to={'/'}/>)
    }

    return (
      <div>
        <h2>Signup1</h2>

        <input type="text" name="fullname" placeholder="fullname" onChange={this.onChange}/>
        <input type="text" name="email" placeholder="email" onChange={this.onChange}/>
        <input type="text" name="password" placeholder="password" onChange={this.onChange}/>
        <input type="text" name="department_id" placeholder="department" onChange={this.onChange}/>
        <input type="text" name="company_id" placeholder="company" onChange={this.onChange}/>
        <input type="submit" value="Sign Up" onClick={this.signup}/>


      </div>
      );
    };
};

export default SignUp;
