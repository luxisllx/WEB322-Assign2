const express = require('express')
const router = express.Router();

const productModel = require("../model/products");
const productsbestModel = require("../model/productsbest");

router.get("/",(req,res)=>{

    res.render("products",{
        title:"Products",
        headingInfo: "Products Page",
        products :productModel.getAllProducts(),
        productsbest :productsbestModel.getAllProductsbest()

    });
   
});

module.exports = router;