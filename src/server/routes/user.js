import jwt from "jsonwebtoken";
import db from "./../libs/db";
import bcrypt from "bcrypt";
import express from "express";
import path from "path";
import fs from "fs";
import _ from "lodash";

const router = express.Router(); 
const appData = {};

function base64Encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
} 

router.get('/verification', function(req, res) {
  console.log("Sending verification form");
  console.log(req);
  return res.status(200).json({success: true});
}); 

router.post('/verification', function(req, res) {
  console.log("Sending verification form");
  console.log(req);
  return res.status(200).json({success: true});
}); 

router.post('/register', function(req, res) {  
  
  if(Object.keys(req.body).length < 5) {
    return res.status(500).json({
      error: 'The form submission was manipulated.'
   });
  }
    
   bcrypt.hash(req.body.password, 10, function(err, hash) {
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
            vehicleImagePath: req.body.vehicleImage || null,
            licenseImagePath: req.body.licenseImage || null,
            profileImagePath: req.body.profileImage || null, 
            vehiclePlate: req.body.vehiclePlate || null,
            password: hash
        };
        
        let paths = [];
        // Save to DB
        return db.User.create(user)
                .then(res => { 
                  user.userId = res.get({plain: true}).id;

                  if(user.vehicleImagePath) { 
                    user.vehicleImageBase64 = base64Encode(path.join(process.cwd(), 'public', user.vehicleImagePath)); 
                    paths.push(path.join(process.cwd(), 'public', user.vehicleImagePath)); 
                    delete user.vehicleImagePath;
                  } 
                  if(user.licenseImagePath) {
                    user.licenseImageBase64 = base64Encode(path.join(process.cwd(), 'public', user.licenseImagePath)); 
                    paths.push(path.join(process.cwd(), 'public', user.licenseImagePath)); 
                    delete user.licenseImagePath;
                  }
                  if(user.profileImagePath) {
                    user.profileImageBase64 = base64Encode(path.join(process.cwd(), 'public', user.profileImagePath));
                    paths.push(path.join(process.cwd(), 'public', user.profileImagePath)); 
                    delete user.profileImagePath;
                  }

                  return db.UserInfo.create(user);
                }) 
                .then(result => res.json(result)) 
                .catch(err => {
                  console.log("Caught an error while saving to the database: ");
                  console.log(err);
                  if(err.original.errno && err.original.errno == 1062) {
                    console.log("Telling the client the user already exists");
                    return res.status(409).json({error: "User already exists"});
                  }else {
                    console.log("Telling the client an unknown error occured");
                    return res.status(500).json({error: "An unknown error occured", details: err});
                  }
                });

   });
});

router.post('/login', function(req, res) {   
  db.User.findOne({ where: {email: req.body.email}}).then(function(user) {  
    if(!user) {
       return res.status(401).json({
          failed: 'We could not find a user with that email, please use the sign up form.'
       });
    }  
     
     bcrypt.compare(req.body.password, user.password, function(err, result){ 
        if(err) {
           return res.status(401).json({
              failed: 'Invalid credentials'
           });
        }
        
        if(result) {  
          db.UserInfo.findOne({where: {userId: user.id}}).then(userInfo => { 
            // Construct token object
            userInfo = userInfo.get({
              plain: true
            });

            const userObj = {
              id: user.id,
              accountType: user.accountType,
              email: user.email
            }

            delete user.password; 
            userInfo.licenseImageBase64 = false;
            userInfo.vehicleImageBase64 = false;
            userInfo.profileImage = userInfo.profileImageBase64; 
             
            return res.status(200).json({
              success: 'Welcome to Pelican Delivers', 
              token: jwt.sign(userObj, process.env.appSecret, {expiresIn: 5000}),
              userInfo
           });
          }).catch(error => {  
            console.log(error);
            return res.status(500).json({error: error});
          }); 
        }else { 
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }
     });
     
  }).catch(error => {  
    console.log(error);
    return res.status(500).json({error: error});
  });
});

export default router;