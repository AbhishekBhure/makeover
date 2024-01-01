import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const data = await category.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
