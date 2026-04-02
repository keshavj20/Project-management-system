const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const Userschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    is_verifed:{type:Boolean,default:false},
    profile_picture:{type:String},
    role:{type:String,enum:['user','manager','admin'],default:'user'}
},{timestamps:true})
Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});
module.exports=mongoose.model('user', Userschema);