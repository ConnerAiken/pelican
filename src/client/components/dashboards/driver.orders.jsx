// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";
import { Container, Row, Col, Button, Card, ButtonGroup, CardText, CardBody, CardTitle, CardSubtitle, Media } from 'reactstrap'; 
import './../../../../node_modules/toastr/build/toastr.css';     
import LoadingScreen from "../loadingScreen"; 
import utils from "../../assets/utils";
import { withRouter, Redirect } from 'react-router-dom';
  
import "./driver.orders.scss";

const mapStateToProps = state => {
  return { 
          store: state.store,
          order: state.cart
         };
};


class DriverOrders extends React.Component {

  constructor(props) {
    super(props);   
    this.renderRequests = this.renderRequests.bind(this);

    utils.initializeProtectedComponent.call(this, utils);   
    this.state.requests = [];
    this.state.pendingRequest = true;
  }

  componentDidMount() {
    return axios.get('/api/v1/order/available', this.opts).then((response) => {    
      this.setState({pendingRequest: false, requests: response.data}); 
    }); 
  }
  
  generateOrder(order) {
    console.log(item);
    return (
      <React.Fragment key={Math.random()}>  
        <Media className="card-title-wrapper">
          <Media left href="#" className="align-self-center">
            <Media object className="img-fluid" src="https://via.placeholder.com/150x150"  style={{width: '65px'}} alt="Generic placeholder image" />
          </Media>
          <Media body>
            <div className="card-title">
              <p>{order.requestor ? order.requestor.fullName : null}</p>
              <p>{order.requestor ? order.requestor.phone : null} &nbsp;&nbsp;
              <i style={{color: 'blue'}} className="fa fa-phone"></i>&nbsp;&nbsp;
              <i style={{color: 'green'}} className="fa fa-info-circle"></i></p>
            </div>
            <div className="card-subtitle"> 
              <p><b>Product</b>: {order.items ? order.items.length : 'Unknown'} products</p>
              <p><b>Price</b>: {order.items ? order.items.length : 'Unknown'} <span style={{color: 'orange'}}>$350</span></p>
              <p><b>Distance</b>: {order.distance ? 10 + " miles" : 'Unknown'}</p>
              <p><b>Shipping</b>: <Button size={"sm"} color={"warning"}>{order.shippingCost ? order.shippingCost : 'Unknown'}</Button></p>
            </div> 
            </Media>
        </Media>  
        <Row className="card-metadata-wrapper"> 
          <Col xs={{size: 6}}  sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>  
              <p style={{textAlign: 'left'}}><i className="fa fa-map-marker"></i>&nbsp;&nbsp;{}</p>
          </Col>  
          <Col xs={{size: 6}}  sm={{size: 6}} md={{size: 6}} lg={{size: 6}}></Col> 
        </Row>
      <br/>
    </React.Fragment> 
      );
  }

  renderRequests() {
    return this.state.requests.slice(0).map(item => this.generateOrder(item));
  }

  render() {
    return (
      <Container className="container dashboard" fluid={true}> 
      <Row>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>   
        </Col>
        <Col xs={{size: 10}} sm={{size: 10}} md={{size: 8}} lg={{size: 8}}> 
            <i class="fa fa-info-circle"></i>&nbsp;
            <b>REQUEST</b>&nbsp;
            <i class="fa fa-info-circle"></i>&nbsp;
            <i class="fa fa-info-circle"></i>&nbsp;
            <i class="fa fa-info-circle"></i>&nbsp;
            <i class="fa fa-info-circle"></i>&nbsp;
            <br/>
            <p>You have {this.state.requests.length} buyer's requests.</p>
        </Col>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>  
        </Col>
      </Row>  
      <Row>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>   
        </Col>
        <Col xs={{size: 10}} sm={{size: 10}} md={{size: 8}} lg={{size: 8}}> 
          {this.state.requests && this.renderRequests()}
        </Col>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>  
        </Col>
      </Row>  
        {this.state.pendingRequest ? <LoadingScreen/> : null}
      </Container> 
    );
  }
};

export default withRouter(DriverOrders);
