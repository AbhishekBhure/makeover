import Order from "../models/orderModel.js";

//Get All Orders By User
export const getOrdersByUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

//Create Order
export const createOrder = async (req, res, next) => {
  const order = new Order(req.body);
  try {
    const data = await order.save();
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

//Update Order Status
export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

//Delete Order
export const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteOrder = await Order.findByIdAndDelete(id);
    res.status(200).json(deleteOrder);
  } catch (error) {
    next(error);
  }
};

//fetching all orders for Admin
export const getAllOrdersByAdmin = async (req, res) => {
  //TODO: i have to try with multiple category and brands after change in frontend
  try {
    let query = Order.find({});
    let totalOrdersQuery = Order.find({});

    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalOrdersQuery = totalOrdersQuery.find({
        category: req.query.category,
      });
    }

    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalOrdersQuery = totalOrdersQuery.find({ brand: req.query.brand });
    }

    //TODO: How to get sort on discounted Price not on Actual Price
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    const totalDocs = await totalOrdersQuery.count().exec();

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
