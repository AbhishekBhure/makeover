import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_ATLAS_URL);
    console.log(`Connected to DB ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`);
  }
};

export default connectDB;
