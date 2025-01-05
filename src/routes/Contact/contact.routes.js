import { Router } from "express";
import { AdminAuthMiddleware, UserAuthMiddleware } from '../../middleware/AuthMiddleware.js'
import asyncHandler from "../../utils/asyncHandler.js";
import { contactCreate, deleteContact, getContact } from "../../controller/Contact/contact.controller.js";

const contactRouter = Router();

contactRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(getContact))
contactRouter.route("/create").post(UserAuthMiddleware, asyncHandler(contactCreate))
contactRouter.route("/delete/:id").delete(AdminAuthMiddleware, asyncHandler(deleteContact))

export { contactRouter }