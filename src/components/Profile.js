import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  return (
    <div className="App">
      <p className="App-intro">
        I'm in my profile!
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default Profile;
