import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // Collect validation errors
  const validationErrors = [];

  if (!name) validationErrors.push({ field: "name", message: "Name is required" });
  if (!email) validationErrors.push({ field: "email", message: "Email is required" });
  if (!password) validationErrors.push({ field: "password", message: "Password is required" });
  if (password && password.length < 6) {
    validationErrors.push({ field: "password", message: "Password must be at least 6 characters" });
  }

  if (validationErrors.length > 0) {
    throw new ApiError(400, "Validation failed", validationErrors);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: role || "mechanic",
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  res
    .status(201)
    .json(new ApiResponse(201, userResponse, "User registered successfully"));
});

// LOGIN
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Collect validation errors
  const validationErrors = [];

  if (!email) validationErrors.push({ field: "email", message: "Email is required" });
  if (!password) validationErrors.push({ field: "password", message: "Password is required" });

  if (validationErrors.length > 0) {
    throw new ApiError(400, "Validation failed", validationErrors);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // JWT Token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        { token, role: user.role, name: user.name, email: user.email },
        "Login successful"
      )
    );
});
