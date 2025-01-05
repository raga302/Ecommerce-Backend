import { Router } from "express";
import { AdminAuthMiddleware } from '../../middleware/AuthMiddleware.js'
import { ProductCreate, ProductDelete, ProductGet, ProductUpdate } from "../../controller/Products/Product.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";


const ProductRouter = Router();

ProductRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(ProductGet))

ProductRouter.route("/create").post(AdminAuthMiddleware, asyncHandler(ProductCreate))

ProductRouter.route("/update/:id").put(AdminAuthMiddleware, asyncHandler(ProductUpdate))

ProductRouter.route("/delete/:id").delete(AdminAuthMiddleware, asyncHandler(ProductDelete))

export { ProductRouter }