import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { SubInnerCategoryCreate, SubInnerCategoryDelete, SubInnerCategoryGet, SubInnerCategoryUpdate } from "../../controller/Category/SubInnerCategory.controller.js";
import { AdminAuthMiddleware } from "../../middleware/AuthMiddleware.js";


const SubInnerRouter = Router();
SubInnerRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(SubInnerCategoryGet))
SubInnerRouter.route("/create").post(AdminAuthMiddleware, asyncHandler(SubInnerCategoryCreate))
SubInnerRouter.route("/update/:id").put(AdminAuthMiddleware, asyncHandler(SubInnerCategoryUpdate))
SubInnerRouter.route("/delete/:id").delete(AdminAuthMiddleware, asyncHandler(SubInnerCategoryDelete))


export { SubInnerRouter }