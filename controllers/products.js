const express = require('express')
const router = express.Router();

const beautyCategoriesModel = require("../model/beautyCategories");

const productModel = require("../model/productNew");
const userProductModel = require("../model/userProduct");

router.get("/",(req,res)=>{

    productModel.find()
    .then((products)=>{

        const filteredProduct =   products.map(product=>{


            return {

                id: product._id,
                title:product.name,
                description:product.description,
                image :product.photo,
                category : product.category,
                price : product.price,
                bestseller:product.best
            }

        });

        res.render("products",{
            title:"Products",
            headingInfo: "Products Page",
            currentCategory: "All",
            products :beautyCategoriesModel.getAllProducts(),
            productsbest :filteredProduct
    
        });

    })
    .catch(err=>console.log(`Error happened when pulling products from the database :${err}`));

/*
    res.render("products",{
        title:"Products",
        headingInfo: "Products Page",
        products :beautyCategoriesModel.getAllProducts(),
        productsbest :productsbestModel.getAllProductsbest()

    });
 */  
});

router.post("/",(req,res)=>{
    if(req.body.category=="All"){
        productModel.find()
    .then((products)=>{

        const filteredProduct =   products.map(product=>{


            return {

                id: product._id,
                title:product.name,
                description:product.description,
                image :product.photo,
                category : product.category,
                price : product.price,
                bestseller:product.best
            }

        });

        res.render("products",{
            title:"Products",
            headingInfo: "Products Page",
            currentCategory: "All",
            products :beautyCategoriesModel.getAllProducts(),
            productsbest :filteredProduct
    
        });

    })
    .catch(err=>console.log(`Error happened when pulling products from the database :${err}`));
    }
    else{
        productModel.find({category:req.body.category})
        .then((products)=>{


            const filteredProduct =   products.map(product=>{


                return {

                    id: product._id,
                    title:product.name,
                    description:product.description,
                    image :product.photo,
                    category : product.category,
                    price : product.price,
                    bestseller:product.best
                }

            });
            
            res.render("products",{
                title:"Products",
                headingInfo: "Products Page",
                currentCategory: req.body.category,
                products :beautyCategoriesModel.getAllProducts(),
                productsbest :filteredProduct
        
            });

        })
        .catch(err=>console.log(`Error happened when pulling products from the database :${err}`));
    }
/*
    res.render("products",{
        title:"Products",
        headingInfo: "Products Page",
        products :beautyCategoriesModel.getAllProducts(),
        productsbest :productsbestModel.getAllProductsbest()

    });
 */  
});



router.get("/productDes/:id",(req,res)=>{
    const errors=[];
    productModel.findOne({_id:req.params.id})
    .then((product)=>{   
        res.render("productDes",{
            title:"Products",
            headingInfo: "Products Page",
            product_img: product.photo,
            product_name: product.name,
            product_price: product.price,
            product_description: product.description,
            product_available: product.quantity>0,
            _id:req.params.id,
            errors
        });
    })
    .catch(err=>console.log(`Error happened when finding product in the database :${err}`));

});

router.post("/productDes/:id",(req,res)=>{
    const errors=[];

    if(req.session.userInfo && req.session.userInfo.type!="Admin")
    {

        const newOrder = {
            user_id : req.session.userInfo._id,
            product_id : req.params.id,
            quantity : req.body.quantity
        }

        const order =  new userProductModel(newOrder);
            order.save()
            .then((product)=>{
                productModel.findOne({_id:req.params.id})
                .then((product)=>{   
                    errors.push("Order added to shopping cart! You can access your shopping cart from Dashboard!");
                    res.render("productDes",{
                        title:"Products",
                        headingInfo: "Products Page",
                        product_name: product.name,
                        product_img: product.photo,
                        product_price: product.price,
                        product_description: product.description,
                        product_available: product.quantity>0,
                        _id:req.params.id,
                        errors
                    });
                })
                .catch(err=>console.log(`Error happened when finding product in the database :${err}`));
            })
            .catch(err=>console.log(`Error happened when inserting product in the database :${err}`));
        
    }
    else if(req.session.userInfo && req.session.userInfo.type=="Admin"){
        productModel.findOne({_id:req.params.id})
        .then((product)=>{   
            errors.push("Admin account is not eligiable for shopping!");
            res.render("productDes",{
                title:"Products",
                headingInfo: "Products Page",
                product_name: product.name,
                product_img: product.photo,
                product_price: product.price,
                product_description: product.description,
                product_available: product.quantity>0,
                _id:req.params.id,
                errors
            });
        })
        .catch(err=>console.log(`Error happened when finding product in the database :${err}`));
    }
    else
    {
        productModel.findOne({_id:req.params.id})
        .then((product)=>{   
            errors.push("Please login first!");
            res.render("productDes",{
                title:"Products",
                headingInfo: "Products Page",
                product_name: product.name,
                product_img: product.photo,
                product_price: product.price,
                product_description: product.description,
                product_available: product.quantity>0,
                _id:req.params.id,
                errors
            });
        })
        .catch(err=>console.log(`Error happened when finding product in the database :${err}`));
    }


});


module.exports = router;