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
      inventory: this.fetchInventory(),
      pages: null,
      loading: true,
      pendingRequest: true
    });
 
  } 

  fetchInventory() { 
    this.setState({pendingRequest: true});
    
    fetch('https://api.greenbits.com/api/v1/products?mj=true&by_active=true&limit=10', { 
      method: 'GET', 
      headers: new Headers({
        'Authorization': 'Token token="7tJv4mJ8PF0enhBZlRRfDQ"',
        'Content-Type': 'application/json'
      })
    })
    .then((response) => { 
      debugger;  
      console.log(response);
      this.setState({inventory: response.data, pendingRequest: false}); 
    }).catch(request => {   
      debugger;
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
                data={[]}
                columns={[
                  {
                    Header: "Product Name",
                    columns: [
                      {
                        Header: "First Name",
                        accessor: "firstName"
                      }
                    ]
                  },
                  {
                    Header: "Price",
                    columns: [
                      {
                        Header: "First Name",
                        accessor: "firstName"
                      }
                    ]
                  },
                  {
                    Header: 'Actions',
                    columns: [
                      {
                        Header: "First Name",
                        accessor: "firstName"
                      }
                    ]
                  }
                ]}  
              filterable
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