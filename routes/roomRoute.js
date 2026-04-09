

import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { createRoom } from "../controller/roomController.js";

const roomRoute = Router();

roomRoute.post( "/room", authMiddleware, upload.array("images", 2),  createRoom);

export { roomRoute };