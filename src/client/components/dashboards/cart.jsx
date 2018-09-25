// Node.JS
import React from "react";  
import { Container, Row, Col, Button, Card, ButtonGroup, CardText, CardBody, CardTitle, CardSubtitle, Media } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import LoadingScreen from "../loadingScreen";
import utils from "./../../assets/utils";
import "./cart.scss";
  
class Cart extends React.Component {

  constructor(props) {
    super(props);  

    utils.initializeProtectedComponent.call(this, utils); 

    this.clearCart = this.clearCart.bind(this);
    this.goBack = this.goBack.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);

    this.state = {
      items: [],
      total: 0
    }; 
  } 

  componentDidMount() {
    this.setState({items: JSON.parse(localStorage.getItem('cart'))});
  }

  componentDidUpdate(prevProps, prevState) {
    const cartItems = JSON.parse(localStorage.getItem('cart')); 

    if(!_.isEqual(this.state.items, cartItems)) {
      this.setState({items: JSON.parse(localStorage.getItem('cart'))})
    }
  }
  
  goBack() {
    this.props.history.goBack();
  }

  clearCart() { 
    document.querySelector("#root").dispatchEvent(new Event('cart::cleared'));  
    this.forceUpdate();
  }

  removeItem(item) {
    document.querySelector("#root").dispatchEvent(new CustomEvent(
      'cart::removed',
      {
        detail: item
      }
    )); 
    this.forceUpdate();
  }

  incrementProduct(pendingItem) {
    document.querySelector("#root").dispatchEvent(new CustomEvent(
      'cart::incremented',
      {
        detail: pendingItem
      }
    )); 
    this.forceUpdate(); 
  }

  decrementProduct(pendingItem) { 
    document.querySelector("#root").dispatchEvent(new CustomEvent(
      'cart::decremented',
      {
        detail: pendingItem
      }
    )); 
    this.forceUpdate(); 
  }

  generateCartItem(item) {
    return (
      <Card style={{color: 'black', marginTop: '.25%', marginBottom: '.25%'}} key={`${item.id}-${Math.random()}`}>
        <CardBody>
          <Media>
            <Media left href="#" style={{padding: '0 2.5% 2.5% 0'}}>
              <Media object src="https://via.placeholder.com/150x150"  style={{width: '150px'}} alt="Generic placeholder image" />
            </Media>
            <Media body>
              <CardTitle>{item.name} <i className="fa fa-trash fa-1x pull-right hover-select" style={{color: 'green'}} onClick={this.removeItem.bind(this, item)}></i></CardTitle>
              <CardSubtitle style={{paddingBottom: '2.5%'}}> 
                      {item.category && item.vendor ? `${item.category} by ${item.vendor}` : item.category ? item.category : ""} <br/> <br/>   
                            <Row>
                              <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                                  <ButtonGroup>
                                    <Button outline size="sm" disabled={item.quantity == 1} color="secondary" onClick={this.decrementProduct.bind(this, item)}>-</Button>
                                    <Button outline size="sm" disabled={true} style={{padding: "0% 30%"}}>{item.quantity}</Button>
                                    <Button outline size="sm" color="secondary"  onClick={this.incrementProduct.bind(this, item)}>+</Button>
                                  </ButtonGroup>
                              </Col> 
                              <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                                  <p style={{textAlign: 'right', color: 'rgb(247, 111, 64)'}}>{item.price}</p>
                              </Col> 
                            </Row>   
              </CardSubtitle>
              </Media>
          </Media>
          <CardText style={{paddingTop: '2.5%', borderTop: '1px solid grey'}}>
              <Row>
                <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                    <p style={{textAlign: 'left'}}><i class="fa fa-map-marker"></i>&nbsp;&nbsp;{item.store.name}</p>
                </Col> 
                <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}> 
                    <p style={{textAlign: 'right'}}><i class="fa fa-car"></i>&nbsp;&nbsp;Shipping&nbsp;&nbsp;&nbsp;&nbsp;<span className="pull-right" style={{color: 'rgb(247, 111, 64)'}}>$15</span></p>
                </Col> 
              </Row>
              <Row>
                <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                    <p style={{textAlign: 'left'}}><i class="fa fa-money"></i>&nbsp;&nbsp;Total</p>
                </Col> 
                <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                    <Button size={"sm"} className="pull-right no-hover" style={{color: 'white', backgroundColor: 'rgb(247, 111, 64)', borderColor: 'rgb(247, 111, 64)'}} color="warning"><b>{((item.sell_price * item.quantity) / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</b></Button>
                </Col> 
              </Row> 
          </CardText> 
        </CardBody>
      </Card>
      );
  }

  handlePurchase() {

  }
  
  showCartItems() {
    const cartItems = this.state.items.slice(0).map(item => this.generateCartItem(item));

    if(cartItems.length == 0) {
      return (
        <Row>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 2}} lg={{size: 2}}>   
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 8}} lg={{size: 8}}> 
            <p style={{textAlign: 'center'}}>You do not have any items in your cart.</p>
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 2}} lg={{size: 2}}>  
          </Col>
        </Row> 
        ); 
    }
  
    return (
      <Row>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 2}} lg={{size: 2}}>   
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 8}} lg={{size: 8}}> 
          {cartItems}
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 2}} lg={{size: 2}}>  
        </Col>
      </Row> 
      );
  }

  render() {  
    return (
      <Container className="container dashboard" fluid={true}> 
      <Row id="header">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>   
            <i className="fa fa-arrow-left fa-2x pull-left hover-select" onClick={this.goBack}></i>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}} style={{textAlign: 'center'}}> 
            <h3>My Cart</h3>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <i className="fa fa-trash fa-2x pull-right hover-select" onClick={this.clearCart}></i>
        </Col>
      </Row> 
      {this.showCartItems()} 
      {this.state.items.length > 0 ? 
        <Row style={{marginTop: '2.5%'}}>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 2}} lg={{size: 2}}>   
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 8}} lg={{size: 8}}>   
            <ButtonGroup style={{width: '100%'}}>
              <Button outline style={{width: '50%', color: 'white',background: 'none', border: 'none'}}>Total: <span style={{color: 'rgb(247, 111, 64)'}}>{(this.state.total / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</span></Button>
              <Button style={{width: '50%', color: 'white', backgroundColor: 'rgb(247, 111, 64)', borderColor: 'rgb(247, 111, 64)'}} onClick={this.handlePurchase}>BUY NOW</Button>
            </ButtonGroup>
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 2}} lg={{size: 2}}>  
          </Col>
        </Row> 
      : null}
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </Container> 
    );
  }
};

export default withRouter(Cart);