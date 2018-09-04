process.stdin.resume();
import fs from "fs";
import http from "http";
import https from "https";
import express from 'express';
import utils from "./libs/utils.js";
import path from "path";
import dotenv from "dotenv";
import _ from "lodash";

global.path = path;
global.dotenv = dotenv;

utils.loadENV();   
const app = express();   
const httpApp = express();  
const connection = utils.connectToMySQL();
utils.setExitHandlers(connection);   
 
if(process.env.NODE_ENV != "development") { 
    app.use(express.static(path.resolve(process.cwd(), 'public')))
    app.use('/user', require('./routes/user'));
    app.get('/health-check', (req, res) => res.sendStatus(200));
    app.get('/api', (req, res) => {
        res.send('Express to the rescue!');
    });

    // Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/pelican.fittedtech.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/pelican.fittedtech.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/pelican.fittedtech.com/chain.pem', 'utf8');
    
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
      
    const httpsServer = https.createServer(credentials, app).listen(443, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 443!`)
    });
 
    httpApp.get('*', function(req, res) {   
        console.log("Redirecting from http to https");
        res.redirect('https://' + req.headers.host + req.url); 
    });

    const httpServer = http.createServer(httpApp).listen(80, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 80!`); 
    });
} else {
    httpApp.use(express.static(path.resolve(process.cwd(), 'public')))
    app.use('/user', require('./routes/user'));
    httpApp.get('/health-check', (req, res) => res.sendStatus(200));
    httpApp.get('/api', (req, res) => {
        res.send('Express to the rescue!');
    });
 
    const httpServer = http.createServer(httpApp).listen(8080, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 8080!`); 
    });
        
}
  