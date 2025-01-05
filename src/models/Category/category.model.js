import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
    image:{
        imageUrl:{
            type: String,
            required: true,
            trim: true
        },
        imageId:{
            type: String,
            required: true,
            trim: true
        }
    },
    categoryName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    }
}, {timestamps:true});

export const categories = mongoose.model("categories", CategorySchema);