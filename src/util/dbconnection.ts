import mongoose from "mongoose";
require("dotenv").config();

const URL: string | undefined = process.env.DBCONNECTIONURL;

const connectDb = async (): Promise<void> => {
  try {
    if (URL) {
      await mongoose.connect(URL);
      console.log("db connected");
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectDb;
