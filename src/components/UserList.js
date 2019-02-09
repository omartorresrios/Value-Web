import React from 'react';
import User from './User';
let users = []
class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(e) {
    this.setState({search: e.target.value})
  }

  render() {
    let filteredUsers = this.props.users.filter(
      (user) => {
        return user.fullname.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div>
        <ul>
          {filteredUsers.map((user) => {
            return <User user={user} key={user.id}/>
          })}
        </ul>
        <input type="text" value={this.state.search} onChange={this.updateSearch}/>
      </div>

    )
  }
}

export default UserList;
