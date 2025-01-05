import { z } from "zod";
import { validate } from "../../Validations/validate.validation.js";
import { orders } from "../../models/Order/Order.model.js";
import { productdetails } from "../../models/Product/ProductDetails.model.js";

const OrderSchema = z.object({
    productId: z.string().min(2),
    productDetailId: z.string().min(2),
    quantity: z.number().min(1),
    image: z.string().min(2),
    paymentType: z.string().min(2),
    addressId: z.string().min(2),
    paymentStatus: z.string().min(2),
    status: z.string().min(2),
    razorpayOrderId: z.string().min(2),
}
)

const getOrder = async (req, res) => {
    const data = await orders.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productId",
                pipeline: [
                    {
                        $project: {
                            title: 1,
                            description: 1,
                            gst: 1
                        }
                    },
                ],

            },
        },
        {
            $lookup: {
                from: "productdetails",
                localField: "productDetailId",
                foreignField: "_id",
                as: "productDetailId",
                pipeline: [
                    {
                        $project: {
                            MRP: 1,
                            sellingPrice: 1,
                            color: 1,
                            Size: 1,
                            selling_quantity: 1,
                            inStock: 1,
                            image: 1,
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "addressId",
                foreignField: "_id",
                as: "addressId",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            addressType: 1,
                            phone: 1,
                            phone2: 1,
                            country: 1,
                            state: 1,
                            city: 1,
                            area: 1,
                            house_no: 1,
                            pincode: 1,
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200).json({ message: "Order Fetched", data })
}

const BuyNow = async (req, res) => {
    const createData = req.body;
    const validateData = await validate(OrderSchema, createData, res);
    try {
        const data = await orders.create({ ...validateData.data, userId: req?.user?._id })
        const totalStock = await productdetails.findById({ _id: validateData?.data?.productDetailId })
        await productdetails.findByIdAndUpdate({ _id: validateData?.data?.productDetailId }, { inStock: totalStock?.inStock - validateData?.data?.quantity }, { new: true })
        return res.status(200).json({ message: "Order created succesfull", data })
    } catch (error) {
        console.log(error);
    }
}

const OrderUpdate = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus, status } = req.body;
    const check = await orders.findById(id);
    if (!check) {
        return res.status(400).json({ message: "Product is not exist" })
    }
    await orders.findByIdAndUpdate(id, {
        paymentStatus, status
    })
    return res.status(200).json({ message: `Order ${status} Succesfull` })
}

export { BuyNow, OrderUpdate, getOrder }