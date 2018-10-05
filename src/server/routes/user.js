import jwt from "jsonwebtoken";
import db from "./../libs/db";
import bcrypt from "bcrypt";
import express from "express";
import path from "path";
import fs from "fs";
import _ from "lodash"; 
import geoip from "geoip-lite";

const router = express.Router(); 
const appData = {};

function base64Encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
} 

router.get('/verification', function(req, res) { 
  return res.status(200).json({success: true});
}); 

router.post('/verification', function(req, res) {
  const user = jwt.decode(req.headers.token);
   
  db.User.findOne({ where: {email: user.email}})
  .then(user => {
    console.log("Verifying user: "+user.email);
    user.verified = true;
    return user.save();
  })
  .then(result => res.json(result)) 
  .catch(err => res.json(err));
   
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

router.get('/isAcceptingOrders', function(req, res) {    
  const user = jwt.decode(req.headers.token); 
  db.UserInfo.findOne({ where: {userId: user.id}}).then(function(userInfo) {   
    return res.status(200).json({
      success: true,
      payload: {isAcceptingOrders: userInfo.isAcceptingOrders}
    });
  }); 
});

router.post('/isAcceptingOrders', function(req, res) {    
  const user = jwt.decode(req.headers.token); 
  db.UserInfo.findOne({ where: {userId: user.id}}).then(function(userInfo) {  
      
    userInfo.isAcceptingOrders = req.body.isAcceptingOrders;

    return userInfo.save().then(result => { 
        return res.status(200).json({
          success: 'Logged out'
        });
    });
  });

});

router.post('/logout', function(req, res) {    
  const user = jwt.decode(req.headers.token);

  return db.AuthLog.create({
    userId: user.id,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    type: "logout::success"
  }).then(result => { 
      return res.status(200).json({
        success: 'Logged out'
      });
  }) 
});


router.post('/login', function(req, res) {   
  const geo = geoip.lookup(req.headers['x-forwarded-for'] || req.connection.remoteAddress) ? geoip.lookup(req.headers['x-forwarded-for'] || req.connection.remoteAddress) : {};

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
          // Consolidate this into the upmost query with a join
          return db.UserInfo.findOne({where: {userId: user.id}}).then(userInfo => { 
            // Construct token object
            userInfo = userInfo.get({
              plain: true
            });

            const tokenData = {
              email: user.email,
              id: user.id,
              accountType: user.accountType,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              verified: user.verified
            }
            
            const token = jwt.sign(tokenData, process.env.appSecret, {expiresIn: 5000});  

           return db.AuthLog.create({
              userId: user.id,
              ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
              city: geo.city || null,
              region: geo.region || null,
              country: geo.country || null,
              type: "login::success"
            }).then(result => { 
                return res.status(200).json({
                  success: 'Welcome to Pelican Delivers', 
                  token,
                  profileImage: userInfo.profileImageBase64
                });
            }) 

          }).catch(error => {   
            db.AuthLog.create({
              userId: user.id,
              ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
              city: geo.city || null,
              region: geo.region || null,
              country: geo.country || null,
              type: "login::errorLogging"
            }).then(result => {  
              return res.status(500).json({error: error});
            });

          }); 
        }else {  
          db.AuthLog.create({
            userId: user.id,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            city: geo.city || null,
            region: geo.region || null,
            country: geo.country || null,
            type: "login::badPassword"
          }).then(result => { 
            return res.status(401).json({
              error: 'Unauthorized Access'
            });
          }); 
        }
     });
     
  }).catch(error => {    
    db.AuthLog.create({
      userId: user.id,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      city: geo.city || null,
      region: geo.region || null,
      country: geo.country || null,
      type: "login::badPassword"
    }).then(result => { 
      return res.status(500).json({
        error: 'Invalid credentials'
      }); 
    }); 
  });
});

export default router;