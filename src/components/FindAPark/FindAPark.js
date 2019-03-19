import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class FindAPark extends Component {
  // Renders the entire app on the DOM
  // state = {
  //   park: {
  //     park_full_name: '',
  //     park_name: '',
  //     park_description: '',
  //     latLong: '',
  //     image_path_1: ''
  //   }
  // }

  componentDidMount = () => {
    this.getParks();
  }

  getParks = () => {
    axios.get('/parks')
      .then((response) => {
        this.props.dispatch({type: 'SET_PARKS', payload: response.data})
      }).catch(error => {
        console.log('error in parks client get request', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Find A Park</h1>
        <select>
          {this.props.parks.map(park =>
            <option key={park.id}>{park.park_full_name}</option>
          )}
        </select>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapReduxStateToProps)(FindAPark);

