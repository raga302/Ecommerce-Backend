import mongoose, { Schema } from "mongoose";

const subCategorySchema = new mongoose.Schema({
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"categories"
    },
    subCategoryName:{
        type: String,
        required: true,
        trim: true,
        lowercase:true
    }
}, {timestamps:true});

export const subcategories = mongoose.model("subcategories", subCategorySchema); 