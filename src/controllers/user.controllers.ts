import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import bcrypt from "bcryptjs";
import User from "../models/User";

dotenv.config();

const registerUser = 
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({status: "Failed"});
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser?._id },
        process.env.JWT_SECRET || ""
      );

      res.status(200).json({ token, newUser });
    } catch (error) {
      res.status(500).json({status: "Failed"});
    }
  }

  export default {registerUser};