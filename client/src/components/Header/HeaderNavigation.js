import React from 'react';
import PrimaryButton from '../Buttons/PrimaryButton.js';
import { Link } from 'react-router-dom'


class HeaderNavigation extends React.Component {
  render(){
    return(
      <ul className="Header-navigation">
        <li>
          <Link to="/region/forsale/category/post/">test post page</Link>
        </li>
        <li>
          <Link to="/#">Login</Link>
        </li>
        <li>
          <Link to="/#">Register</Link>
        </li>
        <li>
          <PrimaryButton href="/">post an ad</PrimaryButton>
        </li>
      </ul>
    )
  };
}

export default HeaderNavigation;
