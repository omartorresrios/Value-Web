import React from 'react';

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>

      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout;
