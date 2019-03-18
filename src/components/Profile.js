import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserFullname: '',
      userFullname: '',
      userId: '',
      position: '',
      job_description: ''
    };

    this.retrievingUsersInfo = this.retrievingUsersInfo.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  retrievingUsersInfo() {
    let currentUserData = JSON.parse(sessionStorage.getItem("userData"));
    let currentUserFullname = currentUserData.data.fullname
    console.log("currentUserFullname: " + currentUserFullname);

    let userFullname = this.props.location.state.userFullnameFromHome;
    let userId = this.props.location.state.userIdFromHome;

    console.log("userFullname: " + userFullname);

    console.log("this.props.location.state: " + this.props.location.state.userFullnameFromHome);
    this.setState({ currentUserFullname: currentUserFullname, userFullname: userFullname, userId: userId });

    this.retrievingReceivedReviews(userId)
    this.retrievingSentReviews(userId)
  }

  retrievingReceivedReviews(userId) {
    let url = "http://localhost:3000/api/" + userId + "/received_reviews"
    this.retrievingReviews(url)
  }

  retrievingSentReviews(userId) {
    let url = "http://localhost:3000/api/" + userId + "/sent_reviews"
    this.retrievingReviews(url)
  }

  retrievingReviews(url) {
    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);

      axios.get(url, { headers: { Authorization: userToken } }).then(response => {
        // If request is good...

        // this.setState({users: response.data});
        console.log("Successfully retrieve of reviews: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("Cannot retrieve reviews");
      });

    }
  }

  componentWillMount() {
    this.retrievingUsersInfo();
  }

  updateProfile(e) {
    e.preventDefault();
    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);
      let currentUserId = data.data.id

      if (this.state.position || this.state.job_description) {
        axios.patch("http://localhost:3000/api/"+currentUserId+"/edit", {
          position: this.state.position,
          job_description: this.state.job_description
        }, { headers: { Authorization: userToken } }).then(response => {
          // If request is good...
          console.log("user profile updated!: " + JSON.stringify(response.data));

          console.log("The new profile: " + JSON.stringify(response.data));

        })
        .catch((error) => {
          console.log('error 3 ' + error);
        });
      } else {
        console.log("Debes poner algo");
      }
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    if (this.state.currentUserFullname == this.state.userFullname) {
      return (
        <div>
          <div>This is your profile {this.state.userFullname}</div>
          Edita tu perfil <b>{this.state.userFullname}</b>
          <form onSubmit={this.updateProfile} method="post">
            <input name="position" onChange={this.onChange} value={this.state.position} type="text" placeholder="position"/>
            <input name="job_description" onChange={this.onChange} value={this.state.job_description} type="text" placeholder="job_description"/>
            <input type="submit" value="Post" className="button" onClick={this.updateProfile}/>
          </form>
        </div>


      );
    } else {
      return (
        <div>Hi, {this.state.userFullname}</div>
      )
    }
  }
};

export default Profile;
