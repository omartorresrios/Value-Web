import React from 'react';
import { PostData } from '../components/PostData';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class SignUpPersonalData extends React.Component {
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
    this.Continue = this.Continue.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  Continue() {

    if (this.state.email && this.state.password && this.state.fullname) {
      this.setState({redirect: true});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    if (this.state.redirect || sessionStorage.getItem("userData")) {
      return (<Redirect to={{ pathname: '/signup/company_data', state: { fullname: this.state.fullname, email: this.state.email, password: this.state.password } }} />)
    }

    return (
      <div>
        <h2>Regístrate</h2>
        <input type="text" name="fullname" placeholder="fullname" onChange={this.onChange}/>
        <input type="text" name="email" placeholder="Correo" onChange={this.onChange}/>
        <input type="text" name="password" placeholder="Contraseña" onChange={this.onChange}/>
        <input type="submit" value="Continuar" onClick={this.Continue}/>
      </div>
      );
    };
};

export default SignUpPersonalData;
