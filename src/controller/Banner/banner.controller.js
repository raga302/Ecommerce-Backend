import { banners } from "../../models/Banner/banner.model.js";
import { deleteFromClodinary, uploadOnCloudinary } from "../../utils/cloudinary.js";

const getBanner = async (req, res) => {
    const data = await banners.find();
    if (data?.length < 1) {
        return res.status(200).json({ message: "Banner Empty" })
    }
    return res.status(200).json({ message: "Banner Fetched", data })
}

const createBanner = async (req, res) => {
    const img = req.file;
    if (!img) {
        return res.status(400).json({ message: "Image is required" })
    };
    const uploadImage = await uploadOnCloudinary(img?.path);
    const image = {
        imageUrl: uploadImage?.secure_url,
        imageId: uploadImage?.public_id
    };
    const data = await banners.create({ image });
    return res.status(200).json({ message: "Banner Created", data })
}

const updateBanner = async (req, res) => {
    const { imageId } = req.body;
    const { id } = req.params;
    const img = req.file;
    if (!img) {
        return res.status(400).json({ message: "Image is required" })
    };
    if (!imageId) {
        return res.status(400).json({ message: "Image Id is required" })
    };
    try {
        const check = await banners.findById(id);
        if (!check) {
            return res.status(400).json({ message: "Banner Not Found" })
        }
        await deleteFromClodinary(imageId);
        const uploadImage = await uploadOnCloudinary(img?.path);
        const getImage = {
            imageUrl: uploadImage?.secure_url,
            imageId: uploadImage?.public_id
        };
        const data = await banners.findByIdAndUpdate(id, { image: getImage }, { new: true })
        return res.status(200).json({ message: "Banner Updated", data })

    } catch (error) {
        console.log(error);
    }
}

const deleteBanner = async (req, res) => {
    const { imageId, id } = req.params;

    if (!imageId) {
        return res.status(400).json({ message: "Image Id is required" })
    };
    try {
        const check = await banners.findById(id);
        if (!check) {
            return res.status(400).json({ message: "Banner Not Found" })
        }
        await deleteFromClodinary(imageId);
        await banners.findByIdAndDelete(id)
        return res.status(200).json({ message: "Banner Deleted" })

    } catch (error) {
        console.log(error);
    }
}

export { createBanner, updateBanner, deleteBanner, getBanner }