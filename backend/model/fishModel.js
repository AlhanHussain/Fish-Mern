import mongoose from "mongoose";

const fishSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:String,required:true},
})

const fishModel = mongoose.models.fish || mongoose.model("fish",fishSchema);

export default fishModel;