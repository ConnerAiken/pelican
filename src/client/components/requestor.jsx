// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../node_modules/toastr/build/toastr.css';    
import { Container, Row, Col } from 'reactstrap'; 

export class Requestor extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
        visible: !this.props.destination
    }
  } 
   
  render() {
    if(!this.state.visible) return null;
    
    return ( 
      <Row id="requestor">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  

        </Col> 
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  

        </Col>
      </Row>  
    );
  }
};
 