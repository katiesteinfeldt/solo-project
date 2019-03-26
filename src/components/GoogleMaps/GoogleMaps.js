import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";

class MapContainer extends Component {


    state = {
        userLocation: {
            lat: 45,
            lng: -45,
        },
        loading: true
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    userLocation: {
                        lat: 48.367222,
                        lng: -99.996111,
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

    render() {
        const { loading, userLocation } = this.state;
        const { google } = this.props;

        if (loading) {
            return null;
        }

        return (
        <Map google={google} initialCenter={userLocation} zoom={4}>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{ lat: 36.17280161, lng: -112.6836024 }} />
        
        </Map>
        );

    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCHYi2wtrFyckBkYUz6Brsx7mB2z5khGHM"
})(MapContainer);