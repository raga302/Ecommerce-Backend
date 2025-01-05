import mongoose, { Schema } from "mongoose";


const OrderSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    productDetailId: {
        type: Schema.Types.ObjectId,
        ref: "productdetails"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    paymentType: {
        type: String,
        required: true,
        trim: true
    },
    addressId: {
        type: Schema.Types.ObjectId,
        ref: "address"
    },
    paymentStatus: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    razorpayOrderId: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


export const orders = mongoose.model("orders", OrderSchema);