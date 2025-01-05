import { user } from "../../models/User/user.model.js"


const getAllUserByAdmin = async(req, res)=>{
    const data = await user.find({role:'user'});
    if (!data || data?.length < 1) {
        return res.status(200).json({ message: "User Empty"})   
    }
    return res.status(200).json({ message: "User Fetchd", data })   
}

export { getAllUserByAdmin }