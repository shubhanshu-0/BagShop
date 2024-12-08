const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, name } = req.body;

        const user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "USER IS ALREADY REGISTERED !");
            return res.redirect("/");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        let token = generateToken(newUser);
        res.cookie("token", token);
        res.redirect("/shop"); 
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/");
    }
};



// module.exports.registerUser = async function (req, res) {
//     try{
//         let {email , password , name} = req.body;

//         const user = await userModel.findOne({email : email});
//         if(user){
//             req.flash("error" , "USER IS ALREADY REGISTERED !")
//             return res.redirect("/")
//         }

//         bcrypt.genSalt(10 , function (err , salt) {
//             bcrypt.hash(password , salt , async function(err , hash){
//                 if(err) res.send(err.message);
//                 else {
//                        let user = await userModel.create({
//                             name , 
//                             email , 
//                             password :hash ,
//                         });
//                         let token = generateToken(user);
//                         res.cookie("token" , token);
//                         res.redirect("/shop"); 
//                     }
//             });
//         });
//     }catch(err){
//         req.flash("error" , err.message);
//         res.redirect("/");
//     }
// };

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
        req.flash("error", "EMAIL OR PASSWORD INCORRECT !");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/");
        } else if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        } else {
            req.flash("error", "Email or Password is wrong!");
            res.redirect("/");
        }
    });
};


module.exports.logout = (req , res) => {
    res.cookie("token" , "");
    res.redirect("/");
}
// module.exports.loginUser = async (req , res) => {
//     let {email , password} = req.body;
//     const user = await userModel.find({email : email});

//     if(!user) return res.send("EMAIL OR PASSWORD INCORRECT !");

//     bcrypt.compare(password , user.password , function (err , result){ // result : true or false
//       if (err) {
//             req.flash("error", err.message);
//             return res.redirect("/"); 
//         } else if (result) {
//             let token = generateToken(user);
//             res.cookie("token", token);
//              res.render("/shop");
//         } else {
//             req.flash("error", "Email or Password is wrong!");
//             res.redirect("/");
//         }
//     });
// };