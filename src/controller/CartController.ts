import mongoose from "mongoose";
import Cart, { ICart } from "../model/Cart";
import { Response, Request } from "express";
import { RunCommandCursor } from "mongodb";
import { Console } from "console";
interface AddCartResponse {
  message: string;
}
const getCartProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const cartItems = await Cart.find({ user: userId });
    if (!cartItems) {
      res.status(202).json({ message: "no items in cart", item: null });
    } else {
      res.status(202).json({ message: "found cartItems", item: cartItems });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addCartProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(400).json({ message: "User not authenticated" });
      return;
    }

    const cartItem: ICart = req.body.cartItem;
    console.log(cartItem);
    //  const id:string =cartItem._id as string
    // const productId = new mongoose.Types.ObjectId(cartItem._id);
    // console.log("productid is", productId);
    // if (!productId) {
    //   res.status(400).json({ message: "Product ID is required" });
    //   return;
    // }

    let rptCartProduct = await Cart.findOneAndUpdate(
      { user: userId, id: cartItem.id },
      { $inc: { quantity: 1 } },
      { new: true }
    );
    if (rptCartProduct) {
      console.log("rpt product", rptCartProduct);
      res.status(200).json({ message: "Product added to cart" });
      return;
    }

    const cartProduct = await Cart.create({
      id: cartItem.id,
      title: cartItem.title,
      price: cartItem.price,
      description: cartItem.description,
      category: cartItem.category,
      image: cartItem.image,
      rating: {
        rate: cartItem.rating.rate,
        count: cartItem.rating.count,
      },
      quantity: cartItem.quantity,
      user: userId,
      productId: cartItem._id,
    });

    if (cartProduct) {
      console.log("response is", cartProduct);
      res.status(200).json({ message: "Product added to cart" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(501).json("Internal Server Error");
    return;
  }
};
const deleteCartProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const productId = req.params.id;
    const deleteResponse = await Cart.findOneAndDelete({
      user: userId,
      id: productId,
    });

    if (deleteResponse) {
      console.log(deleteResponse);
      res
        .status(200)
        .json({ message: "Product Deleted", product: deleteResponse });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
const changeCartQuantity = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id, quantity } = req.body;
    const updateResponse = await Cart.findOneAndUpdate(
      { user: userId, product: id },
      {
        $set: { quantity },
      }
    ); //need to correct this
    if (updateResponse) {
      res.status(200).json({ message: "Quantity Updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deleteAllCart = async (req: Request, res: Response) => {
  try {
    console.log("inside delete");
    const userId = req.user?._id;
    const response = await Cart.deleteMany({ user: userId }).exec();
    if (response) {
      res.status(200).json({ messege: "Cart Clear" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getCartProducts,
  addCartProducts,
  deleteCartProduct,
  changeCartQuantity,
  deleteAllCart,
};
