import db from "../libs/db"; 
import express from "express"; 
import axios from "axios";
import utils from "./../libs/utils";

const router = express.Router(); 
 
router.get('/', utils.cache(180), function(req, res) {   
  
  db.Store.scope('withoutCreds').findAll().then(function(stores) {  
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
 
router.get('/products/:storeId', utils.cache(180), function(req, res) {     
  db.Store.findOne({ where: {id: req.params.storeId}})
  .then(store => axios.get('https://api.greenbits.com/api/v1/products?mj=true&by_active=true&limit=100', {   
    headers: {
      'Authorization': `Token token="${store.apiKey}"`,
      'Content-Type': 'application/json',
      'X-GB-CompanyId': store.apiId
    }}))
  .then(result => res.json({success: true, data: result.data}))
  .catch(e => console.log(e)); 
});
 
router.get('/strains/:storeId', utils.cache(180), function(req, res) {    
  db.Store.findOne({ where: {id: req.params.storeId}})
  .then(store => axios.get('https://api.greenbits.com/api/v1/strains?mj=true&by_active=true&limit=100', {   
    headers: {
      'Authorization': `Token token="${store.apiKey}"`,
      'Content-Type': 'application/json',
      'X-GB-CompanyId': store.apiId
    }}))
  .then(result => res.json({success: true, data: result.data}))
  .catch(e => console.log(e)); 
 
});

router.get('/productTypes/:storeId', utils.cache(180), function(req, res) {    
  db.Store.findOne({ where: {id: req.params.storeId}})
  .then(store => axios.get('https://api.greenbits.com/api/v1/product_types', {   
    headers: {
      'Authorization': `Token token="${store.apiKey}"`,
      'Content-Type': 'application/json',
      'X-GB-CompanyId': store.apiId
    }}))
  .then(result => res.json({success: true, data: result.data}))
  .catch(e => console.log(e)); 

});

export default router;