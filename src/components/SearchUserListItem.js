import React from 'react';

class SearchUserListItem extends React.Component {
  render() {
    return (
      <li>
        <span dangerouslySetInnerHTML={{ __html: this.props.user.fullname }} />

      </li>
    );
  }
}

export default SearchUserListItem;
