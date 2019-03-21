import React, { Component } from 'react';
import { connect } from 'react-redux';

class ParksProfile extends Component {

  componentDidMount = () => {
    this.getMyParks();
  }

  getMyParks = () => {
    console.log('going to get my parks from database');
  }


  render() {
    return (
      <div>
        Parks PRofile lol
      </div>
    );
  }
}




const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(ParksProfile);

