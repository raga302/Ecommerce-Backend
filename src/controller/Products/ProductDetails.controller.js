import { z } from "zod";
import { validate } from "../../Validations/validate.validation.js"
import { productdetails } from "../../models/Product/ProductDetails.model.js";
import { deleteFromClodinary, uploadOnCloudinary } from "../../utils/cloudinary.js"
import { products } from '../../models/Product/Product.model.js'

const productDetailSchema = z.object({
    productId: z.string().min(2),
    color: z.string().min(2),
    MRP: z.string().min(3),
    sellingPrice: z.string().min(3),
    Size: z.string().min(1),
    selling_quantity: z.string().min(1),
    inStock: z.string().min(1)
})

const ProductDetailGet = async (req, res) => {
    const data = await products.aggregate([
        {
            $lookup: {
                from: 'productdetails',
                localField: '_id',
                foreignField: 'productId',
                as: 'productDetails'
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $lookup: {
                from: 'subcategories',
                localField: 'subCategories',
                foreignField: '_id',
                as: 'subCategories'
            }
        },
        {
            $lookup: {
                from: 'subinnercategories',
                localField: 'subInnerCategories',
                foreignField: '_id',
                as: 'subInnerCategories'
            }
        }
    ]);

    if (!data || data?.length < 1) {
        return res.status(200).json({ message: "Product detail Empty", data })
    }
    return res.status(200).json({ message: "Product detail Fetched", data })

}

const ProductDetailsCreate = async (req, res) => {
    const createData = req.body;
    const image = []
    const img = req.files;
    for (const singleImage of img) {
        const data = await uploadOnCloudinary(singleImage?.path)
        image.push({ imageUrl: data?.secure_url, imageId: data?.public_id })
    }

    const validateData = await validate(productDetailSchema, createData, res)
    try {
        const data = await productdetails.create({ ...validateData.data, image })
        return res.status(200).json({ message: "Product detail Created", data })
    } catch (error) {
        console.log(error);

    }
}

const ProductDetailsUpdate = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const validateData = await validate(productDetailSchema, updateData, res);
    try {
        const data = await productdetails.findByIdAndUpdate({ _id: id }, { ...validateData.data }, { new: true })
        if (!data) {
            return res.status(400).json({ message: "Product Not Updated" })
        }
        return res.status(200).json({ message: "Product detail Updated", data })

    } catch (error) {
        console.log(error);

    }

}

const ProductDetailsDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const check = await productdetails.findById(id)
        if (!check) {
            return res.status(200).json({ message: "Product detail Not Found" })
        }
        for (const img of check?.image) {
            await deleteFromClodinary(img?.imageId)
        }
        await productdetails.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product detail Deleted" })

    } catch (error) {
        console.log(error);

    }


}

export { ProductDetailsCreate, ProductDetailsUpdate, ProductDetailsDelete, ProductDetailGet }