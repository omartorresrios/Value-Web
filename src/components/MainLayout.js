import React from 'react';
import Header from './Header';
import '../styles/MainLayout.css';

const MainLayout = (props) => {
  return (
    <div className="MainLayout__root">
      <Header />
      <div className="container">
        Hola pendejos
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
