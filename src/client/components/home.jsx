// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../node_modules/toastr/build/toastr.css';    
import header from "./../assets/img/header.png";  
import { withRouter, Redirect } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import axios from "axios";
import './home.scss';
  
export class Home extends React.Component {

  constructor(props) {
    super(props); 
    this.handleChange = this.handleChange.bind(this); 
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.state = {
      email: 'john.smith@gmail.com',
      password: 'testpass'
    };
  }

  decodeToken(token) {
      const components = token.split('.');
      const base64url = components[1];
      try {
          //Convert base 64 url to base 64
          var base64 = base64url.replace('-', '+').replace('_', '/')
          //atob() is a built in JS function that decodes a base-64 encoded string
          var utf8 = atob(base64)
          //Then parse that into JSON
          var json = JSON.parse(utf8)
          //Then make that JSON look pretty
          var json_string = JSON.stringify(json, null, 4)
      } catch (err) {
          json_string = "Bad Section.\nError: " + err.message
      }
      return json_string
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleRegister(e) { 
    this.props.history.push('/signup'); 
    return <Redirect to="/signup"/>;
  }

  handleLogin(e) {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    }; 
    const history = this.props.history;

    return axios.post('/api/v1/user/login', {
      email: this.state.email,
      password: this.state.password
    }, headers)
    .then((response) => {   
      localStorage.setItem('profileImage', response.data.payload && response.data.payload.profileImage ? response.data.payload.profileImage : false);
      localStorage.setItem('token', response.data.token);
      toastr.success("Successfully logged in.."); 
      history.push("/map"); 
      return <Redirect to="/map"/>;
    }).catch(request => {   
      if(request.response && request.response.data && request.response.data.failed) {  
        if(request.response.data.failed == "No relevant user") { 
          toastr.info("We could not find a user with that email, please use the sign up form.");
        }
        toastr.error(request.response.data.failed); 
      }else {
        console.log(request);
      }
    });
  }

  getValidationState() {
    const length = this.state.email.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  } 

  handleForgotPassword() {

  }
 
  render() {
    return withRouter(
      <Container id="main" className="container home" fluid={true}>
          <Row>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
              &nbsp;
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
                <img src={header}/>
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}} id="form-col"> 
                <form> 
                  <Input icon="envelope" type="email" error="wrong" success="right" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                  <Input label="Type your password" icon="lock" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                  <Row>  
                    <Col xs={{size: 6, offset: 0}} sm={{size: 6, offset: 0}} md={{size: 6, offset: 0}} lg={{size: 6, offset: 0}}>
                      <br/>
                      <Button className="btn-deep-orange btn-block" id="login-btn" onClick={this.handleLogin}>
                        LOGIN
                      </Button>
                    </Col>
                    <Col xs={{size: 6, offset: 0}} sm={{size: 6, offset: 0}} md={{size: 6, offset: 0}} lg={{size: 6, offset: 0}} style={{textAlign: 'right', divor: 'white'}}>
                      <br/>
                      <a id="forgot-link" onClick={this.handleForgotPassword} href="#">Forgot Password?</a>
                    </Col>
                  </Row> 
                </form> 
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}} id="footer-col"> 
                <a onClick={this.handleRegister}>
                  CREATE NEW ACCOUNT
                </a> 
            </Col>
          </Row>
      </Container>
    );
  }
}; 
 