// Node.JS
import React from "react"; 
import utils from "./../assets/utils";
import "./loadingScreen.scss";

class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);  
    this.state = {
        visible: !this.props.visible
    }
    utils.initializeProtectedComponent.call(this, utils); 
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