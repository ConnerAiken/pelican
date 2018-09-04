import React from "react";
import ReactDOM from "react-dom";
import toastr from "toastr";
import axios from "axios"; 

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
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({ 
    componentWillReceiveProps(nextProps) {
      if(nextProps.input && this.props.input == nextProps.input) {
        return;
      }

      const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.input}&key=***REMOVED***-o`;
      axios.get(requestUrl).then((res) => {  
        const dest = res.data.results[0].geometry.location;

        const DirectionsService = new google.maps.DirectionsService(); 
        DirectionsService.route({
          origin: new google.maps.LatLng(this.props.curLoc.coords.lat, this.props.curLoc.coords.lng),
          destination: new google.maps.LatLng(dest.lat, dest.lng),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          console.log(result);
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              destLoc: res.data.results[0].geometry.location
            });
          } else {
            toastr.error(`error fetching directions ${result.status}`);
          }
        });
        
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