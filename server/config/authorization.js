const jwt=require('jsonwebtoken')
const RescueMeUser=require('../model/UserModel')
require('dotenv').config('../.env')

async function protectRoute(req,res){
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
       token=req.headers.authorization.split(" ")[1]
       const decode=jwt.verify(token, process.env.JWT_SECRET)
       const result=await RescueMeUser.findById(decode.id).select('-password')
       if(!result){
          return res.status(400).json({error:'user authorization failed/user is not authorized'})
        }
        //if user is authorized then attach the user object with the request...
        req.user=result
    }catch(err){
        res.status(400).json({error:'user authorization failed/user is not authorized'})
    }
  }

  if(!token){
    res.status(401).json({error:'user authorization failed/user is not authorized'})
 }
  
}

module.exports=protectRoute