import jwt from "jsonwebtoken";
import db from "../libs/db";
import bcrypt from "bcrypt";
import express from "express"; 
import axios from "axios";

const router = express.Router(); 
 
router.get('/', function(req, res) {  
  console.log("/store endpoint detected");
  
  db.Store.findAll().then(function(stores) { 
    console.log("Found "+stores.length+" stores.");
    if(stores.length == 0) {
       return res.status(401).json({
          failed: 'Could not find any stores'
       });
    }   
    return res.status(200).json(stores);
    
  }).catch(error => {  
    console.log(error);
    return res.status(500).json({error: error});
  });
});
 
router.get('/products/:apiId', function(req, res) {    
  axios.get('https://api.greenbits.com/api/v1/products?mj=true&by_active=true&limit=100', {   
    headers: {
      'Authorization': 'Token token="7tJv4mJ8PF0enhBZlRRfDQ"',
      'Content-Type': 'application/json',
      'X-GB-CompanyId': req.params.apiId
    }
  
  }).then(result => {   
    return res.json({success: true, data: result.data});
  })
  .catch(e => console.log(e));
});

router.get('/productTypes/:apiId', function(req, res) {    
  axios.get('https://api.greenbits.com/api/v1/product_types', {   
    headers: {
      'Authorization': 'Token token="7tJv4mJ8PF0enhBZlRRfDQ"',
      'Content-Type': 'application/json',
      'X-GB-CompanyId': req.params.apiId
    } 
  })
  .then(result => { 
    return res.json({success: true, data: result.data});
  })
  .catch(e => console.log(e));
});

export default router;