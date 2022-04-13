const express = require("express");
const router = express.Router();

const user ={
    "name":"age",
    "age":22,
}
router.get("/testing/",async (req,res)=>{
       try {
        res.send(user);
           
       } catch (error) {
        
            console.log(error);
            res.status(500).json({ message: error.message });
       
       
       }   
})
module.exports = router;