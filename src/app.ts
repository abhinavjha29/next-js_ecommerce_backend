import express, { Application, Request, Response } from "express";
import connectDb from "./util/dbconnection";
const cors = require("cors");
import cookieParser from "cookie-parser";

const cartRouter = require("./router/CartRouter");
const userRouter = require("./router/UserRouter");
const productRouter = require("./router/ProductRouter");
const invoiceRouter = require("./router/InvoiceRouter");
const app: Application = express();
const PORT = 3004;
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(cookieParser());

app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/invoice", invoiceRouter);
app.listen(PORT, async () => {
  try {
    await connectDb();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
});
module.exports = app;
