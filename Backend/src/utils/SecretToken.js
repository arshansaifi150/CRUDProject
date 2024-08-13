//@ts-nocheck

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js';  // Adjust the import path as necessary

dotenv.config()

const jwtSecret = process.env.TOKEN_KEY;  // Make sure this matches your .env file

export const createSecretToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '3d'  // 3 days
  });
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized: Missing authorization token."
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(403).json({
        status: false,
        message: "Forbidden: User not found."
      });
    }

    // Attach user info to request object
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      password:user.password
      // Add any other fields you want to include
    };

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized: Invalid or expired token."
    });
  }
};