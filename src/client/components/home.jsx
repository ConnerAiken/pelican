// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../node_modules/toastr/build/toastr.css';    
import header from "./../assets/img/header.png"; 
import { withRouter, Redirect } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import './home.scss';

const LgnBtn = withRouter(({ history }) => (
  <Button className="btn-deep-orange btn-block" id="login-btn" onClick={() => { history.push('/map'); return <Redirect to="/map"/>; }}>
    LOGIN
  </Button>
))
const SignBtn = withRouter(({ history }) => ( 
    <a onClick={() => { history.push('/signup'); return <Redirect to="/signup"/>; }}>
      CREATE NEW ACCOUNT
    </a> 
))

class Signup extends React.Component {

  constructor(props) {
    super(props); 
    this.handleChange = this.handleChange.bind(this); 
    this.state = {
      email: 'john.smith@gmail.com',
      password: 'testpass'
    };
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

  componentDidUpdate() {
    console.log(this.state);
  }
 
  render() {
    return (
      <Container id="main" className="container home" fluid={true}>
          <Row fluid={true}>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
              &nbsp;
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
                <img src={header}/>
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}} id="form-col"> 
                <form> 
                  <Input icon="envelope" type="email" error="wrong" success="right" value={this.state.email}/><br/>
                  <Input label="Type your password" icon="lock" type="password" value={this.state.password}/>
                  <Row>  
                    <Col xs={{size: 6, offset: 0}} sm={{size: 6, offset: 0}} md={{size: 6, offset: 0}} lg={{size: 6, offset: 0}}>
                      <br/>
                      <LgnBtn/> 
                    </Col>
                    <Col xs={{size: 6, offset: 0}} sm={{size: 6, offset: 0}} md={{size: 6, offset: 0}} lg={{size: 6, offset: 0}} style={{textAlign: 'right', divor: 'white'}}>
                      <br/>
                      <a id="forgot-link" href="#">Forgot Password?</a>
                    </Col>
                  </Row> 
                </form> 
            </Col>
            <Col xs={{size: 12}} sm={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}} id="footer-col">
                <SignBtn/>
            </Col>
          </Row>
      </Container>
    );
  }
};

export default Signup;
 