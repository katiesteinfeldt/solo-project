import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './FindAPark.css'

class FindAPark extends Component {
  state = {
    parkDisplay: false,
    addParkDisplay: false,
    newPark: {
      park_id: 0,
      user_id: this.props.user.id,
      date_visited_1: '2019-03-01',
      date_visited_2: '',
      date_visited_3: '',
      notes: '',
    },
    parkSubmitted: false,
  }

  componentDidMount = () => {
    this.getParks();
  }

  getParks = () => {
    axios.get('/parks')
      .then((response) => {
        this.props.dispatch({ type: 'SET_PARKS', payload: response.data })
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
      this.props.dispatch({ type: 'SET_CURRENT_PARK', payload: response.data })
      this.setState({
        park_id: this.props.currentpark.id,
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

  //displays new park fields on the DOM when the function runs
  addVisit = () => {
    console.log('button clicked', this.props.currentpark[0].id);
    this.setState({
      addParkDisplay: true,
    })
  }

  // sets local state to input values
  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      newPark: {
        ...this.state.newPark,
        [propertyName]: event.target.value,
      }
    });
  }

  //add park to parks_visited database 
  addPark = () => {
    console.log('ADD SERVER STUFF HERE', this.props.currentpark[0].id);
    axios({
      method: 'POST',
      url: '/currentpark/' + this.props.currentpark[0].id,
      data: {
        user_id: this.state.newPark.user_id,
        date_visited_1: this.state.newPark.date_visited_1,
        notes: this.state.newPark.notes,
        park_id: this.props.currentpark[0].id,
      }
    })
    .then((response) => {
      console.log(response);
    })
  }

  //view more information about park when image is clicked on
  viewParkInfo = () => {
    console.log('image clicked');
  }

  render() {
    let parkDOMDisplay
    let addParkDOMDisplay
    if (this.state.parkDisplay) {
      parkDOMDisplay =
        <div>
          <h2>{this.props.currentpark[0].park_full_name}</h2>
          <img onClick={this.viewParkInfo} className="parkImages" alt={this.props.currentpark[0].park_description} src={this.props.currentpark[0].image_path_1} />
          <div>{this.props.currentpark[0].park_description}</div>
          <button onClick={this.addVisit}>Add Visit</button>
        </div>
    }
    else {
      parkDOMDisplay = null;
    }

    if (this.state.addParkDisplay) {
      addParkDOMDisplay =
        <div>
          <h2>Add New Park Visit</h2>
          <input value={this.state.newPark.date_visited_1} onChange={this.handleChangeFor('date_visited_1')} type="date"></input>
          <input value={this.state.newPark.notes} onChange={this.handleChangeFor('notes')} placeholder="notes"></input>
          <button onClick={this.addPark}>Add Park</button>
        </div>
    }
    else {
      addParkDOMDisplay = null;
    }

    let parkSubmitted
    if (this.state.parkSubmitted){
      parkSubmitted = <h1>Success!</h1>
    }
    else {
      parkSubmitted = null;
    }


    return (
      <div>
        <br />
        <br />
        <div>{parkSubmitted}</div>
        <h1>Find A Park</h1>
        <select onChange={this.handleParkChange}>
          <option>--Find A Park--</option>
          {this.props.parks.map(park =>
            <option value={park.id} key={park.id}>{park.park_full_name}</option>
          )}
        </select>
        <br />
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

