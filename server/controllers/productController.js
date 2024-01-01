import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const data = await product.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
