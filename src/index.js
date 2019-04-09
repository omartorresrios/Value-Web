import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />, document.getElementById('root'),
  )
});
