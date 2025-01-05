import { z } from "zod";
import { validate } from "../../Validations/validate.validation.js";
import { contacts } from "../../models/Contact/contact.model.js";



const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().min(2),
    phone: z.string().min(10),
    messages: z.string().min(5),
}) 


const getContact = async(req, res)=>{
    const data = await contacts.find();
    if (!data || data?.length < 1) {
        return res.status(200).json({ message: "Contact Empty" })
    }
    return res.status(200).json({ message: "Contact fetched", data })

}

const contactCreate = async(req, res)=>{
    const createData = req.body;
    const validateData = await validate(contactSchema, createData, res)
    try {
        const data = await contacts.create({...validateData.data})
        return res.status(200).json({message:"Message Sent Succesfull", data})
    } catch (error) {
        console.log(error);
        
    }
}


const deleteContact = async (req, res) => {
    const {id} = req.params;
    const data = await contacts.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact Deleted" })

}




export { contactCreate, getContact, deleteContact }