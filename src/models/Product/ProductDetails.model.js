import mongoose, { Schema } from "mongoose";


const ProductDetailSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    color: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    MRP: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    sellingPrice: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Size: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    selling_quantity: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    inStock: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    image: [{
        imageUrl: {
            type: String,
            required: true,
            trim: true,
        }, imageId: {
            type: String,
            required: true,
            trim: true,
        }
    }]
}, { timestamps: true });

export const productdetails = mongoose.model("productdetails", ProductDetailSchema)