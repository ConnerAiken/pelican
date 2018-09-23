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

    this.state = _.extend(this.state, {
      products: [],
      products: [],
      pages: null,
      loading: true,
      pendingRequest: true
    });

    this.fetchInventory();
  } 

  fetchInventory() { 
    this.setState({pendingRequest: true});
    
    this.Auth.fetch('/api/v1/store/productTypes/239e77a5-d1c4-4510-962e-2de706d33af0') 
    .then(response => this.setState({productTypes: response.data.product_types}))
    .then(response => this.Auth.fetch('/api/v1/store/products/239e77a5-d1c4-4510-962e-2de706d33af0')) 
    .then((response) => {  

      const products = [...response.data.products].map(product => {
        product.price = (product.sell_price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
        product.category = _.find(this.state.productTypes, {id: product.product_type_id}); 
        product.category = product.category ? product.category.name : "Unknown";
        return product;
      });

      this.setState({products: products, pendingRequest: false});  
      console.log(products);
    }).catch(request => {    
      console.log(request);
    });  
  }
 
  render() { 
    return (
      <React.Fragment> 
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
        <Modal size={'lg'} autoFocus={true} id="storeMenu" isOpen={true}  className={this.props.className}>
          <ModalHeader>{this.props.info.name} - {this.props.info.city}, {this.props.info.state}</ModalHeader>
          <ModalBody> 
              <ReactTable
                noDataText="Loading data.."
                data={this.state.products}
                columns={[
                  {
                    Header: "Product",
                    accessor: "name"
                  },  
                  {
                    Header: "Category",
                    accessor: "category"
                  },  
                  {
                    Header: "Vendor",
                    accessor: "vendor"
                  },  
                  {
                    Header: "Price",   
                    accessor: d => (d.sell_price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"}),
                    id: "sell_price",
                    sortMethod: (a, b) => { 
                      a = parseFloat(a.replace(/[^\d\.]/,''));
                      b = parseFloat(b.replace(/[^\d\.]/,''));
                      return a-b;
                    }
                  }
                ]}  
              filterable={true}
              sortable={true}
              defaultPageSize={10}
              className="-striped -highlight" 
              />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.saveStore}>Do Something</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
};

export default withRouter(Store);