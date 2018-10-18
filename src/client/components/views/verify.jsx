// Node.JS
import React from "react";   
import utils from "../../assets/utils";
import VerifyDash from "../dashboards/verify";  
import {withRouter} from "react-router-dom";
import withAuth from "./../higherOrder/withAuth";
import {Container, Row, Col } from "reactstrap"; 

import './verify.scss';
 

class Verify extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
  }
  
  render() { 
    return (
      <Container fluid={true}  className="full-height">
        <Row noGutters={true}  className="full-height">   
          <Col xs={12} 
               sm={12} 
               md={12} 
               lg={12} 
               xl={12}>
               <VerifyDash/>
          </Col>
        </Row> 
      </Container>
      );  
  }
}; 


export default withRouter(withAuth(Verify));