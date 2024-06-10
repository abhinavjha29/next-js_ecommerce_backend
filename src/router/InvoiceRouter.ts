const express = require("express");
const auth = require("../middlewere/authentication");
const invoiceController = require("../controller/InvoiceController");
const router = express.Router();

router.get("/getinvoice", auth.authenticate, invoiceController.getInvoice);

router.post(
  "/postinvoice",
  auth.authenticate,
  invoiceController.generateInvoice
);

router.patch(
  "/updatestatus/:_id",
  auth.authenticate,
  invoiceController.updateInvoiceStatus
);
router.delete(
  "/deleteinvoice/:id",
  auth.authenticate,
  invoiceController.deleteInvoice
);

module.exports = router;
