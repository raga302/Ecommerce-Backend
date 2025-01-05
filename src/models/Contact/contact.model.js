import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    messages:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
}, {timestamps:true});


export const contacts = mongoose.model("contacts", contactSchema)