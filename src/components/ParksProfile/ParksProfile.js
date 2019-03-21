import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ParksProfile extends Component {
  state = {
    displayMyParks: false,
  }

  componentDidMount = () => {
    this.getMyParks();
  }

  getMyParks = () => {
    console.log('going to get my parks from database');
    axios.get('/myparks')
      .then((response) => {
        this.props.dispatch({ type: 'SET_MY_PARKS', payload: response.data })
      }).catch(error => {
        console.log('error in my parks client get request', error);
      });
  }

  displayParkInfo = (parks_visited_id) => {
    return () => {
      this.props.dispatch({ type: 'FETCH_CURRENT_PARK', payload: parks_visited_id })
      this.setState({
        displayParkInfo: true,
        currentPark: parks_visited_id,
      })
    }
  }

  createMyParks =  () => {
    return this.props.parks.map(park =>
      <div key={park.all_parks_id}><h3>{park.park_full_name}</h3>
        <img onClick={this.displayParkInfo(park.all_parks_id)} alt={park.park_description} src={park.image_path_1} />
        <pre></pre>
        Date Visited: {park.date_visited_1}
        <pre></pre>
        Notes: {park.notes}
        <pre></pre>
      </div>
    )
  }

 
  render() {
    let currentParkDisplay;
    if (this.state.displayParkInfo) {
      currentParkDisplay = <div>
        {this.props.parkdisplay[0] &&
          <div>
            <h3>{this.props.parkdisplay[0].park_full_name}</h3>
            <pre></pre>
            {this.props.parkdisplay[0].park_description}
            <pre></pre>
            <img alt={this.props.parkdisplay[0].park_description} src={this.props.parkdisplay[0].image_path_1} />
          </div>
        }
      </div>;
    }
    else {
      currentParkDisplay = null;
    }
    return (
      <div>
        {this.createMyParks()}
        {currentParkDisplay}
      </div>
    );
  }
}




const mapStateToProps = state => ({
  user: state.user,
  parks: state.parks,
  parkdisplay: state.parkdisplay,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ParksProfile);

