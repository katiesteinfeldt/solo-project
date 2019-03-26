import React, { Component } from 'react';
import { GoogleApiWrapper, Map } from "google-maps-react";
import axios from 'axios';
import { connect } from 'react-redux';
import GoogleMapsInfo from './GoogleMapsInfo';



class GoogleMaps extends Component {


    state = {
        userLocation: {
            lat: 45,
            lng: -45,
        },
        loading: true
    };
    
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

    componentDidUpdate = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    userLocation: {
                        lat: 48.367222,
                        lng: - 99.996111,
                    },
                    loading: false,
                });
                new window.google.maps.Marker({
                    position: {
                        lat: latitude,
                        lng: longitude,
                    },
                    map: Map,
                });
            },
            () => {
                this.setState({
                    loading: false
                });
            }
        );
    }

    // for each park in the reducer => park
        // const marker = new window.google.maps.Marker({
        //     position: {lat: park.latitude, long: park.longitude}
        // })

    render() {
      
        const { loading, userLocation } = this.state;
        const { google } = this.props;

        if (loading) {
            return null;
        }

       

        return (
            <div>
        <Map google={google} initialCenter={userLocation} zoom={4} />
        <GoogleMapsInfo />
            </div>
        );

    }
}
const mapStateToProps = state => ({
    //user: state.user,
    parks: state.parks,
    parkdisplay: state.parkdisplay,
    editpark: state.editpark,
});

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCHYi2wtrFyckBkYUz6Brsx7mB2z5khGHM'
})(connect(mapStateToProps)(GoogleMaps));


