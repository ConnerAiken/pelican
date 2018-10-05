// Node.JS
import React from "react";  
import Directions from "../directions";    
import LoadingScreen from "../loadingScreen";
import { Container, Row, Col, Button } from 'reactstrap';
import toastr from "toastr"; 
import './../../../../node_modules/toastr/build/toastr.css';   
import utils from "./../../assets/utils";
import { withRouter, Redirect } from 'react-router-dom';
import DriverOrders from "./driver.orders";
 
import "./driver.map.scss";
 
class DriverMapDash extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils);

    this.state.activeOrder = false;
    this.state.curLoc = false;

    this.initializeWatchers();
  }
   
  initializeWatchers() {     
    navigator.geolocation.getCurrentPosition((position) => {  
        this.setState({curLoc: { coords:{ lat: position.coords.latitude, lng: position.coords.longitude }}});
    }, (error) => {
      if(error == 2) {
        toastr.error('Your position is not currently available. Error code: ' + error.code);
      } else if(error == 1) {
        toastr.error("Please allow Pelican to view your location.");
        this.props.history.push('/geolocation-error');
      } else if(error == 3) {
        toastr.error("The geolocation api timed out.");
      }

    }, {timeout: 2500, enableHighAccuracy: true, maximumAge: 75000});

    this.watchId = navigator.geolocation.watchPosition((position) => {   
      this.setState({curLoc: { coords: {lat: position.coords.latitude, lng: position.coords.longitude}}});
    }, (err) => {  
        if(err.code == 1) { 
          this.props.history.push('/geolocation-error');
        }
    }, {timeout: 2500, enableHighAccuracy: true, maximumAge: 75000}); 
}

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchId);
}

  showRelevantMap() { 
      if(this.state.activeOrder) {
        return <Directions
        curLoc={this.state.curLoc} 
        input={this.state.destination}/> 
      } else {
        return <DriverOrders
        curLoc={this.state.curLoc}/> 
      } 
  }  

  render() {
    return (
      <Container className="container dashboard" fluid={true}> 
      {this.state.pendingRequest ? <LoadingScreen/> : null}
      {this.showRelevantMap()} 
      </Container> 
    );
  }
};

export default withRouter(DriverMapDash);