import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './MyParks.css';
// LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class MyParks extends Component {
  state = {
    displayParkInfo: false,
    currentPark: 0
  }

  componentDidMount = () => {
    this.getMyParks();
  }

  getMyParks = () => {
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


  //this will delete park from the database 
  deletePark = (parks_visited_id) => {
    return () => {
      console.log('delete was clicked', parks_visited_id);
      const r = window.confirm("Are you sure you want to delete this park?");
      if (r === true) {
        axios({
          method: 'DELETE',
          url: '/myparks/' + parks_visited_id,
        }).then((response) => {
          this.getMyParks();
        });
      }
      else {
        window.alert("Feedback saved");
      }
    }
  }

  createMyParks = () => {
    return this.props.parks.map(park =>
      <div key={park.all_parks_id}><h3>{park.park_full_name}</h3>
        <img onClick={this.displayParkInfo(park.all_parks_id)} className="parkImage" alt={park.park_description} src={park.image_path_1} />
        <pre></pre>
        Date Visited: {park.date_visited_1}
        <pre></pre>
        Notes: {park.notes}
        {/* <button>Update</button> */}
        <button onClick={this.deletePark(park.parks_visited_id)}>Delete</button>
        <pre></pre>
      </div>
    )
  }


  render() {
    console.log(this.props.parkdisplay[0]);
    let currentParkDisplay;
    if (this.state.displayParkInfo) {
      currentParkDisplay = <div>
        {this.props.parkdisplay[0] && 
        <div>
          <h3>{this.props.parkdisplay[0].park_full_name}</h3>
          <pre></pre>
          {this.props.parkdisplay[0].park_description}
          <pre></pre>
          <img alt={this.props.parkdisplay[0].park_description} src={this.props.parkdisplay[0].image_path_1}/>
        </div>
        }
      </div>;
    }
    else {
      currentParkDisplay = null;
    }
    return (
      <div>
        <h1 id="welcome">
          My Parks
      </h1>
        {/* <LogOutButton className="log-in" /> */}
        <div>
          {this.createMyParks()}
        </div>
        {currentParkDisplay}
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  parks: state.parks,
  parkdisplay: state.parkdisplay,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyParks);
