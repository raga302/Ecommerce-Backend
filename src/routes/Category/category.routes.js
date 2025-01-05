import { Router } from "express";
import asyncHandler from '../../utils/asyncHandler.js';
import { CategoryCreate, DeleteCategory, getCategory, getCategoryAggregation, UpdateCategory } from "../../controller/Category/Category.controller.js";
import { multerErrorMiddleware, upload } from "../../middleware/multer.middleware.js";
import { AdminAuthMiddleware } from "../../middleware/AuthMiddleware.js";

const categoryRouter = Router();
categoryRouter.route("/get-all-category").get(AdminAuthMiddleware, asyncHandler(getCategoryAggregation));

categoryRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(getCategory));
categoryRouter.route("/create").post(AdminAuthMiddleware, upload.single("image"), multerErrorMiddleware, asyncHandler(CategoryCreate));
categoryRouter.route("/update/:id").put(AdminAuthMiddleware, upload.single("image"), multerErrorMiddleware, asyncHandler(UpdateCategory));
categoryRouter.route("/delete/:id").delete(AdminAuthMiddleware, asyncHandler(DeleteCategory));

export { categoryRouter }