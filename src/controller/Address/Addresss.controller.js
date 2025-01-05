import { z } from "zod";
import {validate} from "../../Validations/validate.validation.js"
import { address } from "../../models/Address/Address.model.js";

const AddressSchema = z.object({
    fullName:z.string().min(2),
    addressType:z.string().min(2),
    phone:z.string().min(10),
    phone2:z.string().optional(),
    country:z.string().min(2),
    state:z.string().min(2),
    city:z.string().min(2),
    area:z.string().min(2),
    house_no:z.string().min(2),
    pincode:z.string().min(6),
})

const AddressGet = async(req, res)=>{
    const data = await address.find({userId:req?.user?._id})
    if (!data || data?.length < 1) {
        return res.status(200).json({ message: "Address Empty" })
    }
    return res.status(200).json({ message: "Address fetched", data })
}

const AddressCreate = async(req, res)=>{
    const createData = req.body;
    const validateData = await validate(AddressSchema, createData, res);
    try {
        const data = await address.create({...validateData.data, userId:req?.user?._id})
        return res.status(200).json({message:"Address created Succesfull", data})
    } catch (error) {
        console.log(error);
        
    }
}

const AddressUpdate = async(req, res)=>{
    const updateData = req.body;
    const {id} = req.params;
    const validateData = await validate(AddressSchema, updateData, res);
    try {
        const data = await address.findByIdAndUpdate(id, {...validateData.data}, {new:true});
        return res.status(200).json({ message: "Address Updated Succesfull", data });
    } catch (error) {
        console.log(error);
        
    }
    
}

const AddressDelete = async(req, res)=>{
    const {id} = req.params;
    try {
        await address.findByIdAndDelete(id);
        return res.status(200).json({ message: "Address Deleted Succesfull"})
    } catch (error) {
        console.log(error);
        
    }
}

export { AddressCreate, AddressUpdate, AddressDelete, AddressGet }