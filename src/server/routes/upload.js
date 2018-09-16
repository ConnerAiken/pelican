import path from "path";
import express from "express";  

const router = express.Router(); 
 
router.post('/', (req, res, next) => {  
    let imageFile = req.files.file;
    const filename = Math.floor(new Date() / 1000) + "." + req.body.filename.split('.').pop(); 

    imageFile.mv(path.join(process.cwd(), 'public', 'uploads', filename), function(err) {
        if (err) {
            return res.status(500).send(err);
        }
  
      res.json({file: path.join('uploads', filename)});
    });
  
  });


  export default router;