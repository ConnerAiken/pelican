import React from "react";
import ReactDOM from "react-dom";
const { compose, withProps, lifecycle } = require("recompose"); 
let {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

DirectionsRenderer = compose(
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
        origin: new google.maps.LatLng(41.8507300, -87.6512600),
        destination: new google.maps.LatLng(41.8525800, -87.6514100),
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
    defaultZoom={20}
    defaultCenter={new google.maps.LatLng(props.startLoc ? props.startLoc.coords.lat : 47.6101, props.startLoc ? props.startLoc.coords.lng : 122.3421)}>
    {props.directions && <DirectionsRenderer directions={props.directions} startLoc={props.startLoc ? props.startLoc : 47.6101} curLoc={props.curLoc ? props.curLoc : 122.3421}/>}
  </GoogleMap>
);

export default DirectionsRenderer;