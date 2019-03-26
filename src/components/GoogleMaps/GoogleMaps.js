import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class GoogleMaps extends Component {
    
    componentDidMount = () => {
       //this.getMyMap();
    }

    getMyMap = () => {
        axios.get('/googlemaps')
            .then((response) => {
                console.log(response.data);
            }).catch(error => {
                console.log('error in my googlemaps client get request', error);
            });
    }
  

    render() {
        
        return (
            <div>
                GOOGLE MAPS
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
export default connect(mapStateToProps)(GoogleMaps);

