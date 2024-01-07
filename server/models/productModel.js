import mongoose from "mongoose";
import validator from "validator";
import { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please enter product title"],
    maxLength: [20, "Title cannot exceed more than 20 character"],
    minLength: [5, "Title should have more than 5 character"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please enter product description"],
    minLength: [10, "Description should have more than 10 character"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "Please enter product price"],
    maxLength: [100000, "Price cannot exceed more than 100000 character"],
    minLength: [1, "Price should have more than 1"],
  },
  discountPercentage: {
    type: Number,
    trim: true,
    required: [true, "Please enter product discountPercentage"],
    maxLength: [99, "Discount Percentage cannot exceed more than 99"],
    minLength: [1, "Discount Percentage should have more than 1"],
    default: 0,
  },
  rating: {
    type: Number,
    trim: true,
    required: [true, "Please enter product rating"],
    maxLength: [5, "Rating cannot exceed more than 5"],
    minLength: [1, "Rating should have more than 1"],
    default: 0,
  },
  stock: {
    type: Number,
    trim: true,
    required: [true, "Please enter product stock"],
    minLength: [1, "Rating should have more than 1"],
    default: 0,
  },
  brand: {
    type: String,
    trim: true,
    required: [true, "Please enter product brand"],
    maxLength: [50, "Brand cannot exceed more than 50 character"],
    minLength: [2, "Brand should have more than 2 character"],
  },
  category: {
    type: String,
    trim: true,
    required: [true, "Please enter product category"],
    maxLength: [50, "Category cannot exceed more than 50 character"],
    minLength: [2, "Category should have more than 2 character"],
  },
  colors: { type: [Schema.Types.Mixed] },
  highlights: { type: [String] },
  images: {
    type: [String],
    required: [true, "Please add product images"],
  },
  deleted: { type: Boolean, default: false },
});

const virtual = productSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
