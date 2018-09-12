import fs from "fs";
import http from "http";
import https from "https";
import express from 'express';
import bodyParser from "body-parser";
import utils from "./libs/utils.js";
import path from "path"; 
import _ from "lodash";
import helmet from "helmet";
import userRoutes from "./routes/user"; 
import storeRoutes from "./routes/store"; 
 

utils.loadENV();   

const app = express();   
const httpApp = express();   
  

app.use(bodyParser.json());
httpApp.use(bodyParser.json());

app.use(helmet()); 
httpApp.use(helmet());

app.use(bodyParser.urlencoded({extended: true})); 
httpApp.use(bodyParser.urlencoded({extended: true}));
 
app.use(express.static(path.resolve(process.cwd(), 'public')))
app.use(utils.verifyToken); 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/store', storeRoutes);
app.get('/api/v1/health-check', (req, res) => res.sendStatus(200));  
 

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
    httpApp.use('/api/v1/user', userRoutes);
    httpApp.use('/api/v1/store', storeRoutes);
    httpApp.get('/api/v1/health-check', (req, res) => res.sendStatus(200));  

    const httpServer = http.createServer(httpApp).listen(8081, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 8081!`); 
    }); 
}
  