// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";
import './../../../node_modules/toastr/build/toastr.css';   
import Directions from "./directions.jsx";   
import Requestor from "./requestor.jsx";
import { Container, Row, Col } from 'reactstrap';
import "./dashboard.scss";

class App extends React.Component {

  constructor(props) {
    super(props); 

    this.handleRequestorUpdate = this.handleRequestorUpdate.bind(this);
    this.state = {
      locationLoaded: false,
      startLoc: false,
      curLoc: false,
      destination: null
    };
    this.initializeGMap();
    
    setInterval(this.checkToken(), 5000);
  }

  checkToken() {  
    axios.get('/api/v1/user/health-check', {}, {
      'Content-Type': 'application/json;charset=UTF-8',
      'token': localStorage.getItem('token')
    })
    .then(function(response) {   
      console.log(response);
    }).catch(request => {   
      console.log(request);
    });
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
          console.log(err);
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

  handleRequestorUpdate(e) { 
    this.setState({destination: e}); 
  }

  showRelevantMap() {
    console.log(localStorage.getItem("user"));
    return null;

    <Directions
          curLoc={this.state.curLoc}
          startLoc={this.state.startLoc}  
          input={this.state.destination}/> 
  }
 
  render() {
    return (
      <Container id="main" className="container dashboard" fluid={true}>
      <Requestor destination={this.state.destination} onUpdate={this.handleRequestorUpdate}/>
      <Row id="nav">
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
      {this.showRelevantMap()} 
      </Container> 
    );
  }
};

export default App;
 