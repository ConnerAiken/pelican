// Node.JS
import React from "react"; 
import { Container, Row, Col, Button } from 'reactstrap'; 
import { withRouter, Redirect } from 'react-router-dom';
import "./sidebar.scss";
import utils from "./../../assets/utils";  
 
// Src: https://bootstrapious.com/p/bootstrap-sidebar

class Sidebar extends React.Component {

  constructor(props) {
    super(props);   
    
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.listenForCartEvents = this.listenForCartEvents.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
        collapsed: false,
        cartCount: 0,
        cart: []
    };

    utils.initializeProtectedComponent.call(this, utils); 
    this.listenForCartEvents(); 
  }

hydrateStateWithLocalStorage() {
    const stateInStorage = JSON.parse(localStorage.getItem('sidebar'));
    const state = _.extend(this.state, stateInStorage);
    this.setState({state});
}

saveStateToLocalStorage() {
    const state = {...this.state};
    delete state.user;
    localStorage.setItem('sidebar', JSON.stringify(state));
}
 

componentDidMount() { 
    this.hydrateStateWithLocalStorage();  
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
}

componentWillUnmount() { 
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    ); 
    this.saveStateToLocalStorage();
}

  listenForCartEvents() { 
    // Use localstorage here..
    document.querySelector("#root").addEventListener('cart::added', e => {  
        if(!this.state) return;  

        const cart = this.state.cart.slice(0); 
        cart.push(e); 
        this.setState({cartCount: cart.length, cart});

    }, false);
    document.querySelector("#root").addEventListener('cart::removed', e => {  
        if(!this.state) return; 

        document.querySelector(`[id='${ele.row.id}']`).classList.toggle("hidden");  
        cart = this.state.cart.slice(0).filter(item => item.id != e.original.id); 
        this.setState({cartCount: cart.length, cart});

    }, false);
    document.querySelector("#root").addEventListener('cart::emptied', e => {  
        if(!this.state) return;

        this.setState({cartCount: 0});
    }, false);
  }
   
  handleNavChange(route) { 
    this.props.history.push(route);
  }

  toggleSidebar() {
      this.setState({collapsed: !this.state.collapsed});
  }

  handleLogout() {
    this.Auth.logout();
    this.props.history.replace('/login');
  }

  render() { 
    return (
      <Container className="container navbar" fluid={true}> 
      <Row>     
        <Col xs={12} sm={12} md={12} lg={12} id="nav" className={this.state.collapsed ? "inactive": "active"}>
        <Button id="navBtn" onClick={this.toggleSidebar}><i className="fa fa-bars"></i></Button>

        <div className="sidebar-header"> 
            <h3>Pelican</h3>
            {this.state.user.profileImage && <img className="img-responsive img-circle" src={"data:image/png;base64,"+this.state.user.profileImage} style={{width: '75px'}} />} 
            <p>{this.state.user.firstName} {this.state.user.lastName}</p>  
            <a id="logoutLink" href="#" onClick={this.handleLogout}><i className="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</a>
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
            <li className={this.props.history.location.pathname == "/dashboard" ? "active" : "inactive" } onClick={this.handleNavChange.bind(this, '/dashboard')}>
                <a href="#"><i className="fa fa-home"></i>&nbsp;&nbsp;&nbsp;Home</a>
            </li>
            <li className={this.props.history.location.pathname == "/cart" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/cart')}>
                <a href="#"><i className="fa fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;My Cart ({this.state.cartCount})</a>
            </li> 
            <li className={this.props.history.location.pathname == "/payment" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/payment')}>
                <a href="#"><i className="fa fa-credit-card"></i>&nbsp;&nbsp;&nbsp;Payment</a>
            </li>
            <li className={this.props.history.location.pathname == "/profile" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/profile')}>
                <a href="#"><i className="fa fa-user-circle-o"></i>&nbsp;&nbsp;&nbsp;Profile</a>
            </li>
            <li className={this.props.history.location.pathname == "/histories" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/histories')}>
                <a href="#"><i className="fa fa-history"></i>&nbsp;&nbsp;&nbsp;Histories</a>
            </li> 
            <li className={this.props.history.location.pathname == "/share" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/share')}>
                <a href="#"><i className="fa fa-share-alt"></i>&nbsp;&nbsp;&nbsp;Share</a>
            </li>
            <li className={this.props.history.location.pathname == "/help" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/help')}>
                <a href="#"><i className="fa fa-question-circle-o"></i>&nbsp;&nbsp;&nbsp;Help</a>
            </li> 
            <li className="inactive" onClick={() => this.Auth.logout() && this.props.history.replace('/login')}>
                <a href="#"><i className="fa fa-sign-out"></i>&nbsp;&nbsp;&nbsp;Logout</a>
            </li> 
        </ul>
        </Col> 
      </Row> 
      </Container> 
    );
  }
};

export default withRouter(Sidebar);