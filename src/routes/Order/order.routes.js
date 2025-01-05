import { Router } from "express";
import { AdminAuthMiddleware, UserAuthMiddleware } from "../../middleware/AuthMiddleware.js"
import asyncHandler from "../../utils/asyncHandler.js";
import { BuyNow, getOrder, OrderUpdate } from "../../controller/Order/Order.controller.js";

const OrderRouter = Router();
OrderRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(getOrder))
OrderRouter.route("/buy-now").post(UserAuthMiddleware, asyncHandler(BuyNow))
OrderRouter.route("/update/:id").put(UserAuthMiddleware, asyncHandler(OrderUpdate))

export { OrderRouter }