import mongoose from "mongoose";
import { Schema } from "mongoose";

const brandSchema = new Schema({
  label: {
    type: String,
    required: [true, "Please Enter Product Brand"],
  },
  value: {
    type: String,
    required: [true, "Please Enter Brand Value"],
    unique: true,
  },
});

const virtual = brandSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;