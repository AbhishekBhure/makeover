import Cart from "../models/cartModel.js";

export const getCartItemsByUser = async (req, res, next) => {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  const cart = new Cart(req.body);
  try {
    const data = await cart.save();
    const result = await data.populate("product");
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
