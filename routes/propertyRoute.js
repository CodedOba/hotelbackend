import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { createProperty } from "../controller/propertyController.js";



const propertyRouter = Router()

propertyRouter.post("/property", authMiddleware, upload.array("images", 3), createProperty )






export default propertyRouter

//