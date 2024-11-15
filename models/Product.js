import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  imgUrl: [String],
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
