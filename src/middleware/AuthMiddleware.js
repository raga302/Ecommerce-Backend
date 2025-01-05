import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js'
import { user } from '../models/User/user.model.js';


const UserAuthMiddleware = asyncHandler(async(req, res, next)=>{
    const token = req?.cookies?.token || req.headers?.authorization?.replace("Bearer ", "") 
    if (!token) {
        return res.status(400).json({message:"Unauthenticated"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userInfo = await user.findById(decode?.data?._id).select("-password -__v")
        if (!userInfo) {
            return res.status(400).json({ message: "Invalid User" })
        }
        if (userInfo?.role !== 'user') {
            return res.status(400).json({ message: "Unauthorize User" })
        }
        req.user = userInfo;
        next()
    } catch (error) {
        console.log(error);
        
    }
})

const AdminAuthMiddleware = asyncHandler(async(req, res, next)=>{
    const token = req?.cookies?.token || req.headers?.authorization?.replace("Bearer ", "")
    
    if (!token) {
        return res.status(400).json({message:"Unauthenticated"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await user.findById(decode?.data?._id).select("-password -__v");
        if (!admin) {
            return res.status(400).json({ message: "Invalid Admin" })
        }
    
        if (admin.role !== 'admin') {
            return res.status(400).json({ message: "Unauthorize User" })
        }
        req.user = admin
        next();
    } catch (error) {
        console.log(error);
        
    }
})




export { AdminAuthMiddleware, UserAuthMiddleware }