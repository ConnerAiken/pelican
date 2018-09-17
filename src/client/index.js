import React from "react"; 
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";  
import ReactPiwik from 'react-piwik';
import createBrowserHistory from 'history/createBrowserHistory'
import $ from 'jquery'; 
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
 
import { Dash } from "./components/dashboard.jsx"; 
import Signup from "./components/signup.jsx"; 
import Home from "./components/home.jsx"; 
 
window.$ = $;

const piwik = new ReactPiwik({
    url: 'analytics.fittedtech.com',
    siteId: 1,
    trackErrors: true,
});  

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/map" component={Dash} />
        </Switch> 
    </HashRouter>
, document.querySelector("#root"));

module.hot.accept(); 
 
