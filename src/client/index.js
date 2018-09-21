import React from "react"; 
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";  
import ReactPiwik from 'react-piwik'; 
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'toastr/build/toastr.css';    

import Cart from "./components/views/cart.jsx";   
import Dash from "./components/views/dashboard.jsx"; 
import Help from "./components/views/help.jsx";   
import Histories from "./components/views/histories.jsx";  
import Login from "./components/views/login";  
import Payment from "./components/views/payment.jsx";  
import Profile from "./components/views/profile.jsx";  
import Share from "./components/views/share.jsx";   
import Signup from "./components/views/signup.jsx"; 
import PrivacyPolicy from "./components/views/privacyPolicy.jsx"; 

const piwik = new ReactPiwik({
    url: 'analytics.fittedtech.com',
    siteId: 1,
    trackErrors: true,
});  
 
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/login"/>
            )}/>
            <Route path="/login" component={Login} /> 
            <Route path="/cart" component={Cart} />
            <Route path="/dashboard" component={Dash} />
            <Route path="/histories" component={Histories} />
            <Route path="/help" component={Help} />
            <Route path="/profile" component={Profile} />
            <Route path="/payment" component={Payment} /> 
            <Route path="/share" component={Share} />  
            <Route path="/signup" component={Signup} />
            <Route path="/privacy" component={PrivacyPolicy} />
        </Switch> 
    </BrowserRouter>
, document.querySelector("#root"));

module.hot.accept(); 
 
