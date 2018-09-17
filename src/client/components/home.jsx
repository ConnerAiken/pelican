// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../node_modules/toastr/build/toastr.css';    
import header from "./../assets/img/header.png";  
import { withRouter, Redirect } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import axios from "axios";
import LoadingScreen from "./loadingScreen.jsx";
import './home.scss';
  
class Home extends React.Component {

  constructor(props) {
    super(props); 
    this.handleChange = this.handleChange.bind(this); 
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.state = {
      pendingRequest: false,
      email: '',
      password: ''
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
  }

  handleLogin(e) {
    e.preventDefault();

    if(!this.state.email || !this.state.password) {
      toastr.error("Please provide credentials.");
      return;
    }
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    };  

    this.setState({pendingRequest: true});

    axios.post('/api/v1/user/login', {
      email: this.state.email,
      password: this.state.password
    }, headers)
    .then((response) => {   
      console.log(response);
      localStorage.setItem('profileImage', response.data.payload && response.data.payload.profileImage ? response.data.payload.profileImage : false);
      localStorage.setItem('userInfo', JSON.stringify(response.data.payload));
      localStorage.setItem('token', response.data.token);
      this.setState({pendingRequest: false});  
      this.props.history.push('/map');  
    }).catch(request => {   
      console.log(request);
      if(request.response && request.response.data && request.response.data.failed) {   
        toastr.error(request.response.data.failed); 
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
    return (
      <Container id="main" className="container home" fluid={true}>
          <Row>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
              &nbsp;
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
                <img src={header}/>
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}} id="form-col"> 
                <form onSubmit={this.handleLogin}> 
                  <Input icon="envelope" type="email" error="wrong" success="right" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                  <Input label="Type your password" icon="lock" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                  <Row>  
                    <Col xs={{size: 6, offset: 0}} sm={{size: 6, offset: 0}} md={{size: 6, offset: 0}} lg={{size: 6, offset: 0}}>
                      <br/>
                      <Button style={{backgroundColor: 'orange'}} color="warning" block={true} type="submit"  id="login-btn">
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
          {this.state.pendingRequest ? <LoadingScreen/> : null}
      </Container>
    );
  }
}; 

export default withRouter(Home);