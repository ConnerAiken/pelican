// Node.JS
import React from "react";  
import { Container, Row, Col, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'; 
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

    this.state = {
      items: []
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

  generateCartItem(item) {
    return (
      <Card style={{color: 'black', marginTop: '.25%', marginBottom: '.25%'}} key={`${item.id}-${Math.random()}`}>
        <CardBody>
          <CardTitle>{item.name} <i className="fa fa-trash fa-1x pull-right hover-select" onClick={this.removeItem.bind(this, item)}></i></CardTitle>
          <CardSubtitle>{item.category} - {item.vendor}</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      );
  }

  showCartItems() {
    const cartItems = this.state.items.slice(0).map(item => this.generateCartItem(item));

    if(cartItems.length == 0) {
      return (
        <Row>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 2}}>   
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 8}}> 
            <p style={{textAlign: 'center'}}>You do not have any items in your cart.</p>
          </Col>
          <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 2}}>  
          </Col>
        </Row> 
        ); 
    }

    return (
      <Row>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 2}}>   
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 8}}> 
          {cartItems}
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 2}}>  
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
      <Row>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>   
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <pre style={{color: 'white'}}>
              <code>
                {JSON.stringify(this.state.items, null, 2)}
              </code>
            </pre>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row>
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </Container> 
    );
  }
};

export default withRouter(Cart);