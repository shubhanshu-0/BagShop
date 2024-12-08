const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/authController');
const {loginUser} = require('../controllers/authController')
const {logout} = require('../controllers/authController')
const {isLoggedin} = require('../middlewares/isLoggedin')


router.get("/" , (req , res) => {
    res.send("usersRouter");
})

router.post("/register" , registerUser);

router.post("/login" , loginUser);

router.get("/logout" , isLoggedin , logout);

module.exports = router;