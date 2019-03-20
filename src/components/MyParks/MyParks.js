import React, { Component } from 'react';
import { connect } from 'react-redux';
// LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class MyParks extends Component {
  
  componentDidMount = () => {
    this.getMyParks();
  }
  
  getMyParks = () => {
    console.log('getting parks');
  }


  render() {
    return (
      <div>
        <h1 id="welcome">
          My Parks
      </h1>
        {/* <LogOutButton className="log-in" /> */}
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyParks);
