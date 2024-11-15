import express from "express";
import { createProduct } from "../controllers/productController.js";
import passport from "passport";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createProduct
);

export default router;
