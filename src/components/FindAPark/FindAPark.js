import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './FindAPark.css'

class FindAPark extends Component {
state = {
  currentPark: '',
  parkDisplay: false,
  addParkDisplay: false,
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
    axios.get('/currentpark/', {
      params: {
        id: event.target.value,
      }
    }).then((response) => {
      this.props.dispatch({ type: 'SET_CURRENT_PARK', payload: response.data})
      this.setState({
        parkDisplay: true,
      })
    }).catch(error => {
      console.log('error in current park get request', error);
    });
    // this.setState({
    //   currentPark: event.target.value,
    //   parkDisplay: true,
    // })
  }

  addToMyParks = () => {
    console.log('button clicked');
    this.setState({
      addParkDisplay: true,
    })
  }

  render() {
    let parkDOMDisplay
    let addParkDOMDisplay
    if (this.state.parkDisplay){
      parkDOMDisplay = 
      <div>
        <h2>{this.props.currentpark[0].park_full_name}</h2>
        <img className="parkImages" alt={this.props.currentpark[0].park_description} src={this.props.currentpark[0].image_path_1}/>
      <div>{this.props.currentpark[0].park_description}</div>
      <button onClick={this.addToMyParks}>Mark As Visited</button>
      </div>
    }
    else {
      parkDOMDisplay = null;
    }

    if (this.state.addParkDisplay) {
      addParkDOMDisplay =
        <div>
          <h2>Add New Park</h2>
          <input type="date"></input>
          <input placeholder="notes"></input>
          <button>Add Park</button>
        </div>
    }
    else {
      addParkDOMDisplay = null;
    }

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
        <br />
        <div>{parkDOMDisplay}</div>
        <br />
        <br />
        <div>{addParkDOMDisplay}</div>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapReduxStateToProps)(FindAPark);

