// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../../node_modules/toastr/build/toastr.css';    
import header from "./../../assets/img/header.png";  
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import AuthService from '../../services/Auth';
import axios from "axios";
import LoadingScreen from "../loadingScreen";
import utils from "../../assets/utils";
import './login.scss'; 

class Login extends React.Component {

  constructor(props) {
    super(props); 
    this.handleChange = this.handleChange.bind(this); 
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handlePrivacyPolicy = this.handlePrivacyPolicy.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    
    this.Auth = new AuthService();
    this.state = {
      pendingRequest: false,
      email: '',
      password: ''
    };
  } 

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  } 
  handlePrivacyPolicy(e) {  
    this.props.history.push('/privacy'); 
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

    this.setState({pendingRequest: true}); 
    this.Auth.login(this.state.email, this.state.password)
              .then(res => toastr.success("Logging in..") && this.props.history.push('/dashboard'))
              .catch(err => { 
                toastr.error('Invalid credentials');
                this.setState({pendingRequest: false});
              });
  }
 
  componentWillMount(){
      if(this.Auth.loggedIn())
          this.props.history.push('/dashboard');
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
      alert("This functionality has not been completed yet.");
  }
 
  render() {
    
    return (
      <Container id="main" className="container home" fluid={true}>
          <Row>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}} className="text-center" id="header-col"> 
                <a id="privacy-link"  onClick={this.handlePrivacyPolicy}>
                  PRIVACY POLICY
                </a> 
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
                      <Button style={{backgroundColor: 'rgb(247, 111, 64)', borderColor: 'rgb(247, 111, 64)', color: 'white'}} color="warning" block={true} type="submit"  id="login-btn">
                        LOGIN
                      </Button>
                    </Col>
                    <Col xs={{size: 6, offset: 0}} sm={{size: 6, offset: 0}} md={{size: 6, offset: 0}} lg={{size: 6, offset: 0}} style={{textAlign: 'right', divor: 'white'}}>
                      <br/>
                      <a id="forgot-link" onClick={this.handleForgotPassword} >Forgot Password?</a>
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

export default withRouter(Login);