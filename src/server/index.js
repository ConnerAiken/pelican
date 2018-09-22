import fs from "fs";
import http from "http";
import https from "https";
import express from 'express';
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import utils from "./libs/utils.js";
import path from "path"; 
import _ from "lodash";
import helmet from "helmet";
import userRoutes from "./routes/user"; 
import storeRoutes from "./routes/store"; 
import orderRoutes from "./routes/order"; 
import uploadRoutes from "./routes/upload"; 
import inventoryRoutes from "./routes/inventory"; 

import db from "./libs/db";
 
utils.loadENV();   

const app = express();   
const httpApp = express(); 

app.use(fileUpload());
httpApp.use(fileUpload());

app.use(bodyParser.json());
httpApp.use(bodyParser.json());

app.use(helmet()); 
httpApp.use(helmet());

app.use(bodyParser.urlencoded({extended: true})); 
httpApp.use(bodyParser.urlencoded({extended: true}));
 
app.use(express.static(path.resolve(process.cwd(), 'public')))
app.use(utils.verifyToken);  
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/store', storeRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.get('/api/v1/health-check', (req, res) => res.sendStatus(200));  
app.get('*', (req,res) =>{
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
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
    httpApp.use(utils.verifyToken);
    httpApp.use('/api/v1/upload', uploadRoutes);
    httpApp.use('/api/v1/user', userRoutes); 
    httpApp.use('/api/v1/store', storeRoutes);
    httpApp.use('/api/v1/order', orderRoutes);
    httpApp.use('/api/v1/inventory', inventoryRoutes);
    httpApp.get('/api/v1/health-check', (req, res) => res.sendStatus(200));  
    httpApp.get('*', (req,res) =>{
        res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
    });

    const httpServer = http.createServer(httpApp).listen(8081, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 8081!`); 
    }); 
}
  