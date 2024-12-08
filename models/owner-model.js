const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name : String , 
    email : String , 
    password : String , 
    mobile : Number , 
    products : {
        type : Array , 
        defualt : []
    } , 
    picture : String
});

module.exports = mongoose.model("owner" , ownerSchema);



