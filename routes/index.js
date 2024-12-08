const express = require('express');
const router = express.Router();
const {isLoggedin} = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');


router.get("/" , (req , res) => {
    let error = req.flash("error");
    res.render("index" , {error , loggedin:false});
});

router.get("/shop" , isLoggedin , async (req , res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop" , {products , success});
})

router.get("/addtocart/:productid" , isLoggedin , async (req , res) => {
    let user = await userModel.findOne({email : req.user.email});
    // console.log(user);
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success" , "Added to Cart ");
    res.redirect("/shop");
})


router.get("/cart" , isLoggedin , async(req , res) => {
    let user = await userModel.findOne({email : req.user.email}).populate("cart");
    let totalbill = user.cart.reduce((sum, item) => sum + item.price, 0);
    res.render("cart" , {user , totalbill});
})

module.exports = router;