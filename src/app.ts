import express, { Application, Request, Response } from "express";
import connectDb from "./util/dbconnection";
const cors = require("cors");
import cookieParser from "cookie-parser";

const cartRouter = require("./router/CartRouter");
const userRouter = require("./router/UserRouter");
const productRouter = require("./router/ProductRouter");
const invoiceRouter = require("./router/InvoiceRouter");
const app: Application = express();
const PORT = process.env.PORT;
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Allow sending cookies and authentication headers
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/invoice", invoiceRouter);

connectDb()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if failed to connect to MongoDB
  });
module.exports = app;
