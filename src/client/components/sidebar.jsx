// Node.JS
import React from "react"; 
import { Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter, Redirect } from 'react-router-dom';
import "./sidebar.scss";
import utils from "../assets/utils"; 
 
// Src: https://bootstrapious.com/p/bootstrap-sidebar

class Sidebar extends React.Component {

  constructor(props) {
    super(props);   

    this.state = { 
      user: utils.decodeToken(localStorage.getItem("token")),
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
    };

    console.log(this.state);
 
    this.state.user.profileImage = localStorage.getItem("profileImage").length > 10 ? 'data:image/jpg;base64,'+localStorage.getItem("profileImage") : false;   
  }

  checkToken() {   
    axios.get('/api/v1/health-check', this.opts)
    .then(function(response) {   
      console.log(response);
    }).catch(request => {   
      console.log(request);
    });
  }
   

  render() {
    return (
      <Container className="container navbar" fluid={true}> 
      <Row>   
        <Col xs={12} sm={12} md={12} lg={12} id="nav" >
        <div className="sidebar-header"> 
            <h3>Pelican</h3>
            {this.state.user.profileImage && <img className="img-responsive img-circle" src={this.state.user.profileImage} style={{width: '75px'}} />} 
            <p>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</p>  
        </div>

        <ul className="list-unstyled components"> 
            {/* <li class="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>  */}
            <li className="active">
                <a href="#"><i className="fa fa-home"></i>   Home</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-user-circle-o"></i>   Profile</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-credit-card"></i>   Payment</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-share-alt"></i>   Share</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-question-circle-o"></i>   Help</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-history"></i>   Histories</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-shopping-cart"></i>   My Cart</a>
            </li>
        </ul>
        </Col> 
      </Row> 
      </Container> 
    );
  }
};

export default withRouter(Sidebar);