const express = require('express')
const router = express.Router();

const productModel = require("../model/productNew");
const userProductModel = require("../model/userProduct");
const path = require("path");

const bcrypt = require("bcryptjs");

const isAuthenticated = require("../middleware/auth");
const isAuthorized = require("../middleware/authorization");

router.get("/shoppingCart",isAuthenticated,(req,res)=>
{
    
    userProductModel.find({user_id:req.session.userInfo._id})
        .then((orders)=>{

            const orderIds=orders.map(order=>{
                return order.product_id;
            });
            productModel.find({"_id":{ "$in": orderIds }})
                .then((products)=>{
                    totalPrice = 0;
                    const filteredProduct =   orders.map(order=>{
                        thisQuanity = 0;
                        product = products.find( ({ _id }) => _id == order.product_id );

                        totalPrice = totalPrice + order.quantity*product.price;
                        return {
        
                            id: product._id,
                            title:product.name,
                            description:product.description,
                            image :product.photo,
                            category : product.category,
                            price : product.price,
                            bestseller:product.best,
                            available: product.quantity>order.quantity,
                            quantity: order.quantity
                        }
        
                    });
                    const errors=[];
                    res.render("userShoppingCart"
                    ,{
                        orders :filteredProduct,
                        totalPrice: totalPrice,
                        errors
                    });
                })
                .catch(err=>console.log(`Error happened when pulling products from the database :${err}`));

        })
        .catch(err=>console.log(`Error happened when pulling products from the database :${err}`));
});

router.post("/shoppingCart",isAuthenticated,(req,res)=>{
    
    userProductModel.find({user_id:req.session.userInfo._id})
    .then((orders)=>{

        const orderIds=orders.map(order=>{
            return order.product_id;
        });
        productModel.find({"_id":{ "$in": orderIds }})
            .then((products)=>{
                totalPrice = 0;
                filteredProduct =   orders.map(order=>{
                    thisQuanity = 0;
                    product = products.find( ({ _id }) => _id == order.product_id );

                    totalPrice = totalPrice + order.quantity*product.price;
                    return {
    
                        id: product._id,
                        title:product.name,
                        description:product.description,
                        image :product.photo,
                        category : product.category,
                        price : product.price,
                        bestseller:product.best,
                        available: product.quantity>order.quantity,
                        quantity: order.quantity
                    }
    
                });
                const errors=[];
                if(filteredProduct.length == 0){
                    errors.push("No items in your shopping cart");
                    res.render("userShoppingCart"
                    ,{
                        orders:filteredProduct,
                        totalPrice: totalPrice,
                        errors
                    });
                }
                else{
                    errors.push("Your order has been placed!");
                    
                    userProductModel.deleteMany({user_id:req.session.userInfo._id})
                    .then(()=>{

                        emailbody="Your Order Details: <br><br>"
                        + filteredProduct
                        .map(order=>{ return "Product Name: "+ order.title + "<br>" + "Product Quantity: "+ order.quantity + "<br>";})
                        .join("<br>")+ "<br>Order Total Price: "+ totalPrice;

                        const sgMail = require('@sendgrid/mail');
                        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
                        const msg = {
                        to: `${req.session.userInfo.email}`,
                        from: 'luxisllx@gmail.com',
                        subject: 'Thank you for placing your order',
                        html: 
                        `${emailbody}`,
                        };
                        //Asynchronous operation (Dunno how long this will take to execute)
                    
                        sgMail.send(msg)
                        .then(()=>{
                    
                            filteredProduct  = [];
                            totalPrice = 0;
                            res.render("userShoppingCart"
                            ,{
                                orders:filteredProduct,
                                totalPrice: totalPrice,
                                errors
                            });

                        })
                        .catch(err=>{
                            console.log(`Error ${err}`);
                        })

                        
                    })
                    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));
                    }
                
            })
            .catch(err=>console.log(`Error happened when pulling products from the database :${err}`));

    })
    .catch(err=>console.log(`Error happened when pulling products from the database :${err}`));




});

module.exports = router;