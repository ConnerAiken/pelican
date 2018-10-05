// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";  
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import { toggleDriverStatus } from "./../../actions/index";
import withAuth from "../higherOrder/withAuth";
import LoadingScreen from "../loadingScreen";
import utils from "../../assets/utils";
import { connect } from "react-redux";
import "./driverStatus.scss";
  
const mapStateToProps = state => {
  return { isAcceptingOrders: state.isAcceptingOrders };
};

class DriverStatusDash extends React.Component {

  constructor(props) {
    super(props);  
    utils.initializeProtectedComponent.call(this, utils); 
    this.toggleStatus = this.toggleStatus.bind(this);
  } 

  toggleStatus() {
    this.props.dispatch(toggleDriverStatus());
  }
 
  render() { 
    return (
      <React.Fragment> 
      <Jumbotron id="header">
        <Row>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
            
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}  className="d-flex  flex-column align-items-center"> 
              {this.state.user.profileImage && <img className="img-responsive img-circle" src={"data:image/png;base64,"+this.state.user.profileImage} style={{width: '75px'}} />} 
              <p>{this.state.user.firstName} {this.state.user.lastName}</p>
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
          </Col>
        </Row>
      </Jumbotron>
      <Row id="body">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
          
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}} className="d-flex  flex-column align-items-center"> 
            <p>You are currently {this.props.isAcceptingOrders == 1 ? "ONLINE" : "OFFLINE"} for deliveries.</p>

            <Button block={true} onClick={this.toggleStatus} color={this.props.isAcceptingOrders == 1 ? "primary": "secondary"}>
                {this.props.isAcceptingOrders == 1 ? "OFFLINE" : "ONLINE"}
            </Button>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row>
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </React.Fragment> 
    );
  }
};

DriverStatusDash = connect(mapStateToProps)(withRouter(withAuth(DriverStatusDash)));

export default DriverStatusDash; 