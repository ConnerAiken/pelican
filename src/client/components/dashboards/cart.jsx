// Node.JS
import React from "react";  
import axios from "axios";
import { Container, Row, Col, Button, Card, ButtonGroup, CardText, CardBody, CardTitle, CardSubtitle, Media } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { addCartItem, removeCartItem, incrementCartItem, decrementCartItem, clearCart, orderSubmitted } from "./../../actions/index";
import LoadingScreen from "../loadingScreen";
import utils from "./../../assets/utils";
import "./cart.scss";
 

const mapStateToProps = state => {
  console.log(state);
  return { cart: state.cart || [], order: state.order };
};

  
class Cart extends React.Component {

  constructor(props) {
    super(props);  

    utils.initializeProtectedComponent.call(this, utils); 

    this.clear = this.clear.bind(this);
    this.goBack = this.goBack.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);

    this.state = { 
      total: 0,
      shippingCost: 1500
    }; 
  }  
 
  goBack() {
    this.props.history.goBack();
  }

  clear() {  
    if(this.props.cart.length == 0 || !confirm("Are you sure you want to clear your cart?")) return;

    this.props.dispatch(clearCart());    
  }

  removeItem(pendingItem) {
    this.props.dispatch(removeCartItem(pendingItem));  
    console.log(this.props);
  }

  incrementProduct(pendingItem) {
    this.props.dispatch(incrementCartItem(pendingItem));  
    console.log(this.props);
  }

  decrementProduct(pendingItem) { 
    this.props.dispatch(decrementCartItem(pendingItem));  
    console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(prevProps.cart, this.props.cart)) { 
      this.setShippingCost();
    } 
  }

  setShippingCost() {
    let finalCost = 1500; 
    this.setState({shippingCost: finalCost})
  }

  calcTotal() {
    let total = this.state.shippingCost ? this.state.shippingCost : 0;

    this.props.cart.forEach(item => {
        total += (item.sell_price * item.quantity);
    });

    return (total / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
  }


  calcShipping() {
    let total = this.state.shippingCost ? this.state.shippingCost : 0; 

    return (total / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
  }

  generateCartItem(item) {
    return (
      <React.Fragment key={Math.random()}>  
        <Media className="card-title-wrapper">
          <Media left href="#" className="align-self-center">
            <Media object className="img-fluid" src="https://via.placeholder.com/150x150"  style={{width: '65px'}} alt="Generic placeholder image" />
          </Media>
          <Media body>
            <div className="card-title">
              <span>{item.name}</span>
              <i className="fa fa-trash fa-1x pull-right hover-select" style={{color: 'green'}} onClick={this.removeItem.bind(this, item)}></i> 
            </div>
            <div className="card-subtitle"> 
              <span>{item.category && item.vendor ? `${item.category} by ${item.vendor}` : item.category ? item.category : ""}</span>
              <span className="float-right" style={{color: 'rgb(247, 111, 64)'}}>{item.price}</span>
            </div>
            <div class="card-buttons clearfix">
              <ButtonGroup className="pull-left">
                <Button outline size="sm" disabled={item.quantity == 1} color="secondary" onClick={this.decrementProduct.bind(this, item)}>-</Button>
                <Button outline size="sm" disabled={true} style={{padding: "0% 30%"}}>{item.quantity}</Button>
                <Button outline size="sm" color="secondary"  onClick={this.incrementProduct.bind(this, item)}>+</Button>
              </ButtonGroup>
            </div>
            </Media>
        </Media>  
        <Row className="card-metadata-wrapper">
          <hr/>
          <Col xs={{size: 6}}  sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>  
              <p style={{textAlign: 'left'}}><i className="fa fa-map-marker"></i>&nbsp;&nbsp;{item.store.name}</p>
          </Col>  
          <Col xs={{size: 6}}  sm={{size: 6}} md={{size: 6}} lg={{size: 6}}> 
              <p style={{textAlign: 'right'}}><i className="fa fa-car"></i>&nbsp;&nbsp;Shipping&nbsp;&nbsp;&nbsp;&nbsp;<span className="pull-right" style={{color: 'rgb(247, 111, 64)'}}>$15</span></p>
          </Col> 
        </Row>
        <Row className="card-actions-wrapper">
          <Col xs={{size: 6}}  sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
              <p style={{textAlign: 'left'}}><i className="fa fa-money"></i>&nbsp;&nbsp;Total</p>
          </Col> 
          <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
              <span className="pull-right" style={{color: 'rgb(247, 111, 64)'}}>{((item.sell_price * item.quantity) / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</span>
          </Col> 
        </Row> 
      <br/>
    </React.Fragment> 
      );
  }

  handlePurchase() { 
    this.setState({pendingRequest: true});  
    debugger;
    axios.post('/api/v1/order', {cart: this.props.cart}, this.opts).then((response) => {  
      this.setState({pendingRequest: false});      
      this.props.dispatch(orderSubmitted(response.data.payload));   
    });  
  }
  
  showCartItems() {
    const cartItems = this.props.cart.slice(0).map(item => this.generateCartItem(item));

    if(cartItems.length == 0) {
      return (
        <Row>
          <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>   
          </Col>
          <Col xs={{size: 10}} sm={{size: 10}} md={{size: 8}} lg={{size: 8}}> 
            <p style={{textAlign: 'center'}}>You do not have any items in your cart.</p>
          </Col>
          <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>  
          </Col>
        </Row> 
        ); 
    }
  
    return (
      <Row>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>   
        </Col>
        <Col xs={{size: 10}} sm={{size: 10}} md={{size: 8}} lg={{size: 8}}> 
          {cartItems}
        </Col>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}>  
        </Col>
      </Row> 
      );
  }

  render() {   
    return (
      <Container className="container dashboard" fluid={true} id="cartContainer"> 
      <Row id="header">
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 4}} lg={{size: 4}}>   
            <i className="fa fa-arrow-left fa-2x pull-left hover-select" onClick={this.goBack}></i>
        </Col>
        <Col xs={{size: 10}} sm={{size: 10}} md={{size: 4}} lg={{size: 4}} style={{textAlign: 'center'}}> 
            <h3>My Cart</h3>
        </Col>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 4}} lg={{size: 4}}> 
            <i className="fa fa-trash fa-2x pull-right hover-select" onClick={this.clear}></i>
        </Col>
      </Row> 
      {this.showCartItems()} 
      {this.props.cart.length > 0 ? 
        <Row>
        <Col xs={{size: 1}} sm={{size: 1}} md={{size: 2}} lg={{size: 2}}> 
          </Col>
        <Col xs={{size: 10}} sm={{size: 10}} md={{size: 8}} lg={{size: 8}} style={{textAlign: 'center'}}> 
            <ButtonGroup style={{width: '100%'}}>
              <Button outline style={{width: '50%', color: 'white',background: 'none', border: 'none'}}>
              <small>(Shipping: <span style={{color: 'rgb(247, 111, 64)'}}>{this.calcShipping()}</span>)</small><br/>
              <b>Total: <span style={{color: 'rgb(247, 111, 64)'}}>{this.calcTotal()}</span></b>
              </Button>
              <Button style={{width: '50%', color: 'white', backgroundColor: 'rgb(247, 111, 64)', borderColor: 'rgb(247, 111, 64)'}} onClick={this.handlePurchase}>BUY NOW</Button>
            </ButtonGroup>
          </Col>
        <Col xs={{size: 1}}  sm={{size: 1}} md={{size: 2}} lg={{size: 2}}> 
          </Col>
        </Row> 
      : null}
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </Container> 
    );
  }
};

Cart = connect(mapStateToProps)(withRouter(Cart));

export default Cart;