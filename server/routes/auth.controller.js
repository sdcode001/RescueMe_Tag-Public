const RescueMeUser=require('../model/UserModel')
const connectDB=require('../config/DBConnect')
const bcrypt=require('bcryptjs')
const generateToken=require('../config/generateToken')



async function RegisterUserHandler(req, res){
   await connectDB().catch(error=>res.status(500).json({error:'connection falied with mongoDB...'}))
   if(req.method=='POST'){
      const data=req.body
      if(!data.fname||!data.lname
        ||!data.email||!data.password
        ||!data.phone_no1 ||!data.gmap_location_url||!data.address
        ||!data.pincode){
            return res.status(400).json({error:'some registration detail is missing...'})
        }
        //checking if user is already exist or not...
        const existUser=await RescueMeUser.findOne({email:data.email})
        if(existUser){
           return res.status(400).json({error:'user is already exists, please try to login...'})
        }
        const result=await RescueMeUser.create({
            fname: data.fname,
            lname:data.lname,
            email:data.email,
            password:data.password,
            phone_no1:data.phone_no1,
            phone_no2:data.phone_no2,
            gmap_location_url:data.gmap_location_url,
            address:data.address,
            pincode:data.pincode,
            reward:data.reward,
            facebook:data.facebook,
            instagram:data.instagram,
            pic:data.pic
          })
          if(result){
             return res.status(201).json({
              _id:result._id,
              fname: result.fname,
              lname:result.lname,
              email:result.email,
              phone_no1:result.phone_no1,
              phone_no2:result.phone_no2,
              gmap_location_url:result.gmap_location_url,
              address:result.address,
              pincode:result.pincode,
              reward:result.reward,
              facebook:result.facebook,
              instagram:result.instagram,
              pic:result.pic,
              token: generateToken(result._id)
            })
          }
          else{
            return res.status(400).json({error:'Failed to create a user...'})
          }
   }
   else{
       return res.status(404).json({error:'Not a valid http method on this route..'})
   }
}




async function LoginUserHandler(req, res){
    await connectDB().catch(error=>res.status(500).json({error:'connection falied with mongoDB...'}))
    if(req.method=='POST'){
       const data=req.body 
       if(!data.email||!data.password){
          return res.status(400).json({error:'some registration detail is missing...'})
       }
       const result=await RescueMeUser.findOne({email:data.email})
       
       async function matchPassword(enteredPassword,encryptedPassword){
        return await bcrypt.compare(enteredPassword,encryptedPassword)
       }
       if(result && await matchPassword(data.password, result.password)){
         return res.status(200).json({
              _id:result._id,
              fname: result.fname,
              lname:result.lname,
              email:result.email,
              phone_no1:result.phone_no1,
              phone_no2:result.phone_no2,
              gmap_location_url:result.gmap_location_url,
              address:result.address,
              pincode:result.pincode,
              reward:result.reward,
              facebook:result.facebook,
              instagram:result.instagram,
              pic:result.pic,
              token: generateToken(result._id)
         })
       }
       else{
         return res.status(404).json({error:'Worng email/password...'})
       }
    }
    else{
        return res.status(404).json({error:'Not a valid http method on this route..'})
    }
}


module.exports={
    RegisterUserHandler,
    LoginUserHandler,
}