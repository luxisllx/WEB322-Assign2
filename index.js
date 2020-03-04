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

const router = express.Router();

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
        passError:`${passError}`,
        oldemail:`${req.body.email}`,
        oldpass:`${req.body.password}`

    });

});


app.post("/signup",(req,res)=>{

    let nameError = "";
    let emailError = "";
    let passError="";
    let error=false;

    if(req.body.firstName =="")
    {
        nameError = "Please enter a name";
        error=true;
    }

    if(req.body.email =="")
    {
        emailError = "Please enter a valid Email";
        error=true;
    }

    if(req.body.password =="")
    {
        passError = "Please enter a valid password";
        error=true;
    }

    if(req.body.password!==req.body.password_repeat){
        passError = "Passwords do not match";
        error=true;
    }

    if(req.body.password.length<6||req.body.password.length>12)
    {
        passError = "Please enter password between 6 to 12 characters";
        error=true;
    }
    
    if(error){
        console.log("ERROR!");
        res.render("signup",{
            title:"signup",
            headingInfo: "Sign Up Page",
            emailError: `${emailError}`,
            passError:`${passError}`,
            nameError: `${nameError}`,
            oldname:`${req.body.firstName}`,
            oldemail:`${req.body.email}`,
            oldpass:`${req.body.password}`,
            oldpass_repeat:`${req.body.oldpass_repeat}`
    
        });
    }
    else{
        console.log("NO ERROR!");
        const {firstName,email,password,password_repeat} = req.body;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
        to: 'luxisllx@gmail.com',
        from: `${email}`,
        subject: 'Welcome to Luxia',
        html: 
        `Visitor's Full Name ${firstName}
        Visitor's Email Address ${email}
        Visitor's Password ${password}
        `,
        };
        //Asynchronous operation (Dunno how long this will take to execute)
    
        sgMail.send(msg)
        .then(()=>{
    
            res.render("dashboard",{
                title:"Dashboard",
                headingInfo: "Dashboard Page",
        
            });
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        })
    }
    
    
    
});


const PORT=process.env.PORT || 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});