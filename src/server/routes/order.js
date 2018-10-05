import express from "express";
import db from "./../libs/db";
import utils from "./../libs/utils";
import Sequelize from "sequelize"; 
import jwt from "jsonwebtoken";

const Op = Sequelize.Op;
const router = express.Router();  

router.get('/available', function(req, res) { 
  db.Order.findAll({ where: {driverId: null}}).then(result => {
    console.log(result);
    return res.json(result)
  })
  .catch(err => res.json(err));
});

router.post('/', function(req, res) {  
  const token = req.body && req.body.token ? req.body.token : req.headers['token']; 
  const user = utils.decodeToken(token); 
  const order = {
      items: req.body.cart ? JSON.stringify(req.body.cart) : null, 
      requestorId: user.id,
      driverId: null,
      storeId: req.body.storeId
  };
 
    db.Order.create(order)
    .then(result => res.json(result))
    .catch(err => { 
      return res.status(500).json({error: "An unknown error occured", details: err});
    });
});

router.post('/commit', function(req, res) {   
  const token = req.body && req.body.token ? req.body.token : req.headers['token']; 
  const user = utils.decodeToken(token);
   
    db.Order.findOne({ where: {status: 0} })
    .then(result => {
        result.status = 1;
        result.driverId = user.id;
        return result.save();
    })
    .then(result => res.json(result))
    .catch(err => { 
      return res.status(500).json({error: "An unknown error occured", details: err});
    });
});

router.get('/', function(req, res) {   
  const token = req.body && req.body.token ? req.body.token : req.headers['token']; 
  const user = utils.decodeToken(token);
   
    db.Order.findOne({ where: {
      [Op.or]: [{requestorId: user.id}, {driverId: user.id}]
    }}) 
    .then(result => res.json(result))
    .catch(err => { 
      return res.status(500).json({error: "An unknown error occured", details: err});
    });
});

router.get('/location', function(req, res) {   
  const token = req.body && req.body.token ? req.body.token : req.headers['token']; 
  const user = utils.decodeToken(token);
  let order = {};
    db.Order.findOne({ where: {
      [Op.or]: [{requestorId: user.id}, {driverId: user.id}],
      include: [{
        model: 'orderLogs',
        required: true,
        where: {requestorId: user.id}, 
        order: ['createdAt', 'DESC']
       }]
    }})  
    .then(result => res.json(result))
    .catch(err => { 
      return res.status(500).json({error: "An unknown error occured", details: err});
    });
});

router.post('/location', function(req, res) {  
  const token = req.body && req.body.token ? req.body.token : req.headers['token']; 
  const user = utils.decodeToken(token);
  
    const orderLog = {
        orderId: req.body.orderId,
        status: req.body.status,
        lat: req.body.lat,
        lng: req.body.lng
    };

    db.OrderLog.create(orderLog)
    .then(result => res.json(result))
    .catch(err => { 
      return res.status(500).json({error: "An unknown error occured", details: err});
    });  
});

router.post('/status', function(req, res) {  
  const token = req.body && req.body.token ? req.body.token : req.headers['token']; 
  const user = utils.decodeToken(token);
   
    db.Order.findOne({ where: {id: req.body.order.id} })
    .then(result => {
        result.status = req.body.order.status; 
        return result.save();
    })
    .then(result => res.json(result))
    .catch(err => { 
      return res.status(500).json({error: "An unknown error occured", details: err});
    }); 
});

router.get('/status', function(req, res) {  
    
});

export default router;