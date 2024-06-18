import { Request, Response } from "express";
import Product from "../model/product";
import { IProduct } from "../types";

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 6;
    const search = (req.query.search as string) || "";
    console.log("search is", search);

    const startIndex = (page - 1) * perPage;

    let query = {};

    if (search) {
      query = { title: { $regex: new RegExp(search, "i") } };
    }

    const productsCount: number = await Product.countDocuments(query);
    const totalPages: number = Math.ceil(productsCount / perPage);

    const products = await Product.find(query).skip(startIndex).limit(perPage);

    const paginationInfo = {
      currentPage: page,
      totalPages,
      totalProducts: productsCount,
    };

    res.status(200).json({ products, paginationInfo });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const singleProduct = await Product.findById(id);
    if (singleProduct) {
      res.status(202).json({
        singleProduct,
        message: "product found",
      });
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server error" });
  }
};
module.exports = {
  getProduct,
  getSingleProduct,
};
