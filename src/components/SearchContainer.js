import React from 'react';
import $ from 'jquery';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
import axios from 'axios';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { preventHideDropdown: false, showDropdown: false, term: '', users: [] }
    this.hideDropdown = this.hideDropdown.bind(this);
    this.getData = this.getData.bind(this);
    this.getAllusers = this.getAllusers.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
  }

  componentWillMount() {
    this.getAllusers();
  }

  getAllusers() {
    if (sessionStorage.getItem("userData")) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);

      let currentUserIdTest = data.data.id
      axios.get('http://localhost:3000/api/current_user_company_employees', { headers: { Authorization: userToken } }).then(response => {
        const filteredUsers = response.data.filter(user => {
          if (user.id !== data.data.id) {
            return user.id !== data.data.id;
          }
        });
        this.setState({users: filteredUsers});
      })
      .catch((error) => {
        console.log('Cant get the data because: ' + error);
      });
    }
  }

  // search(term) {
  //   this.setState({ term });
  //
  //   $.ajax({
  //     url: `/api/autocomplete.json/?term=${term}`,
  //     method: 'GET',
  //     success: (data) => { console.log("a ver" + data);
  //     }
  //   });
  // }

  setPreventHideDropdown() {
    this.setState({ preventHideDropdown: true });
  }

  resetPreventHideDropdown() {
    this.setState({ preventHideDropdown: false });
  }

  hideDropdown() {
    if (!this.state.preventHideDropdown) {
      this.setState({ showDropdown: false });
    }
  }

  showDropdown() {
    this.setState({ showDropdown: true });
  }

  render () {
    return (
      <div>
        <SearchBar
          showDropdown={this.showDropdown}
          hideDropdown={this.hideDropdown}
          term={this.state.term}
          onSearchTermChange={(term) => {this.setState({ term });}}
        />
        {this.renderSearchResults()}
      </div>
    );
  }

  getData(id, fullname){
    this.props.getClickedUserId(id, fullname)
    this.setState({ showDropdown: false });
  }

  renderSearchResults() {

    if(!this.state.showDropdown || this.state.users.length === 0) {
      return;
    }

    return (
      <SearchResultsList
        setPreventHideDropdown={this.setPreventHideDropdown}
        resetPreventHideDropdown={this.resetPreventHideDropdown}
        term={this.state.term}
        users={this.state.users}
        sendData={this.getData}
      />
    );
  }
}

export default SearchContainer;
