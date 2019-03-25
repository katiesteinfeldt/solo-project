import React from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';
const apiKey = process.env.GOOGLE_MAPS_API_KEY

class GoogleMaps extends React.Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                center={{
                    lat: 37.29839254,
                    lng: -113.0265138,
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
})(GoogleMaps);