const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProduceSchema = new Schema({
  user_id:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  },    
  product_id:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  } , 
  quantity:  
  {
      type:Number, // String is shorthand for {type: String}
      required:true
  } 
});

var userProductModel = mongoose.model('userProduct', userProduceSchema);

module.exports=userProductModel;