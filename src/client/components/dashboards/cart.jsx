// Node.JS
import React from "react";  
import { Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import LoadingScreen from "../loadingScreen";
import utils from "./../../assets/utils";
import "./cart.scss";
  
class Cart extends React.Component {

  constructor(props) {
    super(props);  
    utils.initializeProtectedComponent.call(this, utils); 
  } 
 
  render() { 
    console.log(this.props.history);
    return (
      <Container className="container dashboard" fluid={true}> 
      <Row id="header">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>   
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <h3>My Cart</h3>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <i className="fa fa-trash pull-right" onClick={this.clearCart}></i>
        </Col>
      </Row>
      <Row>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>   
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <pre style={{color: 'white'}}>
              <code>
                {JSON.stringify(JSON.parse(localStorage.getItem('sidebar')).cart, null, 2)}
              </code>
            </pre>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row>
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </Container> 
    );
  }
};

export default withRouter(Cart);