import mongoose, { Schema } from "mongoose";


const AddressSchema = new mongoose.Schema({
    userId: {
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    fullName: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    addressType: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    phone: {
        type:String,
        required:true,
        trim:true,
    },
    phone2: {
        type:String,
        trim:true,
    },
    country: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    state: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    city: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    area: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    house_no: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    pincode: {
        type:String,
        required:true,
        trim:true,
        lowercase:true
    }
}, {timestamps:true});

export const address = mongoose.model("address", AddressSchema);