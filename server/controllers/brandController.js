import Brand from "../models/brandModel.js";

//Get All Brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json(error);
  }
};

//Create A Brand
export const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const data = await brand.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
