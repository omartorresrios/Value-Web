import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Link to="/profile">To Profile</Link>
    );
  }
}

export default App;
