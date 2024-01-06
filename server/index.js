import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import addressRoute from "./routes/addressRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import Order from "./models/orderModel.js";

//config env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//webhook
//TODO: we will capture actual order after deploying out the server live on public URL
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET;
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        const order = await Order.findById(
          paymentIntentSucceeded.metadata.orderId
        );
        order.paymentStatus = "recived";
        await order.save();
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

//routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/address", addressRoute);

//middleware
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//Paymenst
// This is your test secret API key.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/v1/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at port:- ${PORT}`);
});
