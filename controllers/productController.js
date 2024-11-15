import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const { title, description, tags, imgUrl } = req.body;

  try {
    const newProduct = new Product({ title, description, tags, imgUrl });
    await newProduct.save();

    req.user.products.push(newProduct._id);
    await req.user.save();

    res.status(201).json({
      message: "Product created and associated with the user successfully.",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).send("Error creating the product: " + err.message);
  }
};
