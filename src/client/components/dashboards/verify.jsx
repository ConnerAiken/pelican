// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";  
import { Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import LoadingScreen from "../loadingScreen";
import utils from "../../assets/utils";
import "./verify.scss";
import "./dashboard.scss";
  
class Verify extends React.Component {

  constructor(props) {
    super(props);  

    this.state = {
      form: {
        questions: false
      }
    };

    this.regex = {

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

    utils.initializeProtectedComponent.call(this, utils);  
  } 

  handleFormChange(e) {
    const form = Object.assign({}, this.state.form);  

    if ((this.regex[e.target.name] && this.regex[e.target.name].test(e.target.value)) || !this.regex[e.target.name]) {  
       form[e.target.name] = e.target.value; 
       this.setState({form, error: false});
    }else { 
        form[e.target.name] = false;
        console.log(form);
        this.setState({form, error: true}); 
    }       

  }

  handleSubmit(e) {
    e.preventDefault();
      
    this.setState({pendingRequest: true}); 
    this.Auth.fetch('/api/v1/user/verification', {
        method: 'POST',
        body: JSON.stringify(this.state.form)
    })
    .then(res => toastr.success("Verification submitted..") && this.props.history.replace('/dashboard'))
    .catch(err => console.log(err) && toastr.error(err) && this.setState({pendingRequest: false})); 
  }
 
  render() {
    console.log("Rendering verification");

    return (
      <Container className="container dashboard" fluid={true}> 
      <Row id="header">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
          
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <h3 style={{textAlign: 'center'}}>Verification Process</h3>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row>
      <form onSubmit={this.handleSubmit}> 
      <Row className="form">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
          
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <p>More to come with Trulioo..</p>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row>
      <Row className="form">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
          
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <Button color="success" block={true} type="submit">Submit</Button>
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