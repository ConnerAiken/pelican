
const express = require('express'); 
const bcrypt = require('bcrypt');
const db = require('./../libs/db'); 
const router = express.Router(); 
  
router.post('/register', function(req, res) {  
  
  if(Object.keys(req.body).length < 5) {
    return res.status(500).json({
      error: 'The form submission was manipulated.'
   });
  }
    
   bcrypt.hash(req.body.password, 10, function(err, hash){
      if(err) {
         console.log("Caught an error in hashing function");
         console.log(err);
         return res.status(500).json({
            error: err
         });
      }
         
        const user = {
            email: req.body.email,
            accountType: req.body.accountType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone.replace(/[\s()-.+]+/gi, ''),
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2 || null,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            country: req.body.country,
            description: req.body.description || null, 
            vehicleColor: req.body.vehicleColor || null,
            vehicleType: req.body.vehicleType || null,
            vehiclePlate: req.body.vehiclePlate || null,
            password: hash
        };
 
        // Save to DB
        return db.saveUser(user)
                .then(result => res.json(result))
                .catch(err => {
                  console.log("Caught an error while saving to the database: "+err.errno);
                  if(err.errno && err.errno == 1062) {
                    console.log("Telling the client the user already exists");
                    return res.status(409).json({error: "User already exists"});
                  }else {
                    console.log("Telling the client an unknown error occured");
                    return res.status(500).json({error: "An unknown error occured"});
                  }
                });

   });
});

router.post('/login', function(req, res) { 

  db.findUser(req.body.email).then(function(users) { 
    if(users.length == 0) {
       return res.status(401).json({
          failed: 'No relevant user'
       });
    }  
 
     const user = users[0];
     bcrypt.compare(req.body.password, user.password, function(err, result){ 
        if(err) {
           return res.status(401).json({
              failed: 'Invalid credentials'
           });
        }
        if(result) {
           return res.status(200).json({
              success: 'Welcome to Pelican Delivers'
           });
        }
        return res.status(401).json({
           failed: 'Unauthorized Access'
        });
     });
  }).catch(error => {  
    return res.status(500).json({error: error});
  });
});

module.exports = router;