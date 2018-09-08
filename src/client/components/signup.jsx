// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";
import { withRouter, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button, Input } from 'reactstrap'; 
import './../../../node_modules/toastr/build/toastr.css';    
import "./signup.scss";
 

const BackBtn = withRouter(({ history }) => (
  <i className="fa fa-chevron-left fa-2x" onClick={() => { history.push('/'); return <Redirect to="/"/>; }}/> 
));

const BrowseBtn = () => (
  <Button type="button" className="btn-deep-orange" id="browse-btn">
    BROWSE 
  </Button> 
);

class Signup extends React.Component {

  constructor(props) {
    super(props); 
    this.handleSave = this.handleSave.bind(this); 
    this.handleBrowse = this.handleBrowse.bind(this);
    
    this.regex = {  
      firstName: /(.*[a-z]){3}/i,
      lastName: /(.*[a-z]){3}/i, 
      address: /(.*[a-z]){3}/i,
      email:  	
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 
    };

    this.state = {  
      form: {
        accountType: 'store',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        password: '',
        description: '', 
        vehicleType: '',
        vehiclePlate: ''
      }
    };  

    this.handleFormChange = this.handleFormChange.bind(this);
  } 

  handleFormChange(e) {
    const form = Object.assign({}, this.state.form);  
    if ((this.regex[e.target.name] && this.regex[e.target.name].test(e.target.value)) || !this.regex[e.target.name]) { 
       form[e.target.name] = e.target.value;
       this.setState({form});
    }else { 
        form[e.target.name] = false;
        this.setState({form}); 
    }         
  }

  handleSave(e) {    
    const history = this.props.history; 
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    };
     
    axios.post('/api/v1/user/register', this.state.form, headers)
    .then(response => { 
      toastr.success("Please sign in.");
      history.push('/'); 
      return <Redirect to="/"/>; 
    }).catch(err => {
      toastr.error(err.message); 
    });
  } 

  handleBrowse(e) {
    console.log(e);
  }
 
  render() {
    let accountSpecifics = null;

    if(this.state.form.accountType == "seller") { 
      accountSpecifics = () => (  
        <Row className="input-row"> 
          <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
              <i className="fa fa-info-circle fa-2x"></i>
          </Col>  
          <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
              <p>Description</p>
              <Input invalid={this.state.form.description === false} onChange={this.handleFormChange} name="description" id="description" type="textarea"/> 
              {this.state.form.description === false ? <p>Please enter a description of your company.</p> : null}
          </Col>   
        </Row>
      );
    }else if(this.state.form.accountType == "shipper") {
      accountSpecifics = () => ( 
          <Row> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}}>
                <i className="fa fa-car fa-3x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Vehicle Info</p>
                <Input onChange={this.handleFormChange} name="vehicleType" id="vehicleType" type="text" placeholder="Type of vehicle"/> 
                <Input onChange={this.handleFormChange} name="vehiclePlate" id="vehiclePlate" type="text" placeholder="Vehicle plate"/> 
                <p>Vehicle Image</p>
                <b>Click Here</b>
            </Col>   
          </Row>
        );
    }else if(this.state.form.accountType == "client") {
      accountSpecifics = () => null;
    }

    return (
      <Container id="main" className="container signup" fluid={true}>
      <form> 
      <Row id="top-toolbar">
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
          <Row className="input-row">
            <Col xs={{size: 10, offset: 1}} sm={{size: 10, offset: 1}} md={{size: 10, offset: 1}} lg={{size: 10, offset: 1}} className="d-flex justify-content-center align-items-center">
              { this.state.imageUploaded ? <img id='imgUpload'/> : (<span className="fa-stack fa-5x">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-user-o fa-stack-1x" style={{color: 'grey'}}></i>
              </span>) }
            </Col>   
          </Row>
          <Row> 
            <Col xs={{size: 10, offset: 1}} sm={{size: 10, offset: 1}} md={{size: 10, offset: 1}} lg={{size: 10, offset: 1}} className="d-flex justify-content-center align-items-center">
                <BrowseBtn onClick={this.handleBrowse}/>
            </Col>  
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-envelope fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Email</p>
                <Input invalid={this.state.form.email === false} valid={this.state.form.email  != false} required onChange={this.handleFormChange} name="email" id="email" type="text" placeholder="john.smith@gmail.com"/>
                {this.state.form.email === false ? <p>Please enter a valid email.</p> : null}
            </Col>   
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-key fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Password</p>
                <Input invalid={this.state.form.password === false} valid={this.state.form.password  != false}  required onChange={this.handleFormChange} name="password" id="password" type="password" placeholder="*********"/>
                {this.state.form.password === false ? <p>Passwords must have atleast one digit, symbol, upper/lowercase, and contain 8 or more characters.</p> : null}
            </Col>   
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-address-card-o fa-2x"/>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Account Type</p> 
                <Input required onChange={this.handleFormChange} type="select" name="accountType" id="accountType">
                  <option value="seller">Store</option>
                  <option value="shipper">Driver</option> 
                  <option value="client">Customer</option> 
                </Input>
            </Col>  
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-user fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
              <Row>
                <Col xs={{size: 12}} sm={{size: 12}} md={{size: 5}} lg={{size: 5}}> 
                    <p>First Name</p>
                    <Input invalid={this.state.form.firstName === false} valid={this.state.form.firstName != false} required onChange={this.handleFormChange} name="firstName" id="firstName" type="text" placeholder="John"/>
                    {this.state.form.firstName === false ? <p>Please enter a first name.</p> : null}
                </Col>
                <Col xs={{size: 12}} sm={{size: 12}} md={{size: 5, offset: 2}} lg={{size: 5, offset: 2}}> 
                    <p>Last Name</p>
                    <Input invalid={this.state.form.lastName === false} valid={this.state.form.lastName != false} required onChange={this.handleFormChange} name="lastName" id="lastName" type="text" placeholder="Smith"/>
                    {this.state.form.lastName === false ? <p>Please enter a last name.</p> : null}
                </Col>
              </Row> 
            </Col>  
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-phone fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Phone Number</p>
                <Input invalid={this.state.form.phone === false} valid={this.state.form.phone != false}  required onChange={this.handleFormChange}  name="phone" id="phone" type="text" placeholder="999-888-7777"/>
                {this.state.form.phone === false ? <p>Phone numbers should be 9 digits long and includes dashes and the area code.</p> : null}
            </Col>  
          </Row>  
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-map-marker fa-2x"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Address</p>
                <Input valid={this.state.form.address  != false} invalid={this.state.form.address === false}  required onChange={this.handleFormChange} name="address" id="address" type="text" placeholder="1234 easy street, tukwila wa 98031"/>
                <a href="#" id="map-link">Pick to map</a>
                {this.state.form.address === false ? <p>Please enter your full address including city, state and zipcode.</p> : null}
            </Col>   
          </Row> 
          {accountSpecifics}
          <Row className="input-row">  
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center"></Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <Button onClick={this.handleSave} color="success" block={true}>Register</Button>
            </Col>   
          </Row>
          </form> 
          <br/>
      </Container> 
    ); 
  }
};

export default withRouter(Signup);
 