import React, { Component } from 'react';
import ReviewGroup from '../containers/ReviewGroup';

import '../styles/vendors/normalize.css';
import '../styles/vendors/skeleton.css';
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <ReviewGroup />
      </div>
    );
  }
}

export default Home;