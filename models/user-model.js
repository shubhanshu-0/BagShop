const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String , 
    email : String , 
    password : String , 
    mobile : Number , 
    cart : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "product"
    }] , 
    orders : {
        type : Array , 
        default: []
    } , 
    picture : String
});

module.exports = mongoose.model("user" , userSchema);



