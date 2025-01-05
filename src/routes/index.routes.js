import { Router } from "express";
import { UserRouter } from "./user.routes.js";
import { categoryRouter } from "./Category/category.routes.js";
import { SubCategoryRouter } from "./Category/subCategory.routes.js";
import { SubInnerRouter } from "./Category/subInnerCategory.routes.js";
import { ProductRouter } from "./Products/product.routes.js";
import { ProductDetailsRouter } from "./Products/productDetails.routes.js";
import { usersRouter } from "./User/users.routes.js";
import { BannerRouter } from "./Banner/banner.routes.js";
import { contactRouter } from "./Contact/contact.routes.js";
import { OrderRouter } from "./Order/order.routes.js";
import { AddressRouter } from "./Address/Address.routes.js";


const router = Router()

router.use("/user", UserRouter)
router.use("/users", usersRouter)
router.use("/category", categoryRouter)
router.use("/subcategory", SubCategoryRouter)
router.use("/subcategory", SubCategoryRouter)
router.use("/subinnercategory", SubInnerRouter)
router.use("/product", ProductRouter)
router.use("/product-details", ProductDetailsRouter)
router.use("/banner", BannerRouter)
router.use("/contact", contactRouter)
router.use("/order", OrderRouter)
router.use("/address", AddressRouter)

export { router }