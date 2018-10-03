import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => (
  <Menu>
    <Menu.Item>
      <NavLink exact to="/" activeStyle={{ fontWeight: 'bold' }}>Home</NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink to="/add" activeStyle={{ fontWeight: 'bold' }}>Add User</NavLink>
    </Menu.Item>
  </Menu>
);

export default Navbar;
