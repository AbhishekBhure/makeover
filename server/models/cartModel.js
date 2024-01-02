import mongoose from "mongoose";
import { Schema } from "mongoose";

const cartSchema = new Schema({
  quantity: {
    type: Number,
    required: [true, "Please Enter Product Quantity"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please Add Product Id"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please Add userId"],
  },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
