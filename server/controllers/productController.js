import Product from "../models/productModel.js";

//get all products
export const getAllProducts = async (req, res) => {
  //TODO: i have to try with multiple category and brands after change in frontend
  try {
    let condition = {};
    if (!req.query.admin) {
      condition.deleted = { $ne: true };
    }
    let query = Product.find(condition);
    let totalProductsQuery = Product.find(condition);

    if (req.query.category) {
      query = query.find({ category: { $in: req.query.category.split(",") } });
      totalProductsQuery = totalProductsQuery.find({
        category: { $in: req.query.category.split(",") },
      });
    }

    if (req.query.brand) {
      query = query.find({ brand: { $in: req.query.brand.split(",") } });
      totalProductsQuery = totalProductsQuery.find({
        brand: { $in: req.query.brand.split(",") },
      });
    }

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    const totalDocs = await totalProductsQuery.count().exec();

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
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const data = await product.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Get A Single Product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Update a Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Search products
export const searchProducts = async (req, res, next) => {
  try {
    let condition = {};

    // Handling deleted condition based on query parameter
    if (!req.query.admin) {
      condition.deleted = { $ne: true };
    }

    // Creating a base query without the search term
    let query = Product.find(condition);

    // Handling pagination if provided
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // Extracting the search term from the query parameters
    const searchTerm = req.query.searchTerm || "";

    // Adding the search condition for the title
    query = query.find({ title: { $regex: searchTerm, $options: "i" } });

    const data = await query.exec();

    res.set(
      "X-Total-Count",
      await Product.countDocuments({
        title: { $regex: searchTerm, $options: "i" },
        ...condition,
      })
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
