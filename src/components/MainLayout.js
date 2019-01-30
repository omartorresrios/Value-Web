import React from 'react';

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <div className="container">
        Hola pendejos
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
