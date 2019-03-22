import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import { Route } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserId: '',
      currentUserAuthToken: '',
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

  componentDidMount() {
    this.retrievingUsersInfo();
  }

  retrievingUsersInfo() {
    let currentUserData = JSON.parse(sessionStorage.getItem("userData"));
    let auth_token = currentUserData.data.authentication_token
    const userToken = 'Token token='.concat(auth_token);

    this.setState({
      currentUserId: currentUserData.data.id,
      currentUserAuthToken: userToken
    })

    let userFullname = this.props.location.state.userFullname;
    let userId = this.props.location.state.userId;
    let userPosition = this.props.location.state.userPosition;
    let userJobDescription = this.props.location.state.userJobDescription;

    this.userSetStateProperties(userFullname, userId, userPosition, userJobDescription)
    this.retrievingReceivedReviews(userId)
    this.retrievingSentReviews(userId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.fullname !== nextProps.match.params.fullname) {
      let nextUserFullname = nextProps.location.state.userFullname
      let nextUserId = nextProps.location.state.userId
      let nextUserPosition = nextProps.location.state.userPosition
      let nextUserJobDescription = nextProps.location.state.userJobDescription
      this.userSetStateProperties(nextUserFullname, nextUserId, nextUserPosition, nextUserJobDescription)
      this.retrievingReceivedReviews(nextUserId)
      this.retrievingSentReviews(nextUserId)
    } else {
      console.log("Can't render the same user profile!");
    }
  }

  userSetStateProperties = (userFullname, userId, userPosition, userJobDescription) => {
    this.setState({
      userFullname: userFullname,
      userId: userId,
      userPosition: userPosition,
      userJobDescription: userJobDescription
    });
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

  renderEditView = () => {
    return <div>
      <input type="text" defaultValue={this.state.userPosition} ref="thePositionTextInput"/>
      <input type="text" defaultValue={this.state.userJobDescription} ref="theJobDescriptionTextInput"/>
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
      {this.showReviews()}
    </div>
  }

  changeEditMode = () => {
    this.setState({ isInEditMode: !this.state.isInEditMode })
  }

  updateComponentValue = () => {
    this.setState({
      isInEditMode: false,
      userPosition: this.refs.thePositionTextInput.value,
      userJobDescription:this.refs.theJobDescriptionTextInput.value
    })

    if (sessionStorage.getItem("userData")) {
      axios.patch("http://localhost:3000/api/"+this.state.currentUserId+"/edit", {
        position: this.refs.thePositionTextInput.value,
        job_description: this.refs.theJobDescriptionTextInput.value
      }, { headers: { Authorization: this.state.currentUserAuthToken } }).then(response => {
        // If request is good...
        console.log("user profile updated!: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log('error 3 ' + error);
      });
    } else {
      console.log("Debes loggearte para actualizar tu perfil");
    }
  }

  handleShowReceivedReviews = () => {
    this.setState({ isReceivedReviewButtonActive: true })
  }

  handleShowSentReviews = () => {
    this.setState({ isReceivedReviewButtonActive: false })
  }

  showReviews = () => {
    return (<div>{this.state.isReceivedReviewButtonActive ? this.showReceivedReviews() : this.showSentReviews()}</div>);
  }

  showReceivedReviews() {
    return (<div>Received reviews: <ReviewItem data = {this.state.receivedReviews}/></div>);
  }

  showSentReviews() {
    return (<div>Sent reviews: <ReviewItem data = {this.state.sentReviews}/></div>);
  }

  render() {
      return this.state.isInEditMode ?
      this.renderEditView() : this.renderDefaultView()
  }
};

export default Profile;
