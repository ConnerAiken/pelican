// Node.JS
import React from "react";  
import axios from "axios";
import LoadingScreen from "../loadingScreen"; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import utils from "./../../assets/utils";
  
import { withRouter, Redirect } from 'react-router-dom';
import "./store.scss";

import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from "lodash";

class Store extends React.Component {

  constructor(props) {
    super(props);   
    utils.initializeProtectedComponent.call(this, utils); 
    this.toggle = this.toggle.bind(this);  
    this.goToCart = this.goToCart.bind(this);

    this.state = _.extend(this.state, {
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

  addToCart(ele) {     
    ele.store = this.props.info;
    
    // Dispatch cart added event and toggle the button 
    document.querySelector("#root").dispatchEvent(new CustomEvent(
      'cart::added',
      {
        detail: ele
      }
    ));   
    utils.alert("Added \""+ele.name+"\" to your cart.");
  }

  fetchInventory() { 
    this.setState({pendingRequest: true});
     
    this.Auth.fetch(`/api/v1/store/productTypes/${this.props.info.id}`)  
    .then(response => this.setState({productTypes: response.data.product_types}))
    .then(response => this.Auth.fetch(`/api/v1/store/strains/${this.props.info.id}`))  
    .then(response => this.setState({strains: response.data.strains}))
    .then(response => this.Auth.fetch(`/api/v1/store/products/${this.props.info.id}`)) 
    .then((response) => {  

      const products = [...response.data.products].map(product => {
        product.price = (product.sell_price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
        product.category = _.find(this.state.productTypes, {id: product.product_type_id}); 
        product.strain = _.find(this.state.strains, {id: product.strain_id}); 
        product.strain = product.strain ? product.strain.name : "";
        product.category = product.category ? product.category.name : "";
        product.test_results_thc = product.test_results_thc ? product.test_results_thc : "";
        product.test_results_cbd = product.test_results_cbd ? product.test_results_cbd : "";
        product.quantity = 1;

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
              <Button id="closeBtn" className="pull-right" color="danger" onClick={this.toggle} style={{color: 'white'}}><i id="closeBtn" className="fa fa-close"></i></Button>
         </ModalHeader>
          <ModalBody> 
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
                      <Button id={ele.row._original.id} onClick={this.addToCart.bind(this, ele.row._original)}><i className="fa fa-plus"></i></Button>
                    )
                  }
                ]}  
              filterable={true}
              sortable={true}
              defaultPageSize={10}
              className="-striped -highlight" 
              />
          </ModalBody>
          <ModalFooter>   
            <Button id="cartBtn" className="pull-right" color="success" onClick={this.goToCart}>View Cart</Button> 
          </ModalFooter> 
        </Modal> : this.props.info ? <Button id="menuBtn" color="warning" onClick={this.toggle}><i style={{color: 'white'}} className="fa fa-list-alt"></i></Button> : null} 
      </React.Fragment>
    );
  }
};

export default withRouter(Store);