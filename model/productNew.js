const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produceSchema = new Schema({
  name:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  },    
  price:  
  {
      type:Number, // String is shorthand for {type: String}
      required:true
  } , 
  description:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  } ,
  category:  
  {
      type:String, // String is shorthand for {type: String}
      required:true
  },
  quantity:  
  {
      type:Number, // String is shorthand for {type: String}
      required:true
  },
  best:  
  {
      type:Boolean, // String is shorthand for {type: String}
      default:"false"
  },
  photo:
  {
      type:String // String is shorthand for {type: String}
  }
});

var productModel = mongoose.model('product', produceSchema);

module.exports=productModel;