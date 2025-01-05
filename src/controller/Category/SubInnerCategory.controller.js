import { z } from 'zod'
import { validate } from '../../Validations/validate.validation.js';
import { subinnercategories } from '../../models/Category/subInnerCategory.model.js';

const SubInnerSchema = z.object({
    categoryId: z.string().min(2),
    subCategoryId: z.string().min(2),
    subInnerCategoryName: z.string().min(2),
})

const SubInnerCategoryGet = async (req, res) => {
    const data = await subinnercategories.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "subCategoryId",
                foreignField: "_id",
                as: "SubCategory",
                pipeline: [{
                    $lookup: {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "Category",
                    }
                }]
            },
        }
    ]);
    if (!data) {
        return res.status(400).json({ message: "Sub Inner Category Empty" })
    }
    return res.status(200).json({ message: "Sub Inner Category Get Succesfull", data })
}

const SubInnerCategoryCreate = async (req, res) => {
    const createData = req.body;
    const validateData = await validate(SubInnerSchema, createData, res)
    try {
        if (validateData.success) {
            const check = await subinnercategories.findOne({ subInnerCategoryName: (createData?.subInnerCategoryName?.toLowerCase()) })
            if (check) {
                return res.status(400).json({ message: "Sub Inner Category already exist" })
            }
            const data = await subinnercategories.create({ ...validateData.data })
            return res.status(200).json({ message: "Sub Inner Category Created Succesfull", data });
        }
    } catch (error) {
        console.log(error);
    }
}

const SubInnerCategoryUpdate = async (req, res) => {
    const updateData = req.body;
    const { id } = req.params
    const validateData = await validate(SubInnerSchema, updateData, res)
    try {
        if (validateData.success) {
            const data = await subinnercategories.findByIdAndUpdate(id, { ...validateData.data }, { new: true })
            return res.status(200).json({ message: "Sub Inner Category Updated Succesfull", data });
        }
    } catch (error) {
        console.log(error);
    }
}

const SubInnerCategoryDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await subinnercategories.findByIdAndDelete(id)
        return res.status(200).json({ message: "Sub Inner Category Deleted" })

    } catch (error) {
        console.log(error);

    }
}

export { SubInnerCategoryCreate, SubInnerCategoryUpdate, SubInnerCategoryDelete, SubInnerCategoryGet }