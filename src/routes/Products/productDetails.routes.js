import { Router } from "express";
import { AdminAuthMiddleware } from '../../middleware/AuthMiddleware.js'
import asyncHandler from "../../utils/asyncHandler.js";
import { upload } from "../../middleware/multer.middleware.js"
import { ProductDetailGet, ProductDetailsCreate, ProductDetailsDelete, ProductDetailsUpdate } from "../../controller/Products/ProductDetails.controller.js";

const ProductDetailsRouter = Router();

ProductDetailsRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(ProductDetailGet))

ProductDetailsRouter.route("/create").post(AdminAuthMiddleware, upload.array("image"), asyncHandler(ProductDetailsCreate))

ProductDetailsRouter.route("/update/:id").put(AdminAuthMiddleware, asyncHandler(ProductDetailsUpdate))

ProductDetailsRouter.route("/delete/:id").delete(AdminAuthMiddleware, asyncHandler(ProductDetailsDelete))

export { ProductDetailsRouter }