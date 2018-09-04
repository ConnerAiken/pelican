
const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt'); 

router.post('/signup', function(req, res) {
   bcrypt.hash(req.body.password, 10, function(err, hash){
      if(err) {
         return res.status(500).json({
            error: err
         });
      }
      else {
        const user = {
            email: req.body.email,
            password: hash
        };
        // Save to DB
        return res.json(user);
      }
   });
});

module.exports = router;