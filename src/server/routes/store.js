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

export default router;