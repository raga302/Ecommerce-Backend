import { z } from "zod";
import { validate } from "../../Validations/validate.validation.js";
import { products } from "../../models/Product/Product.model.js";
import { productdetails } from '../../models/Product/ProductDetails.model.js'
import { deleteFromClodinary } from "../../utils/cloudinary.js";


const productSchema = z.object({
    title: z.string().min(2),
    category: z.string().min(2),
    subCategories: z.string().min(2),
    subInnerCategories: z.string().min(2),
    description: z.string().min(5),
    gst: z.string().min(1),
})

const ProductGet = async (req, res) => {
    const data = await products.find({})
    if (!data) {
        res.status(400).json({ data, message: "Failed to fetch product" })
    }

    res.status(200).json({ data, message: "All product fetch" })

}

const ProductCreate = async (req, res) => {
    const createData = req.body;
    const valiadteData = await validate(productSchema, createData, res)
    try {
        const check = await products.findOne({ title: valiadteData?.data?.title })
        if (check) {
            return res.status(400).json({ message: "Product already Exist" })
        }
        const data = await products.create({ ...valiadteData.data, userID: req?.user?._id });
        return res.status(200).json({ message: "Product Add Succesfull", data })
    } catch (error) {
        console.log(error);

    }
}

const ProductUpdate = async (req, res) => {
    const updateData = req.body;
    const { id } = req.params;
    const validateData = await validate(productSchema, updateData, res);
    try {
        const data = await products.findByIdAndUpdate({ _id: id }, { ...validateData.data }, { new: true })
        return res.status(200).json({
            message: "Product Updated Succesfull", data
        })

    } catch (error) {
        console.log(error);

    }

}

const ProductDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const check = await productdetails.find({ productId: id })
        if (!check) {
            return res.status(200).json({ message: "Product detail Not Found" })
        }
        for (const checking of check) {
            for (const img of checking?.image) {
                await deleteFromClodinary(img?.imageId)
            }
        }
        await productdetails.deleteMany({ productId: id });
        await products.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product Detail Deleted" })
    } catch (error) {
        console.log(error);

    }

}


export { ProductCreate, ProductUpdate, ProductGet, ProductDelete }