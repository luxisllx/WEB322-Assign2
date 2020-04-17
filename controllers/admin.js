const express = require('express')
const router = express.Router();

const productModel = require("../model/productNew");
const path = require("path");

const bcrypt = require("bcryptjs");

const isAuthenticated = require("../middleware/auth");
const isAuthorized = require("../middleware/authorization");

router.get("/add",isAuthenticated,isAuthorized,(req,res)=>
{
    res.render("adminAdd");
});

//Route to process user's request and data when the user submits the add task form
router.post("/add",isAuthenticated,isAuthorized,(req,res)=>
{
        const newProduct = {
            name : req.body.name,
            price : req.body.price,
            description : req.body.description,
            category : req.body.category,
            quantity : req.body.quantity,
            best : req.body.best
        }


        const errors=[];
        if(req.files==null){
            errors.push("Sorr, You need to upload a photo!");
            res.render("adminAdd",{
                errors
            })
        }
        else if (req.files.photo.mimetype != 'image/png' && req.files.photo.mimetype != 'image/jpeg' && req.files.photo.mimetype != 'image/jpg' && req.files.photo.mimetype != 'image/gif'){
            errors.push("Sorr, Your file type is incorrect!");
            res.render("adminAdd",{
                errors
            });
          } 
          else {
            const product =  new productModel(newProduct);
            product.save()
            .then((product)=>{

                req.files.photo.name = `photo_${product._id}${path.parse(req.files.photo.name).ext}`;

                req.files.photo.mv(`public/uploads/${req.files.photo.name}`)
                .then(()=>{


                    productModel.updateOne({_id:product._id},{
                        photo:req.files.photo.name
                    })
                    .then(()=>{
                        res.redirect("/admin/list")
                    })

                })
            })
            .catch(err=>console.log(`Error happened when inserting product in the database :${err}`));
          }

});

router.get("/list",isAuthenticated,isAuthorized,(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the taskDashboard

    productModel.find()
    .then((products)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const filteredProduct =   products.map(product=>{

                return {

                    id: product._id,
                    title:product.name,
                    description:product.description,
                    image :product.photo,
                    category : product.category,
                    price : product.price,
                    bestseller:product.best,
                    quantity: product.quantity
                }
        });



        res.render("adminList",{
           data : filteredProduct
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    
  
});

router.get("/edit/:id",isAuthenticated,isAuthorized,(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{

        const {_id,name,price,description,category,quantity,best,photo} = product;
        res.render("adminEdit",{
            _id,
            name,
            price,
            description,
            category,
            quantity,
            best,
            photo
        })

    })
    .catch(err=>console.log(`Error happened when pulling product from the database :${err}`));


})

router.put("/update/:id",isAuthenticated,isAuthorized,(req,res)=>{
    

    const product =
    {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        category : req.body.category,
        quantity : req.body.quantity,
        best : req.body.best
    }

    if(product.best!=true){
        product.best = false;
    }
    //console.log(req.files);

    const errors=[];
    if(req.files==null){
        productModel.updateOne({_id:req.params.id},product)
            .then((product)=>{   
                        res.redirect("/admin/list")
            })
            .catch(err=>console.log(`Error happened when inserting product in the database :${err}`));
    }
        else if (req.files.photo.mimetype != 'image/png' && req.files.photo.mimetype != 'image/jpeg' && req.files.photo.mimetype != 'image/jpg' && req.files.photo.mimetype != 'image/gif'){
            errors.push("Sorr, Your file type is incorrect!");
            res.render("adminAdd",{
                errors
            });
          } 
          else {
            productModel.updateOne({_id:req.params.id},product)
            .then((product)=>{

                req.files.photo.name = `photo_${product._id}${path.parse(req.files.photo.name).ext}`;

                req.files.photo.mv(`public/uploads/${req.files.photo.name}`)
                .then(()=>{


                    productModel.updateOne({_id:product._id},{
                        photo:req.files.photo.name
                    })
                    .then(()=>{
                        res.redirect("/admin/list")
                    })

                })
            })
            .catch(err=>console.log(`Error happened when inserting product in the database :${err}`));
          }


});

router.delete("/delete/:id",isAuthenticated,isAuthorized,(req,res)=>{
    
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/admin/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});

module.exports = router;

