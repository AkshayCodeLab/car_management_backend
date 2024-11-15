import express from "express";
import {
  createProduct,
  getProducts,
  getById,
  updateProduct,
} from "../controllers/productController.js";
import passport from "passport";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createProduct
);

router.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  getProducts
);

router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  getById
);

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  updateProduct
);

export default router;
