const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
     userName:{
        type : String
     },
     email:{
         type: String,
        unique: true,
     },
     review:{
         type:String,
     },
     image:{

     }

})