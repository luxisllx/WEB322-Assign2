const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  }     
});

var userModel = mongoose.model('User', userSchema);

module.exports=userModel;