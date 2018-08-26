// Node.JS
import React from "react"; 
import toastr from "toastr";
import './../../../node_modules/toastr/build/toastr.css';    
import "./signup.scss";

class Signup extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {}; 
  }

  componentDidUpdate() {
    console.log(this.state);
  }
 
  render() {
    return (
      <div id="main" className="signup">
        <p>Coming Soon</p>
      </div>
    );
  }
};

export default Signup;
 