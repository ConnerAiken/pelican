// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Input } from 'reactstrap'; 
import {FileUpload} from "../fileUpload";
import LoadingScreen from "../loadingScreen";
import utils from "./../../assets/utils";
import './../../../../node_modules/toastr/build/toastr.css';    
import "./profile.scss";
  

class DriverProfile extends React.Component {

  constructor(props) {
    super(props); 
    utils.initializeProtectedComponent.call(this, utils);

    this.handleSave = this.handleSave.bind(this); 
    this.handleLicenseImage = this.handleLicenseImage.bind(this);
    this.handleProfileImage = this.handleProfileImage.bind(this);
    this.handleVehicleImage = this.handleVehicleImage.bind(this); 
    this.regex = {  
      firstName: /(.*[a-z]){3}/i,
      lastName: /(.*[a-z]){3}/i, 
      addressLine1: /(.*[a-z]){3}/i, 
      city: /(.*[a-z]){3}/i,
      state: /(.*[a-z]){2}/i,
      zipCode: /(.*[0-9]){3}/i,
      email:  	
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 
    };

    this.state = {   
      form: {
        accountType: 'client',
        firstName: this.state.user.firstName || "",
        lastName: this.state.user.lastName || "",
        phone:  this.state.user.phone || "",
        password: '******',
        description:  this.state.user.description || "", 
        vehicleType:  this.state.user.vehicleType || "",
        vehiclePlate:  this.state.user.vehiclePlate || "",
        vehicleColor: this.state.user.vehicleColor || "",
        vehicleImage: this.state.user.vehicleImage || "",
        licenseImage: this.state.user.licenseImage || "",
        profileImage: this.state.user.profileImage || "",
        addressLine1: this.state.user.addressLine1 || "",
        addressLine2: this.state.user.addressLine2 || "",
        city:  this.state.user.city || "",
        state:  this.state.user.state || "",
        country:  this.state.user.country || "",
        zipCode:  this.state.user.zipCode || "",
      },
      error: false,
      pendingRequest: false
    };  

    this.handleFormChange = this.handleFormChange.bind(this);
  } 

  handleFormChange(e) {
    const form = Object.assign({}, this.state.form);  
    if ((this.regex[e.target.name] && this.regex[e.target.name].test(e.target.value)) || !this.regex[e.target.name]) {  
       form[e.target.name] = e.target.value; 
       this.setState({form, error: false});
    }else { 
        form[e.target.name] = false; 
        this.setState({form, error: true}); 
    }         
  }

  handleSave(e) {    
    e.preventDefault();
    
    if(this.state.form.accountType == "driver" && !this.state.form.vehicleImage) {
      toastr.error("You must upload a vehicle image.");
      return;
    }else if(!this.state.form.licenseImage) {
      toastr.error("You must upload a license image.");
      return;
    }

    this.setState({pendingRequest: true});
  
     
    axios.post('/api/v1/user/update', this.state.form, {
      'Content-Type': 'application/json;charset=UTF-8'
    })
    .then(response => {  
      toastr.success("Please sign in."); 
      this.props.history.push('/');
    }).catch(request => { 
      if(request.response && request.response.data && request.response.data.error) {  
        toastr.error(request.response.data.error); 
      }else {
        console.log(request);
      }
    }).then(() => this.setState({pendingRequest: false}));
  } 

  handleVehicleImage(imageUrl) {
    const form = Object.assign({}, this.state.form);
    form.vehicleImage = imageUrl;
    this.setState({form: form});
  }

  handleLicenseImage(imageUrl) {
    const form = Object.assign({}, this.state.form);
    form.licenseImage = imageUrl;
    this.setState({form: form});
  }

  handleProfileImage(imageUrl) {
    const form = Object.assign({}, this.state.form);
    form.profileImage = imageUrl;
    this.setState({form: form});
  }
   
 
  render() { 
    return (
      <Container id="main" className="container signup" fluid={true}>
      <form> 
      <Row id="top-toolbar">
        <Col xs={{size: 3, offset: 1}} sm={{size: 3, offset: 1}} md={{size: 3, offset: 1}} lg={{size: 3, offset: 1}} className="d-flex justify-content-start align-items-center">
        </Col> 
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}} className="d-flex justify-content-center align-items-center">
          <h2>Profile</h2>
        </Col> 
        <Col xs={{size: 3}} sm={{size: 3}} md={{size: 3}} lg={{size: 3}} className="d-flex justify-content-end align-items-center">
        </Col> 
      </Row>
          <Row className="input-row">
            <Col xs={{size: 10, offset: 1}} sm={{size: 10, offset: 1}} md={{size: 10, offset: 1}} lg={{size: 10, offset: 1}} className="d-flex flex-column justify-content-center align-items-center">
              { this.state.form.profileImage ? <img src={"data:image/png;base64,"+this.state.form.profileImage}  style={{width: '250px'}}/> : (<span className="fa-stack fa-5x">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-user-o fa-stack-1x" style={{color: 'grey'}}></i>
              </span>) }
              <br/>
              {this.state.form.firstName ? <p>{this.state.form.firstName} {this.state.form.lastName}</p> : null }
              <br/>
              { this.state.form.profileImage ? null : <FileUpload onFinish={this.handleProfileImage} styles={{input: {width: '25%'}, btn: {}}} name="profileImage"/>}
            </Col>   
          </Row> 
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-envelope fa-2x formIcon"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Email</p>
                <Input invalid={this.state.form.email === false} valid={this.state.form.email  != false} required onChange={this.handleFormChange} name="email" id="email" type="text" placeholder=""/>
                {this.state.form.email === false ? <p>Please enter a valid email.</p> : null}
            </Col>   
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-key fa-2x formIcon"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Password</p>
                <Input invalid={this.state.form.password === false} valid={this.state.form.password  != false}  required onChange={this.handleFormChange} name="password" id="password" type="password" placeholder=""/>
                {this.state.form.password === false ? <p>Passwords must have atleast one digit, symbol, upper/lowercase, and contain 8 or more characters.</p> : null}
            </Col>   
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-address-card-o fa-2x formIcon"/>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Account Type</p> 
                <Input required onChange={this.handleFormChange} type="select" name="accountType" id="accountType" defaultValue="client">
                  <option value="store">Store</option>
                  <option value="driver">Driver</option> 
                  <option value="client">Customer</option> 
                </Input>
            </Col>  
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-user fa-2x formIcon"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
              <Row>
                <Col xs={{size: 12}} sm={{size: 12}} md={{size: 5}} lg={{size: 5}}> 
                    <p>First Name</p>
                    <Input invalid={this.state.form.firstName === false} valid={this.state.form.firstName != false} required onChange={this.handleFormChange} name="firstName" id="firstName" type="text" placeholder=""/>
                    {this.state.form.firstName === false ? <p>Please enter a first name.</p> : null}
                </Col>
                <Col xs={{size: 12}} sm={{size: 12}} md={{size: 5, offset: 2}} lg={{size: 5, offset: 2}}> 
                    <p>Last Name</p>
                    <Input invalid={this.state.form.lastName === false} valid={this.state.form.lastName != false} required onChange={this.handleFormChange} name="lastName" id="lastName" type="text" placeholder=""/>
                    {this.state.form.lastName === false ? <p>Please enter a last name.</p> : null}
                </Col>
              </Row> 
            </Col>  
          </Row>
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-phone fa-2x formIcon"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <p>Phone Number</p>
                <Input invalid={this.state.form.phone === false} valid={this.state.form.phone != false}  required onChange={this.handleFormChange}  name="phone" id="phone" type="text" placeholder=""/>
                {this.state.form.phone === false ? <p>Phone numbers should be 9 digits long and includes dashes and the area code.</p> : null}
            </Col>  
          </Row>  
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-map-marker fa-2x formIcon"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <Row className="addressRow">
                  <Col xs={12} sm={12} md={12} lg={12}> 
                    <p>Address Line 1</p>
                    <Input valid={this.state.form.addressLine1  != false} invalid={this.state.form.addressLine1 === false}  required onChange={this.handleFormChange} name="addressLine1" id="addressLine1" type="text" placeholder=""/>
                    <a  id="map-link">Pick to map</a>
                    {this.state.form.addressLine1 === false ? <p>Street address, P.O. box, company name</p> : null}
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}> 
                    <p>Address Line 2</p>
                    <Input valid={this.state.form.addressLine2  != false} invalid={this.state.form.addressLine2 === false}  required onChange={this.handleFormChange} name="addressLine2" id="addressLine2" type="text" placeholder=""/>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}> 
                    <p>City</p>
                    <Input valid={this.state.form.city  != false} invalid={this.state.form.city === false}  required onChange={this.handleFormChange} name="city" id="city" type="text" placeholder=""/>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}> 
                    <p>State</p>
                    <Input valid={this.state.form.state  != false} invalid={this.state.form.state === false}  required onChange={this.handleFormChange} name="state" id="state" type="select" defaultValue="WA">
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </Input>
                  </Col>
                  <Col xs={6} sm={6} md={4} lg={4}> 
                    <p>ZipCode</p>
                    <Input valid={this.state.form.zipCode  != false} invalid={this.state.form.zipCode === false}  required onChange={this.handleFormChange} name="zipCode" id="zipCode" type="text" placeholder=""/>
                  </Col>
                  <Col xs={6} sm={6} md={{size: 6, offset: 2}} lg={{size: 6, offset: 2}}> 
                    <p>Country</p>
                    <Input valid={this.state.form.country  != false} invalid={this.state.form.country === false} required onChange={this.handleFormChange} name="country" id="country" type="select" defaultValue="United States">
                        <option value="US">United States</option>
                    </Input>
                  </Col>
                </Row>  
            </Col>   
          </Row>  
          <Row className="input-row"> 
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center" >
                <i className="fa fa-id-card fa-2x formIcon"></i>
            </Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}} className="d-flex justify-content-left flex-column ">
                <p>License Image</p> 
                { this.state.form.licenseImage ? <img src={this.state.form.licenseImage} style={{width: '50%'}}/> : <FileUpload style={{width: '25%'}} containerStyle={{width: '25%', background: 'none', boxShadow: 'none'}} onFinish={this.handleLicenseImage} name="licenseImage"/> }<br/>
            </Col>  
          </Row>  
          <Row className="input-row">  
            <Col xs={{size: 1, offset: 1}} sm={{size: 1, offset: 1}} md={{size: 1, offset: 1}} lg={{size: 1, offset: 1}} className="d-flex justify-content-center"></Col>  
            <Col xs={{size: 9}} sm={{size: 9}} md={{size: 9}} lg={{size: 9}}>
                <Button disabled={this.state.error} onClick={this.handleSave} color="success" block={true}>Update</Button>
            </Col>   
          </Row>
          </form> 
          <br/>
          {this.state.pendingRequest ? <LoadingScreen/> : null}
      </Container> 
    ); 
  }
};
 
export default withRouter(DriverProfile);