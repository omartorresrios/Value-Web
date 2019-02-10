import React from 'react';
import SearchResultsList from './SearchResultsList';

class SearchUserListItem extends React.Component {



  handleUserClicked(userId, userFullname) {
    this.props.onSearchTermChange(userId, userFullname);
  }

  render() {
    return (
      <li>
        <span dangerouslySetInnerHTML={{ __html: this.props.user.fullname }} onClick={() => this.handleUserClicked(this.props.user.id, this.props.user.fullname)} />

      </li>
    );
  }
}

export default SearchUserListItem;
