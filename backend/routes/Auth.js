const express = require("express");
const { body ,validationResult} = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT_SECRET = "iamanees$rehman$khan";
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/Fetchuser");
router.post("/createUser/",

[
    body("name","Enter a Valid Name").isLength({min:3}),
    body("email","Enter a Valid Email").isEmail(),
    body("password","Enter a Valid Password").isLength({min:3})

],



async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email:req.body.email})

    try {

        if(user){
            return res.status(400).json({success:success,error:"Sorry Email With this user Already Exists..."})
        }

        const salt = await bcrypt.genSalt(10);
        hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
          })
       

          const data = {
              user:{
                  id:user.id,
                  name:user.name
              }
          }
         let name=data.user.name;
        //  console.log(name);
          const authToken=jwt.sign(data,JWT_SECRET)
          success=true;
        // res.send(req.body)
          res.json({authToken,success,name})
        //   res.json({authToken,name})
      

        
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: error.message });
    }
      
})

//login user api call



router.post(
    "/loginUser/",
    [
      body("email", "Enter a Valid Email").isEmail(),
      body("password", "password cannot be blank").exists(),
    ], async(req,res)=>{
       let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({success, errors: errors.array() });
        }
    
        const {email,password} = req.body;
        try{
            let user = await User.findOne({email})
            if (!user) {
                return res
                  .status(400)
                  .json({ error: "No User With this Email Exists" });
              }

              const passwordCompare =await bcrypt.compare(password,user.password);
              if (!passwordCompare) {
                return res
                  .status(400)
                  .json({ error: "Please Provide a Valid Password" });
              }
            //   paayload is user data 
              const payload = {
                  user:{
                      id:user.id,
                      name:user.name
                  }
              }
              success=true;
              let name=payload.user.name;
              // console.log(payload);
              const authToken = jwt.sign(payload,JWT_SECRET)
           
              res.json({authToken,success,name})
        }
        catch(error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }

    }

)

//Get user details  using middleware as post method "/api/auth/getuser"

router.post(
    "/getUser",fetchuser, async(req,res)=>{

        try{
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        }
        catch(error){
            console.log(error);
            res.status(500).send("Internal Server Error")
        }


    })


module.exports = router;