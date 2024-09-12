import fishModel from "../model/fishModel.js";
import fs from "fs";


//add fish
const addfish= async(req,res)=>{
    const {name,price,description,category} = req.body;
    const image = `${req.file.filename}`
    try {
       const fish = new fishModel({
        name:name,
        price:price,
        description:description,
        category:category,
        image:image
       }) 
       await fish.save();
       return res.status(200).json({success:true,message:"Fish Added Successfully",fish:fish})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Server Error",error:error})
        
    }
}


//get all fish
const getFish = async(req,res)=>{
    try {
       const fish = await fishModel.find({})
       return res.status(200).json({success:true,message:"Fish Fetched Successfully",fish:fish})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Server Error",error:error})   
    }
}


//remove fish
const removeFish = async(req,res)=>{
    try {
       const fish = await fishModel.findByIdAndDelete({_id:req.body.id});
       fs.unlink(`./uploads/${fish.image}`,()=>{})
       return res.status(200).json({message:"Fish Removed Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error",error:error})
    }
}


export {addfish, getFish, removeFish};