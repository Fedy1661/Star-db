import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = ({ history }) => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">
          StarDB
        </Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to={{
            pathname:"/people/2",
            state: { fromDashboard: true }
            }}>People</Link>
        </li>
        <li>
          <Link to="/planets/2">Planets</Link>
        </li>
        <li>
          <Link to="/starships/15">Starships</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;