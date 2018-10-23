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
app.get('/api/v1/health-check', (req, res) => res.sendStatus(200));  
app.get('*', (req,res) =>{
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

  
    httpApp.use(express.static(path.resolve(process.cwd(), 'public')))
    httpApp.use(utils.verifyToken);
    httpApp.use('/api/v1/upload', uploadRoutes);
    httpApp.use('/api/v1/user', userRoutes); 
    httpApp.use('/api/v1/store', storeRoutes);
    httpApp.use('/api/v1/order', orderRoutes); 
    httpApp.get('/api/v1/health-check', (req, res) => res.sendStatus(200));  
    httpApp.get('*', (req,res) =>{
        res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
    });

    const httpServer = http.createServer(httpApp).listen(8081, '0.0.0.0', () => {
        utils.log(`Server has started and is listening on port 8081!`); 
    }); 