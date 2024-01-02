import Order from "../models/orderModel.js";

//Get All Orders By User
export const getOrdersByUser = async (req, res, next) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user });
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
