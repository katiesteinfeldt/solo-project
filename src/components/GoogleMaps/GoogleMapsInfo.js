import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class GoogleMapsInfo extends Component {
    state = {
       
    }

    componentDidMount = () => {
        this.getMyParks();
    }

    // retrieves list of parks visited from database and saves the information
    // in a reducer 
    getMyParks = () => {
        axios.get('/myparks')
            .then((response) => {
                this.props.dispatch({ type: 'SET_MY_PARKS', payload: response.data })
            }).catch(error => {
                console.log('error in my parks client get request', error);
            });
    }

    render() {
     

        return (
            <div>
                Hi
            </div>
        )
    }
}
    const mapStateToProps = state => ({
        //user: state.user,
        parks: state.parks,
        parkdisplay: state.parkdisplay,
        editpark: state.editpark,
    });


export default connect(mapStateToProps)(GoogleMapsInfo);
