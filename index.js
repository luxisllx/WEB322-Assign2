const express = require("express"); //this imports the express package that was installed within your application

const app = express(); // this creates your express app object

const exphbs= require("express-handlebars");

const mongoose = require('mongoose');

const fileUpload = require('express-fileupload');

const session = require('express-session');

const bodyParser = require("body-parser");
require('dotenv').config({path:"./config/keys.env"});

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false}));

//This tells express to set up our template engine has handlebars
app.engine("handlebars",exphbs({
    helpers:{
        ifEquals:function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
}));

app.set("view engine", "handlebars");

app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(fileUpload());

app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
  }))

app.use((req,res,next)=>{
  
    res.locals.user= req.session.userInfo;

    next();
})

//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/products");
const adminController = require("./controllers/admin");

//map each controller to the app object

app.use("/",generalController);
app.use("/products",productController);
app.use("/admin",adminController);


mongoose.connect(process.env.MONGODB_CONNECT_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));

const PORT=process.env.PORT || 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});