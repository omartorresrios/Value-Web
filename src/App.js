import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/vendors/normalize.css';
import './styles/vendors/skeleton.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <Link to="/profile">To Profile</Link>
        </p>
      </div>
    );
  }
}

export default App;
