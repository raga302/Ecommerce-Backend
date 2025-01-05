import mongoose from "mongoose";


const BannerSchema = new mongoose.Schema({
    image:{
        imageUrl:{
            type:String,
            required:true,
            trim:true
        },
        imageId:{
            type:String,
            required:true,
            trim:true
        }
    }
}, {timestamps:true});

export const banners = mongoose.model("banners", BannerSchema);