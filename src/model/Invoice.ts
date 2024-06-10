import { Schema, model, Document } from "mongoose";

interface IInvoice extends Document {
  email: string;
  products: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  status: "pending" | "fulfilled" | "rejected";
}

const invoiceSchema = new Schema<IInvoice>(
  {
    email: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "fulfilled", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default model<IInvoice>("Invoice", invoiceSchema);
