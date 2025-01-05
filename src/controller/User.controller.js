import { z } from "zod";
import jwt from 'jsonwebtoken'
import { user } from "../models/User/user.model.js";
import { validate } from "../Validations/validate.validation.js";
import { modelInsert, searchByField } from "../Validations/model.validation.js";


const GenerateToken = async (data) => {
    try {
        const token = jwt.sign({ data }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        return token
    } catch (error) {
        return null
    }

}

const UserRegisterSchema = z.object({
    name: z.string({ required_error: "Name is Required" }).min(2),
    phone: z.string({ required_error: "10 digit Phone Number Required" }).min(10),
    email: z.string({ required_error: "Email is Required" }).email(),
    password: z.string({ required_error: "Enter 6 to 16 digit Password" }).min(6).max(16),
})


const RegisteredUser = async (req, res) => {
    const registerData = req.body;
    const validateData = await validate(UserRegisterSchema, registerData, res);
    try {
            const check = await searchByField(user, validateData?.data?.email, res);
            if (check) { return res.status(400).json({ message: "User Already Exist" }) }
            const response = await modelInsert(user, { ...validateData.data, role: "user" });
            return res.status(200).json({ message: "Registration successful", response });
        
    } catch (error) {
        console.log(error);
    }
}


const LoginUser = async (req, res) => {
    const loginData = req.body;
    try {
        const check = await searchByField(user, loginData.email, res)
        if (!check) { return res.status(400).json({ message: "User Not Found" }) }
        const data = check.toObject()
        delete data.password
        const token = await GenerateToken(data)
        return res.status(200).cookie("token", token, { httpOnly: false, secure: false, path: "/" }).json({ message: "Login Succesful", data, token });
    } catch (error) {
        console.log(error);
    }
}


export { RegisteredUser, LoginUser }