import React, { Component } from 'react';
import ReviewGroup from '../containers/ReviewGroup';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import '../styles/vendors/normalize.css';
import '../styles/vendors/skeleton.css';
import '../styles/Home.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("userData")) {

    } else {
      this.setState({redirect: true});
    }
  }

  logout() {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({redirect: true});
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/signin'}/>)
    }

    return (
      <div className="Home">
        <Header />
        <h3>THIS IS HOME</h3>
        <ReviewGroup />
        <button type='button' onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
