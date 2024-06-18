import { Request, Response } from "express";
import Invoice from "../model/Invoice";
import Cart from "../model/cart";
import mongoose from "mongoose";

const generateInvoice = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    const email = req.user?.email;

    const newInvoice = await Invoice.create({ email, products: product });

    res.status(201).json(newInvoice);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const getInvoice = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user?.isAdmin;
    if (!isAdmin) {
      res.status(403).json({ message: "Admin Not Identified" });
      return;
    }

    const invoices = await Invoice.find();

    res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const updateInvoiceStatus = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user?.isAdmin;
    if (!isAdmin) {
      res.status(403).json({ message: "Admin Not Identified" });
      return;
    }
    const { _id } = req.params;
    const { status } = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );
    console.log(updatedInvoice);
    if (updatedInvoice) {
      res.status(200).json(updatedInvoice);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "internal error" });
  }
};
const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    console.log(req.params.id);
    const invoiceId = new mongoose.Types.ObjectId(req.params.id);
    const response = await Cart.deleteOne({ user: userId, _id: invoiceId });
    if (response) {
      console.log(response);
      res.status(200).json({ message: "Invoice Deleted", response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  generateInvoice,
  getInvoice,
  updateInvoiceStatus,
  deleteInvoice,
};
