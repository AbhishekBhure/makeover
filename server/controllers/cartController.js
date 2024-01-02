import Cart from "../models/cartModel.js";

//Get All Cart Items By User
export const getCartItemsByUser = async (req, res, next) => {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};

//Add to Cart
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

//Update Cart
export const updateCart = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

//Delete Item from Cart
export const deleteItemFromCart = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteItem = await Cart.findByIdAndDelete(id);
    res.status(200).json(deleteItem);
  } catch (error) {
    next(error);
  }
};
