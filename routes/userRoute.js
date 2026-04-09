import { Router } from "express";
import { register, login, refreshAccessToken, logout } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoute = Router()


userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.post("/refresh", refreshAccessToken)
userRoute.post("/logout",authMiddleware, logout)






export default userRoute