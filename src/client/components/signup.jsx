// Node.JS
import React from "react"; 
import toastr from "toastr";
import { withRouter, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import './../../../node_modules/toastr/build/toastr.css';    
import "./signup.scss";

const BackBtn = withRouter(({ history }) => (
  <i className="fa fa-chevron-left fa-2x" onClick={() => { history.push('/'); return <Redirect to="/"/>; }}/> 
));

const BrowseBtn = () => (
  <Button className="btn-deep-orange" id="browse-btn">
    BROWSE
  </Button>
);

class Signup extends React.Component {

  constructor(props) {
    super(props); 
    this.handleSave = this.handleSave.bind(this); 
    this.handleBrowse = this.handleBrowse.bind(this);
    this.state = { 
      userType: false
    };  
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleSave(e) {
    console.log(e);
    toastr.info("Thanks, saving!");
  }
  
  handleBrowse(e) {
    console.log(e);
  }
 
  render() {
    let accountSpecifics = null;

    if(this.state.userType == "seller") {

      accountSpecifics = () => ( 
        <Row fluid={true}> 
          <Col xs={{size: 2}} sm={{size: 2}} md={{size: 2}} lg={{size: 2}}>
              <i class="fa fa-house fa-3x"></i>
          </Col>  
          <Col xs={{size: 10}} sm={{size: 10}} md={{size: 10}} lg={{size: 10}}> 
              <p>Store Images</p>
              <b>Click Here</b>
          </Col>   
        </Row>
      );
    }else if(this.state.userType == "shipper") {
      accountSpecifics = () => ( 
          <Row fluid={true}> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}}>
                <i class="fa fa-car fa-3x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Vehicle Info</p>
                <Input name="vehicleType" id="vehicleType" type="text" placeholder="Type of vehicle"/> 
                <Input name="vehiclePlate" id="vehiclePlate" type="text" placeholder="Vehicle plate"/> 
                <p>Vehicle Image</p>
                <b>Click Here</b>
            </Col>   
          </Row>
        );
    }else if(this.state.userType == "client") {
      accountSpecifics = () => ( 
          <Row fluid={true}> 
            <Col xs={{size: 2}} sm={{size: 2}} md={{size: 2}} lg={{size: 2}}>
                <i class="fa fa-info-circle fa-3x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Description</p>
                <Input name="description" id="description" type="text"/> 
            </Col>   
          </Row>
        );
    }

    return (
      <Container id="main" className="container signup" fluid={true}>
      <form> 
      <Row fluid={true} id="top-toolbar">
        <Col xs={{size: 3, offset: 1}} sm={{size: 3, offset: 1}} md={{size: 3, offset: 1}} lg={{size: 3, offset: 1}} className="d-flex justify-content-start align-items-center">
          <BackBtn/> 
        </Col> 
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}} className="d-flex justify-content-center align-items-center">
          <h2>Register</h2>
        </Col> 
        <Col xs={{size: 3}} sm={{size: 3}} md={{size: 3}} lg={{size: 3}} className="d-flex justify-content-end align-items-center">
          <i className="fa fa-floppy-o fa-2x" onClick={this.handleSave}/>
        </Col> 
      </Row>
          <Row fluid={true} className="input-row">
            <Col xs={{size: 10, offset: 1}} sm={{size: 10, offset: 1}} md={{size: 10, offset: 1}} lg={{size: 10, offset: 1}} className="d-flex justify-content-center align-items-center">
              <span class="fa-stack fa-5x">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-user-o fa-stack-1x" style={{color: 'grey'}}></i>
              </span>
            </Col>   
          </Row>
          <Row fluid={true}> 
            <Col xs={{size: 10, offset: 1}} sm={{size: 10, offset: 1}} md={{size: 10, offset: 1}} lg={{size: 10, offset: 1}} className="d-flex justify-content-center align-items-center">
              <BrowseBtn onClick={this.handleBrowse}/>
            </Col>  
          </Row>
          <Row fluid={true} className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i class="fa fa-user fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Name</p>
                <Input name="name" id="name" type="text"/>
            </Col>  
          </Row>
          <Row fluid={true} className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i class="fa fa-phone fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Phone Number</p>
                <Input name="phone" id="phone" type="text"/>
            </Col>  
          </Row> 
          <Row fluid={true} className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i class="fa fa-envelope fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Email</p>
                <Input name="email" id="email" type="text"/>
            </Col>   
          </Row>
          <Row fluid={true} className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i class="fa fa-map-marker fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Address</p>
                <Input name="address" id="address" type="text"/>
                <a href="#" id="map-link">Pick to map</a>
            </Col>   
          </Row>
          <Row fluid={true} className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i class="fa fa-info-circle fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Description</p>
                <Input name="description" id="description" type="textarea"/> 
            </Col>   
          </Row>
          {accountSpecifics}
          </form>
          <br/>
      </Container> 
    ); 
  }
};

export default Signup;
 