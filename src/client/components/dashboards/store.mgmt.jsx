// Node.JS
import React from "react";  
import { Container, Row, Col, Card, CardTitle, CardSubtitle, CardBody, Button } from 'reactstrap'; 
import { withRouter } from 'react-router-dom';
import LoadingScreen from "../loadingScreen";
import utils from "../../assets/utils";
import "./store.mgmt.scss";
  
class StoreDash extends React.Component {

  constructor(props) {
    super(props);  

    utils.initializeProtectedComponent.call(this, utils);  
 
    this.fetchStores();
  } 

  fetchStores() {
    this.setState({pendingRequest: true});
    return this.Auth.fetch(`/api/v1/user/stores`).then(res => {
      this.setState({pendingRequest: false, stores: res || []});
    }); 
  }

  toggleActive(store) {
    this.setState({pendingRequest: true});

    return this.Auth.fetch(`/api/v1/user/stores/toggleVisibility`, {
      method: 'POST',
      body: JSON.stringify({
          storeId: store.id
      })
    }).then(res => {
      this.fetchStores();
    }); 
  }
 
  render() { 
    return (
      <Container className="container dashboard" fluid={true}> 
      <Row id="header">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>  
          
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            <h3>Store Management</h3>
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
      </Row>
      {this.state.stores ? ( 
          <Row>
            {this.state.stores.slice(0).map(store => {
              return ( 
                <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}} id={store.id}>
                  <Card style={{color: 'black'}}> 
                    <CardBody>
                      <CardTitle>{store.name}</CardTitle>
                      <CardSubtitle>{store.address} {store.city} {store.state} {store.zip}</CardSubtitle> 
                      <br/>
                      <Button onClick={this.toggleActive.bind(this, store)} color={store.visible ? 'success' : 'danger'}>{store.visible ? 'Active' : 'Inactive'}</Button>
                    </CardBody>
                  </Card> 
                </Col>
              )
            })}
          </Row>
      ) : null} 
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      </Container> 
    );
  }
};

export default withRouter(StoreDash);