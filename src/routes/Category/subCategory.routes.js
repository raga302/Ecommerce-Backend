import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { getSubCategory, SubCategoryCreate, SubCategoryDelete, SubCategoryUpdate } from "../../controller/Category/SubCategory.controller.js";
import { AdminAuthMiddleware } from "../../middleware/AuthMiddleware.js";

const SubCategoryRouter = Router();

SubCategoryRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(getSubCategory))
SubCategoryRouter.route("/create").post(AdminAuthMiddleware, asyncHandler(SubCategoryCreate))
SubCategoryRouter.route("/update/:id").put(AdminAuthMiddleware, asyncHandler(SubCategoryUpdate))
SubCategoryRouter.route("/delete/:id").delete(AdminAuthMiddleware, asyncHandler(SubCategoryDelete))

export { SubCategoryRouter }