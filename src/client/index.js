import React from "react"; 
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";  
import ReactPiwik from 'react-piwik';
import createBrowserHistory from 'history/createBrowserHistory'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
 
import App from "./app.jsx"; 
import Signup from "./components/signup.jsx"; 
import Home from "./components/home.jsx"; 
 
const piwik = new ReactPiwik({
    url: 'analytics.fittedtech.com',
    siteId: 1,
    trackErrors: true,
}); 
const history = createBrowserHistory();

ReactDOM.render(
    <Router history={piwik.connectToHistory(history)}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/map" component={App} />
        </Switch> 
    </Router>
,document.querySelector("body"));

module.hot.accept(); 
 
