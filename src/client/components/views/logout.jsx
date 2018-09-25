// Node.JS
import React from "react";  
import { withRouter } from 'react-router-dom'; 
import AuthService from "./../../services/Auth";
  
class Logout extends React.Component {

  constructor(props) {
    super(props); 
    this.Auth = new AuthService();
  }
  
 
  render() { 
    this.Auth.logout();
    this.props.history.push('/login'); 
    return <p style={{padding: '5%', textAlign: 'center'}}>Logging out..</p>;
  }

}; 

export default withRouter(Logout);