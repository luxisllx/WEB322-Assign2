const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  },    
  email:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  } , 
  password:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  } ,
  type:  
  {
      type:String, // String is shorthand for {type: String}
      default:"User"
  }     
});

userSchema.pre("save",function(next)
{

    //salt random generated characters or strings
    bcrypt.genSalt(12)
    .then((salt)=>{
        
        bcrypt.hash(this.password,salt)
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next();

        })
        .catch(err=>console.log(`Error occured when hasing ${err}`));
    })
    .catch(err=>console.log(`Error occured when salting ${err}`));



})

var userModel = mongoose.model('User', userSchema);

module.exports=userModel;