import Product from "../models/productModel.js";

//get all products
export const getAllProducts = async (req, res) => {
  try {
    let query = Product.find({});
    let totalProductsQuery = Product.find({});

    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({
        category: req.query.category,
      });
    }

    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    const totalDocs = await totalProductsQuery.count().exec();
    console.log({ totalDocs });

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const data = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Create a product
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const data = await product.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};