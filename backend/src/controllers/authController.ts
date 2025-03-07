import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

export const signup = async (req: Request<IUser>, res: Response) => {
  const { username, password, role } = req.body;
  try {
    const foundUser = await User.findOne({ username });

    if (foundUser) {
      res.status(401).json({ message: "Username already exists" });
      return;
    }

    const user = new User({
      username,
      password: await bcrypt.hash(password, 10),
      role,
    });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
