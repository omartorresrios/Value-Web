import React from 'react';
import SearchUserListItem from './SearchUserListItem';
import SearchContainer from './SearchContainer';
class SearchResultsList extends React.Component {


  render() {
    return (
      <ul className="dropdown-menu" id="autocomplete-items" onMouseEnter={() => {this.props.setPreventHideDropdown()}} onMouseLeave={() => {this.props.resetPreventHideDropdown()}}>
        <span className="dropdown-arrow-top"></span>
        <span className="dropdown-arrow-bottom"></span>
        <li>
          <a href={`/search?q=${this.props.term}`}>
            <i className="fa fa-search"></i> Search for <strong>{this.props.term}</strong>
          </a>
        </li>
        {this.renderUserHeading()}
        {this.renderUsers()}
      </ul>
    );
  }

  renderUsers() {
    let filteredUsers = this.props.users.filter(
      (user) => {
        return user.fullname.toLowerCase().indexOf(
          this.props.term.toLowerCase()) !== -1;
      }
    );

    return filteredUsers.map((user) => {
      return <SearchUserListItem key={user.id} user={user} onSearchTermChange={(userId, userFullname) => {this.props.sendData(userId, userFullname)}}/>
    });
  }

  renderUserHeading() {
    if (this.props.users.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>People</h4></li>
  }
}

export default SearchResultsList;
