import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { CartProduct } from "../types";

const CartProductSchema: Schema = new Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  productId: { type: String, required: true, ref: "Product" },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Cart = mongoose.model<CartProduct>("Cart", CartProductSchema);

export default Cart;
