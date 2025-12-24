import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Not authorized, no token provided");
  }

  try {
    // Decode and verify token - NO DB CALL
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from token payload directly
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    throw new ApiError(401, "Not authorized, token invalid or expired");
  }
});

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden: You don't have permission to access this resource");
    }
    next();
  };
};
