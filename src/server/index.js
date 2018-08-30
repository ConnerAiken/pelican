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
const httpsApp = express(); 
const httpApp = express();
const connection = utils.connectToMySQL();
console.log(connection);
connection.query('SHOW DATABASES', function (error, results) {
    if (error) throw error;
    console.log(results);
});

httpsApp.use(express.static(path.resolve(process.cwd(), 'public')))
httpApp.use(express.static(path.resolve(process.cwd(), 'public')))

httpsApp.get('/health-check', (req, res) => res.sendStatus(200));
httpApp.get('/health-check', (req, res) => res.sendStatus(200));

httpsApp.get('/api', (req, res) => {
    res.send('Express to the rescue!');
});
httpApp.get('/api', (req, res) => {
    res.send('Express to the rescue!');
});
 
if(process.env.NODE_ENV != "development") { 
    // Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/pelican.fittedtech.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/pelican.fittedtech.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/pelican.fittedtech.com/chain.pem', 'utf8');
    
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    httpApp.get('*', function(req, res) {  
        if(process.env.development != "development") { 
            res.redirect('https://' + req.headers.host + req.url);
        } 
    })
    const httpServer = http.createServer(httpApp).listen(80, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 80!`); 
    });
    const httpsServer = https.createServer(credentials, httpsApp).listen(443, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 443!`)
    });
} else {

    const httpServer = http.createServer(httpApp).listen(8080, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 8080!`); 
    });
        
}
 

process.on('exit', function() {
    connection.close();
});