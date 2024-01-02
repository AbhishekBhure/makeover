import Product from "../models/productModel.js";

//get all products
export const getAllProducts = async (req, res) => {
  //TODO: i have to try with multiple category and brands after change in frontend
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

    //TODO: How to get sort on discounted Price not on Actual Price
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
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
