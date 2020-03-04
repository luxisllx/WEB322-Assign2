const express = require("express"); //this imports the express package that was installed within your application

const app = express(); // this creates your express app object

const exphbs= require("express-handlebars");

const productModel = require("./model/products");
const categoryModel = require("./model/categories");
const bestsellerModel = require("./model/bestseller");
const productsbestModel = require("./model/productsbest");
const bodyParser = require("body-parser");
require('dotenv').config({path:"./config/keys.env"});



//This tells express to set up our template engine has handlebars
app.engine("handlebars",exphbs());
app.set("view engine", "handlebars");



app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false}));

//Route for the Home Page
app.get("/",(req,res)=>{

   
    res.render("index",{
        title:"Home",
        headingInfo: "Home Page",
        categories :categoryModel.getAllCategories(),
        bestseller :bestsellerModel.getAllBestseller()

    });

});

app.get("/signup",(req,res)=>{

    res.render("signup",{
        title:"signup",
        headingInfo: "Sign Up Page"

    });

});

app.get("/login",(req,res)=>{

    res.render("login",{
        title:"login",
        headingInfo: "Login Page"

    });

});

app.get("/products",(req,res)=>{

    res.render("products",{
        title:"Products",
        headingInfo: "Products Page",
        products :productModel.getAllProducts(),
        productsbest :productsbestModel.getAllProductsbest()

    });
   
});



app.post("/login",(req,res)=>{

    let emailError = "";
    let passError="";
    

    if(req.body.email =="")
    {
        
        emailError = "Please enter a valid Email";
    }

    if(req.body.password =="")
    {
        
        passError="Please enter a valid Password";
    }

    res.render("login",{
        title:"login",
        headingInfo: "Login Page",
        emailError: `${emailError}`,
        passError:`${passError}`

    });

});


app.post("/signup",(req,res)=>{

    const {firstName,lastName,email,message} = req.body;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
    to: 'luxisllx@gmail.com',
    from: `${email}`,
    subject: 'Contact Us Form Submit',
    html: 
    `Visitor's Full Name ${firstName} ${lastName}
    Visitor's Email Address ${email}
    Visitor's Message ${message}
    `,
    };
    //Asynchronous operation (Dunno how long this will take to execute)

    sgMail.send(msg)
    .then(()=>{

        res.redirect("/");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    })
    
    
});


const PORT=process.env.PORT || 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});