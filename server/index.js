import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";

//config env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

app.use(express.json());

const PORT = 3000;

//routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);

//middleware
app.use(cors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at port:- ${PORT}`);
});
