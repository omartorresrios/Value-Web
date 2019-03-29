import React from 'react';
import '../styles/MainLayout.css';
import Header from './Header';

class MainLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUserFullname: '',
      currentUserId: '',
      currentUserPosition: '',
      currentUserJobDescription: ''
    };
    this.retrievingCurrentUserInfo = this.retrievingCurrentUserInfo.bind(this);
  }

  componentWillMount() {
    this.retrievingCurrentUserInfo();
  }

  retrievingCurrentUserInfo() {
    let currentUserData = JSON.parse(sessionStorage.getItem("userData"));
    let auth_token = currentUserData.data.authentication_token
    let fullname = currentUserData.data.fullname
    let id = currentUserData.data.id
    let position = currentUserData.data.position
    let jobDescription = currentUserData.data.job_description

    const userToken = 'Token token='.concat(auth_token);

    this.setState({
      currentUserFullname: fullname,
      currentUserId: id,
      currentUserPosition: position,
      currentUserJobDescription: jobDescription
    })

  }

  render() {
    return (
      <div className="main-MainLayout__root">
        <div className="Home">
          <Header fullname={this.state.currentUserFullname} userId={this.state.currentUserId} userPosition={this.state.currentUserPosition} userJobDescription={this.state.currentUserJobDescription} />
        </div>
      </div>
    )
  }

}

export default MainLayout;
