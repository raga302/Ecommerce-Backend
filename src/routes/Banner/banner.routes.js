import { Router } from "express";
import { createBanner, deleteBanner, getBanner, updateBanner } from "../../controller/Banner/banner.controller.js";
import { AdminAuthMiddleware } from "../../middleware/AuthMiddleware.js"
import { multerErrorMiddleware, upload } from "../../middleware/multer.middleware.js"
import asyncHandler from "../../utils/asyncHandler.js";

const BannerRouter = Router();
BannerRouter.route("/get").get(AdminAuthMiddleware, asyncHandler(getBanner));

BannerRouter.route("/create").post(AdminAuthMiddleware, upload.single("image"), multerErrorMiddleware, asyncHandler(createBanner));

BannerRouter.route("/update/:id").put(AdminAuthMiddleware, upload.single("image"), multerErrorMiddleware, asyncHandler(updateBanner));

BannerRouter.route("/delete/:id/:imageId").delete(AdminAuthMiddleware, asyncHandler(deleteBanner));

export { BannerRouter }