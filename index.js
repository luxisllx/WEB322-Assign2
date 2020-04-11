const express = require("express"); //this imports the express package that was installed within your application

const app = express(); // this creates your express app object

const exphbs= require("express-handlebars");

const mongoose = require('mongoose');

const bodyParser = require("body-parser");
require('dotenv').config({path:"./config/keys.env"});

//This tells express to set up our template engine has handlebars
app.engine("handlebars",exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false}));

const router = express.Router();

//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/products");

//map each controller to the app object

app.use("/",generalController);
app.use("/products",productController);

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