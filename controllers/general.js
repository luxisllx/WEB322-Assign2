const express = require('express')
const router = express.Router();

const categoryModel = require("../model/categories");
const bestsellerModel = require("../model/bestseller");
const userModel = require("../model/User");

//Route for the Home Page
router.get("/",(req,res)=>{

   
    res.render("index",{
        title:"Home",
        headingInfo: "Home Page",
        categories :categoryModel.getAllCategories(),
        bestseller :bestsellerModel.getAllBestseller()

    });

});

router.get("/signup",(req,res)=>{

    res.render("signup",{
        title:"signup",
        headingInfo: "Sign Up Page"

    });

});

router.get("/login",(req,res)=>{

    res.render("login",{
        title:"login",
        headingInfo: "Login Page"

    });

});





router.post("/login",(req,res)=>{

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


router.post("/signup",(req,res)=>{

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


        userModel.findOne({email:req.body.email})
        .then((user)=>{
            if(user==null)
            {
                const newUser = {
                    name : req.body.firstName,
                    email : req.body.email,
                    password : req.body.password
                }
                const usermodel = new userModel(newUser);
                usermodel.save()
                .then(()=>{
                    //sending email
                    
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
                            message: "Thank you, you are now registered as a member of Luxia. Happy Shopping!"
                        });
                    })
                    .catch(err=>{
                        console.log(`Error ${err}`);
                    })
                    
                })
                .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
            }
            //There is a matching email
            else
            {
                emailError = "Email exists";

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
        })
        .catch(err=>console.log(`Error happened when pulling in the database :${err}`));


        
    }
    
    
    
});

module.exports = router;