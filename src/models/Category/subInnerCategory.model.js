import mongoose, { Schema } from "mongoose";

const subInnerCategorySchema = new mongoose.Schema({
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"categories"
    },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        ref:"subcategories"
    },
    subInnerCategoryName:{
        type: String,
        required: true,
        trim: true,
        lowercase:true
    }
}, {timestamps:true});

export const subinnercategories = mongoose.model("subinnercategories", subInnerCategorySchema); 