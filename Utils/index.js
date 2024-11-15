import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../Config/db.js";
import passport from "passport";
import passportConfig from "../Config/passportConfig.js";
import authRoutes from "../Routes/authRoutes.js";
import productRoutes from "../Routes/productRoutes.js";

export {
  express,
  cors,
  dotenv,
  connectDB,
  passport,
  passportConfig,
  authRoutes,
  productRoutes,
};
