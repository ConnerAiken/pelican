// Node.JS
import React from "react";  
import { withRouter } from 'react-router-dom'; 
import utils from "../../assets/utils"; 
  
class Logout extends React.Component {

  constructor(props) {
    super(props); 
    utils.initializeProtectedComponent.call(this, utils);
  }
  
 
  render() { 
    this.Auth.logout();
    this.props.history.replace('/login');

    return <p style={{padding: '5%', textAlign: 'center'}}>Logging out..</p>;
  }

}; 

export default withRouter(Logout);