import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import './GoogleMaps.css';
import axios from 'axios';
import { connect } from 'react-redux';

class GoogleMaps extends Component {
    state = {
        userLocation: {
            lat: 45,
            lng: -45,
        },
        loading: true,
        open: false,
    };
    
    //gets list of visited parks from the parks_visited database
    getMyParks = () => {
        axios.get('/myparks')
            .then((response) => {
                this.props.dispatch({ type: 'SET_MY_PARKS', payload: response.data })
            }).catch(error => {
                console.log('error in my parks client get request', error);
            });
    }

    //creates markers of parks visited and displays them on the map
    createMarkers = () => {
        const element = this.props.parks.map((park, index) => {
            let latitude = park.lat.split(' ');
            let longitude = park.long.split(' ');
            let latValue = Number(latitude[2]);
            let longValue = Number(longitude[4]);
            return (
            <Marker
                key={index}
                title={park.park_full_name}
                name={park.park_full_name}
                position={{ lat: latValue, lng: longValue }}>
            </Marker>
            )
        }
        )
        return element;
    }

    // gets parks and sets initial map location to the geographical center of North America - Rugby, Minnesota
    componentDidMount() {
        this.getMyParks();
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    userLocation: {
                        lat: 48.367222,
                        lng: -99.996111,
                    },
                    loading: false,
                });
            },
            () => {
                this.setState({
                    loading: false
                });
            }
        );
    }

    render() {
        const { loading, userLocation } = this.state;
        const { google } = this.props;

        if (loading) {
            return null;
        }

        return (
            <div>
                <Map className="googleMap" google={google} initialCenter={userLocation} zoom={4}>
                    {this.createMarkers()}
                </Map>
            </div>
        );

    }
}
const mapStateToProps = state => ({
    parks: state.parks,
    parkdisplay: state.parkdisplay,
    editpark: state.editpark,
});

export default GoogleApiWrapper({
    apiKey: "AIzaSyCHYi2wtrFyckBkYUz6Brsx7mB2z5khGHM"
})(connect(mapStateToProps)(GoogleMaps));