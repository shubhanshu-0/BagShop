const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get("/admin" , (req , res) => {
    let success = req.flash("success");
    res.render("createproducts" , { success });
})

if(process.env.NODE_ENV == "development"){
    router.post('/create' , async (req , res) => {
        let owners = await ownerModel.find();
        if(owners.length > 0){
            res.status(503).send(" YOU DON'T HAVE PERSMISSIONS TO CREATE NEW OWNER ! ");
            return;
        }

        let {name , email , password} = req.body;

        let owner = ownerModel.create({
            name , 
            email , 
            password , 

        });

        res.send(" NEW OWNER CREATED !" , owner);
    });
}

module.exports = router;