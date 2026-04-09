import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import userRoute from "./routes/userRoute.js"
import  propertyRouter  from "./routes/propertyRoute.js"
import { roomRoute } from "./routes/roomRoute.js"
import { bookingRoute } from "./routes/bookingroute.js"
import { reviewRoute } from "./routes/reviewRoute.js"
import { v2 as cloudinary } from "cloudinary";
dotenv.config()
connectDB()

const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEYS,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true
});

app.use(express.json())

app.use("/api/v1", userRoute)

app.use("/api/v1", propertyRouter)

app.use("/api/v1",roomRoute )

app.use("/api/v1", bookingRoute)

app.use("/api/v1", reviewRoute)


app.listen(process.env.PORT,()=>{
    console.log("server is running");
    
})








