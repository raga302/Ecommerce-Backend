import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async(filePath)=>{

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
           filePath
        ).catch((error) => {
            console.log(error);
        });
        return uploadResult;   
}

const deleteFromClodinary = async(id)=>{
    try {
        const myCloud = await cloudinary.uploader.destroy(id);
        return myCloud;
    } catch (error) {
        console.log(error);
        
    }
}

export { uploadOnCloudinary, deleteFromClodinary  }