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

export const getProducts = async (req, res) => {
  try {
    const userWithProducts = await req.user.populate("products");

    res.status(200).json({
      products: userWithProducts.products,
    });
  } catch (error) {
    res.status(500).send("Error fetching products: " + error.message);
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const isProductOwned = req.user.products.some(
      (productId) => productId.toString() === id
    );

    if (!isProductOwned) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this product" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Error fetching product: " + error.message);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, imgUrl } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.tags = tags || product.tags;
    product.imgUrl = imgUrl || product.imgUrl;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send("Error updating the product: " + error.message);
  }
};
