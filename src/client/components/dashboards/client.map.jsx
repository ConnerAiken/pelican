// Node.JS
import React from "react"; 
import toastr from "toastr";
import axios from "axios";
import './../../../../node_modules/toastr/build/toastr.css';   
import ClientMap from "../maps/client.map";
import ClientOrderMap from "../maps/client.order.map";
import Directions from "../directions";    
import LoadingScreen from "../loadingScreen";
import { Container, Row, Col, Button } from 'reactstrap';
import utils from "./../../assets/utils";
import Store from "./../widgets/store";
 
import { withRouter, Redirect } from 'react-router-dom';
import "./client.map.scss";
 
import { connect } from "react-redux";
import { selectStore } from "./../../actions/index";


const mapStateToProps = state => {
  return { 
          store: state.store,
          cart: state.cart
         };
};


class ClientMapDash extends React.Component {

  constructor(props) {
    super(props);  
    this.handleRequestorUpdate = this.handleRequestorUpdate.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.retrieveOrder = this.retrieveOrder.bind(this);
    this.commitToOrder = this.commitToOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.updateOrderLocation = this.updateOrderLocation.bind(this); 
    this.checkOrderLocation = this.checkOrderLocation.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this); 
    this.selectStore = this.selectStore.bind(this); 
    this.saveStore = this.saveStore.bind(this); 
    this.handleMapMounted = this.handleMapMounted.bind(this);

    utils.initializeProtectedComponent.call(this, utils); 

    this.state.activerOrder = false;
    this.state.locationLoaded = false;
    this.state.curLoc = false;
    this.state.destination = false;
    this.state.store = false; 

    this.retrieveOrder()
    .then(res => this.initializeGMap());
  }
 

  toggleSidebar() {
    document.querySelector('#nav').classList.toggle("active");
  }
 

  initializeGMap() {    

      navigator.geolocation.getCurrentPosition((position) => {  
          this.setState({locationLoaded: true, pendingRequest: false, curLoc: { coords:{ lat: position.coords.latitude, lng: position.coords.longitude }}});
      }, (error) => {
        if(error == 2) {
          toastr.error('Your position is not currently available. Error code: ' + error.code);
        } else if(error == 1) {
          toastr.error("Please allow Pelican to view your location.");
          this.props.history.push('/geolocation-error');
        } else if(error == 3) {
          toastr.error("The geolocation api timed out.");
        }

      }, {timeout: 2500, enableHighAccuracy: true, maximumAge: 75000});

      this.watchId = navigator.geolocation.watchPosition((position) => {   
        this.setState({locationLoaded: true, pendingRequest: false, curLoc: { coords: {lat: position.coords.latitude, lng: position.coords.longitude}}});
      }, (err) => {  
          if(err.code == 1) { 
            this.props.history.push('/geolocation-error');
          }
      }, {timeout: 2500, enableHighAccuracy: true, maximumAge: 75000});

  }

  calculateDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = (lat2 - lat1).toRad();
      var dLon = (lon2 - lon1).toRad(); 
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
      var d = R * c;

      // Convert KM to Miles
      d = d * 0.62137119; 
      return d;
  }  

  handleRequestorUpdate(e) { 
    this.setState({destination: e}); 
  }

  selectStore(store) {  
    this.props.dispatch(selectStore(store));
    this.setState({store}); 
  }
  saveStore(store) {  
    this.setState({store: false});
  }

  submitOrder() {
    return axios.post('/api/v1/order/submit', {
      storeId: null, 
      driverId: null,
      items: []
    }, this.opts)
    .then((response) => {    
      this.setState({activeOrder:  response.data});
      this.watchForOrderInProgress();
    }).catch(request => {   
      console.log(request);
    }); 
  }


  commitToOrder() {
    const order = Object.assign({}, this.state.activeOrder); 
    return axios.post('/api/v1/order/commit', {
      order: order
    }, this.opts)
    .then((response) => {    
      this.setState({activeOrder:  response.data});
    }).catch(request => {   
      console.log(request);
    }); 
  }

  retrieveOrder() { 
    return axios.get('/api/v1/order', this.opts)
    .then((response) => {    
      this.setState({activeOrder: response.data}); 
      this.watchForOrderInProgress();
    }).catch(request => {   
      console.log(request);
    }); 
  }

  checkOrderLocation() { 
    const order = Object.assign({}, this.state.activeOrder);  
    return axios.get('/api/v1/order/location/', this.opts)
    .then((response) => {    
      this.setState({activeOrder: response.data}); 
    }).catch(request => {   
      console.log(request);
    });  
  }

  updateOrderLocation() { 
    const order = Object.assign({}, this.state.activeOrder); 
    console.log(order);
    return axios.post('/api/v1/order/location', {
      id: order.id, 
      status: order.status,
      lat: this.state.curLoc.coords.lat, 
      lng: this.state.curLoc.coords.lng
    }, this.opts)
    .then((response) => {    
      this.setState({activeOrder: response.data}); 
    }).catch(request => {   
      console.log(request);
    });  
  }

  updateOrder() {
    const order = Object.assign({}, this.state.activeOrder); 
    order.status += 1; 
    return axios.post('/api/v1/order/status', {
      order: order
    },this.opts)
    .then((response) => {    
      this.setState({activeOrder: response.data}); 
    }).catch(request => {   
      console.log(request);
    }); 
  }

  watchForOrderInProgress() {
    if(!this.state.activeOrder) return;

    if([2,3].includes(this.state.activeOrder.status) && this.state.user.accountType == "driver") {
      this.updateLoop = setInterval(this.updateOrderLocation, 5000);
    }else if([2,3].includes(this.state.activeOrder.status) && this.state.user.accountType == "client") {
      this.checkLoop = setInterval(this.checkOrderLocation, 5000);
    }else {

    }

  } 

  handleMapMounted(c) { 
    if (!c || this._mapRef) return;

    this._mapRef = c;

    console.log('Ref set later @ ' + Date.now());
  }

  componentWillUnmount() {
    clearInterval(this.updateLoop);
    clearInterval(this.checkLoop);
    navigator.geolocation.clearWatch(this.watchId);
  }

  showRelevantMap() { 
    const user = this.state.user;
    
    if(user.accountType == "client") { 

      if(this.state.activeOrder) {
        return <ClientMap 
        onMapMounted={this.handleMapMounted}
          onSelect={this.selectStore}
          curLoc={this.state.curLoc}
          activeOrder={this.state.activeOrder}/>;
      }else if(!this.state.stores) {
        axios.get('/api/v1/store').then(res => {   
          this.setState({stores: res.data});
          return <ClientOrderMap
            onMapMounted={this.handleMapMounted}
            onSelect={this.selectStore}
            curLoc={this.state.curLoc}
            stores={this.state.stores}/>;
        }).catch(e => console.log(e));
      }else {
          return <ClientOrderMap
          onMapMounted={this.handleMapMounted}
            onSelect={this.selectStore}
            curLoc={this.state.curLoc}
            stores={this.state.stores}/>;
      }
       
    }else if(user.accountType == "driver") { 
      return <Directions
      onMapMounted={this.handleMapMounted}
      curLoc={this.state.curLoc} 
      input={this.state.destination}/> 
    } 
  }

  shouldComponentUpdate(nextProps, nextState) { 
    const orderExists = this.state.activeOrder && nextState.activeOrder;
    const orderStatusChange = orderExists && this.state.activeOrder.status !== nextState.activeOrder.status;
    const locationLoaded = this.state.locationLoaded !== nextState.locationLoaded;
    const curLocLoaded = this.state.curLoc === false && nextState.curLoc !== false;
 
    if(orderStatusChange) {
      return true;
    }else if(locationLoaded || curLocLoaded) {
      return true;
    }

    return true;
  }

  render() {
    return (
      <Container className="container dashboard" fluid={true}> 
      <Row id="header">
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}>   
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
        </Col>
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}}> 
            {this.state.user && this.state.user.accountType == "client"  && !this.state.activeOrder && <Button color="warning" onClick={this.submitOrder}>Start Order</Button>}
            {this.state.user && this.state.user.accountType == "client"  && this.state.activeOrder && <div>
            <p>Estimated Arrival: <span id="estimate">99 mins</span></p>
            <p>Status:  {this.state.activeOrder.status == 0 && "The store is confirming your order"}
                        {this.state.activeOrder.status == 1 && "Driver is picking up your order"}
                        {this.state.activeOrder.status == 2 && "Driver has your order and is on the way"}
                        {this.state.activeOrder.status == 4 && "Delivered! Enjoy your product :)"}</p>
            </div>} 
            {this.state.user && this.state.user.accountType == "driver" && !this.state.activeOrder && <Button onClick={this.commitToOrder}>Commit to Order</Button>}
            {this.state.user && this.state.user.accountType == "driver" && this.state.activeOrder && this.state.activeOrder.status == 1 && <Button onClick={this.updateOrder}>Start Pickup</Button>}
            {this.state.user && this.state.user.accountType == "driver" && this.state.activeOrder && this.state.activeOrder.status == 2 && <Button onClick={this.updateOrder}>Start Delivery</Button>}
            {this.state.user && this.state.user.accountType == "driver" && this.state.activeOrder && this.state.activeOrder.status == 3 && <Button onClick={this.updateOrder}>Mark Delivered</Button>}
        </Col>
      </Row>
      {this.state.pendingRequest ? <LoadingScreen/> : null} 
      {this.state.curLoc && this.showRelevantMap()} 
      {this.state.store ? <Store onSave={this.saveStore} info={this.state.store}/> : null}
      </Container> 
    );
  }
};



ClientMapDash = connect(mapStateToProps)(withRouter(ClientMapDash));

export default ClientMapDash;