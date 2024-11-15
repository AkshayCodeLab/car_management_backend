import express from "express";
import {
  createProduct,
  getProducts,
  getById,
  updateProduct,
  deleteProduct,
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

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteProduct
);

export default router;
