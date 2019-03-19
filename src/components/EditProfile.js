import React from 'react';
import axios from 'axios';

class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: '',
      job_description: ''
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
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

  render() {
      return (
        <div>
          <form onSubmit={this.updateProfile} method="post">
            <input name="position" onChange={this.onChange} value={this.state.position} type="text" placeholder="position"/>
            <input name="job_description" onChange={this.onChange} value={this.state.job_description} type="text" placeholder="job_description"/>
            <input type="submit" value="Post" className="button" onClick={this.updateProfile}/>
          </form>
        </div>
      )
    }
};
export default EditProfile;
