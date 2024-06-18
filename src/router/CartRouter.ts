import { Router } from "express";

const express = require("express");
const tokenAuthentication = require("../middlewere/authentication");
const cartController = require("../controller/CartController");
const router: Router = express.Router();

router.get(
  "/getcartitem",
  tokenAuthentication.authenticate,
  cartController.getCartProducts
);
router.post(
  "/addtocart",
  tokenAuthentication.authenticate,
  cartController.addCartProducts
);
router.delete(
  "/deleteProduct/:id",
  tokenAuthentication.authenticate,
  cartController.deleteCartProduct
);
router.patch(
  "/changequantity",
  tokenAuthentication.authenticate,
  cartController.changeCartQuantity
);
router.delete(
  "/deleteall",
  tokenAuthentication.authenticate,
  cartController.deleteAllCart
);
module.exports = router;
