import React from 'react';
import ReviewItem from '../components/ReviewItem';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SearchContainer from '../components/SearchContainer';
import '../styles/ReviewGroup.css'
import '../styles/WriteReview.css'
import ValueSearchBar from '../components/ValueSearch/ValueSearchBar';
import ValueSearchResultsList from '../components/ValueSearch/ValueSearchResultsList';

class ReviewGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      values: [],
      users: [],
      term: '',
      body: '',
      value: '',
      valueId: '',
      valueName: '',
      redirect: false,
      userReceiverId: '',
      userReceiverFullname: '',
      isValueInputSelected: false,
      valuePreventHideDropdown: false,
    };
    this.getUserFeed = this.getUserFeed.bind(this);
    this.getAllValues = this.getAllValues.bind(this);
    this.retrieveUserId = this.retrieveUserId.bind(this);
    this.logout = this.logout.bind(this);
    this.feedUpdate = this.feedUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.valueShowDropdown = this.valueShowDropdown.bind(this);
    this.valueHideDropdown = this.valueHideDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
    this.valueSelected = this.valueSelected.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("userData")) {
      this.getUserFeed();
      this.getAllValues();
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
          value_id: this.state.valueId
        }, { headers: { Authorization: userToken } }).then(response => {
          // If request is good...
          console.log("Review sended!: " + JSON.stringify(response.data));
          let K = [response.data].concat(this.state.reviews);
          console.log("Feed concatenated: " + JSON.stringify(K));
          this.setState({reviews: K, body: '', value: ''});
        })
        .catch((error) => {
          console.log('Cant save the review in the server because: ' + error);
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
        this.setState({reviews: response.data});
      })
      .catch((error) => {
        console.log('Cant get all reviews data because: ' + error);
      });
    }
  }

  getAllValues() {
    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));

      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);

      axios.get('http://localhost:3000/api/' + data.data.company.id + '/all_values', { headers: { Authorization: userToken } }).then(response => {
        // If request is good...
        console.log("values: ", response.data);
        this.setState({values: response.data});
      })
      .catch((error) => {
        console.log('Cant get all reviews data because: ' + error);
      });
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  retrieveUserId(id, fullname) {
    this.setState({userReceiverId: id, userReceiverFullname: fullname});
  }

  valueShowDropdown() {
    this.setState({ isValueInputSelected: true });
  }

  valueHideDropdown() {
    if (!this.state.valuePreventHideDropdown) {
      this.setState({ isValueInputSelected: false });
    }
  }

  setPreventHideDropdown() {
    this.setState({ valuePreventHideDropdown: true });
  }

  resetPreventHideDropdown() {
    this.setState({ valuePreventHideDropdown: false });
  }

  valueSelected(valueId, valueName) {
    this.setState({
      valueId: valueId,
      valueName: valueName,
      valuePreventHideDropdown: false,
      isValueInputSelected: false
    });
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/signin'}/>)
    }

    return (
      <div className="ReviewGroup__root">
        <SearchContainer getClickedUserId={this.retrieveUserId}/>
        <div className="WriteReview__root" >
          Para: <b>{this.state.userReceiverFullname}</b>
          {this.renderValuesSearchBar()}
          {this.renderValuesResult()}
          <form onSubmit={this.feedUpdate} method="post">
            <input name="body" onChange={this.onChange} value={this.state.body} type="text" placeholder="Escribe aquí"/>
            <input name="value" onChange={this.onChange} value={this.state.value} type="text" placeholder={this.state.valueName}/>
            <input type="submit" value="Post" className="button" onClick={this.feedUpdate}/>
          </form>
        </div>

        <ReviewItem data = {this.state.reviews}/>
        <button type='button' onClick={this.logout}>Logout</button>
      </div>
    );
  }

  renderValuesSearchBar() {
    return (
      <div>
        <ValueSearchBar
          valueShowDropdown={this.valueShowDropdown}
          valueHideDropdown={this.valueHideDropdown}
          term={this.state.term}
          onSearchTermChange={(term) => {this.setState({ term });}}
        />
      </div>
    );
  };

  renderValuesResult() {
    if(this.state.values.length === 0 || !this.state.isValueInputSelected) {
      return;
    }

    return (
      <ValueSearchResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.term}
        values={this.state.values}
        sendData={this.valueSelected}
      />
    );
  }
}

export default ReviewGroup;
