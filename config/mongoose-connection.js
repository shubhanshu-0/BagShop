const mongoose = require('mongoose');

const dbgr = require("debug")("development:mongoose");
const config = require('config')

// mongoose
// .connect("mongodb://127.0.0.1:27017/BagShop")

mongoose
.connect(`${config.get("MONGODB_URI")}/BagShop`)
.then(function(){
    dbgr("connected");
    // console.log("connnected to mongodb");
})
.catch(function(err){
    console.log(err.message);
});

mongoose.exports = mongoose.connection;
