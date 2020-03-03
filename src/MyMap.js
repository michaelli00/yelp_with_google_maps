import React, { Component } from 'react';
import { GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import CurrentLocation from './Map';

class MyMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      hash: {},
      currentLocationSelected: false
    }
  }

  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      currentLocationSelected: false
    });
  }

  onCurrentLocationMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlacee: props,
      activeMarker: marker,
      showingInfoWindow: true,
      currentLocationSelected: true,
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  
  createMarkers = () => {
    return this.props.data.map(business => {
      const {name, coordinates, image_url, url, location, display_phone} = business;
      const address = location.address1 + ", " + location.city + ", " + location.state + ", " + location.zip_code;
        return ( 
          [ 
            <Marker
              position={{lat:coordinates.latitude,lng:coordinates.longitude}}
              onClick={this.onMarkerClick}
              name={name}
              url={url}
              src={image_url}
              location={address}
              locationUrl={"https://maps.google.com/?q=" + address}
              phone={display_phone}
            />
            ,
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
            {(!this.state.currentLocationSelected && 
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
                <a href={this.state.selectedPlace.url}>Yelp Review</a>
                <p>{this.state.selectedPlace.location}</p>
                <p>{this.state.selectedPlace.phone}</p>
                <center>
                  <img src={this.state.selectedPlace.src} alt={this.state.selectedPlace.name} width="150px" height="150px"/>
                </center>
              </div>
            ) ||
            (this.state.currentLocationSelected && 
              <div>
                <h4>Current Location</h4>
                <center>
                </center>
              </div>
            )
            }
            </InfoWindow>
         ]
      )
    })
  }

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        {this.createMarkers()}
        <Marker icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" onClick={this.onCurrentLocationMarkerClick} name={'current location'} />
      </CurrentLocation>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDHV73IxKgp1-FH1YE4SFKJQeb5eAXEifI'
})(MyMap);
