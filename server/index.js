import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = 3000;

const mongoUri = process.env.MONGO_ATLAS_URL;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server listening at port:- ${PORT}`);
});
