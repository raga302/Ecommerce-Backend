import { Router } from "express";
import { LoginUser, RegisteredUser } from "../controller/User.controller.js";
import asyncHandler from "../utils/asyncHandler.js";


const UserRouter = Router()

UserRouter.route("/registered").post(asyncHandler(RegisteredUser))
UserRouter.route("/login").post(asyncHandler(LoginUser))


export { UserRouter }
