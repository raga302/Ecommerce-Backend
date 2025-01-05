import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
    }, 
    subCategories: {
        type: Schema.Types.ObjectId,
        ref: "subcategories",
    }, 
    subInnerCategories: {
        type: Schema.Types.ObjectId,
        ref: "subinnercategories",
    }, 
    title:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    gst:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    
}, {timestamps:true});

export const products = mongoose.model("products", productSchema);