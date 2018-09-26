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
        cart: []
    };

    utils.initializeProtectedComponent.call(this, utils);  
  }

    hydrateStateWithLocalStorage() {
        const stateInStorage = JSON.parse(localStorage.getItem('sidebar'));
        const cartInStorage = JSON.parse(localStorage.getItem('cart'));
        const state = {};
        
        _.extend(state, this.state);
        _.extend(this.state, stateInStorage);
        _.extend(this.state.cart, cartInStorage); 

        this.setState(state);
    }

    saveStateToLocalStorage() {
        const state = Object.assign({}, this.state);

        localStorage.setItem('cart', JSON.stringify(state.cart));

        delete state.user;
        delete state.cart;
    
        localStorage.setItem('sidebar', JSON.stringify(state)); 
    }
    

    componentDidMount() { 
        this.listenForCartEvents(); 
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

    componentDidUpdate(prevProps, prevState) {
        this.saveStateToLocalStorage();
    }

  listenForCartEvents() { 
      
    document.querySelector("#root").addEventListener('cart::added', e => {  
        if(!this.state || !e.detail) return;    

        const cart = this.state.cart.slice(0); 
        const existingProductIndex = _.findIndex(cart, {id: e.detail.id});

        if(existingProductIndex != -1) {
            cart[existingProductIndex].quantity += 1; 
        }else {
            cart.push(e.detail); 
        }
  
        this.setState({cart}); 

    }, false);

    document.querySelector("#root").addEventListener('cart::removed', e => {  
        if(!this.state || !e.detail) return;    

        const pendingItem = e.detail;  
        const cart = this.state.cart.slice(0).filter(item => item.id != pendingItem.id)
  
        this.setState({cart}); 

    }, false);
    
    document.querySelector("#root").addEventListener('cart::cleared', e => {  
        if(!this.state) return;
 
        this.setState({cart: []}); 
    }, false);

    document.querySelector("#root").addEventListener('cart::incremented', e => {  
        if(!this.state) return;

        const cart = this.state.cart.slice(0);

        cart.forEach(item => {
            if(item.id == e.detail.id) {
                item.quantity += 1;
            }
        })

        this.setState({cart});  

    }, false);

    document.querySelector("#root").addEventListener('cart::decremented', e => {  
        if(!this.state) return;
 
        if(e.detail.quantity == 1) {

            const pendingItem = e.detail;  
            const cart = this.state.cart.slice(0).filter(item => item.id != pendingItem.id)
      
            this.setState({cart}); 

        }else {
            const cart = this.state.cart.slice(0);

            cart.forEach(item => { 
                if(item.id == e.detail.id) {
                    item.quantity -= 1;
                }
            })

            this.setState({cart}); 
        } 
    }, false);

     
  }
   
  handleNavChange(route) { 
    this.props.history.push(route);
  }

  toggleSidebar() {
      this.setState({collapsed: !this.state.collapsed});
  }

  handleLogout() {
    this.Auth.logout().then(e => { 
        this.props.history.push('/login');
    });
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
            <li className={this.props.history.location.pathname == "/cart" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/cart')}>
                <a ><i className="fa fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;My Cart ({this.state.cart.length})</a>
            </li> 
            <li className={this.props.history.location.pathname == "/payment" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/payment')}>
                <a ><i className="fa fa-credit-card"></i>&nbsp;&nbsp;&nbsp;Payment</a>
            </li>
            <li className={this.props.history.location.pathname == "/profile" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/profile')}>
                <a ><i className="fa fa-user-circle-o"></i>&nbsp;&nbsp;&nbsp;Profile</a>
            </li>
            <li className={this.props.history.location.pathname == "/histories" ? "active" : "inactive" }  onClick={this.handleNavChange.bind(this, '/histories')}>
                <a ><i className="fa fa-history"></i>&nbsp;&nbsp;&nbsp;Histories</a>
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
        </Col> 
      </Row> 
      </Container> 
    );
  }
};

export default withRouter(Sidebar);