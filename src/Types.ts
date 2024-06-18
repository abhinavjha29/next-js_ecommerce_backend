import mongoose, { ObjectId } from "mongoose";

export interface ICart extends Document {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  user: ObjectId;
  quantity: number;
  _id?: string;
  productId: string;
}
export interface CartProduct {
  _id?: mongoose.Types.ObjectId;
  quantity: {
    type: Number;
    required: true;
    default: 1;
  };
  productId: string;
  id: number;
  title: string;
  price: number;
  description: { type: String; required: true };
  category: { type: String; required: true };
  image: { type: String; required: true };
  rating: {
    rate: { type: Number; required: true };
    count: { type: Number; required: true };
  };
  user: { type: mongoose.Types.ObjectId; required: true; ref: "User" };
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface IProduct extends Document {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface IInvoice extends Document {
  email: string;
  products: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  status: "pending" | "fulfilled" | "rejected";
}
