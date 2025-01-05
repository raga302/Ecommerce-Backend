import { Router } from "express";
import { AdminAuthMiddleware } from "../../middleware/AuthMiddleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { getAllUserByAdmin } from "../../controller/User/users.controller.js";


const usersRouter = Router();
usersRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(getAllUserByAdmin))

export { usersRouter }