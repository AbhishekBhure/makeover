import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please enter your name"],
      maxLength: [30, "Cannot exceed more than 30 character"],
      minLength: [3, "Name should have more than 3 character"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minLength: [5, "Password should have more than 5 characters"],
    },
    addressess: { type: [Schema.Types.Mixed] },
    orders: { type: Schema.Types.Mixed, ref: "Order" },
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2KOO0ioBUUIR8k44e3p-dV&ust=1704435675080000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCPCfueqLw4MDFQAAAAAdAAAAABAE",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
