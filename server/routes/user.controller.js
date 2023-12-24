const RescueMeUser=require('../model/UserModel')
const connectDB=require('../config/DBConnect')
const protectRoute=require('../config/authorization')
const generateToken=require('../config/generateToken')



//api_url- http://localhost:5000/user?id=<value>
async function GetUser(req, res){
    await connectDB().catch(error=>res.status(500).json({error:'connection falied with mongoDB...'}))

    if(req.method=='GET'){
       const user_id=req.query.id.toString()
       try{
         const result=await RescueMeUser.findOne({_id: user_id}).select('-password')
         if(result){
            return res.status(200).json(result)
         }
         else{return res.status(404).json({error:'User not found...'})}
       }catch(err){
        return res.status(404).json({error:'User not found...'})
       }
    }
    else{
        return res.status(404).json({error:'Not a valid http method on this route..'})
    }
}


//HTTP PUT request.
async function UpdateUser(req, res){
  await connectDB().catch(error=>res.status(500).json({error:'connection falied with mongoDB...'}))
   
  await protectRoute(req,res).catch(error=>res.status(400).json({error:'user authorization failed/user is not authorized...'}))
  
    if(req.method=='PUT'){
       const data=req.body
       const result=await RescueMeUser.findByIdAndUpdate(
        {_id:data._id}, 
        {
          fname: data.fname,
          lname:data.lname,
          phone_no1:data.phone_no1,
          phone_no2:data.phone_no2,
          gmap_location_url:data.gmap_location_url,
          address:data.address,
          pincode:data.pincode,
          reward:data.reward,
          facebook:data.facebook,
          instagram:data.instagram,
          pic:data.pic
        }, 
        {new:true})
        .select('-password')

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
       return res.status(404).json({error:'Failed to update...'})
    }
    else{
        return res.status(404).json({error:'Not a valid http method on this route..'})
    }
}

module.exports={
  GetUser,
  UpdateUser,
}