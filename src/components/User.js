import React from 'react';

class User extends React.Component {
  render() {
    return (
      <li>{this.props.user.fullname}</li>



    )
  }
}

export default User;
