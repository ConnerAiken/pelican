import React from "react";
import ReactDOM from "react-dom";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Gmap = withScriptjs(withGoogleMap((props) => {   
    const curLoc = Object.assign({}, props.curLoc);
    const startLoc = Object.assign({}, props.startLoc);

    if(props.curLoc.coords.lat == 0 && props.curLoc.coords.lng == 0 && props.startLoc.coords.lat != 0 && props.startLoc.coords.lng != 0) {
        curLoc.coords.lat = props.startLoc.coords.lat;
        curLoc.coords.lng = props.startLoc.coords.lng;
    }
    if(props.curLoc.coords.lat != 0 && props.curLoc.coords.lng != 0 && props.startLoc.coords.lat == 0 && props.startLoc.coords.lng == 0) {
        startLoc.coords.lat = props.curLoc.coords.lat;
        startLoc.coords.lng = props.curLoc.coords.lng;
    }
    return ( 
        <GoogleMap 
        defaultZoom={20}
        defaultCenter={{ lat: props.startLoc.coords ? props.startLoc.coords.lat : 0, lng: props.startLoc.coords ?  props.startLoc.coords.lng : 0 }}
        style={{width: '100%', height: '100%'}}>
            <Marker position={{ lat: curLoc.coords ? curLoc.coords.lat : 0, lng: curLoc.coords ? curLoc.coords.lng : 0}} />
            <Marker position={{ lat: startLoc.coords ? startLoc.coords.lat : 0, lng: startLoc.coords ? startLoc.coords.lng : 0}} />
        </GoogleMap>  
    );
}));

export default Gmap;