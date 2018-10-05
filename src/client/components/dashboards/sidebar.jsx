// Node.JS
import React from "react"; 
import { Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter, Redirect } from 'react-router-dom';
import LoadingScreen from "./../loadingScreen";
import "./sidebar.scss";
import utils from "./../../assets/utils";  

 
// Src: https://bootstrapious.com/p/bootstrap-sidebar 

// ================
// Redux Parts
// --------
import { connect } from "react-redux";
import { toggleSidebar } from "./../../actions/index"; 
const mapStateToProps = state => { 
    return { cart: state.cart, sidebar: state.sidebar, isAcceptingOrders: state.isAcceptingOrders };
}; 
// ================
  
class Sidebar extends React.Component {

  constructor(props) {
    super(props);   
    
    this.toggleSidebar = this.toggleSidebar.bind(this); 
    this.handleLogout = this.handleLogout.bind(this);
    this.goToDriverStatus = this.goToDriverStatus.bind(this);

    utils.initializeProtectedComponent.call(this, utils);  
  } 
   
  handleNavChange(route) { 
    this.props.history.push(route);
  }

  toggleSidebar() {  
      this.props.dispatch(toggleSidebar());
  }

  handleLogout() {
    this.setState({pendingRequest: true});

    this.Auth.logout().then(e => { 
        this.props.history.push('/login');
    });
  }

  goToDriverStatus() {
    this.props.history.push('/driverStatus');
  }

  render() { 
    return (  
        <div id="nav" className={this.props.sidebar.collapsed ? "inactive": "active"} style={{height: '100%'}}> 
            {this.state.pendingRequest ? <LoadingScreen/> : null}  
            <Button id="navBtn" onClick={this.toggleSidebar}><i className="fa fa-bars"></i></Button>

            <div className="sidebar-header"> 
                <h3>Pelican</h3>
                {this.state.user.profileImage && <img className="img-responsive img-circle" src={"data:image/png;base64,"+this.state.user.profileImage} style={{width: '75px'}} />} 
                <p>{this.state.user.firstName} {this.state.user.lastName}</p>

                {this.state.user.accountType == "driver" ? <p>You are <a href="#" onClick={this.goToDriverStatus}>{this.props.isAcceptingOrders == 1 ? "online" : "offline"}</a></p> : null}
            </div>

            <ul className="list-unstyled components"> 
                {/* <li class="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a >Home 1</a>
                        </li>
                        <li>
                            <a >Home 2</a>
                        </li>
                        <li>
                            <a >Home 3</a>
                        </li>
                    </ul>
                </li>  */}
                <li className={this.props.history.location.pathname == "/dashboard" ? "active" : "inactive" } onClick={this.handleNavChange.bind(this, '/dashboard')}>
                    <a ><i className="fa fa-home"></i>&nbsp;&nbsp;&nbsp;Home</a>
                </li>
                <li style={this.state.user.accountType == "client" ? {} : {display: 'none'}}  className={this.props.history.location.pathname == "/cart" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/cart')}>
                    <a ><i className="fa fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;My Cart ({this.props.cart.length})</a>
                </li> 
                <li className={this.props.history.location.pathname == "/payment" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/payment')}>
                    <a ><i className="fa fa-credit-card"></i>&nbsp;&nbsp;&nbsp;Payment</a>
                </li>
                <li className={this.props.history.location.pathname == "/profile" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/profile')}>
                    <a ><i className="fa fa-user-circle-o"></i>&nbsp;&nbsp;&nbsp;Profile</a>
                </li>
                <li style={this.state.user.accountType == "client" ? {} : {display: 'none'}}  className={this.props.history.location.pathname == "/histories" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/histories')}>
                    <a ><i className="fa fa-history"></i>&nbsp;&nbsp;&nbsp;Histories</a>
                </li> 
                <li style={this.state.user.accountType == "driver" ? {} : {display: 'none'}}  className={this.props.history.location.pathname == "/driverStatus" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/driverStatus')}>
                    <a ><i className="fa fa-car"></i>&nbsp;&nbsp;&nbsp;Status</a>
                </li> 
                <li className={this.props.history.location.pathname == "/share" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/share')}>
                    <a ><i className="fa fa-share-alt"></i>&nbsp;&nbsp;&nbsp;Share</a>
                </li>
                <li className={this.props.history.location.pathname == "/help" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/help')}>
                    <a ><i className="fa fa-question-circle-o"></i>&nbsp;&nbsp;&nbsp;Help</a>
                </li> 
                <li className="inactive" onClick={this.handleLogout}>
                    <a ><i className="fa fa-power-off"></i>&nbsp;&nbsp;&nbsp;Sign Out</a>
                </li> 
            </ul>
        </div>
    );
  }
};

Sidebar = connect(mapStateToProps)(withRouter(Sidebar));

export default Sidebar; 