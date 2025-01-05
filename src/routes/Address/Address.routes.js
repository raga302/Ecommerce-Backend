import { Router } from "express";
import { UserAuthMiddleware } from "../../middleware/AuthMiddleware.js"
import asyncHandler from "../../utils/asyncHandler.js";
import { AddressCreate, AddressDelete, AddressGet, AddressUpdate } from "../../controller/Address/Addresss.controller.js";

const AddressRouter = Router();
AddressRouter.route("/get").get(UserAuthMiddleware, asyncHandler(AddressGet));
AddressRouter.route("/create").post(UserAuthMiddleware, asyncHandler(AddressCreate));
AddressRouter.route("/update/:id").put(UserAuthMiddleware, asyncHandler(AddressUpdate));
AddressRouter.route("/delete/:id").delete(UserAuthMiddleware, asyncHandler(AddressDelete));

export { AddressRouter }