import express from 'express';
import utils from "./helpers/utils.js";
import path from "path";
import dotenv from "dotenv";

global.path = path;
global.dotenv = dotenv;

utils.loadENV();  
const app = express(); 
const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

app.use(express.static(path.resolve(process.cwd(), 'public')))

app.get('/health-check', (req, res) => res.sendStatus(200));

app.get('/api', (req, res) => {
    res.send('Express to the rescue!');
});

app.listen(process.env.port, '0.0.0.0', () => {
    utils.log(`Server has started and is listening on port ${process.env.port}!`)
});