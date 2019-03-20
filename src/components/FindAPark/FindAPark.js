import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class FindAPark extends Component {
state = {
  currentPark: '',
}

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

  handleParkChange = event => {
    console.log('handle park change running', event.target.value);
    this.setState({
      currentPark: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <h1>Find A Park</h1>
        <select onChange={this.handleParkChange}>
          <option>--Find A Park--</option>
          {this.props.parks.map(park =>
            <option value={park.id} key={park.id}>{park.park_full_name}</option>
          )}
        </select>
        <br/>
        <pre></pre>
        {this.state.currentPark}
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapReduxStateToProps)(FindAPark);

