import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/myparks">
      <div className="nav-title">
      </div>
    </Link>
    <div className="nav-right">

      <Link className="nav-link" to="/myparks">

        {/* Show this link if they are logged in or not,
        but call this link 'My Parks' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? [<i class="fas fa-mountain"></i>, '  My Parks'] : 'Login / Register'}
      </Link>

      {props.user.id && [
        <Link className="nav-link" to="/findpark">
          <i class="fas fa-search"></i> Find A Park
          </Link>,

        <Link className="nav-link" to="/profile">
          <i class="fas fa-user"></i> Profile
          </Link>,

        <Link className="nav-link" to="/map">
          <i class="fas fa-map-marked"></i> Map
          </Link>,

        <LogOutButton className="nav-link" />
      ]}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
