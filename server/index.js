import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at port:- ${PORT}`);
});
