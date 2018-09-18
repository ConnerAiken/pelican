import React from "react"; 

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
    containerElement: <div id="mapContainer" style={{height: '89%', minHeight: '89% !important', width: '100%'}}/>,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => 
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(props.curLoc.coords.lat, props.curLoc.coords.lng)}> 
    { props.curLoc && <Marker title="Current Location" position={{ lat: props.curLoc.coords.lat, lng: props.curLoc.coords.lng}} /> } 
    {props.stores.slice(0).map(store => <Marker title={store.name} position={{ lat: parseFloat(store.lat), lng: parseFloat(store.lng)}} options={{icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}} opacity={.25}/>)}
  </GoogleMap>
);

export default MapWithADirectionsRenderer;