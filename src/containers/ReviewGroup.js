import React from 'react';
import ReviewItem from '../components/ReviewItem';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SearchContainer from '../components/SearchContainer';
import UserList from '../components/UserList';

class ReviewGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      users: [],
      body: '',
      value: '',
      redirect: false,
      userReceiverId: '',
      userReceiverFullname: '',
    };
    this.getUserFeed = this.getUserFeed.bind(this);
    this.retrieveUserId = this.retrieveUserId.bind(this);
    this.logout = this.logout.bind(this);
    this.feedUpdate = this.feedUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("userData")) {
      this.getUserFeed();
    } else {
      this.setState({redirect: true});
    }
  }

  logout() {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({redirect: true});
  }

  feedUpdate(e) {
    e.preventDefault();
    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);

      if (this.state.body) {
        axios.post("http://localhost:3000/api/"+this.state.userReceiverId+"/write_review", {
          body: this.state.body,
          value: this.state.value
        }, { headers: { Authorization: userToken } }).then(response => {
          // If request is good...
          console.log("Review sended!: " + JSON.stringify(response.data));
          let K = [response.data].concat(this.state.data);
          console.log("Feed concatenated: " + JSON.stringify(K));
          this.setState({data: K, body: '', value: ''});
        })
        .catch((error) => {
          console.log('error 3 ' + error);
        });
      }
    }
  }

  getUserFeed() {

    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);

      axios.get('http://localhost:3000/api/all_reviews', { headers: { Authorization: userToken } }).then(response => {
        // If request is good...
        console.log(response.data);
        this.setState({data: response.data});
      })
      .catch((error) => {
        console.log('error 3 ' + error);
      });
    }


  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  retrieveUserId(id, fullname) {
    this.setState({userReceiverId: id, userReceiverFullname: fullname});
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/signin'}/>)
    }

    return (
      <div className="ReviewGroup__root">

        <SearchContainer getClickedUserId={this.retrieveUserId}/>
        Para: <b>{this.state.userReceiverFullname}</b>
        <form onSubmit={this.feedUpdate} method="post">
          <input name="body" onChange={this.onChange} value={this.state.body} type="text" placeholder="body"/>
          <input name="value" onChange={this.onChange} value={this.state.value} type="text" placeholder="value"/>
          <input type="submit" value="Post" className="button" onClick={this.feedUpdate}/>
        </form>
        <ReviewItem data = {this.state.data}/>
        <button type='button' onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default ReviewGroup;
