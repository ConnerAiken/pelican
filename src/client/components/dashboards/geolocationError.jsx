// Node.JS
import React from "react"; 
import toastr from "toastr";
import { Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import utils from "../../assets/utils";
import "./geolocationError.scss";
  
class Verify extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {};
    utils.initializeProtectedComponent.call(this, utils);  
  } 
 
  render() { 
    return (
      <Container className="container dashboard" fluid={true}> 
      <Row id="header">
        <Col xs={{size: 3}} sm={{size: 3}} md={{size: 3}} lg={{size: 3}}>  
          
        </Col>
        <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}> 
            <h3 style={{textAlign: 'center'}}><i className="fa fa-info-circle"></i>&nbsp;&nbsp;Geolocation Permissions</h3>
        </Col>
        <Col xs={{size: 3}} sm={{size: 3}} md={{size: 3}} lg={{size: 3}}>  
        </Col>
      </Row>
      <form onSubmit={this.handleSubmit}> 
      <Row className="form">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
          
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <p>You are unable to use Pelican due to permission access restrictions with your location. We take data privacy and security very seriously but we need your location to show stores near you.<br/><br/>For more information on how to allow Pelican to view your location, <a href="https://www.clockspot.com/support/articles/how-to-enable-geolocation-tracking/">click here</a>.<br/><br/>If you think you've fixed it, <a href="/">click here</a> to login and try again.</p>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row> 
      </form>
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </Container> 
    );
  }
};

export default withRouter(Verify);