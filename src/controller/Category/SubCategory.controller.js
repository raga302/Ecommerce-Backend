import { subcategories } from "../../models/Category/subCategory.model.js";
import { categories } from '../../models/Category/category.model.js'


const getSubCategory = async (req, res) => {
    const data = await subcategories.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "Category"
            },

        },
    ])

    // {
    //     $lookup: {
    //         from: "subcategories",
    //             localField: "_id",
    //                 foreignField: "categoryId",
    //                     as: "subCategory",
    //                         pipeline: [{
    //                             $lookup: {
    //                                 from: "subinnercategories",
    //                                 localField: "_id",
    //                                 foreignField: "subCategoryId",
    //                                 as: "subInnerCategories",
    //                             }
    //                         }]
    //     },

    // },


    if (!data) {
        return res.status(400).json({ message: "Sub Category Data Empty" })
    }

    return res.status(200).json({ message: "Sub Category Get Succesfull", data })
}

const SubCategoryCreate = async (req, res) => {
    const createData = req.body;
    if (!createData?.categoryId) {
        return res.status(400).json({ message: "Category ID Required" })
    }
    if (!createData?.subCategoryName) {
        return res.status(400).json({ message: "Sub Category Required" })
    }

    const check = await subcategories.findOne({ subCategoryName: (createData?.subCategoryName?.toLowerCase()) })
    if (check) {
        return res.status(400).json({ message: "Sub Category Already Exist" })
    }

    const data = await subcategories.create(createData)
    return res.status(200).json({ message: "Sub Category created Succesfull", data })
}

const SubCategoryUpdate = async (req, res) => {
    const { subCategoryName } = req.body;
    const { id } = req.params;
    const data = await subcategories.findByIdAndUpdate(id, { subCategoryName }, { new: true });
    if (!data) {
        return res.status(400).json({ message: "Sub Category Not Found" })
    }
    return res.status(200).json({ message: "Sub Category Updated Succesfull", data })

}

const SubCategoryDelete = async (req, res) => {
    const { id } = req.params;

    try {
        await subcategories.findByIdAndDelete(id);
        return res.status(200).json({ message: "Sub Category Deleted Succesfull" })
    } catch (error) {
        return res.status(400).json({ message: "something wrong", error })

    }

}
export { SubCategoryCreate, SubCategoryUpdate, SubCategoryDelete, getSubCategory }