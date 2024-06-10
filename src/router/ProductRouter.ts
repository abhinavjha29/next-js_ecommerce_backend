import { Router } from "express";

const express = require("express");

const productController = require("../controller/ProductController");
const auth = require("../middlewere/authentication");
const router: Router = express.Router();

router.get("/getallproducts", auth.authenticate, productController.getProduct);
router.get(
  "/getsingleproduct/:id",
  auth.authenticate,
  productController.getSingleProduct
);

module.exports = router;
