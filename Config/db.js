import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const localDB = process.env.DB_URL;

const connectDB = () => {
  mongoose
    .connect(localDB)
    .then(() => {
      console.log("Successfully logged into database.");
    })
    .catch((e) => {
      console.log("This is the error in logging in database : " + e);
    });
};

export default connectDB;
