import React from 'react';
import '../styles/MainLayout.css';
import Header from './Header';

const MainLayout = (props) => {
  return (
    <div className="main-MainLayout__root">
      
      <div className="Home">
        <Header />
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;
