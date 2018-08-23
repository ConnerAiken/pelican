import React from "react";
import ReactDOM from "react-dom";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=***REMOVED***-o&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() { 
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.curLoc.coords.lat, this.props.curLoc.coords.lng),
        destination: new google.maps.LatLng(47.441509, -122.218819),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });

    }
  })
)(props => 
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(props.curLoc.coords.lat, props.curLoc.coords.lng)}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <Marker title="Current Location" position={{ lat: props.curLoc.coords.lat, lng: props.curLoc.coords.lng}} />
    <Marker title="Start Location" position={{ lat:  props.startLoc.coords.lat, lng: props.startLoc.coords.lng}} />
  </GoogleMap> 
);

module.exports = MapWithADirectionsRenderer;