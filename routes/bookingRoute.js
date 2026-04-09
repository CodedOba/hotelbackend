import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createBooking } from "../controller/bookingController.js";



const bookingRoute = Router()


bookingRoute.post("/booking", authMiddleware,createBooking)



export {bookingRoute}