import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER
export const register = async (req, res, next) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    res.status(201).json({
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
      },
      status: "success",
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3h",
    });

    res.status(200).json({
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
      status: "success",
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// PROFILE
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
    });
  } catch (err) {
    next(err);
  }
};
