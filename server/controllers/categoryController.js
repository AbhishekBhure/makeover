import Category from "../models/categoryModel.js";

//Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Create Category
export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const data = await category.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
