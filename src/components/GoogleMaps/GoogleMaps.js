import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import './GoogleMaps.css';
import axios from 'axios';
import { connect } from 'react-redux';

class GoogleMaps extends Component {

    getMyParks = () => {
        axios.get('/myparks')
            .then((response) => {
                this.props.dispatch({ type: 'SET_MY_PARKS', payload: response.data })
            }).catch(error => {
                console.log('error in my parks client get request', error);
            });
    }

    // createMyParks = () => {
    //     return this.props.parks.map(park =>
    //         <div>{park.latLong}</div>
    //     )
    // }


    createMarkers = () => {
        const element = this.props.parks.map((park, index) => {
            let latitude = park.lat.split(' ');
            let longitude = park.long.split(' ');
            console.log(longitude);
            let latValue = Number(latitude[2]);
            let longValue = Number(longitude[4]);
            //console.log('latitude match:',(latValue === 36.17280161));
            //console.log('longitude match:', longValue, (longValue === -112.6836024 ));

            return (<Marker
                key={index}
                title={'The marker`s title will appear as a tooltip.'}
                name={'Glacier National Park'}
                position={{ lat: latValue, lng: longValue }}
            />)

        }
        )

        console.log(element);
        return element;
    }


    state = {
        userLocation: {
            lat: 45,
            lng: -45,
        },
        loading: true
    };

    componentDidMount() {
        this.getMyParks();
        navigator.geolocation.getCurrentPosition(
            position => {
                //const { latitude, longitude } = position.coords;

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
                {/* <div>{this.createMyParks()}</div> */}

                <Map className="googleMap" google={google} initialCenter={userLocation} zoom={4}>
                    {this.createMarkers()}
                    {/* <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Grand Canyon National Park'}
                    position={{ lat: 36.17280161, lng: -112.6836024 }} />
                    <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Great Smoky Mountains National Park'}
                    position={{ lat: 35.60116374, lng: -83.50818326 }} />
                    <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Grand Teton National Park'}
                    position={{ lat: 43.81853565, lng: -110.7054666 }} />
                    <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Rocky Mountain National Park'}
                    position={{ lat: 40.3556924, lng: -105.6972879 }} />
                    <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Glacier National Park'}
                    position={{ lat: 48.68414678, lng: -113.8009306 }} />
                     */}
                </Map>

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

// export default withStyles(styles)(connect(mapStateToProps)(MyParks));

export default GoogleApiWrapper({
    apiKey: "AIzaSyCHYi2wtrFyckBkYUz6Brsx7mB2z5khGHM"
})(connect(mapStateToProps)(GoogleMaps));