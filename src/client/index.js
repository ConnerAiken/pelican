import React from "react"; 
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";  
import ReactPiwik from 'react-piwik'; 
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import createHistory from 'history/createHashHistory'

import Dash from "./components/dashboard.jsx"; 
import Signup from "./components/signup.jsx"; 
import Home from "./components/home.jsx";  

const piwik = new ReactPiwik({
    url: 'analytics.fittedtech.com',
    siteId: 1,
    trackErrors: true,
});  

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/map" component={Dash} />
        </Switch> 
    </BrowserRouter>
, document.querySelector("#root"));

module.hot.accept(); 
 
