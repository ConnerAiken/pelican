import React from "react";
import ReactDOM from "react-dom";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Gmap = withScriptjs(withGoogleMap((props) => {
    return ( 
        <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: props.lat || 0, lng: props.lng || 0 }}
        style={{width: '100%', height: '100%'}}/>  
    );
}));

export default Gmap;