import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const checkUserDoesNotExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  user ? res.status(401).json({ message: "User already exists" }) : next();
};

export const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    req.user = user;
    console.log("user exists", user);
    next();
  } else {
    res.status(401).json({ message: "User does not exist" });
  }
};

export const authorize = (req, res, next) => {
  const secretToken = process.env.SECRET_TOKEN;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" }); // 401 Unauthorized
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretToken, (error, decoded) => { // jwt.verify decodes the token and verifies the signature
    if (error) {
      res.status(403).json({ message: "Unauthorized" }); // 403 Forbidden
    } else {
      next();
    }
  });
};
