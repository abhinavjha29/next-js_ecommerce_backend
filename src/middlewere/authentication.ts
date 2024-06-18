import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();
import User from "../model/user";
import { IUser } from "../types";
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const JWT_PASSWORD: string | undefined = process.env.JWT_SECRET_KEY;

    if (!JWT_PASSWORD) {
      throw new Error("JWT password not found in environment variables");
    }

    const token: string | undefined = req.headers.authorization;

    if (!token) {
      res.status(400).json({ message: "Token not provided" });
      return;
    }

    const user: any = jwt.verify(token, JWT_PASSWORD);

    const response: IUser | null = await User.findById(user.userId);
    if (!response) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // console.log("response at", response);
    req.user = response;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authenticate };
