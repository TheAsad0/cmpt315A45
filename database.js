import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

// MongoDB connection URL
const url = `mongodb://localhost:27017/monsters_db`;

export const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export default connectDB;
