// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";  
import { Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import LoadingScreen from "../loadingScreen";
import utils from "./../../assets/utils";
import "./payment.scss";
  
class StorePayment extends React.Component {

  constructor(props) {
    super(props);  
    utils.initializeProtectedComponent.call(this, utils); 
  } 
 
  render() {
    console.log("Rendering store.payment");

    return (
      <Container className="container dashboard" fluid={true}> 
      <Row id="header">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
          
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <h3>Store Payment</h3>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row>
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </Container> 
    );
  }
};

export default withRouter(StorePayment);