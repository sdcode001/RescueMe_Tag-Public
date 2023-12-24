const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

//this is the user schema.
const userSchema=mongoose.Schema(
    {
        fname:{type:String,required:true},
        lname:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        phone_no1:{type:String,required:true},
        phone_no2:{type:String,default:''},
        gmap_location_url:{type:String,required:true},
        address:{type:String,required:true},
        pincode:{type:String,required:true},
        reward:{type:String,default:'0'},
        facebook:{type:String,default:''},
        instagram:{type:String,default:''},
        pic:{type:String,default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBxkWPjMhg6KA1wPseVi539U7-kWiB3aRdaGKf1hw6hbTjk18&s'}
    },{
        timestamps:true
    }
)

//encrypting the password before saving to database
userSchema.pre("save",async function (next){
    if(!this.isModified){
     next()
    }
     const salt=await bcrypt.genSalt(10)
     this.password=await bcrypt.hash(this.password,salt)
 })


const RescueMeUser=mongoose.models.RescueMeUser || mongoose.model("RescueMeUser",userSchema)

module.exports=RescueMeUser

