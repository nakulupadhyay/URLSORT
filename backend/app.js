const express = require("express");
const app= express();
const cors = require("cors");

app.use(cors());

const mongoose = require("mongoose");
const Url = require("./models/url");

mongoose.connect("mongodb://localhost:27017/url_CB")
.then(()=>{console.log("DB connect")})
.catch(()=>{console.log("DB Not connect")})

app.use(express.json());

app.post("/shorten",async(req,res)=>{
    const {url} = req.body;
    if(!url){
        return res.status(400).json({error:"URL is required"});
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch (error) {
        return res.status(400).json({error:"Invalid URL format"});
    }
    
    const shortCode = Math.random().toString(36).substring(2,8);
    const newUrl = new Url({
        originalUrl:url,
        shortCode
    })
    await newUrl.save();
    res.json({shortCode});
});



app.get("/:shortCode",async(req,res)=>{
    const {shortCode} = req.params;
    const url = await Url.findOne({shortCode
    });
    if(url){
        url.count++;
        await url.save();
        res.redirect(url.originalUrl);
    }else{
        res.status(404).json({error:"URL not found"});
    }
});

// return the shortened URL stats
app.get("/stats/:shortCode",async(req,res)=>{
    const {shortCode} = req.params;
    const url = await Url.findOne({shortCode
    });
    if(url){
        res.json({originalUrl:url.originalUrl,shortCode:url.shortCode,count:url.count});
    }else{
        res.status(404).json({error:"URL not found"});
    }
});


const Port=3000;
app.listen(Port,()=>{
    console.log("Server run at port",Port);
})