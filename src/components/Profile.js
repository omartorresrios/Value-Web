import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import { Route } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserFullname: '',
      userId: '',
      userFullname: '',
      userPosition: '',
      userJobDescription: '',
      position: '',
      job_description: '',
      receivedReviews: [],
      sentReviews: [],
      isInEditMode: false,
      isReceivedReviewButtonActive: false
    };
    this.retrievingUsersInfo = this.retrievingUsersInfo.bind(this);
  }

  retrievingUsersInfo() {
    let currentUserData = JSON.parse(sessionStorage.getItem("userData"));
    let currentUserFullname = currentUserData.data.fullname
    console.log("currentUserFullname: " + currentUserFullname);

    let userFullname = this.props.location.state.userFullnameFromHome;
    let userId = this.props.location.state.userIdFromHome;
    let userPosition = this.props.location.state.userPositionFromHome;
    let userJobDescription = this.props.location.state.userJobDescriptionFromHome;

    this.setState({
      currentUserFullname: currentUserFullname,
      userFullname: userFullname,
      userId: userId,
      userPosition: userPosition,
      userJobDescription: userJobDescription
    });

    this.retrievingReceivedReviews(userId)
    this.retrievingSentReviews(userId)
  }

  retrievingReceivedReviews(userId) {
    let url = "http://localhost:3000/api/" + userId + "/received_reviews"
    this.retrievingReviews(url, (reviews) => {
      console.log("received reviews: " + JSON.stringify(reviews))
      this.setState({ receivedReviews: reviews })
    });
  }

  retrievingSentReviews(userId) {
    let url = "http://localhost:3000/api/" + userId + "/sent_reviews"
    this.retrievingReviews(url, (reviews) => {
      console.log("sent reviews" + JSON.stringify(reviews))
      this.setState({ sentReviews: reviews })
    });

  }

  retrievingReviews(url, completion) {
    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);

      axios.get(url, { headers: { Authorization: userToken } }).then(response => {
        completion(response.data)
      }).catch((error) => {
        console.log("Cannot retrieve reviews");
      });
    }
  }

  componentDidMount() {
    console.log("props values: " + JSON.stringify(this.props));
    this.retrievingUsersInfo();
  }

  componentWillReceiveProps(nextProps) {
    console.log("userFullname: nextProps.location.state.userFullnameFromHome: " + nextProps.location.state.userFullnameFromHome)
    console.log("userId: nextProps.location.state.userIdFromHome: " + nextProps.location.state.userIdFromHome)
    console.log("userPosition: nextProps.location.state.userPositionFromHome " + nextProps.location.state.userPositionFromHome)
    console.log("userJobDescription: nextProps.location.state.userJobDescriptionFromHome: " + nextProps.location.state.userJobDescriptionFromHome)



    if (this.props.match.params.fullname !== nextProps.match.params.fullname) {
      this.setState({
        userFullname: nextProps.location.state.userFullnameFromHome,
        userId: nextProps.location.state.userIdFromHome,
        userPosition: nextProps.location.state.userPositionFromHome,
        userJobDescription: nextProps.location.state.userJobDescriptionFromHome
      });

    } else {
      console.log("Can't render the same user profile!");
    }
  }

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  updateComponentValue = () => {
    this.setState({
      isInEditMode: false,
      userPosition: this.refs.thePositionTextInput.value,
      userJobDescription:this.refs.theJobDescriptionTextInput.value
    })

    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);
      let currentUserId = data.data.id

      axios.patch("http://localhost:3000/api/"+currentUserId+"/edit", {
        position: this.refs.thePositionTextInput.value,
        job_description: this.refs.theJobDescriptionTextInput.value
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

  renderEditView = () => {
    return <div>
      <input
        type="text"
        defaultValue={this.state.userPosition}
        ref="thePositionTextInput"
      />
      <input
        type="text"
        defaultValue={this.state.userJobDescription}
        ref="theJobDescriptionTextInput"
      />
      <button onClick={this.changeEditMode}>X</button>
      <button onClick={this.updateComponentValue}>OK</button>
      {this.showReviews()}
    </div>
  }

  renderDefaultView = () => {
    return <div>
      <div onDoubleClick={this.changeEditMode}>Position: {this.state.userPosition}</div>
      <div onDoubleClick={this.changeEditMode}>Job Description: {this.state.userJobDescription}</div>

      <button onClick={this.handleShowReceivedReviews}>Received reviews</button>
      <button onClick={this.handleShowSentReviews}>Sent reviews</button>
      {this.state.isReceivedReviewButtonActive ? this.showReceivedReviews() : this.showSentReviews()}
    </div>
  }

  handleShowReceivedReviews = () => {
    this.setState({ isReceivedReviewButtonActive: true })
  }

  handleShowSentReviews = () => {
    this.setState({ isReceivedReviewButtonActive: false })
  }

  showReceivedReviews() {
    return (
      <div>
        Received reviews: <ReviewItem data = {this.state.receivedReviews}/>
      </div>
    );
  }

  showSentReviews() {
    return (
      <div>
        Sent reviews: <ReviewItem data = {this.state.sentReviews}/>
      </div>
    );
  }

  render() {
      return this.state.isInEditMode ?
      this.renderEditView() : this.renderDefaultView()
  }
};

export default Profile;
