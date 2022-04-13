const JWT_SECRET = "iamanees$rehman$khan";
var jwt = require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and add the id to object of request
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using a valid token"})
    }
   
}

module.exports=fetchuser