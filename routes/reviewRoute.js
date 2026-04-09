
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createReview } from "../controller/reviewController.js";


const reviewRoute = Router()

reviewRoute.post("/review", authMiddleware, createReview)



export {reviewRoute}