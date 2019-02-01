import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => (<Link {...props} activeClassName="NavLink--active" />);

export default NavLink;
