// Node.JS
import React from "react";
import ReactDOM from "react-dom";
import toastr from "toastr";
import './../../node_modules/toastr/build/toastr.css';  
import Gmap from "./components/map.jsx";
  
class App extends React.Component {

  constructor(props) {
    super(props);
    console.log("Initializing <App> Component");
    this.state = {
      locationLoaded: false,
      startLoc: { coords: {
        lat: 0,
        lng: 0
      }},
      curLoc: { coords: {
        lat: 0,
        lng: 0
      }}
    };
    this.initializeGMap();  
  }

  initializeGMap() {   
      console.log("Initializing gMap");
      // check for Geolocation support
      if (navigator.geolocation) {
          toastr.success('Geolocation is supported!');
      }
      else {
          toastr.error('Geolocation is not supported for this Browser/OS version yet.');
      }  
      
      navigator.geolocation.getCurrentPosition((position) => {  
          this.setState({locationLoaded: true, startLoc: { coords:{ lat: position.coords.latitude, lng: position.coords.longitude }}}, () => { 
            document.getElementById('startLat').innerHTML = this.state.startLoc.coords.lat;
            document.getElementById('startLon').innerHTML = this.state.startLoc.coords.lng;
          });
      }, (error) => {
        if(error == 2) {
          toastr.error('Your position is not currently available. Error code: ' + error.code);
        } else if(error == 1) {
          toastr.error("Please allow Pelican to view your location.");
        } else if(error == 3) {
          toastr.error("The geolocation api timed out.");
        } else {
          toastr.error('Unknown error occurred. Error code: ' + error.code);
        } 
      }, {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});

      navigator.geolocation.watchPosition((position) => {   
        this.setState({locationLoaded: true, curLoc: { coords: {lat: position.coords.latitude, lng: position.coords.longitude}}}, () => { 
          document.getElementById('currentLat').innerHTML = this.state.curLoc.coords.lat;
          document.getElementById('currentLon').innerHTML = this.state.curLoc.coords.lng;
        });
      }, (err) => {
          toastr.error("Location tracking error occured. Error code: "+err);
      }, {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});

  }

  calculateDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = (lat2 - lat1).toRad();
      var dLon = (lon2 - lon1).toRad(); 
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
      var d = R * c;

      // Convert KM to Miles
      d = d * 0.62137119; 
      return d;
  } 

  render() {
    return (
      <div id="main">
        <div>
          <div>
            <h1>Pelican</h1>
          </div>
          <div>
            <p>
              Starting Location (lat, lon): <span id="startLat">???</span>°, <span id="startLon">???</span>°<br/> 
              Current Location (lat, lon): <span id="currentLat">???</span>°, <span id="currentLon">???</span>° <br/> 
              Distance from starting location: <span id="distance">0</span> miles<br/> 
            </p>
          </div>
        </div>
        <div>  
          { this.state.locationLoaded ? 
          <Gmap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=***REMOVED***-o"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            curLoc={this.state.curLoc}
            startLoc={this.state.startLoc}
            />
            : null }
        </div>
        <div style={{display: 'none'}}>
          <h4>Cart Info</h4>
        </div>
      </div>
    );
  }
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));


module.hot.accept();