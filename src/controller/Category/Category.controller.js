import mongoose, { Schema } from "mongoose";
import { categories } from "../../models/Category/category.model.js";
import { deleteFromClodinary, uploadOnCloudinary } from "../../utils/cloudinary.js";

const getCategory = async (req, res) => {
    const data = await categories.find()
    if (!data || data.length < 1) {
        return res.status(400).json({ message: "Category Data Not Found" })
    }

    return res.status(200).json({ message: "Category Get Succesfull", data })

}

const getCategoryAggregation = async (req, res) => {
    try {
        const data = await categories.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "subCategory",
                    pipeline: [
                        {
                            $project: {
                                subCategoryName: 1
                            }
                        }]
                }
            },
            {
                $lookup: {
                    from: "subinnercategories",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "subInnerCategories",
                    pipeline: [{
                        $project: {
                            subInnerCategoryName: 1
                        }
                    }]
                }
            }


        ])

        return res.status(200).json({ message: "Category Get Succesfull", data })

    } catch (error) {
        console.log(error);

    }
}

const CategoryCreate = async (req, res) => {
    const createData = req.body;
    const img = req?.file?.path;
    if (!img) {
        return res.status(400).json({ message: "Image is Required" });
    }
    const check = await categories.findOne({ categoryName: (createData?.categoryName?.toLowerCase()) })
    if (check) {
        return res.status(400).json({ message: "Category already exist" });
    }
    const uploadImage = await uploadOnCloudinary(img)
    const image = { imageUrl: uploadImage.secure_url, imageId: uploadImage.public_id }
    const data = await categories.create({ ...createData, image });
    return res.status(200).json({ message: "Category Created Succesfull", data });
}

const UpdateCategory = async (req, res) => {
    const updateData = req.body;
    const img = req.file?.path;
    const { id } = req.params;

    if (img) {
        const check = await categories.findById(id)
        if (!check) {
            return res.status(400).json({ message: "Category Not Found" });
        }

        const x = await deleteFromClodinary(updateData?.imageId);
        if (x?.result !== 'ok') {
            return res.status(400).json({ message: "something wrong" });
        }

        const uploadImage = await uploadOnCloudinary(img);
        const image = { imageUrl: uploadImage?.secure_url, imageId: uploadImage?.public_id }
        const data = await categories.findByIdAndUpdate(id, { ...updateData, image }, { new: true });
        return res.status(200).json({ message: "Category Upadted Succesfull", data });
    }

    const data = await categories.findByIdAndUpdate(id, { categoryName: updateData?.categoryName }, { new: true });
    return res.status(200).json({ message: "Category Upadted Succesfull", data });

}

const DeleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const findCategory = await categories.findById(id);
        if (!findCategory) {
            return res.status(400).json({ message: "Category Not Found" })
        }

        const x = await deleteFromClodinary(findCategory?.image?.imageId);
        if (x?.result !== 'ok') {
            return res.status(400).json({ message: "something wrong" });
        }

        const data = await categories.findByIdAndDelete(id)
        return res.status(200).json({ message: "Category Deleted Succesfull" });
    } catch (error) {
        console.log(error);

    }

}

export { CategoryCreate, UpdateCategory, DeleteCategory, getCategory, getCategoryAggregation }