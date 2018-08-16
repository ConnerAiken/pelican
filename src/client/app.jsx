// Node.JS
import React from "react";
import ReactDOM from "react-dom";
import toastr from "toastr";
import './../../node_modules/toastr/build/toastr.css';  
import Gmap from "./components/map.jsx";
  
class App extends React.Component {

  constructor(props) {
    super(props);
    this.initializeGMap();
  }

  initializeGMap() {   
      // check for Geolocation support
      if (navigator.geolocation) {
          toastr.success('Geolocation is supported!');
      }
      else {
          toastr.error('Geolocation is not supported for this Browser/OS version yet.');
      }
      window.onload = function() {  
          var startPos;

          navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
              startPos = position;
              document.getElementById('startLat').innerHTML = startPos.coords.latitude;
              document.getElementById('startLon').innerHTML = startPos.coords.longitude;
          }, function(error) {
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

          navigator.geolocation.watchPosition(function(position) {   
            if(startPos)
                document.getElementById('distance').innerHTML = calculateDistance(startPos.coords.latitude, startPos.coords.longitude, position.coords.latitude, position.coords.longitude);
          }, function(err) {
              toastr.error("Location tracking error occured. Error code: "+err);
          }, {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});

          function calculateDistance(lat1, lon1, lat2, lon2) {
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
          Number.prototype.toRad = function() {
              return this * Math.PI / 180;
          }
      }; 
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
          <Gmap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
        <div>
          <h4>Cart Info</h4>
        </div>
      </div>
    );
  }
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));


module.hot.accept();