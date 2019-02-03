import React from 'react';
import '../styles/MainLayout.css';

const MainLayout = (props) => {
  return (
    <div className="main-MainLayout__root">
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;
