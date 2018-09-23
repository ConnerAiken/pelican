import express from "express";  
const router = express.Router();  

router.post('/', function(req, res) {   
  return res.status(200).json({success: true});
});
 
export default router;