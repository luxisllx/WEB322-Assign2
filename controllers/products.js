const express = require('express')
const router = express.Router();

const beautyCategoriesModel = require("../model/beautyCategories");
const productsbestModel = require("../model/productsbest");

const productModel = require("../model/productNew");

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

    productModel.findOne({_id:req.params.id})
    .then((product)=>{   
        res.render("productDes",{
            title:"Products",
            headingInfo: "Products Page",
            product_name: product.name,
            product_price: product.price,
            product_description: product.description,
            product_available: product.quantity>0,
        });
    })
    .catch(err=>console.log(`Error happened when finding product in the database :${err}`));

});


module.exports = router;