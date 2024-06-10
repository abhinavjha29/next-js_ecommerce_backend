import { Router } from "express";
const express = require("express");
const userController = require("../controller/UserController");

const router: Router = express.Router();

router.post("/login", userController.login);
router.post("/signup", userController.signup);

module.exports = router;
