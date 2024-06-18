import { Request, Response } from "express";
import User, { IUser } from "../model/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();
interface TokenPayload {
  userId: string;
}

const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
export const generateToken = async (id: string): Promise<string | void> => {
  const payload: TokenPayload = { userId: id };

  if (secretKey) return jwt.sign(payload, secretKey);
};

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = new User({ name, email, password: hashedPassword });
    const response = await user.save();
    if (response) {
      const id: string = response._id;
      const token = await generateToken(id);
      res.status(201).json({ message: "User created successfully", token });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const id: string = user._id;
    const token = await generateToken(id);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, login };

// const response = {
//   data,
//   flag,
//   status_code,
// }

// const data = {
//   data: [],
//   is_success: true,
//   status_code:
// }
