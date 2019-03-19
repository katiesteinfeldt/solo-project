import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class FindAPark extends Component {
  // Renders the entire app on the DOM

  componentDidMount = () => {
    this.getParks();
  }

  getParks = () => {
    axios.get('/parks')
      .then((response) => {
        console.log(response);
      }).catch(error => {
        console.log('error in parks client get request', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Find A Park</h1>
      <select>
        <option>--Select Park --</option>
        <option>Park 1</option>
        <option>Park 2</option>
        <option>Park 3</option>
      </select>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapReduxStateToProps)(FindAPark);

