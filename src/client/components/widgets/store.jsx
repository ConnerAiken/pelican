// Node.JS
import React from "react";  
import LoadingScreen from "../loadingScreen";
import { Container, Row, Col, Button } from 'reactstrap';
import utils from "./../../assets/utils";
  
import { withRouter, Redirect } from 'react-router-dom';
import "./store.scss";
 

class Store extends React.Component {

  constructor(props) {
    super(props);  
    utils.initializeProtectedComponent.call(this, utils); 

    this.state = { 
    }; 

  }
 
  render() {
    return (
      <p>Store Component</p>
    );
  }
};

export default withRouter(Store);