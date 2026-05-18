const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortCode:{
        type:String,
        required:true,
        unique:true
    },
    count:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const Url = mongoose.model("Url",UrlSchema);

module.exports= Url;