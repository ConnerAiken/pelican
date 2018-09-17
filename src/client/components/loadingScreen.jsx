// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../node_modules/toastr/build/toastr.css';    
import { Container, Row, Col } from 'reactstrap'; 
import "./loadingScreen.scss";

class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
        visible: !this.props.visible
    }
  } 
   
  render() {
    if(!this.state.visible) return null;
    
    return ( 
      <div id="loadingScreen" className="d-flex justify-content-center align-items-center">
         <div className="loader">Loading...</div>
      </div>  
    );
  }
};
 
export default LoadingScreen;