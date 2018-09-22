import express from "express";  
const router = express.Router();  

router.post('/', function(req, res) {  
  console.log(req);
  return res.status(200).json({success: true});
});
 
export default router;