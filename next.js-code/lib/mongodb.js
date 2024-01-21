import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if(mongoose.connection.readyState == 1) {
      return  
    } 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
