// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../node_modules/toastr/build/toastr.css';   
import Directions from "./directions.jsx";  
import Map from "./map.jsx";  
import { Container, Row, Col, Input, Button } from 'reactstrap';
import "./dashboard.scss";

class App extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      locationLoaded: false,
      startLoc: false,
      curLoc: false,
      destination: {
        input: '85 Pike Street, Room 500 Seattle, WA 98101',
        coords: {
          lat: 47.6084444,
          lng: -122.3405493
        }
      }
    };
    this.initializeGMap();   
  }

  componentDidUpdate() {
    console.log(this.state);
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
      }, {timeout: 2500, enableHighAccuracy: true, maximumAge: 75000});

      navigator.geolocation.watchPosition((position) => {   
        this.setState({locationLoaded: true, curLoc: { coords: {lat: position.coords.latitude, lng: position.coords.longitude}}}, () => { 
          document.getElementById('currentLat').innerHTML = this.state.curLoc.coords.lat;
          document.getElementById('currentLon').innerHTML = this.state.curLoc.coords.lng;
        });
      }, (err) => {
          toastr.error("Location tracking error occured. Error code: "+err);
      }, {timeout: 2500, enableHighAccuracy: true, maximumAge: 75000});

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
  handleInputChange(e){
    const destination= this.state.destination;
    destination.input = e.target.value;
    this.setState({destination}); 
  }
 
  render() {
    return (
      <Container id="main" className="container home" fluid={true}>
      <Row>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <h1>Pelican</h1>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}></Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <p>
              Start: <span id="startLat">???</span>°, <span id="startLon">???</span>°<br/> 
              Current: <span id="currentLat">???</span>°, <span id="currentLon">???</span>° <br/> 
              Distance: <span id="distance">0</span> miles<br/> 
            </p>
        </Col>
      </Row>
      <Row>
        <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
            {this.state.curLoc && this.state.startLoc ?
            //<Directions
            //    curLoc={this.state.curLoc}
            //    startLoc={this.state.startLoc}  
            //    input={this.state.destination.input}/>
            <Map
                curLoc={this.state.curLoc}
                startLoc={this.state.startLoc}  
            />
            : null }
        </Col>
      </Row>
      </Container> 
    );
  }
};

export default App;
 