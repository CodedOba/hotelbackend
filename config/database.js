import mongoose from "mongoose";



const connectDB = async () => {
    try {
        

        await mongoose.connect(process.env.DATABASE_URL)
            console.log("database is connected");
            



    } catch (error) {
        console.log(error);
            
    }
    
};

export default connectDB