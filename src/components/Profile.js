import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserFullname: '',
      userFullname: ''
    };

    this.showing = this.showing.bind(this);
  }

  showing() {
    let currentUserData = JSON.parse(sessionStorage.getItem("userData"));
    let currentUserFullname = currentUserData.data.fullname
    console.log("currentUserFullname: " + currentUserFullname);

    let userFullname = this.props.location.state.userFullnameFromHome;

    console.log("userFullname: " + userFullname);

    console.log("this.props.location.state: " + this.props.location.state.userFullnameFromHome);
    this.setState({ currentUserFullname: currentUserFullname, userFullname: userFullname });
  }

  componentWillMount() {
    this.showing();
  }

  render() {
    if (this.state.currentUserFullname == this.state.userFullname) {
      return (
        <div>This is your profile {this.state.userFullname}</div>
      );
    } else {
      return (
        <div>Hi, {this.state.userFullname}</div>
      )
    }
  }
};

export default Profile;
