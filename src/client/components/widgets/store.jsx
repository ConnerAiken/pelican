// Node.JS
import React from "react";  
import axios from "axios";
import LoadingScreen from "../loadingScreen"; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, Media, CardBody, CardFooter, CardTitle, CardText, Row, Col, Container, CardSubtitle } from 'reactstrap';
import utils from "./../../assets/utils";
  

import { connect } from "react-redux";
import { addCartItem, removeCartItem, incrementCartItem, decrementCartItem, clearCart } from "./../../actions/index";


import { withRouter, Redirect } from 'react-router-dom';
import "./store.scss";

import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from "lodash";


const mapStateToProps = state => {
  return { 
          store: state.store,
          cart: state.cart
         };
};


class Store extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
    this.toggle = this.toggle.bind(this);  
    this.goToCart = this.goToCart.bind(this);

    this.state = _.extend(this.state, {
      cart: [],
      products: [],  
      pages: null,
      loading: true,
      pendingRequest: true,
      visible: true
    });
 
    this.listenForExternalOpen();
  } 

  componentDidMount() {
    this.fetchInventory();
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }
  
  goToCart() {
    this.toggle();
    this.props.history.push('/cart'); 
  }

  listenForExternalOpen() { 
    document.querySelector("#root").addEventListener('store::selected', e => {  
        if(!this.state) return;  
        this.setState({visible: true});
    }, false); 
  } 

  addCartItem(ele) {      
    this.props.dispatch(addCartItem(ele)); 
    utils.alert("Added \""+ele.name+"\" to your cart.");
  }

  fetchInventory() { 
    this.setState({pendingRequest: true});
     
    this.Auth.fetch(`/api/v1/store/productTypes/${this.props.info.id}`)  
    .then(response => this.setState({productTypes: response.data}))
    .then(response => this.Auth.fetch(`/api/v1/store/strains/${this.props.info.id}`))  
    .then(response => this.setState({strains: response.data}))
    .then(response => this.Auth.fetch(`/api/v1/store/products/${this.props.info.id}`)) 
    .then((response) => {   
      const products = [...response.data].map(product => { 
        product.category = _.find(this.state.productTypes, {id: product.product_type_id}); 
        product.strain = _.find(this.state.strains, {id: product.strain_id}); 
        product.strain = product.strain ? product.strain.name : "";
        product.category = product.category ? product.category.name : "";
        product.test_results_thc = product.test_results_thc ? product.test_results_thc : "";
        product.test_results_cbd = product.test_results_cbd ? product.test_results_cbd : ""; 
        product.store = this.props.info;
        return product;
      });

      this.setState({products: products, pendingRequest: false});   
    }).catch(request => {    
      console.log(request);
    });  
  }
 
  render() { 
    return (
      <React.Fragment> 
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
        {this.state.visible ? <Modal size={'lg'} autoFocus={true} id="storeMenu" isOpen={true}  className={this.props.className}>
          <ModalHeader>
              {this.props.info.name} - {this.props.info.city}, {this.props.info.state} 
              <Button id="closeBtn" className="pull-right" color="danger" onClick={this.toggle} style={{color: 'white'}}>
                 <i id="closeBtn" className="fa fa-close"></i>
              </Button>
         </ModalHeader>
          <ModalBody> 
            <Row>
              <Col className="d-lg-none" xs={12} sm={12} md={12} lg={12}> 
                    {this.state.products.map(item => {
                      return (
                        <React.Fragment key={Math.random()}>  
                            <Media className="card-title-wrapper">
                              <Media left href="#" className="align-self-center">
                                <Media object className="img-fluid" src="https://via.placeholder.com/150x150"  style={{width: '65px'}} alt="Generic placeholder image" />
                              </Media>
                              <Media body>
                                <div className="card-title">
                                  <span>{item.name}</span>
                                </div>
                                <div className="card-subtitle"> 
                                  <span>{item.category && item.vendor ? `${item.category} by ${item.vendor}` : item.category ? item.category : ""}</span>
                                  <span className="float-right" style={{color: 'rgb(247, 111, 64)'}}>{item.price}</span>
                                </div>
                                </Media>
                            </Media> 
                          <Row className="card-metadata-wrapper">
                            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                                <p style={{textAlign: 'left'}}><i className="fa fa-map-marker"></i>&nbsp;&nbsp;{item.store.name}</p>
                            </Col> 
                            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}> 
                                <p style={{textAlign: 'right'}}><i className="fa fa-car"></i>&nbsp;&nbsp;Shipping&nbsp;&nbsp;&nbsp;&nbsp;<span className="pull-right" style={{color: 'rgb(247, 111, 64)'}}>$15</span></p>
                            </Col> 
                          </Row>
                          <Row className="card-actions-wrapper">
                            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                                <p style={{textAlign: 'left'}}><i className="fa fa-money"></i>&nbsp;&nbsp;Total</p>
                            </Col> 
                            <Col xs={{size: 6}} sm={{size: 6}} md={{size: 6}} lg={{size: 6}}>   
                                <Button onClick={this.addCartItem.bind(this, item)} size={"sm"} className="pull-right hover-select" style={{color: 'white', backgroundColor: 'rgb(247, 111, 64)', borderColor: 'rgb(247, 111, 64)'}} color="warning"><b>{((item.sell_price * item.quantity) / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</b></Button>
                            </Col> 
                          </Row> 
                        <br/>
                        </React.Fragment> 
                      );
                    })} 
              </Col>
              <Col className="d-none d-lg-block"  xs={12} sm={12} md={12} lg={12}>
              <ReactTable 
                  data={this.state.products}
                  
                  columns={[
                    {
                      Header: "Product",
                      accessor: "name",
                    },  
                    {
                      Header: "Category",
                      accessor: "category",
                    },  
                    {
                      Header: "Vendor",
                      accessor: "vendor",
                    }, 
                    {
                      Header: "Strain",
                      accessor: "strain",
                    },  
                    {
                      Header: "THC %",  
                      filterable: false,
                      accessor: d => d.test_results_thc === "" ? d.test_results_thc : (d.test_results_thc * 100).toFixed(2) + "%",
                      id: "test_results_thc",
                    },  
                    {
                      Header: "CBD %", 
                      filterable: false,
                      accessor: d => d.test_results_cbd === "" ? d.test_results_cbd : (d.test_results_cbd * 100).toFixed(2) + "%",
                      id: "test_results_cbd",
                    },  
                    {
                      Header: "Price",   
                      filterable: false,
                      accessor: d => (d.sell_price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"}),
                      id: "sell_price",
                      sortMethod: (a, b) => { 
                        a = parseFloat(a.replace(/[^\d\.]/,''));
                        b = parseFloat(b.replace(/[^\d\.]/,''));
                        return a-b;
                      }
                    },
                    {
                      Header: 'Add To Cart',
                      accessor: 'id',
                      sortable: false,
                      filterable: false,
                      Cell: ele => (
                        <Button id={ele.row._original.id} onClick={this.addCartItem.bind(this, ele.row._original)}><i className="fa fa-plus"></i></Button>
                      )
                    }
                  ]}  
                filterable={true}
                sortable={true}
                defaultPageSize={10}
                className="-striped -highlight" 
                />
              </Col>
            </Row> 
          </ModalBody>
          <ModalFooter>   
            <Button id="cartBtn" className="pull-right" color="success" onClick={this.goToCart}>View Cart ({this.props.cart.length})</Button> 
          </ModalFooter> 
        </Modal> : this.props.info ? <Button id="menuBtn" color="warning" onClick={this.toggle}><i style={{color: 'white'}} className="fa fa-list-alt"></i></Button> : null} 
      </React.Fragment>
    );
  }
};


Store = connect(mapStateToProps)(withRouter(Store));

export default Store;